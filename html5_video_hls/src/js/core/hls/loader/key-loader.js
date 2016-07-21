/**
 * Created by Cray on 2016/5/10.
 */
import EventDispatcher from '../../events/event-dispatcher';
import HLSEvent from '../hls-event';
import {ErrorTypes, ErrorDetails} from '../errors';
import hlsConfig from '../hls-config';
import XHRLoader from '../../net/xhr-loader';

var _this = null,
    _xhrLoader = null;

class KeyLoader extends EventDispatcher {

    constructor() {
        super();
        this.frag = null;
        _this = this;
    }

    loadKey(data) {
        let frag = this.frag = data.frag,
            decryptdata = frag.decryptdata,
            uri = decryptdata.uri;
        let retry = hlsConfig.fragLoadingMaxRetry,
            timeout = hlsConfig.fragLoadingTimeOut,
            retryDelay = hlsConfig.fragLoadingRetryDelay;

        if (uri !== this.decrypturl || this.decryptkey === null) {
            this.decrypturl = uri;
            this.decryptkey = null;
            _xhrLoader = new XHRLoader();
            _xhrLoader.load(uri, 'arraybuffer', _loadSuccess, _loadError, _loadTimeout, timeout, retry, retryDelay, null , frag);

        } else if (this.decryptkey) {
            decryptdata.key = this.decryptkey;
            this.fire(HLSEvent.KEY_LOADED, {frag: frag});
        }
    }

    dispose() {
        if (_xhrLoader) {
            _xhrLoader.dispose();
            _xhrLoader = null;
        }
    }

}

function _loadSuccess(event) {
    _this.decryptkey = _this.frag.decryptdata.key = new Uint8Array(event.currentTarget.response);
    _this.frag.loader = undefined;
    _this.fire(HLSEvent.KEY_LOADED, {frag: _this.frag});
}

function _loadError(event) {
    if (_xhrLoader) {
        _xhrLoader.abort();
    }
    _this.fire(HLSEvent.ERROR, {type: ErrorTypes.NETWORK_ERROR, details: ErrorDetails.KEY_LOAD_ERROR, fatal: false, frag: this.frag, response: event});
}

function _loadTimeout() {
    if (_xhrLoader) {
        _xhrLoader.abort();
    }
    _this.fire(HLSEvent.ERROR, {type: ErrorTypes.NETWORK_ERROR, details: ErrorDetails.KEY_LOAD_TIMEOUT, fatal: false, frag: this.frag});
}

export default KeyLoader;
