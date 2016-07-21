/**
 * Created by Cray on 2016/5/6.
 */
import PlaylistLoader from '../loader/playlist-loader';
import HLSEvent from '../hls-event';
import Logger from '../../utils/log';
import Ticker from '../../utils/ticker';
import {ErrorTypes, ErrorDetails} from '../errors';

let _this = null;

class PlayList {
    constructor(hls) {
        this.hls = hls;
        this._e = this.hls._e;
        this._e.on(HLSEvent.ERROR, _onError);

        this._levels = [];
        this._level = -1;
        this._defaultLevel = 0;
        this._manualLevel = -1;
        this._nextAutoLevel = -1;
        this.canload = true;

        _this = this;

        this.loader = new PlaylistLoader();
        this.loader.on(HLSEvent.MANIFEST_LOADED, _onManifestLoaded);
        this.loader.on(HLSEvent.LEVEL_LOADED, _onLevelLoaded);
        this.loader.on(HLSEvent.ERROR, (event) => {
            this._e.fire(HLSEvent.ERROR, event);
        });
    }

    src(url) {
        if (this.loader) {
            this.loader.loadMainfestFile(url);
        }
    }

    get levels() {
        return this._levels;
    }

    get level() {
        return this._level;
    }

    set level(value) {
        if (this._level !== value) {
            this._level = value;
            if (this._levels[value].details === undefined) {
                _setLevelInternal(value);
            } else {
                this._e.fire(HLSEvent.LEVEL_LOADED, _this._levels[0]);
            }
        }
    }

    get defaultLevel() {
        return this._defaultLevel;
    }

    set defaultLevel(value) {
        this._defaultLevel = value;
    }

    get currentLevel() {
        if (this._currentLevel === undefined) {
            return this._defaultLevel;
        } else {
            return this._currentLevel;
        }
    }

    set currentLevel(value) {
        this._currentLevel = value;
    }

    get manualLevel() {
        return this._manualLevel;
    }

    set manualLevel(value) {
        this._manualLevel = value;
        if (value !== -1) {
            this.level = value;
        }
    }

    get nextLoadLevel() {
        if (this._manualLevel !== -1) {
            return this._manualLevel;
        } else {
            return this._nextAutoLevel;
        }
    }

    set nextLoadLevel(value) {
        this.level = value;
        if (this._manualLevel === -1) {
            this._nextAutoLevel = value;
        }
    }
}

function _onManifestLoaded(data) {
    let tempLevels = [],
        levels = [],
        defaultBitrate,
        i,
        bitrateSet = {},
        videoCodec = false,
        audioCodec = false;


    if (data.levels[0].details) {
        _this._levels = data.levels;
        _this._levels[0].urlId = 0;

        _this._e.fire(HLSEvent.MANIFEST_PARSED, {
            levels: _this._levels,
            currentLevel: _this._defaultLevel,
            stats: _this._levels[0].stats
        });
        return;
    }

    data.levels.forEach((level) => {
        if (level.videoCodec) {
            videoCodec = true;
        }
        if (level.audioCodec) {
            audioCodec = true;
        }
        let index = bitrateSet[level.bitrate];
        if (index === undefined) {
            bitrateSet[level.bitrate] = tempLevels.length;
            level.url = [level.url];
            level.urlId = 0;
            tempLevels.push(level);
        } else {
            tempLevels[index].url.push(level.url);
        }
    });

    if (videoCodec && audioCodec) {
        tempLevels.forEach(level => {
            if (level.videoCodec) {
                levels.push(level);
            }
        });
    } else {
        levels = tempLevels;
    }

    levels = levels.filter(function (level) {
        let checkAudio = function (codec) {
            return MediaSource.isTypeSupported(`audio/mp4;codecs=${codec}`);
        };

        let checkVideo = function (codec) {
            return MediaSource.isTypeSupported(`video/mp4;codecs=${codec}`);
        };
        let audioCodec = level.audioCodec, videoCodec = level.videoCodec;

        return (!audioCodec || checkAudio(audioCodec)) &&
            (!videoCodec || checkVideo(videoCodec));
    });

    if (levels.length > 0) {
        defaultBitrate = levels[0].bitrate;
        levels.sort(function (a, b) {
            return a.bitrate - b.bitrate;
        });

        _this._levels = levels;
        for (i = 0; i < levels.length; i++) {
            if (levels[i].bitrate === defaultBitrate) {
                _this._currentLevel = i;
                Logger.log(`manifest loaded, ${levels.length} levels, default bitrate:${defaultBitrate}`);
                break;
            }
        }

        _this._e.fire(HLSEvent.MANIFEST_PARSED, {
            levels: _this._levels,
            currentLevel: _this._currentLevel,
            stats: data.stats
        });
    } else {
        _this._e.fire(HLSEvent.ERROR, {
            type: ErrorTypes.MEDIA_ERROR,
            details: ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
            fatal: true,
            url: data.url,
            reason: 'no level with compatible codecs found in manifest'
        });
    }
}

function _onLevelLoaded(data) {
    if (data.details.live) {
        let time = data.details.averagetargetduration ? data.details.averagetargetduration : data.details.targetduration;
        Ticker.stop(_loadLevelFile);
        Ticker.tick(1000 * time, _loadLevelFile, 0);
    } else {
        Ticker.stop(_loadLevelFile);
    }
}

function _onError(data) {
    if (data.fatal) {
        Logger.error('[PlayList] fatal error');
        return;
    }

    let details = data.details, levelId, level;
    switch (details) {
        case ErrorDetails.FRAG_LOAD_ERROR:
        case ErrorDetails.FRAG_LOAD_TIMEOUT:
        case ErrorDetails.FRAG_LOOP_LOADING_ERROR:
        case ErrorDetails.KEY_LOAD_ERROR:
        case ErrorDetails.KEY_LOAD_TIMEOUT:
            levelId = data.frag.level;
            break;
        case ErrorDetails.LEVEL_LOAD_ERROR:
        case ErrorDetails.LEVEL_LOAD_TIMEOUT:
            levelId = data.level;
            break;
        default:
            break;
    }

    if (levelId !== undefined) {
        level = _this._levels[levelId];
        if (level.urlId < (level.url.length - 1)) {
            level.urlId++;
            level.details = undefined;
            Logger.warn(`playlist ,${details} for level ${levelId}: switch next id ${level.urlId}`);
        } else {
            if ((_this._manualLevel === -1) && levelId) {
                Logger.warn(`playlist,${details}: emergency switch-down for next fragment`);
                _this.nextAutoLevel = 0;
            } else if (level && level.details && level.details.live) {
                Logger.warn(`playlist,${details} on live stream, discard`);
            } else if (details !== ErrorDetails.FRAG_LOAD_ERROR && details !== ErrorDetails.FRAG_LOAD_TIMEOUT) {
                Logger.error(`cannot recover ${details} error`);
                _this._level = undefined;
                Ticker.stop(_loadLevelFile);

                data.fatal = true;
                _this._e.fire(HLSEvent.ERROR, data);
            }
        }
    }
}

function _setLevelInternal(level) {
    if (level >= 0 && level < _this._levels.length) {
        Ticker.stop(_loadLevelFile);

        Logger.log(`switching to level ${level}`);

        let levelData = _this._levels[level];
        if (levelData.details === undefined || levelData.details.live === true) {
            Logger.log(`reload playlist for level ${level}`);
            let urlId = levelData.urlId;
            _this.loader.loadLevelFile({url: levelData.url[urlId], level: level, id: urlId});
        }
    } else {
        _this._e.fire(HLSEvent.ERROR, {
            type: ErrorTypes.OTHER_ERROR,
            details: ErrorDetails.LEVEL_SWITCH_ERROR,
            level: level,
            fatal: false,
            reason: 'invalid level idx'
        });
    }
}

function _loadLevelFile() {
    let levelId = _this._level;
    if (levelId !== undefined && _this.canload) {
        let level = _this._levels[levelId], urlId = level.urlId;
        _this.loader.loadLevelFile({url: level.url[urlId], level: levelId, id: urlId});
    }
}

export default PlayList;