/**
 * Created by Cray on 2016/5/6.
 */

import EventDispatcher from '../../events/event-dispatcher';
import HLSEvent from '../hls-event';
import Logger from '../../utils/log';
import Ticker from '../../utils/ticker';
import {ErrorTypes, ErrorDetails} from '../errors';
import hlsConfig from '../hls-config';

let _this = null;

class Buffer extends EventDispatcher {
    constructor(hls) {
        super();

        this.hls = hls;
        this._e = this.hls._e;

        this._e.on(HLSEvent.BUFFER_CODECS, _onBufferCodes);
        this._e.on(HLSEvent.BUFFER_APPENDING, _onBufferAppending);
        this._e.on(HLSEvent.BUFFER_EOS, _onBufferEos);
        this._e.on(HLSEvent.BUFFER_FLUSHING, _onBufferFlushing);

        this.mediaSource = null;
        this.media = null;
        this.mimeCodecs = null;
        this.sourceBuffer = {};

        this.flushRange = [];
        this.appended = 0;

        _this = this;
    }

    connectMedia(media) {
        this.media = media || this.hls.media;
        this.mediaSource = new MediaSource();

        this.mediaSource.addEventListener('sourceopen', _onMediaSourceOpen);
        this.mediaSource.addEventListener('sourceended', _onMediaSourceEnded);
        this.mediaSource.addEventListener('sourceclose', _onMediaSourceClose);
        this.media.src = URL.createObjectURL(this.mediaSource);
    }

    reset() {
        let sourceBuffer = this.sourceBuffer;
        for (let type in sourceBuffer) {
            let sbuffer = sourceBuffer[type];
            try {
                this.mediaSource.removeSourceBuffer(sbuffer);
                sbuffer.removeEventListener('updateend', _onBufferUpdateEnd);
                sbuffer.removeEventListener('error', _onBufferUpdateError);
            } catch (err) {
            }
        }
        this.sourceBuffer = {};
        this.flushRange = [];
        this.appended = 0;
    }

    dispose() {
        super.dispose();
        let ms = this.mediaSource;
        if (ms) {
            if (ms.readyState === 'open') {
                try {
                    ms.endOfStream();
                } catch (e) {
                    Logger.warn(`dispose :${e.message} while calling endOfStream`);
                }
            }
            ms.removeEventListener('sourceopen', _onMediaSourceOpen);
            ms.removeEventListener('sourceended', _onMediaSourceEnded);
            ms.removeEventListener('sourceclose', _onMediaSourceClose);

            this.media.src = '';
            this.media.removeAttribute('src');
            this.mediaSource = null;
            this.media = null;
            this.mimeCodecs = null;
            this.sourceBuffer = {};
        }
    }
}

function _onMediaSourceOpen() {
    Logger.log('media source opened');

    _this._e.fire(HLSEvent.MEDIA_SOURCE_OPEN, {media: _this.media});

    _this.mediaSource.removeEventListener('sourceopen', _onMediaSourceOpen);
    let mimeCodecs = _this.mimeCodecs;
    if (mimeCodecs) {
        _this.startupBuffer(mimeCodecs);
        _this.mimeCodecs = null;
        _this.doAppending();
    }
}

function _onMediaSourceEnded() {
    Logger.log('media source ended');
}

function _onMediaSourceClose() {
    Logger.log('media source closed');
}

function _onBufferUpdateEnd() {

    if (_this._needsFlush) {
        _doFlush();
    }

    if (_this._needsEos) {
        _this.bufferEos();
    }

    _this._e.fire(HLSEvent.BUFFER_APPENDED);
    _doAppending();
}

function _onBufferUpdateError(event) {
    Logger.error(`sourceBuffer error:${event}`);
    _this._e.fire(HLSEvent.ERROR, {
        type: ErrorTypes.MEDIA_ERROR,
        details: ErrorDetails.BUFFER_APPENDING_ERROR,
        fatal: false
    });
}

function _onBufferCodes(mimeCodecs) {
    let sbuffer,
        mkey,
        mimeCodec,
        codec,
        mimeType;

    if (!_this.media) {
        _this.mimeCodecs = mimeCodecs;
        return;
    }

    var sourceBuffer = _this.sourceBuffer, mediaSource = _this.mediaSource;

    for (mkey in mimeCodecs) {
        if (!sourceBuffer[mkey]) {
            mimeCodec = mimeCodecs[mkey];
            codec = mimeCodec.levelCodec || mimeCodec.codec;
            mimeType = `${mimeCodec.container};codecs=${codec}`;
            Logger.log(`creating sourceBuffer with mimeType:${mimeType}`);
            try {
                sbuffer = sourceBuffer[mkey] = mediaSource.addSourceBuffer(mimeType);
                sbuffer.addEventListener('updateend', _onBufferUpdateEnd);
                sbuffer.addEventListener('error', _onBufferUpdateError);
            } catch (e) {
                Logger.error(`error while trying to add sourceBuffer:${e.message}`);
                _this._e.fire(HLSEvent.ERROR, {
                    type: ErrorTypes.MEDIA_ERROR,
                    details: ErrorDetails.BUFFER_ADD_CODEC_ERROR,
                    fatal: false,
                    err: e,
                    mimeType: mimeType
                });
            }
        }
    }
}

function _onBufferAppending(data) {
    if (!_this.segments) {
        _this.segments = [data];
    } else {
        _this.segments.push(data);
    }
    _doAppending();
}

function _onBufferAppendFail(data) {
    Logger.error(`sourceBuffer error:${data.event}`);
    _this._e.fire(HLSEvent.ERROR, {
        type: ErrorTypes.MEDIA_ERROR,
        details: ErrorDetails.BUFFER_APPENDING_ERROR,
        fatal: false,
        frag: _this.fragCurrent
    });
}

function _onBufferEos() {
    let sbuffer = _this.sourceBuffer, mediaSource = _this.mediaSource;
    if (!mediaSource || mediaSource.readyState !== 'open') {
        return;
    }
    if (!((sbuffer.audio && sbuffer.audio.updating) || (sbuffer.video && sbuffer.video.updating))) {
        Logger.log('all media data available, signal endOfStream() to MediaSource and stop loading fragment');
        mediaSource.endOfStream();
        _this._needsEos = false;
    } else {
        _this._needsEos = true;
    }
}

function _onBufferFlushing(data) {
    _this.flushRange.push({start: data.startOffset, end: data.endOffset});
    _this.flushBufferCounter = 0;
    _doFlush();
}

function _doAppending() {
    if (_this.sourceBuffer) {
        if (_this.media.error) {
            _this.segments = [];
            Logger.error('trying to append although a media error occured, flush segment and abort');
            return;
        }
        for (let type in _this.sourceBuffer) {
            if (_this.sourceBuffer[type].updating) {
                return;
            }
        }
        if (_this.segments.length) {
            let segment = _this.segments.shift();
            try {
                if (_this.sourceBuffer[segment.type]) {
                    _this.sourceBuffer[segment.type].appendBuffer(segment.data);
                    _this.appendError = 0;
                    _this.appended++;
                } else {
                    _onBufferUpdateEnd();
                }
            } catch (e) {
                Logger.error(`error while trying to append buffer:${e.message}`);
                _this.segments.unshift(segment);
                let event = {type: ErrorTypes.MEDIA_ERROR};
                if (err.code !== 22) {
                    if (_this.appendError) {
                        _this.appendError++;
                    } else {
                        _this.appendError = 1;
                    }
                    event.details = ErrorDetails.BUFFER_APPEND_ERROR;
                    event.frag = _this.fragCurrent;

                    if (_this.appendError > hlsConfig.appendErrorMaxRetry) {
                        Logger.log(`fail ${hlsConfig.appendErrorMaxRetry} times to append segment in sourceBuffer`);
                        _this.segments = [];
                        event.fatal = true;
                        _this._e.fire(HLSEvent.ERROR, event);
                    } else {
                        event.fatal = false;
                        _this._e.fire(HLSEvent.ERROR, event);
                    }
                } else {
                    _this.segments = [];
                    event.details = ErrorDetails.BUFFER_FULL_ERROR;
                    _this._e.fire(HLSEvent.ERROR, event);
                }
            }
        }
    }
}

function _doFlush() {
    while (_this.flushRange.length) {
        let range = _this.flushRange[0];
        if (_flushBuffer(range.start, range.end)) {
            _this.flushRange.shift();
            _this.flushBufferCounter = 0;
        } else {
            _this._needsFlush = true;
            return;
        }
    }
    if (_this.flushRange.length === 0) {
        _this._needsFlush = false;

        let appended = 0;
        let sourceBuffer = _this.sourceBuffer;
        for (let type in sourceBuffer) {
            appended += sourceBuffer[type].buffered.length;
        }
        _this.appended = appended;
        _this._e.fire(HLSEvent.BUFFER_FLUSHED);
    }
}

function _flushBuffer(startOffset, endOffset) {
    let sbuffer,
        i,
        bufStart,
        bufEnd,
        flushStart,
        flushEnd;

    if (_this.flushBufferCounter < _this.appended && _this.sourceBuffer) {
        for (let type in _this.sourceBuffer) {
            sbuffer = _this.sourceBuffer[type];
            if (!sbuffer.updating) {
                for (i = 0; i < sbuffer.buffered.length; i++) {
                    bufStart = sbuffer.buffered.start(i);
                    bufEnd = sbuffer.buffered.end(i);
                    if (navigator.userAgent.toLowerCase().indexOf('firefox') !== -1 && endOffset === Number.POSITIVE_INFINITY) {
                        flushStart = startOffset;
                        flushEnd = endOffset;
                    } else {
                        flushStart = Math.max(bufStart, startOffset);
                        flushEnd = Math.min(bufEnd, endOffset);
                    }
                    if (Math.min(flushEnd, bufEnd) - flushStart > 0.5) {
                        _this.flushBufferCounter++;
                        Logger.log(`flush ${type} [${flushStart},${flushEnd}], of [${bufStart},${bufEnd}], pos:${_this.media.currentTime}`);
                        sbuffer.remove(flushStart, flushEnd);
                        return false;
                    }
                }
            } else {
                //sbuffer.abort();
                Logger.warn('cannot flush, sbuffer updating in progress');
                return false;
            }
        }
    } else {
        Logger.warn('abort flushing too many retries');
    }
    Logger.log('buffer flushed');
    return true;
}

export default Buffer;


