/**
 * Created by Cray on 2016/5/6.
 */
import HLSEvent from '../hls-event';
import Logger from '../../utils/log';
import Ticker from '../../utils/ticker';
import Demuxer from '../demux/demuxer';
import {ErrorTypes, ErrorDetails} from '../errors';
import hlsConfig from '../hls-config';
import BufferUtils from '../../utils/buffer-utils';
import Utils from '../../utils/utils';
import ListUtils from '../../utils/list-utils';
import KeyLoader from '../loader/key-loader';
import SegmentLoader from '../loader/segment-loader';

let _this = null;

const State = {
    STOPPED : 'STOPPED',
    STARTING : 'STARTING',
    IDLE : 'IDLE',
    PAUSED : 'PAUSED',
    KEY_LOADING : 'KEY_LOADING',
    FRAG_LOADING : 'FRAG_LOADING',
    FRAG_LOADING_WAITING_RETRY : 'FRAG_LOADING_WAITING_RETRY',
    WAITING_LEVEL : 'WAITING_LEVEL',
    PARSING : 'PARSING',
    PARSED : 'PARSED',
    ENDED : 'ENDED',
    ERROR : 'ERROR'
};

class Stream {
    constructor(hls){
        this.hls = hls;
        this._e = this.hls._e;

        this._e.on(HLSEvent.MANIFEST_PARSED, _onMainfestParsed);
        this._e.on(HLSEvent.MEDIA_SOURCE_OPEN, _onMediaSourceOpen);
        this._e.on(HLSEvent.LEVEL_LOADED, _onLevleLoaded);
        this._e.on(HLSEvent.ERROR, _onError);
        
        //this._e.on(HLSEvent.FRAG_LOAD_EMERGENCY_ABORTED, _onFragLoadEmergencyAborted);
        this._e.on(HLSEvent.SEG_PARSING_INIT_SEGMENT, _onFragParsingInitSegment);
        this._e.on(HLSEvent.SEG_PARSING_DATA, _onFragParsingData);
        this._e.on(HLSEvent.SEG_PARSED, _onFragParsed);
        this._e.on(HLSEvent.BUFFER_APPENDED, _onBufferAppended);
        this._e.on(HLSEvent.BUFFER_FLUSHED, _onBufferFlushed);
        
        
        this.bufferRange = [];
        this.stalled = false;
        this.media = null;
        this.levels = null;
        this.state = State.STOPPED;

        this.keyLoader = new KeyLoader();
        this.keyLoader.on(HLSEvent.KEY_LOADED, _onKeyLoaded);
        this.keyLoader.on(HLSEvent.ERROR, (event) => {
            this._e.fire(HLSEvent.ERROR, event);
        });

        this.segLoader = new SegmentLoader();
        this.segLoader.on(HLSEvent.SEG_LOADED, _onSegLoaded);
        this.segLoader.on(HLSEvent.ERROR, (event) => {
            this._e.fire(HLSEvent.ERROR, event);
        });

        _this = this;
    }

    startLoad(startPosition = 0) {
        if(this.levels == null) {
            Logger.log('[Stream] startLoad cannot load the levels');
            return ;
        }

        Logger.log('[Stream] startLoad');

        let media = this.media, lastCurrentTime = this.lastCurrentTime;
        this.stopLoad();
        this.demuxer = new Demuxer(this.hls);

        Ticker.tick(100, _enterFrame, -1);

        this.level = -1;
        this.fragLoadError = 0;
        if (media && lastCurrentTime) {
            Logger.log(`configure startPosition @${lastCurrentTime}`);
            if (!media.paused) {
                Logger.log('resuming video');
                media.play();
            }
            this.state = State.IDLE;
        } else {
            this.lastCurrentTime = this.startPosition ? this.startPosition : startPosition;
            this.state = State.STARTING;
        }
        this.nextLoadPosition = this.startPosition = this.lastCurrentTime;
        //_enterFrame();
    }

    stopLoad() {
        let frag = this.fragCurrent;
        if (frag) {
            if (frag.loader) {
                frag.loader.abort();
            }
            this.fragCurrent = null;
        }
        this.fragPrevious = null;
        if (this.demuxer) {
            this.demuxer.dispose();
            this.demuxer = null;
        }

        this.state = State.STOPPED;
    }

    isBuffered(position) {
        let buffered = this.media.buffered;
        for (var i = 0; i < buffered.length; i++) {
            if (position >= buffered.start(i) && position <= buffered.end(i)) {
                return true;
            }
        }
        return false;
    }

    getBufferRange(position) {
        let i, range,
            bufferRange = this.bufferRange;
        if (bufferRange) {
            for (i = bufferRange.length - 1; i >=0; i--) {
                range = bufferRange[i];
                if (position >= range.start && position <= range.end) {
                    return range;
                }
            }
        }
        return null;
    }

    get currentLevel() {
        if (this.media) {
            var range = this.getBufferRange(this.media.currentTime);
            if (range) {
                return range.frag.level;
            }
        }
        return -1;
    }

    get nextBufferRange() {
        if (this.media) {
            return this.followingBufferRange(this.getBufferRange(this.media.currentTime));
        } else {
            return null;
        }
    }

    followingBufferRange(range) {
        if (range) {
            return this.getBufferRange(range.end + 0.5);
        }
        return null;
    }

    get nextLevel() {
        var range = this.nextBufferRange;
        if (range) {
            return range.frag.level;
        } else {
            return -1;
        }
    }

    dispose() {
        this.stopLoad();
        Ticker.stop(_enterFrame);
        this.state = State.STOPPED;
    }
}

function _onMainfestParsed(data) {
    let aac = false, heaac = false, codec;
    data.levels.forEach(level => {
        codec = level.audioCodec;
        if (codec) {
            if (codec.indexOf('mp4a.40.2') !== -1) {
                aac = true;
            }
            if (codec.indexOf('mp4a.40.5') !== -1) {
                heaac = true;
            }
        }
    });
    _this.audioCodecSwitch = (aac && heaac);
    if (_this.audioCodecSwitch) {
        Logger.log('both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC');
    }
    _this.levels = data.levels;
    _this.startLevelLoaded = false;
    _this.startFragRequested = false;
    _this.media = _this.hls.media;

    _this.hls.buffer.connectMedia();
}

function _onMediaSourceOpen(event) {
    _this.media.addEventListener('seeking', _onMediaSeeking);
    _this.media.addEventListener('seeked', _onMediaSeeked);
    _this.media.addEventListener('ended', _onMediaEnded);
    _this.startLoad();
    _this.media.play();
}

function _onLevleLoaded(data) {
    let newDetails = data.details,
        newLevelId = data.level,
        curLevel = _this.levels[newLevelId],
        duration = newDetails.totalduration,
        sliding = 0;

    Logger.log(`level ${newLevelId} loaded [${newDetails.startSN},${newDetails.endSN}],duration:${duration}`);
    _this.levelLastLoaded = newLevelId;

    if (newDetails.live) {
        let curDetails = curLevel.details;
        if (curDetails) {
            ListUtils.mergeDetails(curDetails,newDetails);
            sliding = newDetails.fragments[0].start;
            if (newDetails.PTSKnown) {
                Logger.log(`live playlist sliding:${sliding.toFixed(3)}`);
            } else {
                Logger.log('live playlist - outdated PTS, unknown sliding');
            }
        } else {
            newDetails.PTSKnown = false;
            Logger.log('live playlist - first load, unknown sliding');
        }
    } else {
        newDetails.PTSKnown = false;
    }
    curLevel.details = newDetails;
    //_this._e.fire(HLSEvent.LEVEL_UPDATED, { details: newDetails, level: newLevelId });

    if (_this.startFragRequested === false) {
        if (newDetails.live) {
            let targetLatency = hlsConfig.liveSyncDuration !== undefined ? hlsConfig.liveSyncDuration : hlsConfig.liveSyncDurationCount * newDetails.targetduration;
            _this.startPosition = Math.max(0, sliding + duration - targetLatency);
        }
        _this.nextLoadPosition = _this.startPosition;
    }
    if (_this.state === State.WAITING_LEVEL) {
        _this.state = State.IDLE;
    }
    //_enterFrame();
}

function _onError(data) {
    switch(data.details) {
        case ErrorDetails.FRAG_LOAD_ERROR:
        case ErrorDetails.FRAG_LOAD_TIMEOUT:
            if(!data.fatal) {
                var loadError = _this.fragLoadError;
                if(loadError) {
                    loadError++;
                } else {
                    loadError=1;
                }
                if (loadError <= hlsConfig.fragLoadingMaxRetry) {
                    _this.fragLoadError = loadError;
                    data.frag.loadCounter = 0;
                    var delay = Math.min(Math.pow(2,loadError-1)*hlsConfig.fragLoadingRetryDelay,64000);
                    Logger.warn(`mediaController: frag loading failed, retry in ${delay} ms`);
                    _this.retryDate = performance.now() + delay;
                    _this.state = State.FRAG_LOADING_WAITING_RETRY;
                } else {
                    Logger.error(`mediaController: ${data.details} reaches max retry, redispatch as fatal ...`);
                    data.fatal = true;
                    _this._e.fire(HLSEvent.ERROR, data);
                    _this.state = State.ERROR;
                }
            }
            break;
        case ErrorDetails.FRAG_LOOP_LOADING_ERROR:
        case ErrorDetails.LEVEL_LOAD_ERROR:
        case ErrorDetails.LEVEL_LOAD_TIMEOUT:
        case ErrorDetails.KEY_LOAD_ERROR:
        case ErrorDetails.KEY_LOAD_TIMEOUT:
            if(_this.state !== State.ERROR) {
                _this.state = data.fatal ? State.ERROR : State.IDLE;
                Logger.warn(`mediaController: ${data.details} while loading frag,switch to ${_this.state} state ...`);
            }
            break;
        case ErrorDetails.BUFFER_FULL_ERROR:
            hlsConfig.maxMaxBufferLength/=2;
            Logger.warn(`reduce max buffer length to ${hlsConfig.maxMaxBufferLength}s and trigger a nextLevelSwitch to flush old buffer and fix QuotaExceededError`);
            _nextLevelSwitch();
            break;
        default:
            break;
    }
}

function _onMediaSeeking() {
    if (_this.state === State.FRAG_LOADING) {
        if (BufferUtils.bufferInfo(_this.media, _this.media.currentTime, hlsConfig.maxBufferHole).len === 0) {
            Logger.log('seeking outside of buffer while fragment load in progress, cancel fragment load');
            let fragCurrent = _this.fragCurrent;
            if (fragCurrent) {
                if (fragCurrent.loader) {
                    fragCurrent.loader.abort();
                }
                _this.fragCurrent = null;
            }
            _this.fragPrevious = null;
            _this.state = State.IDLE;
        }
    } else if (_this.state === State.ENDED) {
        _this.state = State.IDLE;
    }
    if (_this.media) {
        _this.lastCurrentTime = _this.media.currentTime;
    }
    if (_this.fragLoadIdx !== undefined) {
        _this.fragLoadIdx += 2 * hlsConfig.fragLoadingLoopThreshold;
    }
    
    //_enterFrame();
}

function _onMediaSeeked() {
    _enterFrame();
}

function _onMediaEnded() {
    Logger.log('media ended');
    _this.startPosition = _this.lastCurrentTime = 0;
}

function _onKeyLoaded() {
    if (_this.state === State.KEY_LOADING) {
        _this.state = State.IDLE;
        //_enterFrame();
    }
}

function _onSegLoaded(data) {
    let fragCurrent = _this.fragCurrent;
    if (_this.state === State.FRAG_LOADING &&
        fragCurrent &&
        data.frag.level === fragCurrent.level &&
        data.frag.sn === fragCurrent.sn) {
        if (_this.fragBitrateTest === true) {
            _this.state = State.IDLE;
            _this.fragBitrateTest = false;
            data.stats.tparsed = data.stats.tbuffered = performance.now();
            _this._e.fire(HLSEvent.SEG_BUFFERED, {stats: data.stats, frag: fragCurrent});
        } else {
            _this.state = State.PARSING;
            _this.stats = data.stats;
            var currentLevel = _this.levels[_this.level],
                details = currentLevel.details,
                duration = details.totalduration,
                start = fragCurrent.start,
                level = fragCurrent.level,
                sn = fragCurrent.sn,
                audioCodec = hlsConfig.defaultAudioCodec || currentLevel.audioCodec;
            if(_this.audioCodecSwap) {
                Logger.log('swapping playlist audio codec');
                if(audioCodec === undefined) {
                    audioCodec = _this.lastAudioCodec;
                }
                if(audioCodec) {
                    if(audioCodec.indexOf('mp4a.40.5') !==-1) {
                        audioCodec = 'mp4a.40.2';
                    } else {
                        audioCodec = 'mp4a.40.5';
                    }
                }
            }
            _this.pendingAppending = 0;
            Logger.log(`Demuxing ${sn} of [${details.startSN} ,${details.endSN}],level ${level}`);
            _this.demuxer.push(data.payload, audioCodec, currentLevel.videoCodec, start, fragCurrent.cc, level, sn, duration, fragCurrent.decryptdata);
        }
    }
    _this.fragLoadError = 0;
}

function _onFragParsingInitSegment(data) {
    if (_this.state === State.PARSING) {
        var tracks = data.tracks, trackName, track;

        track = tracks.audio;
        if(track) {
            var audioCodec = _this.levels[_this.level].audioCodec,
                ua = navigator.userAgent.toLowerCase();
            if(audioCodec && _this.audioCodecSwap) {
                Logger.log('swapping playlist audio codec');
                if(audioCodec.indexOf('mp4a.40.5') !==-1) {
                    audioCodec = 'mp4a.40.2';
                } else {
                    audioCodec = 'mp4a.40.5';
                }
            }
            if (_this.audioCodecSwitch) {
                if(track.metadata.channelCount !== 1 &&
                    ua.indexOf('firefox') === -1) {
                    audioCodec = 'mp4a.40.5';
                }
            }
            if(ua.indexOf('android') !== -1) {
                audioCodec = 'mp4a.40.2';
                Logger.log(`Android: force audio codec to` + audioCodec);
            }
            track.levelCodec = audioCodec;
        }


        track = tracks.video;
        if(track) {
            track.levelCodec = _this.levels[_this.level].videoCodec;
        }

        if (data.unique) {
            var mergedTrack = {
                codec : '',
                levelCodec : ''
            };
            for (trackName in data.tracks) {
                track = tracks[trackName];
                mergedTrack.container = track.container;
                if (mergedTrack.codec) {
                    mergedTrack.codec +=  ',';
                    mergedTrack.levelCodec +=  ',';
                }
                if(track.codec) {
                    mergedTrack.codec +=  track.codec;
                }
                if (track.levelCodec) {
                    mergedTrack.levelCodec +=  track.levelCodec;
                }
            }
            tracks = { audiovideo : mergedTrack };
        }

        _this._e.fire(HLSEvent.BUFFER_CODECS, tracks);

        for (trackName in tracks) {
            track = tracks[trackName];
            Logger.log(`track:${trackName},container:${track.container},codecs[level/parsed]=[${track.levelCodec}/${track.codec}]`);
            let initSegment = track.initSegment;
            if (initSegment) {
                _this.pendingAppending++;
                _this._e.fire(HLSEvent.BUFFER_APPENDING, {type: trackName, data: initSegment});
            }
        }
    }
}

function _onFragParsingData(data) {
    if (_this.state === State.PARSING) {
        _this.tparse2 = Date.now();
        let level = _this.levels[_this.level],
            frag = _this.fragCurrent;

        Logger.log(`parsed ${data.type},PTS:[${data.startPTS.toFixed(3)},${data.endPTS.toFixed(3)}],DTS:[${data.startDTS.toFixed(3)}/${data.endDTS.toFixed(3)}],nb:${data.nb}`);

        var drift = ListUtils.updateFragPTS(level.details,frag.sn,data.startPTS,data.endPTS);

        _this._e.fire(HLSEvent.LEVEL_PTS_UPDATED, {details: level.details, level: _this.level, drift: drift});

        [data.data1, data.data2].forEach(buffer => {
            if (buffer) {
                _this.pendingAppending++;
                _this._e.fire(HLSEvent.BUFFER_APPENDING, {type: data.type, data: buffer});
            }
        });

        _this.nextLoadPosition = data.endPTS;
        _this.bufferRange.push({type: data.type, start: data.startPTS, end: data.endPTS, frag: frag});

        //_enterFrame();
    } else {
        Logger.warn(`not in PARSING state but ${_this.state}, ignoring FRAG_PARSING_DATA event`);
    }
}

function _onFragParsed() {
    if (_this.state === State.PARSING) {
        _this.stats.tparsed = performance.now();
        _this.state = State.PARSED;
        _checkAppendedParsed();
    }
}

function _onBufferAppended() {
    switch (_this.state) {
        case State.PARSING:
        case State.PARSED:
            _this.pendingAppending--;
            _checkAppendedParsed();
            break;
        default:
            break;
    }
}

//function _onFragLoadEmergencyAborted() {
//    _this.state = State.IDLE;
//    _enterFrame();
//}

function _onBufferFlushed() {
    let newRange = [],range,i;
    for (i = 0; i < _this.bufferRange.length; i++) {
        range = _this.bufferRange[i];
        if (_this.isBuffered((range.start + range.end) / 2)) {
            newRange.push(range);
        }
    }
    _this.bufferRange = newRange;

    if (_this.immediateSwitch) {
        _immediateLevelSwitchEnd();
    }
    _this.state = State.IDLE;
    _this.fragPrevious = null;
}

function _nextLevelSwitch() {
    let fetchdelay, currentRange, nextRange;
    currentRange = _this.getBufferRange(_this.media.currentTime);
    if (currentRange && currentRange.start > 1) {
        _this._e.fire(HLSEvent.BUFFER_FLUSHING, {startOffset: 0, endOffset: currentRange.start - 1});
        _this.state = State.PAUSED;
    }
    if (!_this.media.paused) {
        let nextLevelId = _this.hls.playList.nextLoadLevel,
            nextLevel = _this.levels[nextLevelId], fragLastKbps = _this.fragLastKbps;
        if (fragLastKbps && _this.fragCurrent) {
            fetchdelay = _this.fragCurrent.duration * nextLevel.bitrate / (1000 * fragLastKbps) + 1;
        } else {
            fetchdelay = 0;
        }
    } else {
        fetchdelay = 0;
    }
    nextRange = _this.getBufferRange(_this.media.currentTime + fetchdelay);
    if (nextRange) {
        nextRange = _this.followingBufferRange(nextRange);
        if (nextRange) {
            _this._e.fire(HLSEvent.BUFFER_FLUSHING, {startOffset: nextRange.start, endOffset: Number.POSITIVE_INFINITY});
            _this.state = State.PAUSED;
            let fragCurrent = _this.fragCurrent;
            if (fragCurrent && fragCurrent.loader) {
                fragCurrent.loader.abort();
            }
            _this.fragCurrent = null;
            _this.fragLoadIdx += 2 * hlsConfig.fragLoadingLoopThreshold;
        }
    }
}

function _immediateLevelSwitch() {
    Logger.log('immediateLevelSwitch');

    if (!_this.immediateSwitch) {
        _this.immediateSwitch = true;
        _this.previouslyPaused = _this.media.paused;
        _this.media.pause();
    }
    let fragCurrent = _this.fragCurrent;
    if (fragCurrent && fragCurrent.loader) {
        fragCurrent.loader.abort();
    }
    _this.fragCurrent = null;
    _this._e.fire(HLSEvent.BUFFER_FLUSHING, {startOffset: 0, endOffset: Number.POSITIVE_INFINITY});
    _this.state = State.PAUSED;
    _this.fragLoadIdx += 2 * hlsConfig.fragLoadingLoopThreshold;

    //_enterFrame();
}

function _immediateLevelSwitchEnd() {
    _this.immediateSwitch = false;
    _this.media.currentTime -= 0.0001;
    if (!_this.previouslyPaused) {
        _this.media.play();
    }
}


function _checkAppendedParsed() {
    if (_this.state === State.PARSED && _this.pendingAppending === 0)  {
        var frag = _this.fragCurrent, stats = _this.stats;
        if (frag) {
            _this.fragPrevious = frag;
            stats.tbuffered = performance.now();
            _this.fragLastKbps = Math.round(8 * stats.length / (stats.tbuffered - stats.tfirst));
            _this._e.fire(HLSEvent.SEG_BUFFERED, {stats: stats, frag: frag});
            Logger.log(`media buffered : ${_timeRangesToString(_this.media.buffered)}`);
            _this.state = State.IDLE;
        }
        //_enterFrame();
    }
}

function _enterFrame() {
    let pos, level, levelDetails;
    switch(_this.state) {
        case State.ERROR:
        case State.PAUSED:
            break;
        case State.STARTING:
            _this.startLevel = _this.hls.playList.currentLevel;
            if (_this.startLevel === -1) {
                _this.startLevel = 0;
                _this.fragBitrateTest = true;
            }
            _this.state = State.WAITING_LEVEL;
            _this.loadedmetadata = false;
            _this.level = _this.hls.playList.nextLoadLevel = _this.startLevel;
            break;
        case State.IDLE:
            if (!_this.media &&
                (_this.startFragRequested || !hlsConfig.startFragPrefetch)) {
                break;
            }
            if (_this.loadedmetadata) {
                pos = _this.media.currentTime;
            } else {
                pos = _this.nextLoadPosition;
            }
            if (_this.startFragRequested === false) {
                level = _this.startLevel;
            } else {
                level = _this.hls.playList.nextLoadLevel;
            }
            let bufferInfo = BufferUtils.bufferInfo(_this.media, pos, hlsConfig.maxBufferHole),
                bufferLen = bufferInfo.len,
                bufferEnd = bufferInfo.end,
                fragPrevious = _this.fragPrevious,
                maxBufLen;
            if ((_this.levels[level]).hasOwnProperty('bitrate')) {
                maxBufLen = Math.max(8 * hlsConfig.maxBufferSize / _this.levels[level].bitrate, hlsConfig.maxBufferLength);
                maxBufLen = Math.min(maxBufLen, hlsConfig.maxMaxBufferLength);
            } else {
                maxBufLen = hlsConfig.maxBufferLength;
            }
            if (bufferLen < maxBufLen) {
                _this.hls.playList.nextLoadLevel = level;
                _this.level = level;
                levelDetails = _this.levels[level].details;

                if (typeof levelDetails === 'undefined' || levelDetails.live && _this.levelLastLoaded !== level) {
                    _this.state = State.WAITING_LEVEL;
                    break;
                }
                let fragments = levelDetails.fragments,
                    fragLen = fragments.length,
                    start = fragments[0].start,
                    end = fragments[fragLen-1].start + fragments[fragLen-1].duration,
                    frag;

                if (levelDetails.live) {
                    let maxLatency = hlsConfig.liveMaxLatencyDuration !== undefined ? hlsConfig.liveMaxLatencyDuration : hlsConfig.liveMaxLatencyDurationCount*levelDetails.targetduration;

                    if (bufferEnd < Math.max(start, end - maxLatency)) {
                        let targetLatency = hlsConfig.liveSyncDuration !== undefined ? hlsConfig.liveSyncDuration : hlsConfig.liveSyncDurationCount * levelDetails.targetduration;
                        _this.seekAfterBuffered = start + Math.max(0, levelDetails.totalduration - targetLatency);
                        Logger.log(`buffer end: ${bufferEnd} is located too far from the end of live sliding playlist, media position will be reseted to: ${_this.seekAfterBuffered.toFixed(3)}`);
                        bufferEnd = _this.seekAfterBuffered;
                    }

                    if (levelDetails.PTSKnown && bufferEnd > end) {
                        break;
                    }

                    if (_this.startFragRequested && !levelDetails.PTSKnown) {
                        if (fragPrevious) {
                            var targetSN = fragPrevious.sn + 1;
                            if (targetSN >= levelDetails.startSN && targetSN <= levelDetails.endSN) {
                                frag = fragments[targetSN - levelDetails.startSN];
                                Logger.log(`live playlist, switching playlist, load frag with next SN: ${frag.sn}`);
                            }
                        }
                        if (!frag) {
                            frag = fragments[Math.min(fragLen - 1, Math.round(fragLen / 2))];
                            Logger.log(`live playlist, switching playlist, unknown, load middle frag : ${frag.sn}`);
                        }
                    }
                } else {
                    if (bufferEnd < start) {
                        frag = fragments[0];
                    }
                }
                if (!frag) {
                    let foundFrag;
                    let maxFragLookUpTolerance = hlsConfig.maxFragLookUpTolerance;
                    if (bufferEnd < end) {
                        if (bufferEnd > end - maxFragLookUpTolerance) {
                            maxFragLookUpTolerance = 0;
                        }
                        foundFrag = Utils.search(fragments, (candidate) => {
                            if ((candidate.start + candidate.duration - maxFragLookUpTolerance) <= bufferEnd) {
                                return 1;
                            }
                            else if (candidate.start - maxFragLookUpTolerance > bufferEnd) {
                                return -1;
                            }
                            return 0;
                        });
                    } else {
                        foundFrag = fragments[fragLen-1];
                    }
                    if (foundFrag) {
                        frag = foundFrag;
                        start = foundFrag.start;
                        if (fragPrevious && frag.level === fragPrevious.level && frag.sn === fragPrevious.sn) {
                            if (frag.sn < levelDetails.endSN) {
                                frag = fragments[frag.sn + 1 - levelDetails.startSN];
                                Logger.log(`SN just loaded, load next one: ${frag.sn}`);
                            } else {
                                if (!levelDetails.live) {
                                    _this._e.fire(HLSEvent.BUFFER_EOS);
                                    _this.state = State.ENDED;
                                }
                                frag = null;
                            }
                        }
                    }
                }
                if(frag) {
                    if ((frag.decryptdata.uri != null) && (frag.decryptdata.key == null)) {
                        Logger.log(`Loading key for ${frag.sn} of [${levelDetails.startSN} ,${levelDetails.endSN}],level ${level}`);
                        _this.state = State.KEY_LOADING;
                        _this.keyLoader.loadKey({frag: frag});
                        //_this._e.fire(HLSEvent.KEY_LOADING, {frag: frag});
                    } else {
                        Logger.log(`Loading ${frag.sn} of [${levelDetails.startSN} ,${levelDetails.endSN}],level ${level}, currentTime:${pos},bufferEnd:${bufferEnd.toFixed(3)}`);
                        frag.autoLevel = _this.hls.playList.manualLevel !== -1;
                        if (_this.levels.length > 1) {
                            frag.expectedLen = Math.round(frag.duration * _this.levels[level].bitrate / 8);
                            frag.trequest = performance.now();
                        }
                        if (_this.fragLoadIdx !== undefined) {
                            _this.fragLoadIdx++;
                        } else {
                            _this.fragLoadIdx = 0;
                        }
                        if (frag.loadCounter) {
                            frag.loadCounter++;
                            let maxThreshold = hlsConfig.fragLoadingLoopThreshold;
                            if (frag.loadCounter > maxThreshold && (Math.abs(_this.fragLoadIdx - frag.loadIdx) < maxThreshold)) {
                                _this._e.fire(HLSEvent.ERROR, {type: ErrorTypes.MEDIA_ERROR, details: ErrorDetails.FRAG_LOOP_LOADING_ERROR, fatal: false, frag: frag});
                                return;
                            }
                        } else {
                            frag.loadCounter = 1;
                        }
                        frag.loadIdx = _this.fragLoadIdx;
                        _this.fragCurrent = frag;
                        _this.startFragRequested = true;

                        //_this._e.fire(HLSEvent.FRAG_LOADING, {frag: frag});
                        _this.segLoader.fragLoad({frag: frag});
                        _this.state = State.FRAG_LOADING;
                    }
                }
            }
            break;
        case State.WAITING_LEVEL:
            level = _this.levels[_this.level];
            if (level && level.details) {
                _this.state = State.IDLE;
            }
            break;
        case State.FRAG_LOADING_WAITING_RETRY:
            let now = performance.now();
            let retryDate = _this.retryDate;
            let media = _this.media;
            let isSeeking = media && media.seeking;
            if(!retryDate || (now >= retryDate) || isSeeking) {
                Logger.log(`mediaController: retryDate reached, switch back to IDLE state`);
                _this.state = State.IDLE;
            }
            break;
        case State.STOPPED:
        case State.FRAG_LOADING:
        case State.PARSING:
        case State.PARSED:
        case State.ENDED:
            break;
        default:
            break;
    }
    _checkBuffer();
    _checkFragmentChanged();
}

function _checkBuffer() {
    let media = _this.media;
    if(media) {
        let readyState = media.readyState;
        if(readyState) {
            let targetSeekPosition, currentTime;
            let seekAfterBuffered = _this.seekAfterBuffered;
            if(seekAfterBuffered) {
                if(media.duration >= seekAfterBuffered) {
                    targetSeekPosition = seekAfterBuffered;
                    _this.seekAfterBuffered = undefined;
                }
            } else {
                currentTime = media.currentTime;
                if(!_this.loadedmetadata && media.buffered.length) {
                    _this.loadedmetadata = true;
                    if (!currentTime && currentTime !== _this.startPosition) {
                        targetSeekPosition = _this.startPosition;
                    }
                }
            }
            if (targetSeekPosition) {
                currentTime = targetSeekPosition;
                Logger.log(`target seek position:${targetSeekPosition}`);
            }
            let bufferInfo = BufferUtils.bufferInfo(media,currentTime,0),
                expectedPlaying = !(media.paused || media.ended || media.seeking || readyState < 2),
                jumpThreshold = 0.4, 
                playheadMoving = currentTime > media.playbackRate*_this.lastCurrentTime;

            if (_this.stalled && playheadMoving) {
                _this.stalled = false;
                Logger.log(`playback not stuck anymore @${currentTime}`);
            }
            if(expectedPlaying && bufferInfo.len <= jumpThreshold) {
                if(playheadMoving) {
                    jumpThreshold = 0;
                    _this.seekHoleNudgeDuration = 0;
                } else {
                    if(!_this.stalled) {
                        _this.seekHoleNudgeDuration = 0;
                        Logger.log(`playback seems stuck @${currentTime}`);
                        _this._e.fire(HLSEvent.ERROR, {type: ErrorTypes.MEDIA_ERROR, details: ErrorDetails.BUFFER_STALLED_ERROR, fatal: false});
                        _this.stalled = true;
                    } else {
                        _this.seekHoleNudgeDuration += hlsConfig.seekHoleNudgeDuration;
                    }
                }
                if(bufferInfo.len <= jumpThreshold) {
                    let nextBufferStart = bufferInfo.nextStart, 
                        delta = nextBufferStart-currentTime;
                    if(nextBufferStart &&
                        (delta < hlsConfig.maxSeekHole) &&
                        (delta > 0)  &&
                        !media.seeking) {
                        Logger.log(`adjust currentTime from ${media.currentTime} to next buffered @ ${nextBufferStart} + nudge ${_this.seekHoleNudgeDuration}`);
                        media.currentTime = nextBufferStart + _this.seekHoleNudgeDuration;
                        _this._e.fire(HLSEvent.ERROR, {type: ErrorTypes.MEDIA_ERROR, details: ErrorDetails.BUFFER_SEEK_OVER_HOLE, fatal: false});
                    }
                }
            } else {
                if (targetSeekPosition && media.currentTime !== targetSeekPosition) {
                    Logger.log(`adjust currentTime from ${media.currentTime} to ${targetSeekPosition}`);
                    media.currentTime = targetSeekPosition;
                }
            }
        }
    }
}

function _checkFragmentChanged() {
    let rangeCurrent, 
        currentTime, 
        video = _this.media;
    if (video && video.seeking === false) {
        currentTime = video.currentTime;
        if(currentTime > video.playbackRate*_this.lastCurrentTime) {
            _this.lastCurrentTime = currentTime;
        }
        if (_this.isBuffered(currentTime)) {
            rangeCurrent = _this.getBufferRange(currentTime);
        } else if (_this.isBuffered(currentTime + 0.1)) {
            rangeCurrent = _this.getBufferRange(currentTime + 0.1);
        }
        if (rangeCurrent) {
            var fragPlaying = rangeCurrent.frag;
            if (fragPlaying !== _this.fragPlaying) {
                _this.fragPlaying = fragPlaying;
                //_this._e.fire(HLSEvent.FRAG_CHANGED, {frag: fragPlaying});
            }
        }
    }
}

function _timeRangesToString(r) {
    var log = '', len = r.length;
    for (var i=0; i<len; i++) {
        log += '[' + r.start(i) + ',' + r.end(i) + ']';
    }
    return log;
}
export default Stream;