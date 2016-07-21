/**
 * Created by Cray on 2016/5/4.
 */

import Logger from '../utils/log';
import EventDispatcher from '../events/event-dispatcher';
import Ticker from '../utils/ticker';

var _xhrLoader = null;

class XHRLoader extends EventDispatcher {

    constructor() {
        super();
        _xhrLoader = this;
    }

    load(url, responseType, onSuccess, onError, onTimeout, timeout, maxRetry, retryDelay, onProgress = null, frag = null) {
        this.url = url;
        if (frag && !isNaN(frag.byteRangeStartOffset) && !isNaN(frag.byteRangeEndOffset)) {
            this.byteRange = frag.byteRangeStartOffset + '-' + (frag.byteRangeEndOffset - 1);
        }
        this.responseType = responseType;
        this.onSuccess = onSuccess;
        this.onProgress = onProgress;
        this.onTimeout = onTimeout;
        this.onError = onError;
        this.stats = {trequest: performance.now(), retry: 0};
        this.timeout = timeout;
        this.maxRetry = maxRetry;
        this.retryDelay = retryDelay;
        this.loader = null;

        _loadInternal();
    }

    dispose() {
        super.dispose();
        this.abort();
        this.loader = null;
    }

    abort() {
        if (this.loader && this.loader.readyState !== 4) {
            this.stats.aborted = true;
            this.loader.abort();
        }

        Ticker.stop(this.loadtimeout);
    }
}

function _loadInternal() {
    let xhr = _xhrLoader.loader = new XMLHttpRequest();

    xhr.onloadend = _loadend;
    xhr.onprogress = _loadprogress;

    xhr.open('GET', _xhrLoader.url, true);
    if (_xhrLoader.byteRange) {
        xhr.setRequestHeader('Range', 'bytes=' + _xhrLoader.byteRange);
    }

    xhr.responseType = _xhrLoader.responseType;

    _xhrLoader.stats.tfirst = null;
    _xhrLoader.stats.loaded = 0;

    if(_xhrLoader.timeout){
        Ticker.tick(_xhrLoader.timeout, _loadtimeout);
    }

    xhr.send();
}

function _loadend(event) {
    let xhr = event.currentTarget,
        status = xhr.status,
        stats = _xhrLoader.stats;

    if (!stats.aborted) {
        if (status >= 200 && status < 300) {
            //window.clearTimeout(this.timeoutHandle);
            Ticker.stop(_loadtimeout);

            stats.tload = performance.now();
            _xhrLoader.onSuccess(event, stats);

        } else {
            if (stats.retry < _xhrLoader.maxRetry) {
                Logger.warn(`${status} while loading ${_xhrLoader.url}, retrying in ${_xhrLoader.retryDelay}...`);

                _xhrLoader.dispose();
                Ticker.tick(_xhrLoader.retryDelay, _loadInternal);

                _xhrLoader.retryDelay = Math.min(2 * _xhrLoader.retryDelay, 64000);
                stats.retry++;
            } else {

                Ticker.stop(_loadtimeout);
                Logger.error(`${status} while loading ${_xhrLoader.url}`);
                _xhrLoader.onError(event);
            }
        }
    }
}

function _loadtimeout(event) {
    Logger.warn(`timeout while loading ${_xhrLoader.url}`);
    _xhrLoader.onTimeout(event, _xhrLoader.stats);
}

function _loadprogress(event) {
    let stats = _xhrLoader.stats;
    if (stats.tfirst === null) {
        stats.tfirst = performance.now();
    }
    stats.loaded = event.loaded;
    if (event.lengthComputable) {
        stats.total = event.total;
    }
    if (_xhrLoader.onProgress) {
        _xhrLoader.onProgress(stats);
    }
}

export default XHRLoader;