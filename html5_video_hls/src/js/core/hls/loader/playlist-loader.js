/**
 * Created by Cray on 2016/5/4.
 */
import EventDispatcher from '../../events/event-dispatcher';
import hlsConfig from '../hls-config';
import XHRLoader from '../../net/xhr-loader';
import {ErrorTypes, ErrorDetails} from '../errors';
import HLSEvent from '../hls-event';
import EventManager from '../../utils/event-builder';
import AttrList from '../../utils/attr-list';
import URLUtils from '../../utils/url';
import Utils from '../../utils/utils';
import Logger from '../../utils/log';

var _this = null,
    _xhrLoader = null,
    _url, _id, _level;

class PlaylistLoader extends EventDispatcher {
    constructor(){
        super();
        _this = this;
    }

    loadMainfestFile(url) {
        _load(url);
    }

    loadLevelFile(data) {
        _load(data.url, data.level, data.id);
    }
    
    dispose() {
        super.dispose();
        if (_xhrLoader) {
            _xhrLoader.dispose();
            _xhrLoader = null;
        }
        _url = _level = _id = null;
    }
}

function _dispatcher(type, data){
    Logger.log(`[PLoader] type: ${type}`, data);
    _this.fire(type, data);
}

function _load(url, level = null, id = null) {
    let retry,
        timeout,
        retryDelay;

    _url = url;
    _level = level;
    _id = id;

    if(level) {
        retry = hlsConfig.levelLoadingMaxRetry;
        timeout = hlsConfig.levelLoadingTimeOut;
        retryDelay = hlsConfig.levelLoadingRetryDelay;
    } else {
        retry = hlsConfig.manifestLoadingMaxRetry;
        timeout = hlsConfig.manifestLoadingTimeOut;
        retryDelay = hlsConfig.manifestLoadingRetryDelay;
    }
    _xhrLoader = new XHRLoader();
    _xhrLoader.load(_url, '', _loadSuccess, _loadError, _loadTimeout, timeout, retry, retryDelay);
}

function _loadSuccess(event, stats) {
    let target = event.currentTarget,
        result = target.responseText,
        url = target.responseURL,
        levels;
    if (url === undefined || url.indexOf('data:') === 0) {
        url = _url;
    }

    stats.tload = performance.now();
    stats.mtime = new Date(target.getResponseHeader('Last-Modified'));

    if (result.indexOf('#EXTM3U') === 0) {
        if (result.indexOf('#EXTINF:') > 0) {
            let levelDetails = _parseLevelPlaylist(result, url);
            stats.tparsed = performance.now();
            if (_level === null) {
                _dispatcher(HLSEvent.MANIFEST_LOADED, {levels: [{details: levelDetails, url: url, level: 0, id: 0, stats: stats}]});
            } else {
                _dispatcher(HLSEvent.LEVEL_LOADED, {details: levelDetails, level: _level, id: _id, stats: stats});
            }
        } else {
            levels = _parseMasterPlaylist(result, url);
            if (levels.length) {
                _dispatcher(HLSEvent.MANIFEST_LOADED, {levels: levels, url: url, stats: stats});
            } else {
                _dispatcher(HLSEvent.ERROR, {type: ErrorTypes.NETWORK_ERROR, details: ErrorDetails.MANIFEST_PARSING_ERROR, fatal: true, url: url, reason: 'no level found in manifest'}, true);
            }
        }
    } else {
        _dispatcher(HLSEvent.ERROR, {type: ErrorTypes.NETWORK_ERROR, details: ErrorDetails.MANIFEST_PARSING_ERROR, fatal: true, url: url, reason: 'no EXTM3U delimiter'}, true);
    }
}

function _loadError(event) {
    let details, fatal;
    //details = _level === null ? ErrorDetails.MANIFEST_LOAD_ERROR : ErrorDetails.LEVEL_LOAD_ERROR;
    if (_level === null) {
        details = ErrorDetails.MANIFEST_LOAD_ERROR;
        fatal = true;
    } else {
        details = ErrorDetails.LEVEL_LOAD_ERROR;
        fatal = false;
    }
    if (_xhrLoader) {
        _xhrLoader.abort();
    }
    _dispatcher(HLSEvent.ERROR, {type: ErrorTypes.NETWORK_ERROR, details: details, fatal: fatal, url: _url, response: event.currentTarget, level: _level, id: _id}, true);
}

function _loadTimeout() {
    let details, fatal;
    //details = _level === null ? ErrorDetails.MANIFEST_LOAD_ERROR : ErrorDetails.LEVEL_LOAD_ERROR;
    if (_level === null) {
        details = ErrorDetails.MANIFEST_LOAD_TIMEOUT;
        fatal = true;
    } else {
        details = ErrorDetails.LEVEL_LOAD_TIMEOUT;
        fatal = false;
    }
    if (_xhrLoader) {
        _xhrLoader.abort();
    }
    _dispatcher(HLSEvent.ERROR, {type: ErrorTypes.NETWORK_ERROR, details: details, fatal: fatal, url: _url, level: _level, id: _id}, true);
}


function _parseMasterPlaylist(value, baseurl) {
    let levels = [], result;

    const re = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g;
    while ((result = re.exec(value)) != null){
        const level = {};

        let attrs = level.attrs = new AttrList(result[1]);
        level.url = _resolve(result[2], baseurl);

        let resolution = attrs.decimalResolution('RESOLUTION');
        if(resolution) {
            level.width = resolution.width;
            level.height = resolution.height;
        }
        level.bitrate = attrs.decimalInteger('AVERAGE-BANDWIDTH') || attrs.decimalInteger('BANDWIDTH');
        level.name = attrs.NAME;

        let codecs = attrs.CODECS;
        if(codecs) {
            codecs = codecs.split(',');
            for (let i = 0; i < codecs.length; i++) {
                let codec = codecs[i];
                if (codec.indexOf('avc1') !== -1) {
                    level.videoCodec = _avc1toavcoti(codec);
                } else {
                    level.audioCodec = codec;
                }
            }
        }

        levels.push(level);
    }
    return levels;
}

function _parseLevelPlaylist(value, baseurl) {
    let currentSN = 0,
        totalduration = 0,
        levelDetails = {url: baseurl, fragments: [], live: true, startSN: 0},
        levelkey = {method : null, key : null, iv : null, uri : null},
        cc = 0,
        programDateTime = null,
        frag = null,
        result,
        regexp,
        byteRangeEndOffset,
        byteRangeStartOffset;

    regexp = /(?:#EXT-X-(MEDIA-SEQUENCE):(\d+))|(?:#EXT-X-(TARGETDURATION):(\d+))|(?:#EXT-X-(KEY):(.*))|(?:#EXT(INF):([\d\.]+)[^\r\n]*([\r\n]+[^#|\r\n]+)?)|(?:#EXT-X-(BYTERANGE):([\d]+[@[\d]*)]*[\r\n]+([^#|\r\n]+)?|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(PROGRAM-DATE-TIME):(.*))/g;
    while ((result = regexp.exec(value)) !== null) {
        result.shift();
        result = result.filter(function (n) {
            return (n !== undefined);
        });
        switch (result[0]) {
            case 'MEDIA-SEQUENCE':
                currentSN = levelDetails.startSN = parseInt(result[1]);
                break;
            case 'TARGETDURATION':
                levelDetails.targetduration = parseFloat(result[1]);
                break;
            case 'ENDLIST':
                levelDetails.live = false;
                break;
            case 'DIS':
                cc++;
                break;
            case 'BYTERANGE':
                let params = result[1].split('@');
                if (params.length === 1) {
                    byteRangeStartOffset = byteRangeEndOffset;
                } else {
                    byteRangeStartOffset = parseInt(params[1]);
                }
                byteRangeEndOffset = parseInt(params[0]) + byteRangeStartOffset;
                if (frag && !frag.url) {
                    frag.byteRangeStartOffset = byteRangeStartOffset;
                    frag.byteRangeEndOffset = byteRangeEndOffset;
                    frag.url = _resolve(result[2], baseurl);
                }
                break;
            case 'INF':
                var duration = parseFloat(result[1]);
                if (!isNaN(duration)) {
                    let fragdecryptdata,
                        sn = currentSN++;
                    if (levelkey.method && levelkey.uri && !levelkey.iv) {
                        fragdecryptdata = Utils.copy(levelkey);
                        let uint8View = new Uint8Array(16);
                        for (let i = 12; i < 16; i++) {
                            uint8View[i] = (sn >> 8 * (15 - i)) & 0xff;
                        }
                        fragdecryptdata.iv = uint8View;
                    } else {
                        fragdecryptdata = levelkey;
                    }
                    let url = result[2] ? _resolve(result[2], baseurl) : null;
                    frag = {
                        url: url,
                        duration: duration,
                        start: totalduration,
                        sn: sn,
                        level: _level,
                        cc: cc,
                        byteRangeStartOffset: byteRangeStartOffset,
                        byteRangeEndOffset: byteRangeEndOffset,
                        decryptdata: fragdecryptdata,
                        programDateTime: programDateTime
                    };
                    levelDetails.fragments.push(frag);
                    totalduration += duration;
                    byteRangeStartOffset = null;
                    programDateTime = null;
                }
                break;
            case 'KEY':
                let decryptparams = result[1];
                let keyAttrs = new AttrList(decryptparams);
                let decryptmethod = keyAttrs.enumeratedString('METHOD'),
                    decrypturi = keyAttrs.URI,
                    decryptiv = keyAttrs.hexadecimalInteger('IV');
                if (decryptmethod) {
                    levelkey = {method: null, key: null, iv: null, uri: null};
                    if ((decrypturi) && (decryptmethod === 'AES-128')) {
                        levelkey.method = decryptmethod;
                        levelkey.uri = _resolve(decrypturi, baseurl);
                        levelkey.key = null;
                        levelkey.iv = decryptiv;
                    }
                }
                break;
            case 'PROGRAM-DATE-TIME':
                programDateTime = new Date(Date.parse(result[1]));
                break;
            default:
                break;
        }
    }

    if (frag && !frag.url) {
        levelDetails.fragments.pop();
        totalduration -= frag.duration;
    }
    levelDetails.totalduration = totalduration;
    levelDetails.averagetargetduration = totalduration / levelDetails.fragments.length;
    levelDetails.endSN = currentSN - 1;
    return levelDetails;
}

function _resolve(url, baseUrl) {
    return URLUtils.getURL(baseUrl, url);
}

function _avc1toavcoti(codec) {
    let result, avcdata = codec.split('.');
    if (avcdata.length > 2) {
        result = avcdata.shift() + '.';
        result += parseInt(avcdata.shift()).toString(16);
        result += ('000' + parseInt(avcdata.shift()).toString(16)).substr(-4);
    } else {
        result = codec;
    }
    return result;
}

export default PlaylistLoader;