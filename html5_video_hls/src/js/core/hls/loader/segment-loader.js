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

class SegmentLoader extends EventDispatcher {

  constructor() {
    super();

    this.frag = null;
    _this = this;
  }

  fragLoad(data) {
    let frag = this.frag = data.frag;
    this.frag.loaded = 0;
    _xhrLoader = new XHRLoader();
    _xhrLoader.load(frag.url, 'arraybuffer', _loadSuccess, _loadError, _loadTimeout, hlsConfig.fragLoadingTimeOut, 1, 0, _loadProgress, frag);
  }

  dispose() {
    if (_xhrLoader) {
      _xhrLoader.dispose();
      _xhrLoader = null;
    }
  }
}

function _loadSuccess(event, stats) {
  let payload = event.currentTarget.response;
  stats.length = payload.byteLength;
  _this.frag.loader = undefined;
  _this.fire(HLSEvent.SEG_LOADED, {payload: payload, frag: _this.frag, stats: stats});
}

function _loadError(event) {
  if (_xhrLoader) {
    _xhrLoader.abort();
  }
  _this.fire(HLSEvent.ERROR, {type: ErrorTypes.NETWORK_ERROR, details: ErrorDetails.FRAG_LOAD_ERROR, fatal: false, frag: _this.frag, response: event});
}

function _loadTimeout() {
  if (_xhrLoader) {
    _xhrLoader.abort();
  }
  _this.fire(HLSEvent.ERROR, {type: ErrorTypes.NETWORK_ERROR, details: ErrorDetails.FRAG_LOAD_TIMEOUT, fatal: false, frag: _this.frag});
}

function _loadProgress(stats) {
  _this.frag.loaded = stats.loaded;
  _this.fire(HLSEvent.SEG_LOAD_PROGRESS, {frag: _this.frag, stats: stats});
}

export default SegmentLoader;
