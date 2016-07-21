/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(32);
	__webpack_require__(36);
	__webpack_require__(3);
	__webpack_require__(6);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(5);
	__webpack_require__(2);
	__webpack_require__(44);
	__webpack_require__(25);
	__webpack_require__(39);
	__webpack_require__(41);
	__webpack_require__(37);
	__webpack_require__(33);
	__webpack_require__(46);
	__webpack_require__(30);
	__webpack_require__(47);
	__webpack_require__(22);
	__webpack_require__(35);
	__webpack_require__(29);
	__webpack_require__(23);
	__webpack_require__(8);
	__webpack_require__(34);
	__webpack_require__(45);
	__webpack_require__(9);
	__webpack_require__(31);
	__webpack_require__(7);
	__webpack_require__(16);
	__webpack_require__(15);
	__webpack_require__(14);
	__webpack_require__(18);
	__webpack_require__(13);
	__webpack_require__(19);
	__webpack_require__(17);
	__webpack_require__(24);
	__webpack_require__(28);
	__webpack_require__(26);
	__webpack_require__(4);
	__webpack_require__(27);
	__webpack_require__(12);
	__webpack_require__(21);
	__webpack_require__(20);
	__webpack_require__(38);
	__webpack_require__(43);
	__webpack_require__(40);
	module.exports = __webpack_require__(42);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _hls = __webpack_require__(2);

	var _hls2 = _interopRequireDefault(_hls);

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	var _dom = __webpack_require__(35);

	var _dom2 = _interopRequireDefault(_dom);

	var _sprite = __webpack_require__(36);

	var _sprite2 = _interopRequireDefault(_sprite);

	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	var _player = __webpack_require__(37);

	var _player2 = _interopRequireDefault(_player);

	var _playerConfig = __webpack_require__(39);

	var _playerConfig2 = _interopRequireDefault(_playerConfig);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Cray on 2016/5/10.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var FlexVideo = function (_Sprite) {
	    _inherits(FlexVideo, _Sprite);

	    _createClass(FlexVideo, null, [{
	        key: 'version',
	        get: function get() {
	            return 'fv 0.1';
	        }
	    }, {
	        key: 'defaultConfig',
	        get: function get() {
	            return {
	                debug: true,
	                containerId: '',
	                videoId: '',
	                ad: true,
	                autoPlay: true,
	                poster: "../testData/playboy.jpg",
	                cover: "../testData/cover.png",
	                skin: "assets/sprite.svg",
	                def: 1,
	                menu: false,
	                volume: 6,
	                title: "Video demo",
	                ctrlHTML: null,
	                tooltips: true
	            };
	        }
	    }]);

	    function FlexVideo(options) {
	        _classCallCheck(this, FlexVideo);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FlexVideo).call(this));

	        _log2.default.log('[FV] main startup');
	        var config = void 0;
	        if (typeof options != 'string') {
	            config = _utils2.default.merge(FlexVideo.defaultConfig, options);
	        } else {
	            config = _utils2.default.merge(FlexVideo.defaultConfig, { videoId: options });
	        }

	        for (var key in config) {
	            _playerConfig2.default[key] = config[key];
	        }

	        if (!_this.supported.basic) {
	            var _ret;

	            _log2.default.warn('[Main] the browser does not support.');
	            return _ret = false, _possibleConstructorReturn(_this, _ret);
	        }

	        var videoId = _playerConfig2.default.videoId;

	        _log2.default.log('[FV] start, video id ' + videoId);
	        var media = _dom2.default.getElementById(videoId);
	        if (media) {
	            var url = media.getAttribute('hls') || media.getAttribute('src');
	            if (url.indexOf('m3u8') > 0 && _hls2.default.isSupported()) {
	                _log2.default.log('[FV] start m3u8');

	                media.setAttribute('hls', url);
	                _this.hls = new _hls2.default();
	                _this.hls.startup(url, media);
	            } else {
	                _log2.default.log('[FV] start player');
	                _this.player = new _player2.default();
	                _this.player.startup(media);
	            }
	        } else {
	            _log2.default.warn('[FV] not found video ');
	        }
	        return _this;
	    }

	    return FlexVideo;
	}(_sprite2.default);

	window.FlexVideo = FlexVideo;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _eventDispatcher = __webpack_require__(3);

	var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

	var _buffer = __webpack_require__(4);

	var _buffer2 = _interopRequireDefault(_buffer);

	var _stream = __webpack_require__(12);

	var _stream2 = _interopRequireDefault(_stream);

	var _playlist = __webpack_require__(27);

	var _playlist2 = _interopRequireDefault(_playlist);

	var _hlsEvent = __webpack_require__(5);

	var _hlsEvent2 = _interopRequireDefault(_hlsEvent);

	var _hlsConfig = __webpack_require__(11);

	var _hlsConfig2 = _interopRequireDefault(_hlsConfig);

	var _context = __webpack_require__(32);

	var _context2 = _interopRequireDefault(_context);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Cray on 2016/4/28.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Hls = function (_EventDispatcher) {
	    _inherits(Hls, _EventDispatcher);

	    _createClass(Hls, null, [{
	        key: 'isSupported',
	        value: function isSupported() {
	            return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
	        }
	    }]);

	    function Hls() {
	        _classCallCheck(this, Hls);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Hls).call(this));

	        _this._e = _context2.default.e;

	        _this.buffer = new _buffer2.default(_this);
	        _this.stream = new _stream2.default(_this);
	        _this.playList = new _playlist2.default(_this);
	        return _this;
	    }

	    _createClass(Hls, [{
	        key: 'startup',
	        value: function startup(url, media) {
	            this.url = url;
	            this.media = media;
	            this.playList.src(url);
	        }
	    }]);

	    return Hls;
	}(_eventDispatcher2.default);

	exports.default = Hls;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Cray on 2016/4/29.
	 */

	var EventDispatcher = function () {
	    function EventDispatcher() {
	        _classCallCheck(this, EventDispatcher);

	        this.listeners = {};
	    }

	    _createClass(EventDispatcher, [{
	        key: "on",
	        value: function on(type, listener) {
	            if (!this.listeners[type]) {
	                this.listeners[type] = [];
	            }
	            this.listeners[type].push(listener);
	        }
	    }, {
	        key: "off",
	        value: function off(type, listener) {
	            var index = void 0;

	            if (!this.listeners[type]) {
	                return false;
	            }
	            index = this.listeners[type].indexOf(listener);
	            this.listeners[type].splice(index, 1);
	            return index > -1;
	        }
	    }, {
	        key: "fire",
	        value: function fire(type) {
	            var callbacks = void 0;var i = void 0;
	            var length = void 0;
	            var args = void 0;

	            callbacks = this.listeners[type];
	            if (!callbacks) {
	                return;
	            }
	            if (arguments.length === 2) {
	                length = callbacks.length;
	                for (i = 0; i < length; ++i) {
	                    callbacks[i].call(this, arguments[1]);
	                }
	            } else {
	                args = Array.prototype.slice.call(arguments, 1);
	                length = callbacks.length;
	                for (i = 0; i < length; ++i) {
	                    callbacks[i].apply(this, args);
	                }
	            }
	        }
	    }, {
	        key: "dispose",
	        value: function dispose() {
	            this.listeners = {};
	        }
	    }]);

	    return EventDispatcher;
	}();

	exports.default = EventDispatcher;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _eventDispatcher = __webpack_require__(3);

	var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

	var _hlsEvent = __webpack_require__(5);

	var _hlsEvent2 = _interopRequireDefault(_hlsEvent);

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	var _ticker = __webpack_require__(9);

	var _ticker2 = _interopRequireDefault(_ticker);

	var _errors = __webpack_require__(10);

	var _hlsConfig = __webpack_require__(11);

	var _hlsConfig2 = _interopRequireDefault(_hlsConfig);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Cray on 2016/5/6.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var _this = null;

	var Buffer = function (_EventDispatcher) {
	    _inherits(Buffer, _EventDispatcher);

	    function Buffer(hls) {
	        _classCallCheck(this, Buffer);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Buffer).call(this));

	        _this2.hls = hls;
	        _this2._e = _this2.hls._e;

	        _this2._e.on(_hlsEvent2.default.BUFFER_CODECS, _onBufferCodes);
	        _this2._e.on(_hlsEvent2.default.BUFFER_APPENDING, _onBufferAppending);
	        _this2._e.on(_hlsEvent2.default.BUFFER_EOS, _onBufferEos);
	        _this2._e.on(_hlsEvent2.default.BUFFER_FLUSHING, _onBufferFlushing);

	        _this2.mediaSource = null;
	        _this2.media = null;
	        _this2.mimeCodecs = null;
	        _this2.sourceBuffer = {};

	        _this2.flushRange = [];
	        _this2.appended = 0;

	        _this = _this2;
	        return _this2;
	    }

	    _createClass(Buffer, [{
	        key: 'connectMedia',
	        value: function connectMedia(media) {
	            this.media = media || this.hls.media;
	            this.mediaSource = new MediaSource();

	            this.mediaSource.addEventListener('sourceopen', _onMediaSourceOpen);
	            this.mediaSource.addEventListener('sourceended', _onMediaSourceEnded);
	            this.mediaSource.addEventListener('sourceclose', _onMediaSourceClose);
	            this.media.src = URL.createObjectURL(this.mediaSource);
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            var sourceBuffer = this.sourceBuffer;
	            for (var type in sourceBuffer) {
	                var sbuffer = sourceBuffer[type];
	                try {
	                    this.mediaSource.removeSourceBuffer(sbuffer);
	                    sbuffer.removeEventListener('updateend', _onBufferUpdateEnd);
	                    sbuffer.removeEventListener('error', _onBufferUpdateError);
	                } catch (err) {}
	            }
	            this.sourceBuffer = {};
	            this.flushRange = [];
	            this.appended = 0;
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            _get(Object.getPrototypeOf(Buffer.prototype), 'dispose', this).call(this);
	            var ms = this.mediaSource;
	            if (ms) {
	                if (ms.readyState === 'open') {
	                    try {
	                        ms.endOfStream();
	                    } catch (e) {
	                        _log2.default.warn('dispose :' + e.message + ' while calling endOfStream');
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
	    }]);

	    return Buffer;
	}(_eventDispatcher2.default);

	function _onMediaSourceOpen() {
	    _log2.default.log('media source opened');

	    _this._e.fire(_hlsEvent2.default.MEDIA_SOURCE_OPEN, { media: _this.media });

	    _this.mediaSource.removeEventListener('sourceopen', _onMediaSourceOpen);
	    var mimeCodecs = _this.mimeCodecs;
	    if (mimeCodecs) {
	        _this.startupBuffer(mimeCodecs);
	        _this.mimeCodecs = null;
	        _this.doAppending();
	    }
	}

	function _onMediaSourceEnded() {
	    _log2.default.log('media source ended');
	}

	function _onMediaSourceClose() {
	    _log2.default.log('media source closed');
	}

	function _onBufferUpdateEnd() {

	    if (_this._needsFlush) {
	        _doFlush();
	    }

	    if (_this._needsEos) {
	        _this.bufferEos();
	    }

	    _this._e.fire(_hlsEvent2.default.BUFFER_APPENDED);
	    _doAppending();
	}

	function _onBufferUpdateError(event) {
	    _log2.default.error('sourceBuffer error:' + event);
	    _this._e.fire(_hlsEvent2.default.ERROR, {
	        type: _errors.ErrorTypes.MEDIA_ERROR,
	        details: _errors.ErrorDetails.BUFFER_APPENDING_ERROR,
	        fatal: false
	    });
	}

	function _onBufferCodes(mimeCodecs) {
	    var sbuffer = void 0,
	        mkey = void 0,
	        mimeCodec = void 0,
	        codec = void 0,
	        mimeType = void 0;

	    if (!_this.media) {
	        _this.mimeCodecs = mimeCodecs;
	        return;
	    }

	    var sourceBuffer = _this.sourceBuffer,
	        mediaSource = _this.mediaSource;

	    for (mkey in mimeCodecs) {
	        if (!sourceBuffer[mkey]) {
	            mimeCodec = mimeCodecs[mkey];
	            codec = mimeCodec.levelCodec || mimeCodec.codec;
	            mimeType = mimeCodec.container + ';codecs=' + codec;
	            _log2.default.log('creating sourceBuffer with mimeType:' + mimeType);
	            try {
	                sbuffer = sourceBuffer[mkey] = mediaSource.addSourceBuffer(mimeType);
	                sbuffer.addEventListener('updateend', _onBufferUpdateEnd);
	                sbuffer.addEventListener('error', _onBufferUpdateError);
	            } catch (e) {
	                _log2.default.error('error while trying to add sourceBuffer:' + e.message);
	                _this._e.fire(_hlsEvent2.default.ERROR, {
	                    type: _errors.ErrorTypes.MEDIA_ERROR,
	                    details: _errors.ErrorDetails.BUFFER_ADD_CODEC_ERROR,
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
	    _log2.default.error('sourceBuffer error:' + data.event);
	    _this._e.fire(_hlsEvent2.default.ERROR, {
	        type: _errors.ErrorTypes.MEDIA_ERROR,
	        details: _errors.ErrorDetails.BUFFER_APPENDING_ERROR,
	        fatal: false,
	        frag: _this.fragCurrent
	    });
	}

	function _onBufferEos() {
	    var sbuffer = _this.sourceBuffer,
	        mediaSource = _this.mediaSource;
	    if (!mediaSource || mediaSource.readyState !== 'open') {
	        return;
	    }
	    if (!(sbuffer.audio && sbuffer.audio.updating || sbuffer.video && sbuffer.video.updating)) {
	        _log2.default.log('all media data available, signal endOfStream() to MediaSource and stop loading fragment');
	        mediaSource.endOfStream();
	        _this._needsEos = false;
	    } else {
	        _this._needsEos = true;
	    }
	}

	function _onBufferFlushing(data) {
	    _this.flushRange.push({ start: data.startOffset, end: data.endOffset });
	    _this.flushBufferCounter = 0;
	    _doFlush();
	}

	function _doAppending() {
	    if (_this.sourceBuffer) {
	        if (_this.media.error) {
	            _this.segments = [];
	            _log2.default.error('trying to append although a media error occured, flush segment and abort');
	            return;
	        }
	        for (var type in _this.sourceBuffer) {
	            if (_this.sourceBuffer[type].updating) {
	                return;
	            }
	        }
	        if (_this.segments.length) {
	            var segment = _this.segments.shift();
	            try {
	                if (_this.sourceBuffer[segment.type]) {
	                    _this.sourceBuffer[segment.type].appendBuffer(segment.data);
	                    _this.appendError = 0;
	                    _this.appended++;
	                } else {
	                    _onBufferUpdateEnd();
	                }
	            } catch (e) {
	                _log2.default.error('error while trying to append buffer:' + e.message);
	                _this.segments.unshift(segment);
	                var event = { type: _errors.ErrorTypes.MEDIA_ERROR };
	                if (err.code !== 22) {
	                    if (_this.appendError) {
	                        _this.appendError++;
	                    } else {
	                        _this.appendError = 1;
	                    }
	                    event.details = _errors.ErrorDetails.BUFFER_APPEND_ERROR;
	                    event.frag = _this.fragCurrent;

	                    if (_this.appendError > _hlsConfig2.default.appendErrorMaxRetry) {
	                        _log2.default.log('fail ' + _hlsConfig2.default.appendErrorMaxRetry + ' times to append segment in sourceBuffer');
	                        _this.segments = [];
	                        event.fatal = true;
	                        _this._e.fire(_hlsEvent2.default.ERROR, event);
	                    } else {
	                        event.fatal = false;
	                        _this._e.fire(_hlsEvent2.default.ERROR, event);
	                    }
	                } else {
	                    _this.segments = [];
	                    event.details = _errors.ErrorDetails.BUFFER_FULL_ERROR;
	                    _this._e.fire(_hlsEvent2.default.ERROR, event);
	                }
	            }
	        }
	    }
	}

	function _doFlush() {
	    while (_this.flushRange.length) {
	        var range = _this.flushRange[0];
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

	        var appended = 0;
	        var sourceBuffer = _this.sourceBuffer;
	        for (var type in sourceBuffer) {
	            appended += sourceBuffer[type].buffered.length;
	        }
	        _this.appended = appended;
	        _this._e.fire(_hlsEvent2.default.BUFFER_FLUSHED);
	    }
	}

	function _flushBuffer(startOffset, endOffset) {
	    var sbuffer = void 0,
	        i = void 0,
	        bufStart = void 0,
	        bufEnd = void 0,
	        flushStart = void 0,
	        flushEnd = void 0;

	    if (_this.flushBufferCounter < _this.appended && _this.sourceBuffer) {
	        for (var type in _this.sourceBuffer) {
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
	                        _log2.default.log('flush ' + type + ' [' + flushStart + ',' + flushEnd + '], of [' + bufStart + ',' + bufEnd + '], pos:' + _this.media.currentTime);
	                        sbuffer.remove(flushStart, flushEnd);
	                        return false;
	                    }
	                }
	            } else {
	                //sbuffer.abort();
	                _log2.default.warn('cannot flush, sbuffer updating in progress');
	                return false;
	            }
	        }
	    } else {
	        _log2.default.warn('abort flushing too many retries');
	    }
	    _log2.default.log('buffer flushed');
	    return true;
	}

	exports.default = Buffer;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _event = __webpack_require__(6);

	var _event2 = _interopRequireDefault(_event);

	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by Cray on 2016/5/5.
	 */

	var HLSEvent = _utils2.default.merge({
	    MEDIA_SOURCE_OPEN: 'hlsMediaSource_open',
	    BUFFER_CODECS: 'hlsBufferCodecs',
	    BUFFER_APPENDING: 'hlsBufferAppending',
	    BUFFER_APPENDED: 'hlsBufferAppended',
	    BUFFER_EOS: 'hlsBufferEos',
	    BUFFER_FLUSHING: 'hlsBufferFlushing',
	    BUFFER_FLUSHED: 'hlsBufferFlushed',
	    MANIFEST_LOADED: 'hlsManifestLoaded',
	    MANIFEST_PARSED: 'hlsManifestParsed',
	    LEVEL_LOADED: 'hlsLevelLoaded',
	    LEVEL_UPDATED: 'hlsLevelUpdated',
	    LEVEL_PTS_UPDATED: 'hlsLevelPtsUpdated',
	    LEVEL_SWITCH: 'hlsLevelSwitch',
	    SEG_LOAD_PROGRESS: 'hlsSegLoadProgress',
	    SEG_LOADED: 'hlsSegLoaded',
	    SEG_PARSING_INIT_SEGMENT: 'hlsSegParsingInitSegment',
	    SEG_PARSING_USERDATA: 'hlsSegParsingUserdata',
	    SEG_PARSING_METADATA: 'hlsSegParsingMetadata',
	    SEG_PARSING_DATA: 'hlsSegParsingData',
	    SEG_PARSED: 'hlsSegParsed',
	    SEG_BUFFERED: 'hlsSegBuffered',
	    SEG_CHANGED: 'hlsSegChanged',
	    ERROR: 'hlsError',
	    DESTROYING: 'hlsDestroying',
	    KEY_LOADING: 'hlsKeyLoading',
	    KEY_LOADED: 'hlsKeyLoaded'
	}, _event2.default);

	exports.default = HLSEvent;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by Cray on 2016/4/29.
	 */

	var Event = {
	    QUEUE_COMPLETE: "queue-complete",
	    TASK_COMPLETE: "task-complete",
	    ERROR: "ERROR"
	};

	exports.default = Event;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Created by Cray on 2016/5/4.
	 */

	var Utils = {
	    merge: function merge(original, extended) {
	        for (var key in extended) {
	            var ext = extended[key];
	            if ((typeof ext === 'undefined' ? 'undefined' : _typeof(ext)) != 'object' || ext instanceof HTMLElement || ext === null) {
	                original[key] = ext;
	            } else {
	                if (!original[key] || _typeof(original[key]) != 'object') {
	                    original[key] = Array.isArray(ext) ? [] : {};
	                }
	                this.merge(original[key], ext);
	            }
	        }
	        return original;
	    },
	    copy: function copy(object) {
	        if (!object || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) != 'object' || object instanceof HTMLElement) {
	            return object;
	        } else if (Array.isArray(object)) {
	            var array = [];
	            for (var i = 0, l = object.length; i < l; i++) {
	                array[i] = this.copy(object[i]);
	            }
	            return array;
	        } else {
	            var obj = {};
	            for (var j in object) {
	                obj[j] = this.copy(object[j]);
	            }
	            return obj;
	        }
	    },
	    browserSniff: function browserSniff() {
	        var nAgt = navigator.userAgent,
	            name = navigator.appName,
	            fullVersion = '' + parseFloat(navigator.appVersion),
	            majorVersion = parseInt(navigator.appVersion, 10),
	            nameOffset,
	            verOffset,
	            ix;

	        if (navigator.appVersion.indexOf('Windows NT') !== -1 && navigator.appVersion.indexOf('rv:11') !== -1) {
	            name = 'IE';
	            fullVersion = '11;';
	        } else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
	            name = 'IE';
	            fullVersion = nAgt.substring(verOffset + 5);
	        } else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
	            name = 'Chrome';
	            fullVersion = nAgt.substring(verOffset + 7);
	        } else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
	            name = 'Safari';
	            fullVersion = nAgt.substring(verOffset + 7);
	            if ((verOffset = nAgt.indexOf('Version')) !== -1) {
	                fullVersion = nAgt.substring(verOffset + 8);
	            }
	        } else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
	            name = 'Firefox';
	            fullVersion = nAgt.substring(verOffset + 8);
	        } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
	            name = nAgt.substring(nameOffset, verOffset);
	            fullVersion = nAgt.substring(verOffset + 1);

	            if (name.toLowerCase() == name.toUpperCase()) {
	                name = navigator.appName;
	            }
	        }
	        if ((ix = fullVersion.indexOf(';')) !== -1) {
	            fullVersion = fullVersion.substring(0, ix);
	        }
	        if ((ix = fullVersion.indexOf(' ')) !== -1) {
	            fullVersion = fullVersion.substring(0, ix);
	        }
	        majorVersion = parseInt('' + fullVersion, 10);
	        if (isNaN(majorVersion)) {
	            fullVersion = '' + parseFloat(navigator.appVersion);
	            majorVersion = parseInt(navigator.appVersion, 10);
	        }
	        return {
	            name: name,
	            version: majorVersion,
	            ios: /(iPad|iPhone|iPod)/g.test(navigator.platform),
	            mobile: /AppleWebKit.*Mobile.*/.test(nAgt)
	        };
	    },
	    supported: function supported() {
	        var browser = this.browserSniff(),
	            IE = browser.name === 'IE' && browser.version <= 9,
	            basic = void 0,
	            full = void 0;

	        basic = !!document.createElement('video').canPlayType;
	        full = basic && !IE && !browser.mobile;

	        return {
	            basic: basic,
	            full: full
	        };
	    },
	    fullScreenSupport: function fullScreenSupport() {
	        var fullscreen = {
	            supportsFullScreen: false,
	            isFullScreen: function isFullScreen() {
	                return false;
	            },
	            requestFullScreen: function requestFullScreen() {},
	            cancelFullScreen: function cancelFullScreen() {},
	            fullScreenEventName: '',
	            element: null,
	            prefix: ''
	        };

	        var browserPrefixes = 'webkit moz o ms khtml'.split(' ');

	        if (typeof document.cancelFullScreen !== 'undefined') {
	            fullscreen.supportsFullScreen = true;
	        } else {
	            for (var i = 0, il = browserPrefixes.length; i < il; i++) {
	                fullscreen.prefix = browserPrefixes[i];

	                if (typeof document[fullscreen.prefix + 'CancelFullScreen'] !== 'undefined') {
	                    fullscreen.supportsFullScreen = true;
	                    break;
	                } else if (typeof document.msExitFullscreen !== 'undefined' && document.msFullscreenEnabled) {
	                    fullscreen.prefix = 'ms';
	                    fullscreen.supportsFullScreen = true;
	                    break;
	                }
	            }
	        }

	        if (fullscreen.supportsFullScreen) {
	            fullscreen.fullScreenEventName = fullscreen.prefix == 'ms' ? 'MSFullscreenChange' : fullscreen.prefix + 'fullscreenchange';

	            fullscreen.isFullScreen = function (element) {
	                if (typeof element === 'undefined') {
	                    element = document.body;
	                }
	                switch (fullscreen.prefix) {
	                    case '':
	                        return document.fullscreenElement == element;
	                    case 'moz':
	                        return document.mozFullScreenElement == element;
	                    default:
	                        return document[fullscreen.prefix + 'FullscreenElement'] == element;
	                }
	            };
	            fullscreen.requestFullScreen = function (element) {
	                if (typeof element === 'undefined') {
	                    element = document.body;
	                }
	                return fullscreen.prefix === '' ? element.requestFullScreen() : element[fullscreen.prefix + (fullscreen.prefix == 'ms' ? 'RequestFullscreen' : 'RequestFullScreen')]();
	            };
	            fullscreen.cancelFullScreen = function () {
	                return fullscreen.prefix === '' ? document.cancelFullScreen() : document[fullscreen.prefix + (fullscreen.prefix == 'ms' ? 'ExitFullscreen' : 'CancelFullScreen')]();
	            };
	            fullscreen.element = function () {
	                return fullscreen.prefix === '' ? document.fullscreenElement : document[fullscreen.prefix + 'FullscreenElement'];
	            };
	        }

	        return fullscreen;
	    },
	    inFrame: function inFrame() {
	        try {
	            return window.self !== window.top;
	        } catch (e) {
	            return true;
	        }
	    },
	    inArray: function inArray(haystack, needle) {
	        return Array.prototype.indexOf && haystack.indexOf(needle) != -1;
	    },
	    replaceAll: function replaceAll(string, find, replace) {
	        return string.replace(new RegExp(find.replace(/([.*+?\^=!:flex{}()|\[\]\/\\])/g, '\\$1'), 'g'), replace);
	    },
	    isNumber: function isNumber(value) {
	        return typeof value === 'number' && isFinite(value);
	    },
	    trim: function trim(text) {
	        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	        return text == null ? "" : (text + "").replace(rtrim, "");
	    },
	    each: function each(obj, callback) {
	        var value,
	            i = 0,
	            length = obj.length,
	            isArray = Array.isArray(obj);
	        if (isArray) {
	            for (; i < length; i++) {
	                value = callback.call(obj[i], i, obj[i]);
	                if (value === false) {
	                    break;
	                }
	            }
	        } else {
	            for (i in obj) {
	                value = callback.call(obj[i], i, obj[i]);
	                if (value === false) {
	                    break;
	                }
	            }
	        }
	        return obj;
	    },
	    toUrl: function toUrl(url) {
	        var a = document.createElement('a');
	        a.setAttribute('href', url);
	        a.setAttribute('target', '_blank');

	        var event = document.createEvent('MouseEvents');
	        event.initEvent('click', true, true);
	        a.dispatchEvent(event);
	    },
	    throttle: function throttle(method, context) {
	        clearTimeout(method.tId);
	        method.tId = setTimeout(function () {
	            method.call(context);
	        }, 100);
	    },
	    extend: function extend(target) {
	        var slice = Array.prototype.slice;
	        slice.call(arguments, 1).forEach(function (source) {
	            for (var key in source) {
	                if (source[key] !== undefined) {
	                    target[key] = source[key];
	                }
	            }
	        });
	        return target;
	    },
	    keys: function keys(o) {
	        var a = [];
	        for (var k in o) {
	            if (o[k]) {
	                a.push(k);
	            }
	        }return a;
	    },
	    equals: function equals(x, y) {
	        if (x === y) {
	            // 针对+0 不等于 -0的情况
	            return x !== 0 || 1 / x === 1 / y;
	        }
	        // 针对NaN的情况
	        return x !== x && y !== y;
	    },
	    search: function search(list, comparisonFunction) {
	        var minIndex = 0;
	        var maxIndex = list.length - 1;
	        var currentIndex = null;
	        var currentElement = null;

	        while (minIndex <= maxIndex) {
	            currentIndex = (minIndex + maxIndex) / 2 | 0;
	            currentElement = list[currentIndex];

	            var comparisonResult = comparisonFunction(currentElement);
	            if (comparisonResult > 0) {
	                minIndex = currentIndex + 1;
	            } else if (comparisonResult < 0) {
	                maxIndex = currentIndex - 1;
	            } else {
	                return currentElement;
	            }
	        }

	        return null;
	    }
	};

	exports.default = Utils;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Cray on 2016/4/29.
	 */

	var LEVEL_CONFIG = { 'debug': true, 'log': true, 'info': true, 'warn': true, 'error': true };

	var Logger = function () {
	    function Logger() {
	        _classCallCheck(this, Logger);
	    }

	    _createClass(Logger, null, [{
	        key: 'startup',
	        value: function startup() {
	            var value = arguments.length <= 0 || arguments[0] === undefined ? 'debug' : arguments[0];

	            var array = ['debug', 'log', 'info', 'warn', 'error'];
	            var enable = false;
	            array.forEach(function (type) {

	                type == value ? enable = true : LEVEL_CONFIG[type] = false;

	                if (enable) {
	                    LEVEL_CONFIG[type] = true;
	                }
	            });
	        }
	    }, {
	        key: 'debug',
	        value: function debug() {
	            for (var _len = arguments.length, msg = Array(_len), _key = 0; _key < _len; _key++) {
	                msg[_key] = arguments[_key];
	            }

	            _consolePrint('debug', msg);
	        }
	    }, {
	        key: 'log',
	        value: function log() {
	            for (var _len2 = arguments.length, msg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                msg[_key2] = arguments[_key2];
	            }

	            _consolePrint('log', msg);
	        }
	    }, {
	        key: 'info',
	        value: function info() {
	            for (var _len3 = arguments.length, msg = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	                msg[_key3] = arguments[_key3];
	            }

	            _consolePrint('info', msg);
	        }
	    }, {
	        key: 'warn',
	        value: function warn() {
	            for (var _len4 = arguments.length, msg = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	                msg[_key4] = arguments[_key4];
	            }

	            _consolePrint('warn', msg);
	        }
	    }, {
	        key: 'error',
	        value: function error() {
	            for (var _len5 = arguments.length, msg = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	                msg[_key5] = arguments[_key5];
	            }

	            _consolePrint('error', msg);
	        }
	    }]);

	    return Logger;
	}();

	function _consolePrint(type, msg) {
	    if (LEVEL_CONFIG[type]) {
	        var fn = window.console[type];
	        if (fn) {
	            fn.apply(window.console, _formatMsg(type, msg));
	        }
	    }
	}

	function _getTime() {
	    var d = new Date();
	    return String(d.getHours()) + ":" + String(d.getMinutes()) + ":" + String(d.getSeconds());
	}

	function _formatMsg(type, msg) {
	    msg.unshift(_getTime() + ' [' + type + '] > ');
	    return msg;
	}

	exports.default = Logger;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Cray on 2016/4/11.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _lastTime = 0;
	var _tickerList = [];

	var TickerLaunch = function () {
	    function TickerLaunch() {
	        _classCallCheck(this, TickerLaunch);

	        _enterFrame();
	    }

	    /**
	     * @param t -> for Timer t = interval | for frame t = frequency
	     * @param callback
	     * @param repeatCount
	     * @param frame
	     */


	    _createClass(TickerLaunch, [{
	        key: 'tick',
	        value: function tick(t) {
	            var callback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	            var repeatCount = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
	            var frame = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	            if (!frame) {
	                var tticker = void 0;
	                if (!this.have(callback)) {
	                    tticker = new TimeTicker(t, repeatCount, callback);
	                    tticker.start();
	                }
	            } else {
	                var fticker = void 0;
	                if (!this.have(callback)) {
	                    fticker = new FrameTicker(t, repeatCount, callback);
	                    fticker.start();
	                }
	            }
	        }
	    }, {
	        key: 'have',
	        value: function have(callback) {
	            var tc = TickerManager.getInstance.getTicker(callback);
	            return tc || false;
	        }
	    }, {
	        key: 'stop',
	        value: function stop(callback) {
	            var tc = TickerManager.getInstance.getTicker(callback);
	            if (tc) {
	                var name = callback.name;
	                if (name) {
	                    _log2.default.log('删除 Timer: ' + name + ' 监听器成功.');
	                }

	                TickerManager.getInstance.removeTicker(tc);
	            }
	        }
	    }]);

	    return TickerLaunch;
	}();

	/**
	 * 每秒60帧渲染 , 如果浏览器最小化则停止渲染
	 * @private
	 */


	function _enterFrame() {
	    _onUpdate();
	    requestAnimationFrame(_enterFrame);
	}

	function _onUpdate() {
	    var time = new Date().getTime();
	    var dtime = time - _lastTime;
	    _lastTime = time;
	    TickerManager.getInstance.doTick(dtime);
	}

	/***  TickerManager  ***/

	var TickerManager = function () {
	    function TickerManager() {
	        _classCallCheck(this, TickerManager);
	    }

	    _createClass(TickerManager, [{
	        key: 'doTick',
	        value: function doTick(dtime) {
	            _tickerList.forEach(function (ticker) {
	                ticker.doTick(dtime);
	            });
	        }
	    }, {
	        key: 'addTicker',
	        value: function addTicker(ticker) {
	            if (!this.contains(ticker)) _tickerList.push(ticker);
	        }
	    }, {
	        key: 'contains',
	        value: function contains(ticker) {
	            return _tickerList.some(function (t) {
	                return t == ticker;
	            });
	        }
	    }, {
	        key: 'getTicker',
	        value: function getTicker(callback) {
	            var ticker = void 0;
	            var res = false;
	            _utils2.default.each(_tickerList, function (i, t) {
	                if (t.callback == callback) {
	                    res = true;
	                    ticker = t;
	                    return false;
	                }
	            });

	            return res ? ticker : null;
	        }
	    }, {
	        key: 'removeTicker',
	        value: function removeTicker(ticker) {
	            for (var i = 0; i < _tickerList.length; i++) {
	                if (_tickerList[i] == ticker) {
	                    _tickerList.splice(i, 1);
	                    break;
	                }
	            }
	        }
	    }, {
	        key: 'length',
	        get: function get() {
	            return _tickerList.length;
	        }
	    }], [{
	        key: 'getInstance',
	        get: function get() {
	            if (!(this instanceof TickerManager)) {
	                TickerManager.instance = new TickerManager();
	            }

	            return TickerManager.instance;
	        }
	    }]);

	    return TickerManager;
	}();

	/***  TickerBase  ***/


	var TickerBase = function () {
	    function TickerBase(callback) {
	        _classCallCheck(this, TickerBase);

	        this.callback = callback;
	    }

	    _createClass(TickerBase, [{
	        key: 'start',
	        value: function start() {
	            TickerManager.getInstance.addTicker(this);
	        }

	        /**
	         * 停止计时器
	         * 将计时器从列表中删除
	         */

	    }, {
	        key: 'stop',
	        value: function stop() {
	            TickerManager.getInstance.removeTicker(this);
	        }

	        /**
	         * 重置
	         */

	    }, {
	        key: 'reset',
	        value: function reset() {}

	        /**
	         * 检查
	         * @param dtime
	         */

	    }, {
	        key: 'doTick',
	        value: function doTick(dtime) {}

	        /**
	         * 计时器完成处理
	         */

	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            this.stop();
	            this.reset();
	            this.callback = null;
	        }
	    }]);

	    return TickerBase;
	}();

	/***  FrameTicker  ***/


	var FrameTicker = function (_TickerBase) {
	    _inherits(FrameTicker, _TickerBase);

	    function FrameTicker(frequency, repeatCount, callback) {
	        _classCallCheck(this, FrameTicker);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FrameTicker).call(this, callback));

	        _this.totalCount = 0;
	        _this.tickCount = 0;
	        _this.frequency = Math.max(1, frequency);
	        _this.repeatCount = Math.max(0, repeatCount);

	        _this.reset();
	        return _this;
	    }

	    _createClass(FrameTicker, [{
	        key: 'reset',
	        value: function reset() {
	            this.tickCount = 0;
	        }
	    }, {
	        key: 'doTick',
	        value: function doTick(dtime) {
	            ++this.tickCount;

	            if (this.tickCount == this.frequency) {
	                this.tickCount = 0;
	                ++this.totalCount;
	                if (this.callback != null) {
	                    this.callback();
	                }
	                if (this.repeatCount > 0 && this.totalCount >= this.repeatCount) {
	                    this.dispose();
	                }
	            }
	        }
	    }]);

	    return FrameTicker;
	}(TickerBase);

	/*** TimerTicker  ***/


	var TimeTicker = function (_TickerBase2) {
	    _inherits(TimeTicker, _TickerBase2);

	    function TimeTicker(interval, repeatCount, callback) {
	        _classCallCheck(this, TimeTicker);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(TimeTicker).call(this, callback));

	        _this2.tickTime = 0;
	        _this2.tickCount = 0;
	        _this2.interval = Math.abs(interval);
	        _this2.repeatCount = Math.max(0, repeatCount);

	        _this2.reset();
	        return _this2;
	    }

	    _createClass(TimeTicker, [{
	        key: 'reset',
	        value: function reset() {
	            this.tickCount = 0;
	            this.tickTime = 0;
	        }
	    }, {
	        key: 'doTick',
	        value: function doTick(dtime) {
	            this.tickTime += dtime;
	            while (this.tickTime >= this.interval) {
	                this.tickTime -= this.interval;
	                ++this.tickCount;
	                if (this.callback != null) {
	                    this.callback();
	                }
	                if (this.repeatCount > 0 && this.tickCount >= this.repeatCount) {
	                    this.dispose();
	                    return;
	                }
	            }
	        }
	    }]);

	    return TimeTicker;
	}(TickerBase);

	var Ticker = new TickerLaunch();

	exports.default = Ticker;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ErrorTypes = exports.ErrorTypes = {
	  // Identifier for a network error (loading error / timeout ...)
	  NETWORK_ERROR: 'networkError',
	  // Identifier for a media Error (video/parsing/mediasource error)
	  MEDIA_ERROR: 'mediaError',
	  // Identifier for all other errors
	  OTHER_ERROR: 'otherError'
	};

	var ErrorDetails = exports.ErrorDetails = {
	  // Identifier for a manifest load error - data: { url : faulty URL, response : XHR response}
	  MANIFEST_LOAD_ERROR: 'manifestLoadError',
	  // Identifier for a manifest load timeout - data: { url : faulty URL, response : XHR response}
	  MANIFEST_LOAD_TIMEOUT: 'manifestLoadTimeOut',
	  // Identifier for a manifest parsing error - data: { url : faulty URL, reason : error reason}
	  MANIFEST_PARSING_ERROR: 'manifestParsingError',
	  // Identifier for a manifest with only incompatible codecs error - data: { url : faulty URL, reason : error reason}
	  MANIFEST_INCOMPATIBLE_CODECS_ERROR: 'manifestIncompatibleCodecsError',
	  // Identifier for playlist load error - data: { url : faulty URL, response : XHR response}
	  LEVEL_LOAD_ERROR: 'levelLoadError',
	  // Identifier for playlist load timeout - data: { url : faulty URL, response : XHR response}
	  LEVEL_LOAD_TIMEOUT: 'levelLoadTimeOut',
	  // Identifier for a level switch error - data: { level : faulty level Id, event : error description}
	  LEVEL_SWITCH_ERROR: 'levelSwitchError',
	  // Identifier for fragment load error - data: { frag : fragment object, response : XHR response}
	  FRAG_LOAD_ERROR: 'fragLoadError',
	  // Identifier for fragment loop loading error - data: { frag : fragment object}
	  FRAG_LOOP_LOADING_ERROR: 'fragLoopLoadingError',
	  // Identifier for fragment load timeout error - data: { frag : fragment object}
	  FRAG_LOAD_TIMEOUT: 'fragLoadTimeOut',
	  // Identifier for a fragment decryption error event - data: parsing error description
	  FRAG_DECRYPT_ERROR: 'fragDecryptError',
	  // Identifier for a fragment parsing error event - data: parsing error description
	  FRAG_PARSING_ERROR: 'fragParsingError',
	  // Identifier for decrypt key load error - data: { frag : fragment object, response : XHR response}
	  KEY_LOAD_ERROR: 'keyLoadError',
	  // Identifier for decrypt key load timeout error - data: { frag : fragment object}
	  KEY_LOAD_TIMEOUT: 'keyLoadTimeOut',
	  // Triggered when an exception occurs while adding a sourceBuffer to MediaSource - data : {  err : exception , mimeType : mimeType }
	  BUFFER_ADD_CODEC_ERROR: 'bufferAddCodecError',
	  // Identifier for a buffer append error - data: append error description
	  BUFFER_APPEND_ERROR: 'bufferAppendError',
	  // Identifier for a buffer appending error event - data: appending error description
	  BUFFER_APPENDING_ERROR: 'bufferAppendingError',
	  // Identifier for a buffer stalled error event
	  BUFFER_STALLED_ERROR: 'bufferStalledError',
	  // Identifier for a buffer full event
	  BUFFER_FULL_ERROR: 'bufferFullError',
	  // Identifier for a buffer seek over hole event
	  BUFFER_SEEK_OVER_HOLE: 'bufferSeekOverHole',
	  // Identifier for an internal exception happening inside hls.js while handling an event
	  INTERNAL_EXCEPTION: 'internalException'
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by Cray on 2016/5/5.
	 */

	var hlsConfig = {
	    debug: false,
	    maxBufferLength: 30,
	    maxBufferSize: 60 * 1000 * 1000,
	    maxBufferHole: 0.5,
	    maxSeekHole: 2,
	    seekHoleNudgeDuration: 0.01,
	    maxFragLookUpTolerance: 0.2,
	    liveSyncDurationCount: 3,
	    liveMaxLatencyDurationCount: Infinity,
	    liveSyncDuration: undefined,
	    liveMaxLatencyDuration: undefined,
	    maxMaxBufferLength: 600,
	    manifestLoadingTimeOut: 10000,
	    manifestLoadingMaxRetry: 1,
	    manifestLoadingRetryDelay: 1000,
	    levelLoadingTimeOut: 10000,
	    levelLoadingMaxRetry: 4,
	    levelLoadingRetryDelay: 1000,
	    fragLoadingTimeOut: 20000,
	    fragLoadingMaxRetry: 6,
	    fragLoadingRetryDelay: 1000,
	    fragLoadingLoopThreshold: 3,
	    startFragPrefetch: false,
	    appendErrorMaxRetry: 3
	};

	exports.default = hlsConfig;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Cray on 2016/5/6.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _hlsEvent = __webpack_require__(5);

	var _hlsEvent2 = _interopRequireDefault(_hlsEvent);

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	var _ticker = __webpack_require__(9);

	var _ticker2 = _interopRequireDefault(_ticker);

	var _demuxer = __webpack_require__(13);

	var _demuxer2 = _interopRequireDefault(_demuxer);

	var _errors = __webpack_require__(10);

	var _hlsConfig = __webpack_require__(11);

	var _hlsConfig2 = _interopRequireDefault(_hlsConfig);

	var _bufferUtils = __webpack_require__(22);

	var _bufferUtils2 = _interopRequireDefault(_bufferUtils);

	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	var _listUtils = __webpack_require__(23);

	var _listUtils2 = _interopRequireDefault(_listUtils);

	var _keyLoader = __webpack_require__(24);

	var _keyLoader2 = _interopRequireDefault(_keyLoader);

	var _segmentLoader = __webpack_require__(26);

	var _segmentLoader2 = _interopRequireDefault(_segmentLoader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _this = null;

	var State = {
	    STOPPED: 'STOPPED',
	    STARTING: 'STARTING',
	    IDLE: 'IDLE',
	    PAUSED: 'PAUSED',
	    KEY_LOADING: 'KEY_LOADING',
	    FRAG_LOADING: 'FRAG_LOADING',
	    FRAG_LOADING_WAITING_RETRY: 'FRAG_LOADING_WAITING_RETRY',
	    WAITING_LEVEL: 'WAITING_LEVEL',
	    PARSING: 'PARSING',
	    PARSED: 'PARSED',
	    ENDED: 'ENDED',
	    ERROR: 'ERROR'
	};

	var Stream = function () {
	    function Stream(hls) {
	        var _this2 = this;

	        _classCallCheck(this, Stream);

	        this.hls = hls;
	        this._e = this.hls._e;

	        this._e.on(_hlsEvent2.default.MANIFEST_PARSED, _onMainfestParsed);
	        this._e.on(_hlsEvent2.default.MEDIA_SOURCE_OPEN, _onMediaSourceOpen);
	        this._e.on(_hlsEvent2.default.LEVEL_LOADED, _onLevleLoaded);
	        this._e.on(_hlsEvent2.default.ERROR, _onError);

	        //this._e.on(HLSEvent.FRAG_LOAD_EMERGENCY_ABORTED, _onFragLoadEmergencyAborted);
	        this._e.on(_hlsEvent2.default.SEG_PARSING_INIT_SEGMENT, _onFragParsingInitSegment);
	        this._e.on(_hlsEvent2.default.SEG_PARSING_DATA, _onFragParsingData);
	        this._e.on(_hlsEvent2.default.SEG_PARSED, _onFragParsed);
	        this._e.on(_hlsEvent2.default.BUFFER_APPENDED, _onBufferAppended);
	        this._e.on(_hlsEvent2.default.BUFFER_FLUSHED, _onBufferFlushed);

	        this.bufferRange = [];
	        this.stalled = false;
	        this.media = null;
	        this.levels = null;
	        this.state = State.STOPPED;

	        this.keyLoader = new _keyLoader2.default();
	        this.keyLoader.on(_hlsEvent2.default.KEY_LOADED, _onKeyLoaded);
	        this.keyLoader.on(_hlsEvent2.default.ERROR, function (event) {
	            _this2._e.fire(_hlsEvent2.default.ERROR, event);
	        });

	        this.segLoader = new _segmentLoader2.default();
	        this.segLoader.on(_hlsEvent2.default.SEG_LOADED, _onFragLoaded);
	        this.segLoader.on(_hlsEvent2.default.ERROR, function (event) {
	            _this2._e.fire(_hlsEvent2.default.ERROR, event);
	        });

	        _this = this;
	    }

	    _createClass(Stream, [{
	        key: 'startLoad',
	        value: function startLoad() {
	            var startPosition = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	            if (this.levels == null) {
	                _log2.default.log('[Stream] startLoad cannot load the levels');
	                return;
	            }

	            _log2.default.log('[Stream] startLoad');

	            var media = this.media,
	                lastCurrentTime = this.lastCurrentTime;
	            this.stopLoad();
	            this.demuxer = new _demuxer2.default(this.hls);

	            _ticker2.default.tick(100, _enterFrame, -1);

	            this.level = -1;
	            this.fragLoadError = 0;
	            if (media && lastCurrentTime) {
	                _log2.default.log('configure startPosition @' + lastCurrentTime);
	                if (!media.paused) {
	                    _log2.default.log('resuming video');
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
	    }, {
	        key: 'stopLoad',
	        value: function stopLoad() {
	            var frag = this.fragCurrent;
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
	    }, {
	        key: 'isBuffered',
	        value: function isBuffered(position) {
	            var buffered = this.media.buffered;
	            for (var i = 0; i < buffered.length; i++) {
	                if (position >= buffered.start(i) && position <= buffered.end(i)) {
	                    return true;
	                }
	            }
	            return false;
	        }
	    }, {
	        key: 'getBufferRange',
	        value: function getBufferRange(position) {
	            var i = void 0,
	                range = void 0,
	                bufferRange = this.bufferRange;
	            if (bufferRange) {
	                for (i = bufferRange.length - 1; i >= 0; i--) {
	                    range = bufferRange[i];
	                    if (position >= range.start && position <= range.end) {
	                        return range;
	                    }
	                }
	            }
	            return null;
	        }
	    }, {
	        key: 'followingBufferRange',
	        value: function followingBufferRange(range) {
	            if (range) {
	                return this.getBufferRange(range.end + 0.5);
	            }
	            return null;
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            this.stopLoad();
	            _ticker2.default.stop(_enterFrame);
	            this.state = State.STOPPED;
	        }
	    }, {
	        key: 'currentLevel',
	        get: function get() {
	            if (this.media) {
	                var range = this.getBufferRange(this.media.currentTime);
	                if (range) {
	                    return range.frag.level;
	                }
	            }
	            return -1;
	        }
	    }, {
	        key: 'nextBufferRange',
	        get: function get() {
	            if (this.media) {
	                return this.followingBufferRange(this.getBufferRange(this.media.currentTime));
	            } else {
	                return null;
	            }
	        }
	    }, {
	        key: 'nextLevel',
	        get: function get() {
	            var range = this.nextBufferRange;
	            if (range) {
	                return range.frag.level;
	            } else {
	                return -1;
	            }
	        }
	    }]);

	    return Stream;
	}();

	function _onMainfestParsed(data) {
	    var aac = false,
	        heaac = false,
	        codec = void 0;
	    data.levels.forEach(function (level) {
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
	    _this.audioCodecSwitch = aac && heaac;
	    if (_this.audioCodecSwitch) {
	        _log2.default.log('both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC');
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
	    var newDetails = data.details,
	        newLevelId = data.level,
	        curLevel = _this.levels[newLevelId],
	        duration = newDetails.totalduration,
	        sliding = 0;

	    _log2.default.log('level ' + newLevelId + ' loaded [' + newDetails.startSN + ',' + newDetails.endSN + '],duration:' + duration);
	    _this.levelLastLoaded = newLevelId;

	    if (newDetails.live) {
	        var curDetails = curLevel.details;
	        if (curDetails) {
	            _listUtils2.default.mergeDetails(curDetails, newDetails);
	            sliding = newDetails.fragments[0].start;
	            if (newDetails.PTSKnown) {
	                _log2.default.log('live playlist sliding:' + sliding.toFixed(3));
	            } else {
	                _log2.default.log('live playlist - outdated PTS, unknown sliding');
	            }
	        } else {
	            newDetails.PTSKnown = false;
	            _log2.default.log('live playlist - first load, unknown sliding');
	        }
	    } else {
	        newDetails.PTSKnown = false;
	    }
	    curLevel.details = newDetails;
	    //_this._e.fire(HLSEvent.LEVEL_UPDATED, { details: newDetails, level: newLevelId });

	    if (_this.startFragRequested === false) {
	        if (newDetails.live) {
	            var targetLatency = _hlsConfig2.default.liveSyncDuration !== undefined ? _hlsConfig2.default.liveSyncDuration : _hlsConfig2.default.liveSyncDurationCount * newDetails.targetduration;
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
	    switch (data.details) {
	        case _errors.ErrorDetails.FRAG_LOAD_ERROR:
	        case _errors.ErrorDetails.FRAG_LOAD_TIMEOUT:
	            if (!data.fatal) {
	                var loadError = _this.fragLoadError;
	                if (loadError) {
	                    loadError++;
	                } else {
	                    loadError = 1;
	                }
	                if (loadError <= _hlsConfig2.default.fragLoadingMaxRetry) {
	                    _this.fragLoadError = loadError;
	                    data.frag.loadCounter = 0;
	                    var delay = Math.min(Math.pow(2, loadError - 1) * _hlsConfig2.default.fragLoadingRetryDelay, 64000);
	                    _log2.default.warn('mediaController: frag loading failed, retry in ' + delay + ' ms');
	                    _this.retryDate = performance.now() + delay;
	                    _this.state = State.FRAG_LOADING_WAITING_RETRY;
	                } else {
	                    _log2.default.error('mediaController: ' + data.details + ' reaches max retry, redispatch as fatal ...');
	                    data.fatal = true;
	                    _this._e.fire(_hlsEvent2.default.ERROR, data);
	                    _this.state = State.ERROR;
	                }
	            }
	            break;
	        case _errors.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
	        case _errors.ErrorDetails.LEVEL_LOAD_ERROR:
	        case _errors.ErrorDetails.LEVEL_LOAD_TIMEOUT:
	        case _errors.ErrorDetails.KEY_LOAD_ERROR:
	        case _errors.ErrorDetails.KEY_LOAD_TIMEOUT:
	            if (_this.state !== State.ERROR) {
	                _this.state = data.fatal ? State.ERROR : State.IDLE;
	                _log2.default.warn('mediaController: ' + data.details + ' while loading frag,switch to ' + _this.state + ' state ...');
	            }
	            break;
	        case _errors.ErrorDetails.BUFFER_FULL_ERROR:
	            _hlsConfig2.default.maxMaxBufferLength /= 2;
	            _log2.default.warn('reduce max buffer length to ' + _hlsConfig2.default.maxMaxBufferLength + 's and trigger a nextLevelSwitch to flush old buffer and fix QuotaExceededError');
	            _nextLevelSwitch();
	            break;
	        default:
	            break;
	    }
	}

	function _onMediaSeeking() {
	    if (_this.state === State.FRAG_LOADING) {
	        if (_bufferUtils2.default.bufferInfo(_this.media, _this.media.currentTime, _hlsConfig2.default.maxBufferHole).len === 0) {
	            _log2.default.log('seeking outside of buffer while fragment load in progress, cancel fragment load');
	            var fragCurrent = _this.fragCurrent;
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
	        _this.fragLoadIdx += 2 * _hlsConfig2.default.fragLoadingLoopThreshold;
	    }

	    //_enterFrame();
	}

	function _onMediaSeeked() {
	    _enterFrame();
	}

	function _onMediaEnded() {
	    _log2.default.log('media ended');
	    _this.startPosition = _this.lastCurrentTime = 0;
	}

	function _onKeyLoaded() {
	    if (_this.state === State.KEY_LOADING) {
	        _this.state = State.IDLE;
	        //_enterFrame();
	    }
	}

	function _onFragLoaded(data) {
	    var fragCurrent = _this.fragCurrent;
	    if (_this.state === State.FRAG_LOADING && fragCurrent && data.frag.level === fragCurrent.level && data.frag.sn === fragCurrent.sn) {
	        if (_this.fragBitrateTest === true) {
	            _this.state = State.IDLE;
	            _this.fragBitrateTest = false;
	            data.stats.tparsed = data.stats.tbuffered = performance.now();
	            _this._e.fire(_hlsEvent2.default.SEG_BUFFERED, { stats: data.stats, frag: fragCurrent });
	        } else {
	            _this.state = State.PARSING;
	            _this.stats = data.stats;
	            var currentLevel = _this.levels[_this.level],
	                details = currentLevel.details,
	                duration = details.totalduration,
	                start = fragCurrent.start,
	                level = fragCurrent.level,
	                sn = fragCurrent.sn,
	                audioCodec = _hlsConfig2.default.defaultAudioCodec || currentLevel.audioCodec;
	            if (_this.audioCodecSwap) {
	                _log2.default.log('swapping playlist audio codec');
	                if (audioCodec === undefined) {
	                    audioCodec = _this.lastAudioCodec;
	                }
	                if (audioCodec) {
	                    if (audioCodec.indexOf('mp4a.40.5') !== -1) {
	                        audioCodec = 'mp4a.40.2';
	                    } else {
	                        audioCodec = 'mp4a.40.5';
	                    }
	                }
	            }
	            _this.pendingAppending = 0;
	            _log2.default.log('Demuxing ' + sn + ' of [' + details.startSN + ' ,' + details.endSN + '],level ' + level);
	            _this.demuxer.push(data.payload, audioCodec, currentLevel.videoCodec, start, fragCurrent.cc, level, sn, duration, fragCurrent.decryptdata);
	        }
	    }
	    _this.fragLoadError = 0;
	}

	function _onFragParsingInitSegment(data) {
	    if (_this.state === State.PARSING) {
	        var tracks = data.tracks,
	            trackName,
	            track;

	        track = tracks.audio;
	        if (track) {
	            var audioCodec = _this.levels[_this.level].audioCodec,
	                ua = navigator.userAgent.toLowerCase();
	            if (audioCodec && _this.audioCodecSwap) {
	                _log2.default.log('swapping playlist audio codec');
	                if (audioCodec.indexOf('mp4a.40.5') !== -1) {
	                    audioCodec = 'mp4a.40.2';
	                } else {
	                    audioCodec = 'mp4a.40.5';
	                }
	            }
	            if (_this.audioCodecSwitch) {
	                if (track.metadata.channelCount !== 1 && ua.indexOf('firefox') === -1) {
	                    audioCodec = 'mp4a.40.5';
	                }
	            }
	            if (ua.indexOf('android') !== -1) {
	                audioCodec = 'mp4a.40.2';
	                _log2.default.log('Android: force audio codec to' + audioCodec);
	            }
	            track.levelCodec = audioCodec;
	        }

	        track = tracks.video;
	        if (track) {
	            track.levelCodec = _this.levels[_this.level].videoCodec;
	        }

	        if (data.unique) {
	            var mergedTrack = {
	                codec: '',
	                levelCodec: ''
	            };
	            for (trackName in data.tracks) {
	                track = tracks[trackName];
	                mergedTrack.container = track.container;
	                if (mergedTrack.codec) {
	                    mergedTrack.codec += ',';
	                    mergedTrack.levelCodec += ',';
	                }
	                if (track.codec) {
	                    mergedTrack.codec += track.codec;
	                }
	                if (track.levelCodec) {
	                    mergedTrack.levelCodec += track.levelCodec;
	                }
	            }
	            tracks = { audiovideo: mergedTrack };
	        }

	        _this._e.fire(_hlsEvent2.default.BUFFER_CODECS, tracks);

	        for (trackName in tracks) {
	            track = tracks[trackName];
	            _log2.default.log('track:' + trackName + ',container:' + track.container + ',codecs[level/parsed]=[' + track.levelCodec + '/' + track.codec + ']');
	            var initSegment = track.initSegment;
	            if (initSegment) {
	                _this.pendingAppending++;
	                _this._e.fire(_hlsEvent2.default.BUFFER_APPENDING, { type: trackName, data: initSegment });
	            }
	        }
	    }
	}

	function _onFragParsingData(data) {
	    if (_this.state === State.PARSING) {
	        _this.tparse2 = Date.now();
	        var level = _this.levels[_this.level],
	            frag = _this.fragCurrent;

	        _log2.default.log('parsed ' + data.type + ',PTS:[' + data.startPTS.toFixed(3) + ',' + data.endPTS.toFixed(3) + '],DTS:[' + data.startDTS.toFixed(3) + '/' + data.endDTS.toFixed(3) + '],nb:' + data.nb);

	        var drift = _listUtils2.default.updateFragPTS(level.details, frag.sn, data.startPTS, data.endPTS);

	        _this._e.fire(_hlsEvent2.default.LEVEL_PTS_UPDATED, { details: level.details, level: _this.level, drift: drift });

	        [data.data1, data.data2].forEach(function (buffer) {
	            if (buffer) {
	                _this.pendingAppending++;
	                _this._e.fire(_hlsEvent2.default.BUFFER_APPENDING, { type: data.type, data: buffer });
	            }
	        });

	        _this.nextLoadPosition = data.endPTS;
	        _this.bufferRange.push({ type: data.type, start: data.startPTS, end: data.endPTS, frag: frag });

	        //_enterFrame();
	    } else {
	            _log2.default.warn('not in PARSING state but ' + _this.state + ', ignoring FRAG_PARSING_DATA event');
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
	    var newRange = [],
	        range = void 0,
	        i = void 0;
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
	    var fetchdelay = void 0,
	        currentRange = void 0,
	        nextRange = void 0;
	    currentRange = _this.getBufferRange(_this.media.currentTime);
	    if (currentRange && currentRange.start > 1) {
	        _this._e.fire(_hlsEvent2.default.BUFFER_FLUSHING, { startOffset: 0, endOffset: currentRange.start - 1 });
	        _this.state = State.PAUSED;
	    }
	    if (!_this.media.paused) {
	        var nextLevelId = _this.hls.playList.nextLoadLevel,
	            nextLevel = _this.levels[nextLevelId],
	            fragLastKbps = _this.fragLastKbps;
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
	            _this._e.fire(_hlsEvent2.default.BUFFER_FLUSHING, { startOffset: nextRange.start, endOffset: Number.POSITIVE_INFINITY });
	            _this.state = State.PAUSED;
	            var fragCurrent = _this.fragCurrent;
	            if (fragCurrent && fragCurrent.loader) {
	                fragCurrent.loader.abort();
	            }
	            _this.fragCurrent = null;
	            _this.fragLoadIdx += 2 * _hlsConfig2.default.fragLoadingLoopThreshold;
	        }
	    }
	}

	function _immediateLevelSwitch() {
	    _log2.default.log('immediateLevelSwitch');

	    if (!_this.immediateSwitch) {
	        _this.immediateSwitch = true;
	        _this.previouslyPaused = _this.media.paused;
	        _this.media.pause();
	    }
	    var fragCurrent = _this.fragCurrent;
	    if (fragCurrent && fragCurrent.loader) {
	        fragCurrent.loader.abort();
	    }
	    _this.fragCurrent = null;
	    _this._e.fire(_hlsEvent2.default.BUFFER_FLUSHING, { startOffset: 0, endOffset: Number.POSITIVE_INFINITY });
	    _this.state = State.PAUSED;
	    _this.fragLoadIdx += 2 * _hlsConfig2.default.fragLoadingLoopThreshold;

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
	    if (_this.state === State.PARSED && _this.pendingAppending === 0) {
	        var frag = _this.fragCurrent,
	            stats = _this.stats;
	        if (frag) {
	            _this.fragPrevious = frag;
	            stats.tbuffered = performance.now();
	            _this.fragLastKbps = Math.round(8 * stats.length / (stats.tbuffered - stats.tfirst));
	            _this._e.fire(_hlsEvent2.default.SEG_BUFFERED, { stats: stats, frag: frag });
	            _log2.default.log('media buffered : ' + _timeRangesToString(_this.media.buffered));
	            _this.state = State.IDLE;
	        }
	        //_enterFrame();
	    }
	}

	function _enterFrame() {
	    var pos = void 0,
	        level = void 0,
	        levelDetails = void 0;
	    switch (_this.state) {
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
	            if (!_this.media && (_this.startFragRequested || !_hlsConfig2.default.startFragPrefetch)) {
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
	            var bufferInfo = _bufferUtils2.default.bufferInfo(_this.media, pos, _hlsConfig2.default.maxBufferHole),
	                bufferLen = bufferInfo.len,
	                bufferEnd = bufferInfo.end,
	                fragPrevious = _this.fragPrevious,
	                maxBufLen = void 0;
	            if (_this.levels[level].hasOwnProperty('bitrate')) {
	                maxBufLen = Math.max(8 * _hlsConfig2.default.maxBufferSize / _this.levels[level].bitrate, _hlsConfig2.default.maxBufferLength);
	                maxBufLen = Math.min(maxBufLen, _hlsConfig2.default.maxMaxBufferLength);
	            } else {
	                maxBufLen = _hlsConfig2.default.maxBufferLength;
	            }
	            if (bufferLen < maxBufLen) {
	                _this.hls.playList.nextLoadLevel = level;
	                _this.level = level;
	                levelDetails = _this.levels[level].details;

	                if (typeof levelDetails === 'undefined' || levelDetails.live && _this.levelLastLoaded !== level) {
	                    _this.state = State.WAITING_LEVEL;
	                    break;
	                }
	                var fragments = levelDetails.fragments,
	                    fragLen = fragments.length,
	                    start = fragments[0].start,
	                    end = fragments[fragLen - 1].start + fragments[fragLen - 1].duration,
	                    frag = void 0;

	                if (levelDetails.live) {
	                    var maxLatency = _hlsConfig2.default.liveMaxLatencyDuration !== undefined ? _hlsConfig2.default.liveMaxLatencyDuration : _hlsConfig2.default.liveMaxLatencyDurationCount * levelDetails.targetduration;

	                    if (bufferEnd < Math.max(start, end - maxLatency)) {
	                        var targetLatency = _hlsConfig2.default.liveSyncDuration !== undefined ? _hlsConfig2.default.liveSyncDuration : _hlsConfig2.default.liveSyncDurationCount * levelDetails.targetduration;
	                        _this.seekAfterBuffered = start + Math.max(0, levelDetails.totalduration - targetLatency);
	                        _log2.default.log('buffer end: ' + bufferEnd + ' is located too far from the end of live sliding playlist, media position will be reseted to: ' + _this.seekAfterBuffered.toFixed(3));
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
	                                _log2.default.log('live playlist, switching playlist, load frag with next SN: ' + frag.sn);
	                            }
	                        }
	                        if (!frag) {
	                            frag = fragments[Math.min(fragLen - 1, Math.round(fragLen / 2))];
	                            _log2.default.log('live playlist, switching playlist, unknown, load middle frag : ' + frag.sn);
	                        }
	                    }
	                } else {
	                    if (bufferEnd < start) {
	                        frag = fragments[0];
	                    }
	                }
	                if (!frag) {
	                    (function () {
	                        var foundFrag = void 0;
	                        var maxFragLookUpTolerance = _hlsConfig2.default.maxFragLookUpTolerance;
	                        if (bufferEnd < end) {
	                            if (bufferEnd > end - maxFragLookUpTolerance) {
	                                maxFragLookUpTolerance = 0;
	                            }
	                            foundFrag = _utils2.default.search(fragments, function (candidate) {
	                                if (candidate.start + candidate.duration - maxFragLookUpTolerance <= bufferEnd) {
	                                    return 1;
	                                } else if (candidate.start - maxFragLookUpTolerance > bufferEnd) {
	                                    return -1;
	                                }
	                                return 0;
	                            });
	                        } else {
	                            foundFrag = fragments[fragLen - 1];
	                        }
	                        if (foundFrag) {
	                            frag = foundFrag;
	                            start = foundFrag.start;
	                            if (fragPrevious && frag.level === fragPrevious.level && frag.sn === fragPrevious.sn) {
	                                if (frag.sn < levelDetails.endSN) {
	                                    frag = fragments[frag.sn + 1 - levelDetails.startSN];
	                                    _log2.default.log('SN just loaded, load next one: ' + frag.sn);
	                                } else {
	                                    if (!levelDetails.live) {
	                                        _this._e.fire(_hlsEvent2.default.BUFFER_EOS);
	                                        _this.state = State.ENDED;
	                                    }
	                                    frag = null;
	                                }
	                            }
	                        }
	                    })();
	                }
	                if (frag) {
	                    if (frag.decryptdata.uri != null && frag.decryptdata.key == null) {
	                        _log2.default.log('Loading key for ' + frag.sn + ' of [' + levelDetails.startSN + ' ,' + levelDetails.endSN + '],level ' + level);
	                        _this.state = State.KEY_LOADING;
	                        _this.keyLoader.loadKey({ frag: frag });
	                        //_this._e.fire(HLSEvent.KEY_LOADING, {frag: frag});
	                    } else {
	                            _log2.default.log('Loading ' + frag.sn + ' of [' + levelDetails.startSN + ' ,' + levelDetails.endSN + '],level ' + level + ', currentTime:' + pos + ',bufferEnd:' + bufferEnd.toFixed(3));
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
	                                var maxThreshold = _hlsConfig2.default.fragLoadingLoopThreshold;
	                                if (frag.loadCounter > maxThreshold && Math.abs(_this.fragLoadIdx - frag.loadIdx) < maxThreshold) {
	                                    _this._e.fire(_hlsEvent2.default.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_LOOP_LOADING_ERROR, fatal: false, frag: frag });
	                                    return;
	                                }
	                            } else {
	                                frag.loadCounter = 1;
	                            }
	                            frag.loadIdx = _this.fragLoadIdx;
	                            _this.fragCurrent = frag;
	                            _this.startFragRequested = true;

	                            //_this._e.fire(HLSEvent.FRAG_LOADING, {frag: frag});
	                            _this.segLoader.fragLoad({ frag: frag });
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
	            var now = performance.now();
	            var retryDate = _this.retryDate;
	            var media = _this.media;
	            var isSeeking = media && media.seeking;
	            if (!retryDate || now >= retryDate || isSeeking) {
	                _log2.default.log('mediaController: retryDate reached, switch back to IDLE state');
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
	    var media = _this.media;
	    if (media) {
	        var readyState = media.readyState;
	        if (readyState) {
	            var targetSeekPosition = void 0,
	                currentTime = void 0;
	            var seekAfterBuffered = _this.seekAfterBuffered;
	            if (seekAfterBuffered) {
	                if (media.duration >= seekAfterBuffered) {
	                    targetSeekPosition = seekAfterBuffered;
	                    _this.seekAfterBuffered = undefined;
	                }
	            } else {
	                currentTime = media.currentTime;
	                if (!_this.loadedmetadata && media.buffered.length) {
	                    _this.loadedmetadata = true;
	                    if (!currentTime && currentTime !== _this.startPosition) {
	                        targetSeekPosition = _this.startPosition;
	                    }
	                }
	            }
	            if (targetSeekPosition) {
	                currentTime = targetSeekPosition;
	                _log2.default.log('target seek position:' + targetSeekPosition);
	            }
	            var bufferInfo = _bufferUtils2.default.bufferInfo(media, currentTime, 0),
	                expectedPlaying = !(media.paused || media.ended || media.seeking || readyState < 2),
	                jumpThreshold = 0.4,
	                playheadMoving = currentTime > media.playbackRate * _this.lastCurrentTime;

	            if (_this.stalled && playheadMoving) {
	                _this.stalled = false;
	                _log2.default.log('playback not stuck anymore @' + currentTime);
	            }
	            if (expectedPlaying && bufferInfo.len <= jumpThreshold) {
	                if (playheadMoving) {
	                    jumpThreshold = 0;
	                    _this.seekHoleNudgeDuration = 0;
	                } else {
	                    if (!_this.stalled) {
	                        _this.seekHoleNudgeDuration = 0;
	                        _log2.default.log('playback seems stuck @' + currentTime);
	                        _this._e.fire(_hlsEvent2.default.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.BUFFER_STALLED_ERROR, fatal: false });
	                        _this.stalled = true;
	                    } else {
	                        _this.seekHoleNudgeDuration += _hlsConfig2.default.seekHoleNudgeDuration;
	                    }
	                }
	                if (bufferInfo.len <= jumpThreshold) {
	                    var nextBufferStart = bufferInfo.nextStart,
	                        delta = nextBufferStart - currentTime;
	                    if (nextBufferStart && delta < _hlsConfig2.default.maxSeekHole && delta > 0 && !media.seeking) {
	                        _log2.default.log('adjust currentTime from ' + media.currentTime + ' to next buffered @ ' + nextBufferStart + ' + nudge ' + _this.seekHoleNudgeDuration);
	                        media.currentTime = nextBufferStart + _this.seekHoleNudgeDuration;
	                        _this._e.fire(_hlsEvent2.default.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.BUFFER_SEEK_OVER_HOLE, fatal: false });
	                    }
	                }
	            } else {
	                if (targetSeekPosition && media.currentTime !== targetSeekPosition) {
	                    _log2.default.log('adjust currentTime from ' + media.currentTime + ' to ' + targetSeekPosition);
	                    media.currentTime = targetSeekPosition;
	                }
	            }
	        }
	    }
	}

	function _checkFragmentChanged() {
	    var rangeCurrent = void 0,
	        currentTime = void 0,
	        video = _this.media;
	    if (video && video.seeking === false) {
	        currentTime = video.currentTime;
	        if (currentTime > video.playbackRate * _this.lastCurrentTime) {
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
	    var log = '',
	        len = r.length;
	    for (var i = 0; i < len; i++) {
	        log += '[' + r.start(i) + ',' + r.end(i) + ']';
	    }
	    return log;
	}
	exports.default = Stream;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Cray on 2016/5/9.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _decrypter = __webpack_require__(14);

	var _decrypter2 = _interopRequireDefault(_decrypter);

	var _tsdemuxer = __webpack_require__(17);

	var _tsdemuxer2 = _interopRequireDefault(_tsdemuxer);

	var _hlsEvent = __webpack_require__(5);

	var _hlsEvent2 = _interopRequireDefault(_hlsEvent);

	var _errors = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _this = void 0;

	var Demuxer = function () {
	    function Demuxer(hls) {
	        _classCallCheck(this, Demuxer);

	        this.hls = hls;
	        this._e = this.hls._e;
	        this.demuxer = null;

	        _this = this;
	    }

	    _createClass(Demuxer, [{
	        key: 'dispose',
	        value: function dispose() {
	            if (this.demuxer) {
	                this.demuxer.dispose();
	                this.demuxer = null;
	            }

	            if (this.decrypter) {
	                this.decrypter = null;
	            }
	        }
	    }, {
	        key: 'pushDecrypted',
	        value: function pushDecrypted(data, audioCodec, videoCodec, timeOffset, cc, level, sn, duration) {
	            var u8Data = new Uint8Array(data);
	            if (!this.demuxer) {
	                var hls = this.hls;
	                if (_tsdemuxer2.default.probe(u8Data)) {
	                    this.demuxer = new _tsdemuxer2.default(hls);
	                } else {
	                    this._e.fire(_hlsEvent2.default.ERROR, {
	                        type: _errors.ErrorTypes.MEDIA_ERROR,
	                        details: _errors.ErrorDetails.FRAG_PARSING_ERROR,
	                        fatal: true,
	                        reason: 'no demux matching with content found'
	                    });
	                    return;
	                }
	            }
	            this.demuxer.push(u8Data, audioCodec, videoCodec, timeOffset, cc, level, sn, duration);
	        }
	    }, {
	        key: 'push',
	        value: function push(data, audioCodec, videoCodec, timeOffset, cc, level, sn, duration, decryptdata) {
	            if (data.byteLength > 0 && decryptdata != null && decryptdata.key != null && decryptdata.method === 'AES-128') {
	                if (this.decrypter == null) {
	                    this.decrypter = new _decrypter2.default();
	                }

	                this.decrypter.decrypt(data, decryptdata.key, decryptdata.iv, function (decryptedData) {
	                    _this.pushDecrypted(decryptedData, audioCodec, videoCodec, timeOffset, cc, level, sn, duration);
	                });
	            } else {
	                this.pushDecrypted(data, audioCodec, videoCodec, timeOffset, cc, level, sn, duration);
	            }
	        }
	    }]);

	    return Demuxer;
	}();

	exports.default = Demuxer;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _aes128Decrypter = __webpack_require__(15);

	var _aes128Decrypter2 = _interopRequireDefault(_aes128Decrypter);

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Decrypter = function () {
	    function Decrypter() {
	        _classCallCheck(this, Decrypter);
	    }

	    _createClass(Decrypter, [{
	        key: 'decrypt',
	        value: function decrypt($data, $key, $iv, $callback) {
	            _log2.default.log('[Decrypter] decrypt aes128');

	            var view = void 0,
	                key = void 0,
	                iv = void 0,
	                decrypter = void 0;

	            view = new DataView($key.buffer);
	            key = new Uint32Array([view.getUint32(0), view.getUint32(4), view.getUint32(8), view.getUint32(12)]);

	            view = new DataView($iv.buffer);
	            iv = new Uint32Array([view.getUint32(0), view.getUint32(4), view.getUint32(8), view.getUint32(12)]);

	            decrypter = new _aes128Decrypter2.default(key, iv);
	            $callback(decrypter.decrypt($data).buffer);
	        }
	    }]);

	    return Decrypter;
	}();

	exports.default = Decrypter;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _aes = __webpack_require__(16);

	var _aes2 = _interopRequireDefault(_aes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AES128Decrypter = function () {
	  function AES128Decrypter(key, initVector) {
	    _classCallCheck(this, AES128Decrypter);

	    this.key = key;
	    this.iv = initVector;
	  }

	  /**
	   * Convert network-order (big-endian) bytes into their little-endian
	   * representation.
	   */


	  _createClass(AES128Decrypter, [{
	    key: 'ntoh',
	    value: function ntoh(word) {
	      return word << 24 | (word & 0xff00) << 8 | (word & 0xff0000) >> 8 | word >>> 24;
	    }

	    /**
	     * Decrypt bytes using AES-128 with CBC and PKCS#7 padding.
	     * @param encrypted {Uint8Array} the encrypted bytes
	     * @param key {Uint32Array} the bytes of the decryption key
	     * @param initVector {Uint32Array} the initialization vector (IV) to
	     * use for the first round of CBC.
	     * @return {Uint8Array} the decrypted bytes
	     *
	     * @see http://en.wikipedia.org/wiki/Advanced_Encryption_Standard
	     * @see http://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Cipher_Block_Chaining_.28CBC.29
	     * @see https://tools.ietf.org/html/rfc2315
	     */

	  }, {
	    key: 'doDecrypt',
	    value: function doDecrypt(encrypted, key, initVector) {
	      var
	      // word-level access to the encrypted bytes
	      encrypted32 = new Int32Array(encrypted.buffer, encrypted.byteOffset, encrypted.byteLength >> 2),
	          decipher = new _aes2.default(Array.prototype.slice.call(key)),


	      // byte and word-level access for the decrypted output
	      decrypted = new Uint8Array(encrypted.byteLength),
	          decrypted32 = new Int32Array(decrypted.buffer),


	      // temporary variables for working with the IV, encrypted, and
	      // decrypted data
	      init0,
	          init1,
	          init2,
	          init3,
	          encrypted0,
	          encrypted1,
	          encrypted2,
	          encrypted3,


	      // iteration variable
	      wordIx;

	      // pull out the words of the IV to ensure we don't modify the
	      // passed-in reference and easier access
	      init0 = ~ ~initVector[0];
	      init1 = ~ ~initVector[1];
	      init2 = ~ ~initVector[2];
	      init3 = ~ ~initVector[3];

	      // decrypt four word sequences, applying cipher-block chaining (CBC)
	      // to each decrypted block
	      for (wordIx = 0; wordIx < encrypted32.length; wordIx += 4) {
	        // convert big-endian (network order) words into little-endian
	        // (javascript order)
	        encrypted0 = ~ ~this.ntoh(encrypted32[wordIx]);
	        encrypted1 = ~ ~this.ntoh(encrypted32[wordIx + 1]);
	        encrypted2 = ~ ~this.ntoh(encrypted32[wordIx + 2]);
	        encrypted3 = ~ ~this.ntoh(encrypted32[wordIx + 3]);

	        // decrypt the block
	        decipher.decrypt(encrypted0, encrypted1, encrypted2, encrypted3, decrypted32, wordIx);

	        // XOR with the IV, and restore network byte-order to obtain the
	        // plaintext
	        decrypted32[wordIx] = this.ntoh(decrypted32[wordIx] ^ init0);
	        decrypted32[wordIx + 1] = this.ntoh(decrypted32[wordIx + 1] ^ init1);
	        decrypted32[wordIx + 2] = this.ntoh(decrypted32[wordIx + 2] ^ init2);
	        decrypted32[wordIx + 3] = this.ntoh(decrypted32[wordIx + 3] ^ init3);

	        // setup the IV for the next round
	        init0 = encrypted0;
	        init1 = encrypted1;
	        init2 = encrypted2;
	        init3 = encrypted3;
	      }

	      return decrypted;
	    }
	  }, {
	    key: 'localDecrypt',
	    value: function localDecrypt(encrypted, key, initVector, decrypted) {
	      var bytes = this.doDecrypt(encrypted, key, initVector);
	      decrypted.set(bytes, encrypted.byteOffset);
	    }
	  }, {
	    key: 'decrypt',
	    value: function decrypt(encrypted) {
	      var step = 4 * 8000,

	      //encrypted32 = new Int32Array(encrypted.buffer),
	      encrypted32 = new Int32Array(encrypted),
	          decrypted = new Uint8Array(encrypted.byteLength),
	          i = 0;

	      // split up the encryption job and do the individual chunks asynchronously
	      var key = this.key;
	      var initVector = this.iv;
	      this.localDecrypt(encrypted32.subarray(i, i + step), key, initVector, decrypted);

	      for (i = step; i < encrypted32.length; i += step) {
	        initVector = new Uint32Array([this.ntoh(encrypted32[i - 4]), this.ntoh(encrypted32[i - 3]), this.ntoh(encrypted32[i - 2]), this.ntoh(encrypted32[i - 1])]);
	        this.localDecrypt(encrypted32.subarray(i, i + step), key, initVector, decrypted);
	      }

	      return decrypted;
	    }
	  }]);

	  return AES128Decrypter;
	}();

	exports.default = AES128Decrypter;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	 *
	 * This file contains an adaptation of the AES decryption algorithm
	 * from the Standford Javascript Cryptography Library. That work is
	 * covered by the following copyright and permissions notice:
	 *
	 * Copyright 2009-2010 Emily Stark, Mike Hamburg, Dan Boneh.
	 * All rights reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are
	 * met:
	 *
	 * 1. Redistributions of source code must retain the above copyright
	 *    notice, this list of conditions and the following disclaimer.
	 *
	 * 2. Redistributions in binary form must reproduce the above
	 *    copyright notice, this list of conditions and the following
	 *    disclaimer in the documentation and/or other materials provided
	 *    with the distribution.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE AUTHORS ``AS IS'' AND ANY EXPRESS OR
	 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	 * DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR CONTRIBUTORS BE
	 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
	 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
	 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
	 * BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
	 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
	 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN
	 * IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 *
	 * The views and conclusions contained in the software and documentation
	 * are those of the authors and should not be interpreted as representing
	 * official policies, either expressed or implied, of the authors.
	 */

	var AES = function () {

	  /**
	   * Schedule out an AES key for both encryption and decryption. This
	   * is a low-level class. Use a cipher mode to do bulk encryption.
	   *
	   * @constructor
	   * @param key {Array} The key as an array of 4, 6 or 8 words.
	   */

	  function AES(key) {
	    _classCallCheck(this, AES);

	    /**
	     * The expanded S-box and inverse S-box tables. These will be computed
	     * on the client so that we don't have to send them down the wire.
	     *
	     * There are two tables, _tables[0] is for encryption and
	     * _tables[1] is for decryption.
	     *
	     * The first 4 sub-tables are the expanded S-box with MixColumns. The
	     * last (_tables[01][4]) is the S-box itself.
	     *
	     * @private
	     */
	    this._tables = [[[], [], [], [], []], [[], [], [], [], []]];

	    this._precompute();

	    var i,
	        j,
	        tmp,
	        encKey,
	        decKey,
	        sbox = this._tables[0][4],
	        decTable = this._tables[1],
	        keyLen = key.length,
	        rcon = 1;

	    if (keyLen !== 4 && keyLen !== 6 && keyLen !== 8) {
	      throw new Error('Invalid aes key size=' + keyLen);
	    }

	    encKey = key.slice(0);
	    decKey = [];
	    this._key = [encKey, decKey];

	    // schedule encryption keys
	    for (i = keyLen; i < 4 * keyLen + 28; i++) {
	      tmp = encKey[i - 1];

	      // apply sbox
	      if (i % keyLen === 0 || keyLen === 8 && i % keyLen === 4) {
	        tmp = sbox[tmp >>> 24] << 24 ^ sbox[tmp >> 16 & 255] << 16 ^ sbox[tmp >> 8 & 255] << 8 ^ sbox[tmp & 255];

	        // shift rows and add rcon
	        if (i % keyLen === 0) {
	          tmp = tmp << 8 ^ tmp >>> 24 ^ rcon << 24;
	          rcon = rcon << 1 ^ (rcon >> 7) * 283;
	        }
	      }

	      encKey[i] = encKey[i - keyLen] ^ tmp;
	    }

	    // schedule decryption keys
	    for (j = 0; i; j++, i--) {
	      tmp = encKey[j & 3 ? i : i - 4];
	      if (i <= 4 || j < 4) {
	        decKey[j] = tmp;
	      } else {
	        decKey[j] = decTable[0][sbox[tmp >>> 24]] ^ decTable[1][sbox[tmp >> 16 & 255]] ^ decTable[2][sbox[tmp >> 8 & 255]] ^ decTable[3][sbox[tmp & 255]];
	      }
	    }
	  }

	  /**
	   * Expand the S-box tables.
	   *
	   * @private
	   */


	  _createClass(AES, [{
	    key: '_precompute',
	    value: function _precompute() {
	      var encTable = this._tables[0],
	          decTable = this._tables[1],
	          sbox = encTable[4],
	          sboxInv = decTable[4],
	          i,
	          x,
	          xInv,
	          d = [],
	          th = [],
	          x2,
	          x4,
	          x8,
	          s,
	          tEnc,
	          tDec;

	      // Compute double and third tables
	      for (i = 0; i < 256; i++) {
	        th[(d[i] = i << 1 ^ (i >> 7) * 283) ^ i] = i;
	      }

	      for (x = xInv = 0; !sbox[x]; x ^= x2 || 1, xInv = th[xInv] || 1) {
	        // Compute sbox
	        s = xInv ^ xInv << 1 ^ xInv << 2 ^ xInv << 3 ^ xInv << 4;
	        s = s >> 8 ^ s & 255 ^ 99;
	        sbox[x] = s;
	        sboxInv[s] = x;

	        // Compute MixColumns
	        x8 = d[x4 = d[x2 = d[x]]];
	        tDec = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
	        tEnc = d[s] * 0x101 ^ s * 0x1010100;

	        for (i = 0; i < 4; i++) {
	          encTable[i][x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
	          decTable[i][s] = tDec = tDec << 24 ^ tDec >>> 8;
	        }
	      }

	      // Compactify. Considerable speedup on Firefox.
	      for (i = 0; i < 5; i++) {
	        encTable[i] = encTable[i].slice(0);
	        decTable[i] = decTable[i].slice(0);
	      }
	    }

	    /**
	     * Decrypt 16 bytes, specified as four 32-bit words.
	     * @param encrypted0 {number} the first word to decrypt
	     * @param encrypted1 {number} the second word to decrypt
	     * @param encrypted2 {number} the third word to decrypt
	     * @param encrypted3 {number} the fourth word to decrypt
	     * @param out {Int32Array} the array to write the decrypted words
	     * into
	     * @param offset {number} the offset into the output array to start
	     * writing results
	     * @return {Array} The plaintext.
	     */

	  }, {
	    key: 'decrypt',
	    value: function decrypt(encrypted0, encrypted1, encrypted2, encrypted3, out, offset) {
	      var key = this._key[1],

	      // state variables a,b,c,d are loaded with pre-whitened data
	      a = encrypted0 ^ key[0],
	          b = encrypted3 ^ key[1],
	          c = encrypted2 ^ key[2],
	          d = encrypted1 ^ key[3],
	          a2,
	          b2,
	          c2,
	          nInnerRounds = key.length / 4 - 2,
	          // key.length === 2 ?
	      i,
	          kIndex = 4,
	          table = this._tables[1],


	      // load up the tables
	      table0 = table[0],
	          table1 = table[1],
	          table2 = table[2],
	          table3 = table[3],
	          sbox = table[4];

	      // Inner rounds. Cribbed from OpenSSL.
	      for (i = 0; i < nInnerRounds; i++) {
	        a2 = table0[a >>> 24] ^ table1[b >> 16 & 255] ^ table2[c >> 8 & 255] ^ table3[d & 255] ^ key[kIndex];
	        b2 = table0[b >>> 24] ^ table1[c >> 16 & 255] ^ table2[d >> 8 & 255] ^ table3[a & 255] ^ key[kIndex + 1];
	        c2 = table0[c >>> 24] ^ table1[d >> 16 & 255] ^ table2[a >> 8 & 255] ^ table3[b & 255] ^ key[kIndex + 2];
	        d = table0[d >>> 24] ^ table1[a >> 16 & 255] ^ table2[b >> 8 & 255] ^ table3[c & 255] ^ key[kIndex + 3];
	        kIndex += 4;
	        a = a2;b = b2;c = c2;
	      }

	      // Last round.
	      for (i = 0; i < 4; i++) {
	        out[(3 & -i) + offset] = sbox[a >>> 24] << 24 ^ sbox[b >> 16 & 255] << 16 ^ sbox[c >> 8 & 255] << 8 ^ sbox[d & 255] ^ key[kIndex++];
	        a2 = a;a = b;b = c;c = d;d = a2;
	      }
	    }
	  }]);

	  return AES;
	}();

	exports.default = AES;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * highly optimized TS demuxer:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * parse PAT, PMT
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * extract PES packet from audio and video PIDs
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * extract AVC/H264 NAL units and AAC/ADTS samples from PES packet
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * trigger the remuxer upon parsing completion
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * it also tries to workaround as best as it can audio codec switch (HE-AAC to AAC and vice versa), without having to restart the MediaSource.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * it also controls the remuxing process :
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * upon discontinuity or level switch detection, it will also notifies the remuxer so that it can reset its state.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _adts = __webpack_require__(18);

	var _adts2 = _interopRequireDefault(_adts);

	var _hlsEvent = __webpack_require__(5);

	var _hlsEvent2 = _interopRequireDefault(_hlsEvent);

	var _expGolomb = __webpack_require__(19);

	var _expGolomb2 = _interopRequireDefault(_expGolomb);

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	var _errors = __webpack_require__(10);

	var _mp4Remuxer = __webpack_require__(20);

	var _mp4Remuxer2 = _interopRequireDefault(_mp4Remuxer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TSDemuxer = function () {
	    function TSDemuxer(hls) {
	        _classCallCheck(this, TSDemuxer);

	        this.hls = hls;
	        this._e = this.hls._e;
	        this.lastCC = 0;
	        this.remuxer = new _mp4Remuxer2.default(hls);
	    }

	    _createClass(TSDemuxer, [{
	        key: 'switchLevel',
	        value: function switchLevel() {
	            this.pmtParsed = false;
	            this._pmtId = -1;
	            this.lastAacPTS = null;
	            this.aacOverFlow = null;
	            this._avcTrack = {
	                container: 'video/mp2t',
	                type: 'video',
	                id: -1,
	                sequenceNumber: 0,
	                samples: [],
	                len: 0,
	                nbNalu: 0
	            };
	            this._aacTrack = { container: 'video/mp2t', type: 'audio', id: -1, sequenceNumber: 0, samples: [], len: 0 };
	            this._id3Track = { type: 'id3', id: -1, sequenceNumber: 0, samples: [], len: 0 };
	            this._txtTrack = { type: 'text', id: -1, sequenceNumber: 0, samples: [], len: 0 };
	            this.remuxer.switchLevel();
	        }
	    }, {
	        key: 'insertDiscontinuity',
	        value: function insertDiscontinuity() {
	            this.switchLevel();
	            this.remuxer.insertDiscontinuity();
	        }
	    }, {
	        key: 'push',
	        value: function push(data, audioCodec, videoCodec, timeOffset, cc, level, sn, duration) {
	            var avcData,
	                aacData,
	                id3Data,
	                start,
	                len = data.length,
	                stt,
	                pid,
	                atf,
	                offset,
	                codecsOnly = this.remuxer.passthrough;

	            this.audioCodec = audioCodec;
	            this.videoCodec = videoCodec;
	            this.timeOffset = timeOffset;
	            this._duration = duration;
	            this.contiguous = false;
	            if (cc !== this.lastCC) {
	                _log2.default.log('discontinuity detected');
	                this.insertDiscontinuity();
	                this.lastCC = cc;
	            } else if (level !== this.lastLevel) {
	                _log2.default.log('level switch detected');
	                this.switchLevel();
	                this.lastLevel = level;
	            } else if (sn === this.lastSN + 1) {
	                this.contiguous = true;
	            }
	            this.lastSN = sn;

	            if (!this.contiguous) {
	                // flush any partial content
	                this.aacOverFlow = null;
	            }

	            var pmtParsed = this.pmtParsed,
	                avcId = this._avcTrack.id,
	                aacId = this._aacTrack.id,
	                id3Id = this._id3Track.id;

	            len -= len % 188;
	            for (start = 0; start < len; start += 188) {
	                if (data[start] === 0x47) {
	                    stt = !!(data[start + 1] & 0x40);
	                    pid = ((data[start + 1] & 0x1f) << 8) + data[start + 2];
	                    atf = (data[start + 3] & 0x30) >> 4;
	                    if (atf > 1) {
	                        offset = start + 5 + data[start + 4];
	                        if (offset === start + 188) {
	                            continue;
	                        }
	                    } else {
	                        offset = start + 4;
	                    }
	                    if (pmtParsed) {
	                        if (pid === avcId) {
	                            if (stt) {
	                                if (avcData) {
	                                    this._parseAVCPES(this._parsePES(avcData));
	                                    if (codecsOnly) {
	                                        if (this._avcTrack.codec && (aacId === -1 || this._aacTrack.codec)) {
	                                            this.remux(data);
	                                            return;
	                                        }
	                                    }
	                                }
	                                avcData = { data: [], size: 0 };
	                            }
	                            if (avcData) {
	                                avcData.data.push(data.subarray(offset, start + 188));
	                                avcData.size += start + 188 - offset;
	                            }
	                        } else if (pid === aacId) {
	                            if (stt) {
	                                if (aacData) {
	                                    this._parseAACPES(this._parsePES(aacData));
	                                    if (codecsOnly) {
	                                        if (this._aacTrack.codec && (avcId === -1 || this._avcTrack.codec)) {
	                                            this.remux(data);
	                                            return;
	                                        }
	                                    }
	                                }
	                                aacData = { data: [], size: 0 };
	                            }
	                            if (aacData) {
	                                aacData.data.push(data.subarray(offset, start + 188));
	                                aacData.size += start + 188 - offset;
	                            }
	                        } else if (pid === id3Id) {
	                            if (stt) {
	                                if (id3Data) {
	                                    this._parseID3PES(this._parsePES(id3Data));
	                                }
	                                id3Data = { data: [], size: 0 };
	                            }
	                            if (id3Data) {
	                                id3Data.data.push(data.subarray(offset, start + 188));
	                                id3Data.size += start + 188 - offset;
	                            }
	                        }
	                    } else {
	                        if (stt) {
	                            offset += data[offset] + 1;
	                        }
	                        if (pid === 0) {
	                            this._parsePAT(data, offset);
	                        } else if (pid === this._pmtId) {
	                            this._parsePMT(data, offset);
	                            pmtParsed = this.pmtParsed = true;
	                            avcId = this._avcTrack.id;
	                            aacId = this._aacTrack.id;
	                            id3Id = this._id3Track.id;
	                        }
	                    }
	                } else {
	                    this._e.fire(_hlsEvent2.default.ERROR, {
	                        type: _errors.ErrorTypes.MEDIA_ERROR,
	                        details: _errors.ErrorDetails.FRAG_PARSING_ERROR,
	                        fatal: false,
	                        reason: 'TS packet did not start with 0x47'
	                    });
	                }
	            }
	            if (avcData) {
	                this._parseAVCPES(this._parsePES(avcData));
	            }
	            if (aacData) {
	                this._parseAACPES(this._parsePES(aacData));
	            }
	            if (id3Data) {
	                this._parseID3PES(this._parsePES(id3Data));
	            }
	            this.remux(null);
	        }
	    }, {
	        key: 'remux',
	        value: function remux(data) {
	            this.remuxer.remux(this._aacTrack, this._avcTrack, this._id3Track, this._txtTrack, this.timeOffset, this.contiguous, data);
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            this.switchLevel();
	            this._initPTS = this._initDTS = undefined;
	            this._duration = 0;
	        }
	    }, {
	        key: '_parsePAT',
	        value: function _parsePAT(data, offset) {
	            this._pmtId = (data[offset + 10] & 0x1F) << 8 | data[offset + 11];
	        }
	    }, {
	        key: '_parsePMT',
	        value: function _parsePMT(data, offset) {
	            var sectionLength, tableEnd, programInfoLength, pid;
	            sectionLength = (data[offset + 1] & 0x0f) << 8 | data[offset + 2];
	            tableEnd = offset + 3 + sectionLength - 4;
	            programInfoLength = (data[offset + 10] & 0x0f) << 8 | data[offset + 11];
	            offset += 12 + programInfoLength;
	            while (offset < tableEnd) {
	                pid = (data[offset + 1] & 0x1F) << 8 | data[offset + 2];
	                switch (data[offset]) {
	                    case 0x0f:
	                        this._aacTrack.id = pid;
	                        break;
	                    case 0x15:
	                        this._id3Track.id = pid;
	                        break;
	                    case 0x1b:
	                        this._avcTrack.id = pid;
	                        break;
	                    default:
	                        _log2.default.log('unkown stream type:' + data[offset]);
	                        break;
	                }
	                offset += ((data[offset + 3] & 0x0F) << 8 | data[offset + 4]) + 5;
	            }
	        }
	    }, {
	        key: '_parsePES',
	        value: function _parsePES(stream) {
	            var i = 0,
	                frag,
	                pesFlags,
	                pesPrefix,
	                pesLen,
	                pesHdrLen,
	                pesData,
	                pesPts,
	                pesDts,
	                payloadStartOffset,
	                data = stream.data;
	            frag = data[0];
	            pesPrefix = (frag[0] << 16) + (frag[1] << 8) + frag[2];
	            if (pesPrefix === 1) {
	                pesLen = (frag[4] << 8) + frag[5];
	                pesFlags = frag[7];
	                if (pesFlags & 0xC0) {
	                    pesPts = (frag[9] & 0x0E) * 536870912 + // 1 << 29
	                    (frag[10] & 0xFF) * 4194304 + // 1 << 22
	                    (frag[11] & 0xFE) * 16384 + // 1 << 14
	                    (frag[12] & 0xFF) * 128 + // 1 << 7
	                    (frag[13] & 0xFE) / 2;
	                    if (pesPts > 4294967295) {
	                        // decrement 2^33
	                        pesPts -= 8589934592;
	                    }
	                    if (pesFlags & 0x40) {
	                        pesDts = (frag[14] & 0x0E) * 536870912 + // 1 << 29
	                        (frag[15] & 0xFF) * 4194304 + // 1 << 22
	                        (frag[16] & 0xFE) * 16384 + // 1 << 14
	                        (frag[17] & 0xFF) * 128 + // 1 << 7
	                        (frag[18] & 0xFE) / 2;
	                        if (pesDts > 4294967295) {
	                            pesDts -= 8589934592;
	                        }
	                    } else {
	                        pesDts = pesPts;
	                    }
	                }
	                pesHdrLen = frag[8];
	                payloadStartOffset = pesHdrLen + 9;

	                stream.size -= payloadStartOffset;
	                //reassemble PES packet
	                pesData = new Uint8Array(stream.size);
	                while (data.length) {
	                    frag = data.shift();
	                    var len = frag.byteLength;
	                    if (payloadStartOffset) {
	                        if (payloadStartOffset > len) {
	                            payloadStartOffset -= len;
	                            continue;
	                        } else {
	                            frag = frag.subarray(payloadStartOffset);
	                            len -= payloadStartOffset;
	                            payloadStartOffset = 0;
	                        }
	                    }
	                    pesData.set(frag, i);
	                    i += len;
	                }
	                return { data: pesData, pts: pesPts, dts: pesDts, len: pesLen };
	            } else {
	                return null;
	            }
	        }
	    }, {
	        key: '_parseAVCPES',
	        value: function _parseAVCPES(pes) {
	            var _this = this;

	            var track = this._avcTrack,
	                samples = track.samples,
	                units = this._parseAVCNALu(pes.data),
	                units2 = [],
	                debug = false,
	                key = false,
	                length = 0,
	                expGolombDecoder,
	                avcSample,
	                push,
	                i;
	            if (units.length === 0 && samples.length > 0) {
	                var lastavcSample = samples[samples.length - 1];
	                var lastUnit = lastavcSample.units.units[lastavcSample.units.units.length - 1];
	                var tmp = new Uint8Array(lastUnit.data.byteLength + pes.data.byteLength);
	                tmp.set(lastUnit.data, 0);
	                tmp.set(pes.data, lastUnit.data.byteLength);
	                lastUnit.data = tmp;
	                lastavcSample.units.length += pes.data.byteLength;
	                track.len += pes.data.byteLength;
	            }
	            pes.data = null;
	            var debugString = '';

	            units.forEach(function (unit) {
	                switch (unit.type) {
	                    //NDR
	                    case 1:
	                        push = true;
	                        if (debug) {
	                            debugString += 'NDR ';
	                        }
	                        break;
	                    //IDR
	                    case 5:
	                        push = true;
	                        if (debug) {
	                            debugString += 'IDR ';
	                        }
	                        key = true;
	                        break;
	                    //SEI
	                    case 6:
	                        push = true;
	                        if (debug) {
	                            debugString += 'SEI ';
	                        }
	                        expGolombDecoder = new _expGolomb2.default(unit.data);

	                        expGolombDecoder.readUByte();

	                        var payloadType = expGolombDecoder.readUByte();

	                        if (payloadType === 4) {
	                            var payloadSize = 0;

	                            do {
	                                payloadSize = expGolombDecoder.readUByte();
	                            } while (payloadSize === 255);

	                            var countryCode = expGolombDecoder.readUByte();

	                            if (countryCode === 181) {
	                                var providerCode = expGolombDecoder.readUShort();

	                                if (providerCode === 49) {
	                                    var userStructure = expGolombDecoder.readUInt();

	                                    if (userStructure === 0x47413934) {
	                                        var userDataType = expGolombDecoder.readUByte();

	                                        // Raw CEA-608 bytes wrapped in CEA-708 packet
	                                        if (userDataType === 3) {
	                                            var firstByte = expGolombDecoder.readUByte();
	                                            var secondByte = expGolombDecoder.readUByte();

	                                            var totalCCs = 31 & firstByte;
	                                            var byteArray = [firstByte, secondByte];

	                                            for (i = 0; i < totalCCs; i++) {
	                                                // 3 bytes per CC
	                                                byteArray.push(expGolombDecoder.readUByte());
	                                                byteArray.push(expGolombDecoder.readUByte());
	                                                byteArray.push(expGolombDecoder.readUByte());
	                                            }

	                                            _this._txtTrack.samples.push({ type: 3, pts: pes.pts, bytes: byteArray });
	                                        }
	                                    }
	                                }
	                            }
	                        }
	                        break;
	                    //SPS
	                    case 7:
	                        push = true;
	                        if (debug) {
	                            debugString += 'SPS ';
	                        }
	                        if (!track.sps) {
	                            expGolombDecoder = new _expGolomb2.default(unit.data);
	                            var config = expGolombDecoder.readSPS();
	                            track.width = config.width;
	                            track.height = config.height;
	                            track.sps = [unit.data];
	                            track.duration = _this._duration;
	                            var codecarray = unit.data.subarray(1, 4);
	                            var codecstring = 'avc1.';
	                            for (i = 0; i < 3; i++) {
	                                var h = codecarray[i].toString(16);
	                                if (h.length < 2) {
	                                    h = '0' + h;
	                                }
	                                codecstring += h;
	                            }
	                            track.codec = codecstring;
	                        }
	                        break;
	                    //PPS
	                    case 8:
	                        push = true;
	                        if (debug) {
	                            debugString += 'PPS ';
	                        }
	                        if (!track.pps) {
	                            track.pps = [unit.data];
	                        }
	                        break;
	                    case 9:
	                        push = false;
	                        if (debug) {
	                            debugString += 'AUD ';
	                        }
	                        break;
	                    default:
	                        push = false;
	                        debugString += 'unknown NAL ' + unit.type + ' ';
	                        break;
	                }
	                if (push) {
	                    units2.push(unit);
	                    length += unit.data.byteLength;
	                }
	            });
	            if (debug || debugString.length) {
	                _log2.default.log(debugString);
	            }
	            //build sample from PES
	            // Annex B to MP4 conversion to be done
	            if (units2.length) {
	                // only push AVC sample if keyframe already found. browsers expect a keyframe at first to start decoding
	                if (key === true || track.sps) {
	                    avcSample = { units: { units: units2, length: length }, pts: pes.pts, dts: pes.dts, key: key };
	                    samples.push(avcSample);
	                    track.len += length;
	                    track.nbNalu += units2.length;
	                }
	            }
	        }
	    }, {
	        key: '_parseAVCNALu',
	        value: function _parseAVCNALu(array) {
	            var i = 0,
	                len = array.byteLength,
	                value,
	                overflow,
	                state = 0;
	            var units = [],
	                unit,
	                unitType,
	                lastUnitStart,
	                lastUnitType;
	            //Logger.log('PES:' + Hex.hexDump(array));
	            while (i < len) {
	                value = array[i++];
	                // finding 3 or 4-byte start codes (00 00 01 OR 00 00 00 01)
	                switch (state) {
	                    case 0:
	                        if (value === 0) {
	                            state = 1;
	                        }
	                        break;
	                    case 1:
	                        if (value === 0) {
	                            state = 2;
	                        } else {
	                            state = 0;
	                        }
	                        break;
	                    case 2:
	                    case 3:
	                        if (value === 0) {
	                            state = 3;
	                        } else if (value === 1 && i < len) {
	                            unitType = array[i] & 0x1f;
	                            //Logger.log('find NALU @ offset:' + i + ',type:' + unitType);
	                            if (lastUnitStart) {
	                                unit = { data: array.subarray(lastUnitStart, i - state - 1), type: lastUnitType };
	                                //Logger.log('pushing NALU, type/size:' + unit.type + '/' + unit.data.byteLength);
	                                units.push(unit);
	                            } else {
	                                // If NAL units are not starting right at the beginning of the PES packet, push preceding data into previous NAL unit.
	                                overflow = i - state - 1;
	                                if (overflow) {
	                                    var track = this._avcTrack,
	                                        samples = track.samples;
	                                    //Logger.log('first NALU found with overflow:' + overflow);
	                                    if (samples.length) {
	                                        var lastavcSample = samples[samples.length - 1],
	                                            lastUnits = lastavcSample.units.units,
	                                            lastUnit = lastUnits[lastUnits.length - 1],
	                                            tmp = new Uint8Array(lastUnit.data.byteLength + overflow);
	                                        tmp.set(lastUnit.data, 0);
	                                        tmp.set(array.subarray(0, overflow), lastUnit.data.byteLength);
	                                        lastUnit.data = tmp;
	                                        lastavcSample.units.length += overflow;
	                                        track.len += overflow;
	                                    }
	                                }
	                            }
	                            lastUnitStart = i;
	                            lastUnitType = unitType;
	                            state = 0;
	                        } else {
	                            state = 0;
	                        }
	                        break;
	                    default:
	                        break;
	                }
	            }
	            if (lastUnitStart) {
	                unit = { data: array.subarray(lastUnitStart, len), type: lastUnitType };
	                units.push(unit);
	                //Logger.log('pushing NALU, type/size:' + unit.type + '/' + unit.data.byteLength);
	            }
	            return units;
	        }
	    }, {
	        key: '_parseAACPES',
	        value: function _parseAACPES(pes) {
	            var track = this._aacTrack,
	                data = pes.data,
	                pts = pes.pts,
	                startOffset = 0,
	                duration = this._duration,
	                audioCodec = this.audioCodec,
	                aacOverFlow = this.aacOverFlow,
	                lastAacPTS = this.lastAacPTS,
	                config,
	                frameLength,
	                frameDuration,
	                frameIndex,
	                offset,
	                headerLength,
	                stamp,
	                len,
	                aacSample;
	            if (aacOverFlow) {
	                var tmp = new Uint8Array(aacOverFlow.byteLength + data.byteLength);
	                tmp.set(aacOverFlow, 0);
	                tmp.set(data, aacOverFlow.byteLength);
	                //Logger.log(`AAC: append overflowing ${aacOverFlow.byteLength} bytes to beginning of new PES`);
	                data = tmp;
	            }
	            // look for ADTS header (0xFFFx)
	            for (offset = startOffset, len = data.length; offset < len - 1; offset++) {
	                if (data[offset] === 0xff && (data[offset + 1] & 0xf0) === 0xf0) {
	                    break;
	                }
	            }
	            if (offset) {
	                var reason, fatal;
	                if (offset < len - 1) {
	                    reason = 'AAC PES did not start with ADTS header,offset:' + offset;
	                    fatal = false;
	                } else {
	                    reason = 'no ADTS header found in AAC PES';
	                    fatal = true;
	                }
	                this._e.fire(_hlsEvent2.default.ERROR, {
	                    type: _errors.ErrorTypes.MEDIA_ERROR,
	                    details: _errors.ErrorDetails.FRAG_PARSING_ERROR,
	                    fatal: fatal,
	                    reason: reason
	                });
	                if (fatal) {
	                    return;
	                }
	            }
	            if (!track.audiosamplerate) {
	                config = _adts2.default.getAudioConfig(this.observer, data, offset, audioCodec);
	                track.config = config.config;
	                track.audiosamplerate = config.samplerate;
	                track.channelCount = config.channelCount;
	                track.codec = config.codec;
	                track.duration = duration;
	                _log2.default.log('parsed codec:' + track.codec + ',rate:' + config.samplerate + ',nb channel:' + config.channelCount);
	            }
	            frameIndex = 0;
	            frameDuration = 1024 * 90000 / track.audiosamplerate;

	            if (aacOverFlow && lastAacPTS) {
	                var newPTS = lastAacPTS + frameDuration;
	                if (Math.abs(newPTS - pts) > 1) {
	                    _log2.default.log('AAC: align PTS for overlapping frames by ' + Math.round((newPTS - pts) / 90));
	                    pts = newPTS;
	                }
	            }

	            while (offset + 5 < len) {
	                headerLength = !!(data[offset + 1] & 0x01) ? 7 : 9;
	                // retrieve frame size
	                frameLength = (data[offset + 3] & 0x03) << 11 | data[offset + 4] << 3 | (data[offset + 5] & 0xE0) >>> 5;
	                frameLength -= headerLength;
	                //stamp = pes.pts;

	                if (frameLength > 0 && offset + headerLength + frameLength <= len) {
	                    stamp = pts + frameIndex * frameDuration;
	                    aacSample = {
	                        unit: data.subarray(offset + headerLength, offset + headerLength + frameLength),
	                        pts: stamp,
	                        dts: stamp
	                    };
	                    track.samples.push(aacSample);
	                    track.len += frameLength;
	                    offset += frameLength + headerLength;
	                    frameIndex++;
	                    // look for ADTS header (0xFFFx)
	                    for (; offset < len - 1; offset++) {
	                        if (data[offset] === 0xff && (data[offset + 1] & 0xf0) === 0xf0) {
	                            break;
	                        }
	                    }
	                } else {
	                    break;
	                }
	            }
	            if (offset < len) {
	                aacOverFlow = data.subarray(offset, len);
	            } else {
	                aacOverFlow = null;
	            }
	            this.aacOverFlow = aacOverFlow;
	            this.lastAacPTS = stamp;
	        }
	    }, {
	        key: '_parseID3PES',
	        value: function _parseID3PES(pes) {
	            this._id3Track.samples.push(pes);
	        }
	    }], [{
	        key: 'probe',
	        value: function probe(data) {
	            if (data.length >= 3 * 188 && data[0] === 0x47 && data[188] === 0x47 && data[2 * 188] === 0x47) {
	                return true;
	            } else {
	                return false;
	            }
	        }
	    }]);

	    return TSDemuxer;
	}();

	exports.default = TSDemuxer;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	var _errors = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ADTS = function () {
	  function ADTS() {
	    _classCallCheck(this, ADTS);
	  }

	  _createClass(ADTS, null, [{
	    key: 'getAudioConfig',
	    value: function getAudioConfig(observer, data, offset, audioCodec) {
	      var adtsObjectType,
	          // :int
	      adtsSampleingIndex,
	          // :int
	      adtsExtensionSampleingIndex,
	          // :int
	      adtsChanelConfig,
	          // :int
	      config,
	          userAgent = navigator.userAgent.toLowerCase(),
	          adtsSampleingRates = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
	      // byte 2
	      adtsObjectType = ((data[offset + 2] & 0xC0) >>> 6) + 1;
	      adtsSampleingIndex = (data[offset + 2] & 0x3C) >>> 2;
	      if (adtsSampleingIndex > adtsSampleingRates.length - 1) {
	        observer.trigger(Event.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_PARSING_ERROR, fatal: true, reason: 'invalid ADTS sampling index:' + adtsSampleingIndex });
	        return;
	      }
	      adtsChanelConfig = (data[offset + 2] & 0x01) << 2;
	      // byte 3
	      adtsChanelConfig |= (data[offset + 3] & 0xC0) >>> 6;
	      _log2.default.log('manifest codec:' + audioCodec + ',ADTS data:type:' + adtsObjectType + ',sampleingIndex:' + adtsSampleingIndex + '[' + adtsSampleingRates[adtsSampleingIndex] + 'Hz],channelConfig:' + adtsChanelConfig);
	      // firefox: freq less than 24kHz = AAC SBR (HE-AAC)
	      if (userAgent.indexOf('firefox') !== -1) {
	        if (adtsSampleingIndex >= 6) {
	          adtsObjectType = 5;
	          config = new Array(4);
	          // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
	          // there is a factor 2 between frame sample rate and output sample rate
	          // multiply frequency by 2 (see table below, equivalent to substract 3)
	          adtsExtensionSampleingIndex = adtsSampleingIndex - 3;
	        } else {
	          adtsObjectType = 2;
	          config = new Array(2);
	          adtsExtensionSampleingIndex = adtsSampleingIndex;
	        }
	        // Android : always use AAC
	      } else if (userAgent.indexOf('android') !== -1) {
	          adtsObjectType = 2;
	          config = new Array(2);
	          adtsExtensionSampleingIndex = adtsSampleingIndex;
	        } else {
	          /*  for other browsers (chrome ...)
	              always force audio type to be HE-AAC SBR, as some browsers do not support audio codec switch properly (like Chrome ...)
	          */
	          adtsObjectType = 5;
	          config = new Array(4);
	          // if (manifest codec is HE-AAC or HE-AACv2) OR (manifest codec not specified AND frequency less than 24kHz)
	          if (audioCodec && (audioCodec.indexOf('mp4a.40.29') !== -1 || audioCodec.indexOf('mp4a.40.5') !== -1) || !audioCodec && adtsSampleingIndex >= 6) {
	            // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
	            // there is a factor 2 between frame sample rate and output sample rate
	            // multiply frequency by 2 (see table below, equivalent to substract 3)
	            adtsExtensionSampleingIndex = adtsSampleingIndex - 3;
	          } else {
	            // if (manifest codec is AAC) AND (frequency less than 24kHz AND nb channel is 1) OR (manifest codec not specified and mono audio)
	            // Chrome fails to play back with low frequency AAC LC mono when initialized with HE-AAC.  This is not a problem with stereo.
	            if (audioCodec && audioCodec.indexOf('mp4a.40.2') !== -1 && adtsSampleingIndex >= 6 && adtsChanelConfig === 1 || !audioCodec && adtsChanelConfig === 1) {
	              adtsObjectType = 2;
	              config = new Array(2);
	            }
	            adtsExtensionSampleingIndex = adtsSampleingIndex;
	          }
	        }
	      /* refer to http://wiki.multimedia.cx/index.php?title=MPEG-4_Audio#Audio_Specific_Config
	          ISO 14496-3 (AAC).pdf - Table 1.13 — Syntax of AudioSpecificConfig()
	        Audio Profile / Audio Object Type
	        0: Null
	        1: AAC Main
	        2: AAC LC (Low Complexity)
	        3: AAC SSR (Scalable Sample Rate)
	        4: AAC LTP (Long Term Prediction)
	        5: SBR (Spectral Band Replication)
	        6: AAC Scalable
	       sampling freq
	        0: 96000 Hz
	        1: 88200 Hz
	        2: 64000 Hz
	        3: 48000 Hz
	        4: 44100 Hz
	        5: 32000 Hz
	        6: 24000 Hz
	        7: 22050 Hz
	        8: 16000 Hz
	        9: 12000 Hz
	        10: 11025 Hz
	        11: 8000 Hz
	        12: 7350 Hz
	        13: Reserved
	        14: Reserved
	        15: frequency is written explictly
	        Channel Configurations
	        These are the channel configurations:
	        0: Defined in AOT Specifc Config
	        1: 1 channel: front-center
	        2: 2 channels: front-left, front-right
	      */
	      // audioObjectType = profile => profile, the MPEG-4 Audio Object Type minus 1
	      config[0] = adtsObjectType << 3;
	      // samplingFrequencyIndex
	      config[0] |= (adtsSampleingIndex & 0x0E) >> 1;
	      config[1] |= (adtsSampleingIndex & 0x01) << 7;
	      // channelConfiguration
	      config[1] |= adtsChanelConfig << 3;
	      if (adtsObjectType === 5) {
	        // adtsExtensionSampleingIndex
	        config[1] |= (adtsExtensionSampleingIndex & 0x0E) >> 1;
	        config[2] = (adtsExtensionSampleingIndex & 0x01) << 7;
	        // adtsObjectType (force to 2, chrome is checking that object type is less than 5 ???
	        //    https://chromium.googlesource.com/chromium/src.git/+/master/media/formats/mp4/aac.cc
	        config[2] |= 2 << 2;
	        config[3] = 0;
	      }
	      return { config: config, samplerate: adtsSampleingRates[adtsSampleingIndex], channelCount: adtsChanelConfig, codec: 'mp4a.40.' + adtsObjectType };
	    }
	  }]);

	  return ADTS;
	}();

	exports.default = ADTS;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ExpGolomb = function () {
	  function ExpGolomb(data) {
	    _classCallCheck(this, ExpGolomb);

	    this.data = data;
	    // the number of bytes left to examine in this.data
	    this.bytesAvailable = this.data.byteLength;
	    // the current word being examined
	    this.word = 0; // :uint
	    // the number of bits left to examine in the current word
	    this.bitsAvailable = 0; // :uint
	  }

	  // ():void


	  _createClass(ExpGolomb, [{
	    key: 'loadWord',
	    value: function loadWord() {
	      var position = this.data.byteLength - this.bytesAvailable,
	          workingBytes = new Uint8Array(4),
	          availableBytes = Math.min(4, this.bytesAvailable);
	      if (availableBytes === 0) {
	        throw new Error('no bytes available');
	      }
	      workingBytes.set(this.data.subarray(position, position + availableBytes));
	      this.word = new DataView(workingBytes.buffer).getUint32(0);
	      // track the amount of this.data that has been processed
	      this.bitsAvailable = availableBytes * 8;
	      this.bytesAvailable -= availableBytes;
	    }

	    // (count:int):void

	  }, {
	    key: 'skipBits',
	    value: function skipBits(count) {
	      var skipBytes; // :int
	      if (this.bitsAvailable > count) {
	        this.word <<= count;
	        this.bitsAvailable -= count;
	      } else {
	        count -= this.bitsAvailable;
	        skipBytes = count >> 3;
	        count -= skipBytes >> 3;
	        this.bytesAvailable -= skipBytes;
	        this.loadWord();
	        this.word <<= count;
	        this.bitsAvailable -= count;
	      }
	    }

	    // (size:int):uint

	  }, {
	    key: 'readBits',
	    value: function readBits(size) {
	      var bits = Math.min(this.bitsAvailable, size),
	          // :uint
	      valu = this.word >>> 32 - bits; // :uint
	      if (size > 32) {
	        _log2.default.error('Cannot read more than 32 bits at a time');
	      }
	      this.bitsAvailable -= bits;
	      if (this.bitsAvailable > 0) {
	        this.word <<= bits;
	      } else if (this.bytesAvailable > 0) {
	        this.loadWord();
	      }
	      bits = size - bits;
	      if (bits > 0) {
	        return valu << bits | this.readBits(bits);
	      } else {
	        return valu;
	      }
	    }

	    // ():uint

	  }, {
	    key: 'skipLZ',
	    value: function skipLZ() {
	      var leadingZeroCount; // :uint
	      for (leadingZeroCount = 0; leadingZeroCount < this.bitsAvailable; ++leadingZeroCount) {
	        if (0 !== (this.word & 0x80000000 >>> leadingZeroCount)) {
	          // the first bit of working word is 1
	          this.word <<= leadingZeroCount;
	          this.bitsAvailable -= leadingZeroCount;
	          return leadingZeroCount;
	        }
	      }
	      // we exhausted word and still have not found a 1
	      this.loadWord();
	      return leadingZeroCount + this.skipLZ();
	    }

	    // ():void

	  }, {
	    key: 'skipUEG',
	    value: function skipUEG() {
	      this.skipBits(1 + this.skipLZ());
	    }

	    // ():void

	  }, {
	    key: 'skipEG',
	    value: function skipEG() {
	      this.skipBits(1 + this.skipLZ());
	    }

	    // ():uint

	  }, {
	    key: 'readUEG',
	    value: function readUEG() {
	      var clz = this.skipLZ(); // :uint
	      return this.readBits(clz + 1) - 1;
	    }

	    // ():int

	  }, {
	    key: 'readEG',
	    value: function readEG() {
	      var valu = this.readUEG(); // :int
	      if (0x01 & valu) {
	        // the number is odd if the low order bit is set
	        return 1 + valu >>> 1; // add 1 to make it even, and divide by 2
	      } else {
	          return -1 * (valu >>> 1); // divide by two then make it negative
	        }
	    }

	    // Some convenience functions
	    // :Boolean

	  }, {
	    key: 'readBoolean',
	    value: function readBoolean() {
	      return 1 === this.readBits(1);
	    }

	    // ():int

	  }, {
	    key: 'readUByte',
	    value: function readUByte() {
	      return this.readBits(8);
	    }

	    // ():int

	  }, {
	    key: 'readUShort',
	    value: function readUShort() {
	      return this.readBits(16);
	    }
	    // ():int

	  }, {
	    key: 'readUInt',
	    value: function readUInt() {
	      return this.readBits(32);
	    }

	    /**
	     * Advance the ExpGolomb decoder past a scaling list. The scaling
	     * list is optionally transmitted as part of a sequence parameter
	     * set and is not relevant to transmuxing.
	     * @param count {number} the number of entries in this scaling list
	     * @see Recommendation ITU-T H.264, Section 7.3.2.1.1.1
	     */

	  }, {
	    key: 'skipScalingList',
	    value: function skipScalingList(count) {
	      var lastScale = 8,
	          nextScale = 8,
	          j,
	          deltaScale;
	      for (j = 0; j < count; j++) {
	        if (nextScale !== 0) {
	          deltaScale = this.readEG();
	          nextScale = (lastScale + deltaScale + 256) % 256;
	        }
	        lastScale = nextScale === 0 ? lastScale : nextScale;
	      }
	    }

	    /**
	     * Read a sequence parameter set and return some interesting video
	     * properties. A sequence parameter set is the H264 metadata that
	     * describes the properties of upcoming video frames.
	     * @param data {Uint8Array} the bytes of a sequence parameter set
	     * @return {object} an object with configuration parsed from the
	     * sequence parameter set, including the dimensions of the
	     * associated video frames.
	     */

	  }, {
	    key: 'readSPS',
	    value: function readSPS() {
	      var frameCropLeftOffset = 0,
	          frameCropRightOffset = 0,
	          frameCropTopOffset = 0,
	          frameCropBottomOffset = 0,
	          sarScale = 1,
	          profileIdc,
	          profileCompat,
	          levelIdc,
	          numRefFramesInPicOrderCntCycle,
	          picWidthInMbsMinus1,
	          picHeightInMapUnitsMinus1,
	          frameMbsOnlyFlag,
	          scalingListCount,
	          i;
	      this.readUByte();
	      profileIdc = this.readUByte(); // profile_idc
	      profileCompat = this.readBits(5); // constraint_set[0-4]_flag, u(5)
	      this.skipBits(3); // reserved_zero_3bits u(3),
	      levelIdc = this.readUByte(); //level_idc u(8)
	      this.skipUEG(); // seq_parameter_set_id
	      // some profiles have more optional data we don't need
	      if (profileIdc === 100 || profileIdc === 110 || profileIdc === 122 || profileIdc === 244 || profileIdc === 44 || profileIdc === 83 || profileIdc === 86 || profileIdc === 118 || profileIdc === 128) {
	        var chromaFormatIdc = this.readUEG();
	        if (chromaFormatIdc === 3) {
	          this.skipBits(1); // separate_colour_plane_flag
	        }
	        this.skipUEG(); // bit_depth_luma_minus8
	        this.skipUEG(); // bit_depth_chroma_minus8
	        this.skipBits(1); // qpprime_y_zero_transform_bypass_flag
	        if (this.readBoolean()) {
	          // seq_scaling_matrix_present_flag
	          scalingListCount = chromaFormatIdc !== 3 ? 8 : 12;
	          for (i = 0; i < scalingListCount; i++) {
	            if (this.readBoolean()) {
	              // seq_scaling_list_present_flag[ i ]
	              if (i < 6) {
	                this.skipScalingList(16);
	              } else {
	                this.skipScalingList(64);
	              }
	            }
	          }
	        }
	      }
	      this.skipUEG(); // log2_max_frame_num_minus4
	      var picOrderCntType = this.readUEG();
	      if (picOrderCntType === 0) {
	        this.readUEG(); //log2_max_pic_order_cnt_lsb_minus4
	      } else if (picOrderCntType === 1) {
	          this.skipBits(1); // delta_pic_order_always_zero_flag
	          this.skipEG(); // offset_for_non_ref_pic
	          this.skipEG(); // offset_for_top_to_bottom_field
	          numRefFramesInPicOrderCntCycle = this.readUEG();
	          for (i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
	            this.skipEG(); // offset_for_ref_frame[ i ]
	          }
	        }
	      this.skipUEG(); // max_num_ref_frames
	      this.skipBits(1); // gaps_in_frame_num_value_allowed_flag
	      picWidthInMbsMinus1 = this.readUEG();
	      picHeightInMapUnitsMinus1 = this.readUEG();
	      frameMbsOnlyFlag = this.readBits(1);
	      if (frameMbsOnlyFlag === 0) {
	        this.skipBits(1); // mb_adaptive_frame_field_flag
	      }
	      this.skipBits(1); // direct_8x8_inference_flag
	      if (this.readBoolean()) {
	        // frame_cropping_flag
	        frameCropLeftOffset = this.readUEG();
	        frameCropRightOffset = this.readUEG();
	        frameCropTopOffset = this.readUEG();
	        frameCropBottomOffset = this.readUEG();
	      }
	      if (this.readBoolean()) {
	        // vui_parameters_present_flag
	        if (this.readBoolean()) {
	          // aspect_ratio_info_present_flag
	          var sarRatio = void 0;
	          var aspectRatioIdc = this.readUByte();
	          switch (aspectRatioIdc) {
	            case 1:
	              sarRatio = [1, 1];break;
	            case 2:
	              sarRatio = [12, 11];break;
	            case 3:
	              sarRatio = [10, 11];break;
	            case 4:
	              sarRatio = [16, 11];break;
	            case 5:
	              sarRatio = [40, 33];break;
	            case 6:
	              sarRatio = [24, 11];break;
	            case 7:
	              sarRatio = [20, 11];break;
	            case 8:
	              sarRatio = [32, 11];break;
	            case 9:
	              sarRatio = [80, 33];break;
	            case 10:
	              sarRatio = [18, 11];break;
	            case 11:
	              sarRatio = [15, 11];break;
	            case 12:
	              sarRatio = [64, 33];break;
	            case 13:
	              sarRatio = [160, 99];break;
	            case 14:
	              sarRatio = [4, 3];break;
	            case 15:
	              sarRatio = [3, 2];break;
	            case 16:
	              sarRatio = [2, 1];break;
	            case 255:
	              {
	                sarRatio = [this.readUByte() << 8 | this.readUByte(), this.readUByte() << 8 | this.readUByte()];
	                break;
	              }
	          }
	          if (sarRatio) {
	            sarScale = sarRatio[0] / sarRatio[1];
	          }
	        }
	      }
	      return {
	        width: Math.ceil(((picWidthInMbsMinus1 + 1) * 16 - frameCropLeftOffset * 2 - frameCropRightOffset * 2) * sarScale),
	        height: (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 - (frameMbsOnlyFlag ? 2 : 4) * (frameCropTopOffset + frameCropBottomOffset)
	      };
	    }
	  }, {
	    key: 'readSliceType',
	    value: function readSliceType() {
	      // skip NALu type
	      this.readUByte();
	      // discard first_mb_in_slice
	      this.readUEG();
	      // return slice_type
	      return this.readUEG();
	    }
	  }]);

	  return ExpGolomb;
	}();

	exports.default = ExpGolomb;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _hlsEvent = __webpack_require__(5);

	var _hlsEvent2 = _interopRequireDefault(_hlsEvent);

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	var _mp4Generator = __webpack_require__(21);

	var _mp4Generator2 = _interopRequireDefault(_mp4Generator);

	var _errors = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MP4Remuxer = function () {
	  function MP4Remuxer(hls) {
	    _classCallCheck(this, MP4Remuxer);

	    this.hls = hls;
	    this._e = this.hls._e;
	    this.ISGenerated = false;
	    this.PES2MP4SCALEFACTOR = 4;
	    this.PES_TIMESCALE = 90000;
	    this.MP4_TIMESCALE = this.PES_TIMESCALE / this.PES2MP4SCALEFACTOR;
	  }

	  _createClass(MP4Remuxer, [{
	    key: 'insertDiscontinuity',
	    value: function insertDiscontinuity() {
	      this._initPTS = this._initDTS = this.nextAacPts = this.nextAvcDts = undefined;
	    }
	  }, {
	    key: 'switchLevel',
	    value: function switchLevel() {
	      this.ISGenerated = false;
	    }
	  }, {
	    key: 'remux',
	    value: function remux(audioTrack, videoTrack, id3Track, textTrack, timeOffset, contiguous) {
	      if (!this.ISGenerated) {
	        this.generateIS(audioTrack, videoTrack, timeOffset);
	      }
	      if (this.ISGenerated) {
	        if (videoTrack.samples.length) {
	          this.remuxVideo(videoTrack, timeOffset, contiguous);
	        }
	        if (audioTrack.samples.length) {
	          this.remuxAudio(audioTrack, timeOffset, contiguous);
	        }
	      }
	      if (id3Track.samples.length) {
	        this.remuxID3(id3Track, timeOffset);
	      }
	      if (textTrack.samples.length) {
	        this.remuxText(textTrack, timeOffset);
	      }
	      this._e.fire(_hlsEvent2.default.SEG_PARSED);
	    }
	  }, {
	    key: 'generateIS',
	    value: function generateIS(audioTrack, videoTrack, timeOffset) {
	      var audioSamples = audioTrack.samples,
	          videoSamples = videoTrack.samples,
	          pesTimeScale = this.PES_TIMESCALE,
	          tracks = {},
	          data = { tracks: tracks, unique: false },
	          computePTSDTS = this._initPTS === undefined,
	          initPTS,
	          initDTS;

	      if (computePTSDTS) {
	        initPTS = initDTS = Infinity;
	      }
	      if (audioTrack.config && audioSamples.length) {
	        audioTrack.timescale = audioTrack.audiosamplerate;
	        if (audioTrack.timescale * audioTrack.duration > Math.pow(2, 32)) {
	          (function () {
	            var greatestCommonDivisor = function greatestCommonDivisor(a, b) {
	              if (!b) {
	                return a;
	              }
	              return greatestCommonDivisor(b, a % b);
	            };
	            audioTrack.timescale = audioTrack.audiosamplerate / greatestCommonDivisor(audioTrack.audiosamplerate, 1024);
	          })();
	        }
	        _log2.default.log('audio mp4 timescale :' + audioTrack.timescale);
	        tracks.audio = {
	          container: 'audio/mp4',
	          codec: audioTrack.codec,
	          initSegment: _mp4Generator2.default.initSegment([audioTrack]),
	          metadata: {
	            channelCount: audioTrack.channelCount
	          }
	        };
	        if (computePTSDTS) {
	          initPTS = initDTS = audioSamples[0].pts - pesTimeScale * timeOffset;
	        }
	      }

	      if (videoTrack.sps && videoTrack.pps && videoSamples.length) {
	        videoTrack.timescale = this.MP4_TIMESCALE;
	        tracks.video = {
	          container: 'video/mp4',
	          codec: videoTrack.codec,
	          initSegment: _mp4Generator2.default.initSegment([videoTrack]),
	          metadata: {
	            width: videoTrack.width,
	            height: videoTrack.height
	          }
	        };
	        if (computePTSDTS) {
	          initPTS = Math.min(initPTS, videoSamples[0].pts - pesTimeScale * timeOffset);
	          initDTS = Math.min(initDTS, videoSamples[0].dts - pesTimeScale * timeOffset);
	        }
	      }

	      if (Object.keys(tracks).length) {
	        this._e.fire(_hlsEvent2.default.SEG_PARSING_INIT_SEGMENT, data);
	        this.ISGenerated = true;
	        if (computePTSDTS) {
	          this._initPTS = initPTS;
	          this._initDTS = initDTS;
	        }
	      } else {
	        this._e.fire(_hlsEvent2.default.ERROR, { type: _errors.ErrorTypes.MEDIA_ERROR, details: _errors.ErrorDetails.FRAG_PARSING_ERROR, fatal: false, reason: 'no audio/video samples found' });
	      }
	    }
	  }, {
	    key: 'remuxVideo',
	    value: function remuxVideo(track, timeOffset, contiguous) {
	      var offset = 8,
	          pesTimeScale = this.PES_TIMESCALE,
	          pes2mp4ScaleFactor = this.PES2MP4SCALEFACTOR,
	          mp4SampleDuration,
	          mdat,
	          moof,
	          firstPTS,
	          firstDTS,
	          lastPTS,
	          lastDTS,
	          inputSamples = track.samples,
	          outputSamples = [];

	      var nextAvcDts = void 0;
	      if (contiguous) {
	        nextAvcDts = this.nextAvcDts;
	      } else {
	        nextAvcDts = timeOffset * pesTimeScale;
	      }

	      var sample = inputSamples[0];
	      firstDTS = Math.max(this._PTSNormalize(sample.dts, nextAvcDts) - this._initDTS, 0);
	      firstPTS = Math.max(this._PTSNormalize(sample.pts, nextAvcDts) - this._initDTS, 0);

	      var delta = Math.round((firstDTS - nextAvcDts) / 90);
	      if (contiguous) {
	        if (delta) {
	          if (delta > 1) {
	            _log2.default.log('AVC:' + delta + ' ms hole between fragments detected,filling it');
	          } else if (delta < -1) {
	            _log2.default.log('AVC:' + -delta + ' ms overlapping between fragments detected');
	          }
	          firstDTS = nextAvcDts;
	          inputSamples[0].dts = firstDTS + this._initDTS;
	          firstPTS = Math.max(firstPTS - delta, nextAvcDts);
	          inputSamples[0].pts = firstPTS + this._initDTS;
	          _log2.default.log('Video/PTS/DTS adjusted: ' + firstPTS + '/' + firstDTS + ',delta:' + delta);
	        }
	      }
	      //nextDTS = firstDTS;

	      sample = inputSamples[inputSamples.length - 1];
	      lastDTS = Math.max(this._PTSNormalize(sample.dts, nextAvcDts) - this._initDTS, 0);
	      lastPTS = Math.max(this._PTSNormalize(sample.pts, nextAvcDts) - this._initDTS, 0);
	      lastPTS = Math.max(lastPTS, lastDTS);

	      var vendor = navigator.vendor,
	          userAgent = navigator.userAgent,
	          isSafari = vendor && vendor.indexOf('Apple') > -1 && userAgent && !userAgent.match('CriOS');

	      if (isSafari) {
	        mp4SampleDuration = Math.round((lastDTS - firstDTS) / (pes2mp4ScaleFactor * (inputSamples.length - 1)));
	      }

	      for (var i = 0; i < inputSamples.length; i++) {
	        var _sample = inputSamples[i];
	        if (isSafari) {
	          _sample.dts = firstDTS + i * pes2mp4ScaleFactor * mp4SampleDuration;
	        } else {
	          _sample.dts = Math.max(this._PTSNormalize(_sample.dts, nextAvcDts) - this._initDTS, firstDTS);
	          _sample.dts = Math.round(_sample.dts / pes2mp4ScaleFactor) * pes2mp4ScaleFactor;
	        }
	        _sample.pts = Math.max(this._PTSNormalize(_sample.pts, nextAvcDts) - this._initDTS, _sample.dts);
	        _sample.pts = Math.round(_sample.pts / pes2mp4ScaleFactor) * pes2mp4ScaleFactor;
	      }

	      mdat = new Uint8Array(track.len + 4 * track.nbNalu + 8);
	      var view = new DataView(mdat.buffer);
	      view.setUint32(0, mdat.byteLength);
	      mdat.set(_mp4Generator2.default.types.mdat, 4);

	      for (var _i = 0; _i < inputSamples.length; _i++) {
	        var avcSample = inputSamples[_i],
	            mp4SampleLength = 0,
	            compositionTimeOffset = void 0;
	        while (avcSample.units.units.length) {
	          var unit = avcSample.units.units.shift();
	          view.setUint32(offset, unit.data.byteLength);
	          offset += 4;
	          mdat.set(unit.data, offset);
	          offset += unit.data.byteLength;
	          mp4SampleLength += 4 + unit.data.byteLength;
	        }

	        if (!isSafari) {
	          if (_i < inputSamples.length - 1) {
	            mp4SampleDuration = inputSamples[_i + 1].dts - avcSample.dts;
	          } else {
	            mp4SampleDuration = avcSample.dts - inputSamples[_i > 0 ? _i - 1 : _i].dts;
	          }
	          mp4SampleDuration /= pes2mp4ScaleFactor;
	          compositionTimeOffset = Math.round((avcSample.pts - avcSample.dts) / pes2mp4ScaleFactor);
	        } else {
	          compositionTimeOffset = Math.max(0, mp4SampleDuration * Math.round((avcSample.pts - avcSample.dts) / (pes2mp4ScaleFactor * mp4SampleDuration)));
	        }

	        outputSamples.push({
	          size: mp4SampleLength,
	          duration: mp4SampleDuration,
	          cts: compositionTimeOffset,
	          flags: {
	            isLeading: 0,
	            isDependedOn: 0,
	            hasRedundancy: 0,
	            degradPrio: 0,
	            dependsOn: avcSample.key ? 2 : 1,
	            isNonSync: avcSample.key ? 0 : 1
	          }
	        });
	      }
	      this.nextAvcDts = lastDTS + mp4SampleDuration * pes2mp4ScaleFactor;
	      track.len = 0;
	      track.nbNalu = 0;
	      if (outputSamples.length && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
	        var flags = outputSamples[0].flags;
	        flags.dependsOn = 2;
	        flags.isNonSync = 0;
	      }
	      track.samples = outputSamples;
	      moof = _mp4Generator2.default.moof(track.sequenceNumber++, firstDTS / pes2mp4ScaleFactor, track);
	      track.samples = [];
	      this._e.fire(_hlsEvent2.default.SEG_PARSING_DATA, {
	        data1: moof,
	        data2: mdat,
	        startPTS: firstPTS / pesTimeScale,
	        endPTS: (lastPTS + pes2mp4ScaleFactor * mp4SampleDuration) / pesTimeScale,
	        startDTS: firstDTS / pesTimeScale,
	        endDTS: this.nextAvcDts / pesTimeScale,
	        type: 'video',
	        nb: outputSamples.length
	      });
	    }
	  }, {
	    key: 'remuxAudio',
	    value: function remuxAudio(track, timeOffset, contiguous) {
	      var view,
	          offset = 8,
	          pesTimeScale = this.PES_TIMESCALE,
	          mp4timeScale = track.timescale,
	          pes2mp4ScaleFactor = pesTimeScale / mp4timeScale,
	          expectedSampleDuration = track.timescale * 1024 / track.audiosamplerate,
	          aacSample,
	          mp4Sample,
	          unit,
	          mdat,
	          moof,
	          firstPTS,
	          firstDTS,
	          lastDTS,
	          pts,
	          dts,
	          ptsnorm,
	          dtsnorm,
	          samples = [],
	          samples0 = [];

	      track.samples.sort(function (a, b) {
	        return a.pts - b.pts;
	      });
	      samples0 = track.samples;

	      while (samples0.length) {
	        aacSample = samples0.shift();
	        unit = aacSample.unit;
	        pts = aacSample.pts - this._initDTS;
	        dts = aacSample.dts - this._initDTS;
	        if (lastDTS !== undefined) {
	          ptsnorm = this._PTSNormalize(pts, lastDTS);
	          dtsnorm = this._PTSNormalize(dts, lastDTS);
	          // let's compute sample duration.
	          // sample Duration should be close to expectedSampleDuration
	          mp4Sample.duration = (dtsnorm - lastDTS) / pes2mp4ScaleFactor;
	          if (Math.abs(mp4Sample.duration - expectedSampleDuration) > expectedSampleDuration / 10) {
	            _log2.default.trace('invalid AAC sample duration at PTS ' + Math.round(pts / 90) + ',should be 1024,found :' + Math.round(mp4Sample.duration * track.audiosamplerate / track.timescale));
	          }
	          // always adjust sample duration to avoid av sync issue
	          mp4Sample.duration = expectedSampleDuration;
	          dtsnorm = expectedSampleDuration * pes2mp4ScaleFactor + lastDTS;
	        } else {
	          var nextAacPts = void 0,
	              delta = void 0;
	          if (contiguous) {
	            nextAacPts = this.nextAacPts;
	          } else {
	            nextAacPts = timeOffset * pesTimeScale;
	          }
	          ptsnorm = this._PTSNormalize(pts, nextAacPts);
	          dtsnorm = this._PTSNormalize(dts, nextAacPts);
	          delta = Math.round(1000 * (ptsnorm - nextAacPts) / pesTimeScale);
	          // if fragment are contiguous, detect hole/overlapping between fragments
	          if (contiguous) {
	            // log delta
	            if (delta) {
	              if (delta > 0) {
	                _log2.default.log(delta + ' ms hole between AAC samples detected,filling it');
	              } else if (delta < -12) {
	                _log2.default.log(-delta + ' ms overlapping between AAC samples detected, drop frame');
	                track.len -= unit.byteLength;
	                continue;
	              }
	              // set PTS/DTS to expected PTS/DTS
	              ptsnorm = dtsnorm = nextAacPts;
	            }
	          }
	          firstPTS = Math.max(0, ptsnorm);
	          firstDTS = Math.max(0, dtsnorm);
	          if (track.len > 0) {
	            mdat = new Uint8Array(track.len + 8);
	            view = new DataView(mdat.buffer);
	            view.setUint32(0, mdat.byteLength);
	            mdat.set(_mp4Generator2.default.types.mdat, 4);
	          } else {
	            // no audio samples
	            return;
	          }
	        }
	        mdat.set(unit, offset);
	        offset += unit.byteLength;
	        mp4Sample = {
	          size: unit.byteLength,
	          cts: 0,
	          duration: 0,
	          flags: {
	            isLeading: 0,
	            isDependedOn: 0,
	            hasRedundancy: 0,
	            degradPrio: 0,
	            dependsOn: 1
	          }
	        };
	        samples.push(mp4Sample);
	        lastDTS = dtsnorm;
	      }
	      var lastSampleDuration = 0;
	      var nbSamples = samples.length;
	      //set last sample duration as being identical to previous sample
	      if (nbSamples >= 2) {
	        lastSampleDuration = samples[nbSamples - 2].duration;
	        mp4Sample.duration = lastSampleDuration;
	      }
	      if (nbSamples) {
	        this.nextAacPts = ptsnorm + pes2mp4ScaleFactor * lastSampleDuration;
	        track.len = 0;
	        track.samples = samples;
	        moof = _mp4Generator2.default.moof(track.sequenceNumber++, firstDTS / pes2mp4ScaleFactor, track);
	        track.samples = [];
	        this._e.fire(_hlsEvent2.default.SEG_PARSING_DATA, {
	          data1: moof,
	          data2: mdat,
	          startPTS: firstPTS / pesTimeScale,
	          endPTS: this.nextAacPts / pesTimeScale,
	          startDTS: firstDTS / pesTimeScale,
	          endDTS: (dtsnorm + pes2mp4ScaleFactor * lastSampleDuration) / pesTimeScale,
	          type: 'audio',
	          nb: nbSamples
	        });
	      }
	    }
	  }, {
	    key: 'remuxID3',
	    value: function remuxID3(track, timeOffset) {
	      var length = track.samples.length,
	          sample;
	      // consume samples
	      if (length) {
	        for (var index = 0; index < length; index++) {
	          sample = track.samples[index];
	          sample.pts = (sample.pts - this._initPTS) / this.PES_TIMESCALE;
	          sample.dts = (sample.dts - this._initDTS) / this.PES_TIMESCALE;
	        }
	        this._e.fire(_hlsEvent2.default.SEG_PARSING_METADATA, {
	          samples: track.samples
	        });
	      }

	      track.samples = [];
	      timeOffset = timeOffset;
	    }
	  }, {
	    key: 'remuxText',
	    value: function remuxText(track, timeOffset) {
	      track.samples.sort(function (a, b) {
	        return a.pts - b.pts;
	      });

	      var length = track.samples.length,
	          sample;
	      // consume samples
	      if (length) {
	        for (var index = 0; index < length; index++) {
	          sample = track.samples[index];
	          // setting text pts, dts to relative time
	          // using this._initPTS and this._initDTS to calculate relative time
	          sample.pts = (sample.pts - this._initPTS) / this.PES_TIMESCALE;
	        }
	        this._e.fire(_hlsEvent2.default.SEG_PARSING_USERDATA, {
	          samples: track.samples
	        });
	      }

	      track.samples = [];
	      timeOffset = timeOffset;
	    }
	  }, {
	    key: '_PTSNormalize',
	    value: function _PTSNormalize(value, reference) {
	      var offset;
	      if (reference === undefined) {
	        return value;
	      }
	      if (reference < value) {
	        offset = -8589934592;
	      } else {
	        offset = 8589934592;
	      }
	      while (Math.abs(value - reference) > 4294967296) {
	        value += offset;
	      }
	      return value;
	    }
	  }, {
	    key: 'passthrough',
	    get: function get() {
	      return false;
	    }
	  }]);

	  return MP4Remuxer;
	}();

	exports.default = MP4Remuxer;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Generate MP4 Box
	*/

	//import Hex from '../utils/hex';

	var MP4 = function () {
	  function MP4() {
	    _classCallCheck(this, MP4);
	  }

	  _createClass(MP4, null, [{
	    key: 'init',
	    value: function init() {
	      MP4.types = {
	        avc1: [], // codingname
	        avcC: [],
	        btrt: [],
	        dinf: [],
	        dref: [],
	        esds: [],
	        ftyp: [],
	        hdlr: [],
	        mdat: [],
	        mdhd: [],
	        mdia: [],
	        mfhd: [],
	        minf: [],
	        moof: [],
	        moov: [],
	        mp4a: [],
	        mvex: [],
	        mvhd: [],
	        sdtp: [],
	        stbl: [],
	        stco: [],
	        stsc: [],
	        stsd: [],
	        stsz: [],
	        stts: [],
	        tfdt: [],
	        tfhd: [],
	        traf: [],
	        trak: [],
	        trun: [],
	        trex: [],
	        tkhd: [],
	        vmhd: [],
	        smhd: []
	      };

	      var i;
	      for (i in MP4.types) {
	        if (MP4.types.hasOwnProperty(i)) {
	          MP4.types[i] = [i.charCodeAt(0), i.charCodeAt(1), i.charCodeAt(2), i.charCodeAt(3)];
	        }
	      }

	      var videoHdlr = new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x00, // pre_defined
	      0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
	      ]);

	      var audioHdlr = new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x00, // pre_defined
	      0x73, 0x6f, 0x75, 0x6e, // handler_type: 'soun'
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x53, 0x6f, 0x75, 0x6e, 0x64, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'SoundHandler'
	      ]);

	      MP4.HDLR_TYPES = {
	        'video': videoHdlr,
	        'audio': audioHdlr
	      };

	      var dref = new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x01, // entry_count
	      0x00, 0x00, 0x00, 0x0c, // entry_size
	      0x75, 0x72, 0x6c, 0x20, // 'url' type
	      0x00, // version 0
	      0x00, 0x00, 0x01 // entry_flags
	      ]);

	      var stco = new Uint8Array([0x00, // version
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x00 // entry_count
	      ]);

	      MP4.STTS = MP4.STSC = MP4.STCO = stco;

	      MP4.STSZ = new Uint8Array([0x00, // version
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x00, // sample_size
	      0x00, 0x00, 0x00, 0x00]);
	      // sample_count
	      MP4.VMHD = new Uint8Array([0x00, // version
	      0x00, 0x00, 0x01, // flags
	      0x00, 0x00, // graphicsmode
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // opcolor
	      ]);
	      MP4.SMHD = new Uint8Array([0x00, // version
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, // balance
	      0x00, 0x00 // reserved
	      ]);

	      MP4.STSD = new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x01]); // entry_count

	      var majorBrand = new Uint8Array([105, 115, 111, 109]); // isom
	      var avc1Brand = new Uint8Array([97, 118, 99, 49]); // avc1
	      var minorVersion = new Uint8Array([0, 0, 0, 1]);

	      MP4.FTYP = MP4.box(MP4.types.ftyp, majorBrand, minorVersion, majorBrand, avc1Brand);
	      MP4.DINF = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, dref));
	    }
	  }, {
	    key: 'box',
	    value: function box(type) {
	      var payload = Array.prototype.slice.call(arguments, 1),
	          size = 8,
	          i = payload.length,
	          len = i,
	          result;
	      // calculate the total size we need to allocate
	      while (i--) {
	        size += payload[i].byteLength;
	      }
	      result = new Uint8Array(size);
	      result[0] = size >> 24 & 0xff;
	      result[1] = size >> 16 & 0xff;
	      result[2] = size >> 8 & 0xff;
	      result[3] = size & 0xff;
	      result.set(type, 4);
	      // copy the payload into the result
	      for (i = 0, size = 8; i < len; i++) {
	        // copy payload[i] array @ offset size
	        result.set(payload[i], size);
	        size += payload[i].byteLength;
	      }
	      return result;
	    }
	  }, {
	    key: 'hdlr',
	    value: function hdlr(type) {
	      return MP4.box(MP4.types.hdlr, MP4.HDLR_TYPES[type]);
	    }
	  }, {
	    key: 'mdat',
	    value: function mdat(data) {
	      return MP4.box(MP4.types.mdat, data);
	    }
	  }, {
	    key: 'mdhd',
	    value: function mdhd(timescale, duration) {
	      duration *= timescale;
	      return MP4.box(MP4.types.mdhd, new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x02, // creation_time
	      0x00, 0x00, 0x00, 0x03, // modification_time
	      timescale >> 24 & 0xFF, timescale >> 16 & 0xFF, timescale >> 8 & 0xFF, timescale & 0xFF, // timescale
	      duration >> 24, duration >> 16 & 0xFF, duration >> 8 & 0xFF, duration & 0xFF, // duration
	      0x55, 0xc4, // 'und' language (undetermined)
	      0x00, 0x00]));
	    }
	  }, {
	    key: 'mdia',
	    value: function mdia(track) {
	      return MP4.box(MP4.types.mdia, MP4.mdhd(track.timescale, track.duration), MP4.hdlr(track.type), MP4.minf(track));
	    }
	  }, {
	    key: 'mfhd',
	    value: function mfhd(sequenceNumber) {
	      return MP4.box(MP4.types.mfhd, new Uint8Array([0x00, 0x00, 0x00, 0x00, // flags
	      sequenceNumber >> 24, sequenceNumber >> 16 & 0xFF, sequenceNumber >> 8 & 0xFF, sequenceNumber & 0xFF]));
	    }
	  }, {
	    key: 'minf',
	    // sequence_number
	    value: function minf(track) {
	      if (track.type === 'audio') {
	        return MP4.box(MP4.types.minf, MP4.box(MP4.types.smhd, MP4.SMHD), MP4.DINF, MP4.stbl(track));
	      } else {
	        return MP4.box(MP4.types.minf, MP4.box(MP4.types.vmhd, MP4.VMHD), MP4.DINF, MP4.stbl(track));
	      }
	    }
	  }, {
	    key: 'moof',
	    value: function moof(sn, baseMediaDecodeTime, track) {
	      return MP4.box(MP4.types.moof, MP4.mfhd(sn), MP4.traf(track, baseMediaDecodeTime));
	    }
	    /**
	     * @param tracks... (optional) {array} the tracks associated with this movie
	     */

	  }, {
	    key: 'moov',
	    value: function moov(tracks) {
	      var i = tracks.length,
	          boxes = [];

	      while (i--) {
	        boxes[i] = MP4.trak(tracks[i]);
	      }

	      return MP4.box.apply(null, [MP4.types.moov, MP4.mvhd(tracks[0].timescale, tracks[0].duration)].concat(boxes).concat(MP4.mvex(tracks)));
	    }
	  }, {
	    key: 'mvex',
	    value: function mvex(tracks) {
	      var i = tracks.length,
	          boxes = [];

	      while (i--) {
	        boxes[i] = MP4.trex(tracks[i]);
	      }
	      return MP4.box.apply(null, [MP4.types.mvex].concat(boxes));
	    }
	  }, {
	    key: 'mvhd',
	    value: function mvhd(timescale, duration) {
	      duration *= timescale;
	      var bytes = new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      0x00, 0x00, 0x00, 0x01, // creation_time
	      0x00, 0x00, 0x00, 0x02, // modification_time
	      timescale >> 24 & 0xFF, timescale >> 16 & 0xFF, timescale >> 8 & 0xFF, timescale & 0xFF, // timescale
	      duration >> 24 & 0xFF, duration >> 16 & 0xFF, duration >> 8 & 0xFF, duration & 0xFF, // duration
	      0x00, 0x01, 0x00, 0x00, // 1.0 rate
	      0x01, 0x00, // 1.0 volume
	      0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
	      0xff, 0xff, 0xff, 0xff // next_track_ID
	      ]);
	      return MP4.box(MP4.types.mvhd, bytes);
	    }
	  }, {
	    key: 'sdtp',
	    value: function sdtp(track) {
	      var samples = track.samples || [],
	          bytes = new Uint8Array(4 + samples.length),
	          flags,
	          i;
	      // leave the full box header (4 bytes) all zero
	      // write the sample table
	      for (i = 0; i < samples.length; i++) {
	        flags = samples[i].flags;
	        bytes[i + 4] = flags.dependsOn << 4 | flags.isDependedOn << 2 | flags.hasRedundancy;
	      }

	      return MP4.box(MP4.types.sdtp, bytes);
	    }
	  }, {
	    key: 'stbl',
	    value: function stbl(track) {
	      return MP4.box(MP4.types.stbl, MP4.stsd(track), MP4.box(MP4.types.stts, MP4.STTS), MP4.box(MP4.types.stsc, MP4.STSC), MP4.box(MP4.types.stsz, MP4.STSZ), MP4.box(MP4.types.stco, MP4.STCO));
	    }
	  }, {
	    key: 'avc1',
	    value: function avc1(track) {
	      var sps = [],
	          pps = [],
	          i,
	          data,
	          len;
	      // assemble the SPSs

	      for (i = 0; i < track.sps.length; i++) {
	        data = track.sps[i];
	        len = data.byteLength;
	        sps.push(len >>> 8 & 0xFF);
	        sps.push(len & 0xFF);
	        sps = sps.concat(Array.prototype.slice.call(data)); // SPS
	      }

	      // assemble the PPSs
	      for (i = 0; i < track.pps.length; i++) {
	        data = track.pps[i];
	        len = data.byteLength;
	        pps.push(len >>> 8 & 0xFF);
	        pps.push(len & 0xFF);
	        pps = pps.concat(Array.prototype.slice.call(data));
	      }

	      var avcc = MP4.box(MP4.types.avcC, new Uint8Array([0x01, // version
	      sps[3], // profile
	      sps[4], // profile compat
	      sps[5], // level
	      0xfc | 3, // lengthSizeMinusOne, hard-coded to 4 bytes
	      0xE0 | track.sps.length // 3bit reserved (111) + numOfSequenceParameterSets
	      ].concat(sps).concat([track.pps.length // numOfPictureParameterSets
	      ]).concat(pps))),
	          // "PPS"
	      width = track.width,
	          height = track.height;
	      //console.log('avcc:' + Hex.hexDump(avcc));
	      return MP4.box(MP4.types.avc1, new Uint8Array([0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, // reserved
	      0x00, 0x01, // data_reference_index
	      0x00, 0x00, // pre_defined
	      0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
	      width >> 8 & 0xFF, width & 0xff, // width
	      height >> 8 & 0xFF, height & 0xff, // height
	      0x00, 0x48, 0x00, 0x00, // horizresolution
	      0x00, 0x48, 0x00, 0x00, // vertresolution
	      0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x01, // frame_count
	      0x12, 0x64, 0x61, 0x69, 0x6C, //dailymotion/hls.js
	      0x79, 0x6D, 0x6F, 0x74, 0x69, 0x6F, 0x6E, 0x2F, 0x68, 0x6C, 0x73, 0x2E, 0x6A, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // compressorname
	      0x00, 0x18, // depth = 24
	      0x11, 0x11]), // pre_defined = -1
	      avcc, MP4.box(MP4.types.btrt, new Uint8Array([0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
	      0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
	      0x00, 0x2d, 0xc6, 0xc0])) // avgBitrate
	      );
	    }
	  }, {
	    key: 'esds',
	    value: function esds(track) {
	      var configlen = track.config.length;
	      return new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags

	      0x03, // descriptor_type
	      0x17 + configlen, // length
	      0x00, 0x01, //es_id
	      0x00, // stream_priority

	      0x04, // descriptor_type
	      0x0f + configlen, // length
	      0x40, //codec : mpeg4_audio
	      0x15, // stream_type
	      0x00, 0x00, 0x00, // buffer_size
	      0x00, 0x00, 0x00, 0x00, // maxBitrate
	      0x00, 0x00, 0x00, 0x00, // avgBitrate

	      0x05 // descriptor_type
	      ].concat([configlen]).concat(track.config).concat([0x06, 0x01, 0x02])); // GASpecificConfig)); // length + audio config descriptor
	    }
	  }, {
	    key: 'mp4a',
	    value: function mp4a(track) {
	      var audiosamplerate = track.audiosamplerate;
	      return MP4.box(MP4.types.mp4a, new Uint8Array([0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, 0x00, // reserved
	      0x00, 0x01, // data_reference_index
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, track.channelCount, // channelcount
	      0x00, 0x10, // sampleSize:16bits
	      0x00, 0x00, 0x00, 0x00, // reserved2
	      audiosamplerate >> 8 & 0xFF, audiosamplerate & 0xff, //
	      0x00, 0x00]), MP4.box(MP4.types.esds, MP4.esds(track)));
	    }
	  }, {
	    key: 'stsd',
	    value: function stsd(track) {
	      if (track.type === 'audio') {
	        return MP4.box(MP4.types.stsd, MP4.STSD, MP4.mp4a(track));
	      } else {
	        return MP4.box(MP4.types.stsd, MP4.STSD, MP4.avc1(track));
	      }
	    }
	  }, {
	    key: 'tkhd',
	    value: function tkhd(track) {
	      var id = track.id,
	          duration = track.duration * track.timescale,
	          width = track.width,
	          height = track.height;
	      return MP4.box(MP4.types.tkhd, new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x07, // flags
	      0x00, 0x00, 0x00, 0x00, // creation_time
	      0x00, 0x00, 0x00, 0x00, // modification_time
	      id >> 24 & 0xFF, id >> 16 & 0xFF, id >> 8 & 0xFF, id & 0xFF, // track_ID
	      0x00, 0x00, 0x00, 0x00, // reserved
	      duration >> 24, duration >> 16 & 0xFF, duration >> 8 & 0xFF, duration & 0xFF, // duration
	      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
	      0x00, 0x00, // layer
	      0x00, 0x00, // alternate_group
	      0x00, 0x00, // non-audio track volume
	      0x00, 0x00, // reserved
	      0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
	      width >> 8 & 0xFF, width & 0xFF, 0x00, 0x00, // width
	      height >> 8 & 0xFF, height & 0xFF, 0x00, 0x00 // height
	      ]));
	    }
	  }, {
	    key: 'traf',
	    value: function traf(track, baseMediaDecodeTime) {
	      var sampleDependencyTable = MP4.sdtp(track),
	          id = track.id;
	      return MP4.box(MP4.types.traf, MP4.box(MP4.types.tfhd, new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      id >> 24, id >> 16 & 0XFF, id >> 8 & 0XFF, id & 0xFF])), // track_ID
	      MP4.box(MP4.types.tfdt, new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      baseMediaDecodeTime >> 24, baseMediaDecodeTime >> 16 & 0XFF, baseMediaDecodeTime >> 8 & 0XFF, baseMediaDecodeTime & 0xFF])), // baseMediaDecodeTime
	      MP4.trun(track, sampleDependencyTable.length + 16 + // tfhd
	      16 + // tfdt
	      8 + // traf header
	      16 + // mfhd
	      8 + // moof header
	      8), // mdat header
	      sampleDependencyTable);
	    }

	    /**
	     * Generate a track box.
	     * @param track {object} a track definition
	     * @return {Uint8Array} the track box
	     */

	  }, {
	    key: 'trak',
	    value: function trak(track) {
	      track.duration = track.duration || 0xffffffff;
	      return MP4.box(MP4.types.trak, MP4.tkhd(track), MP4.mdia(track));
	    }
	  }, {
	    key: 'trex',
	    value: function trex(track) {
	      var id = track.id;
	      return MP4.box(MP4.types.trex, new Uint8Array([0x00, // version 0
	      0x00, 0x00, 0x00, // flags
	      id >> 24, id >> 16 & 0XFF, id >> 8 & 0XFF, id & 0xFF, // track_ID
	      0x00, 0x00, 0x00, 0x01, // default_sample_description_index
	      0x00, 0x00, 0x00, 0x00, // default_sample_duration
	      0x00, 0x00, 0x00, 0x00, // default_sample_size
	      0x00, 0x01, 0x00, 0x01 // default_sample_flags
	      ]));
	    }
	  }, {
	    key: 'trun',
	    value: function trun(track, offset) {
	      var samples = track.samples || [],
	          len = samples.length,
	          arraylen = 12 + 16 * len,
	          array = new Uint8Array(arraylen),
	          i,
	          sample,
	          duration,
	          size,
	          flags,
	          cts;
	      offset += 8 + arraylen;
	      array.set([0x00, // version 0
	      0x00, 0x0f, 0x01, // flags
	      len >>> 24 & 0xFF, len >>> 16 & 0xFF, len >>> 8 & 0xFF, len & 0xFF, // sample_count
	      offset >>> 24 & 0xFF, offset >>> 16 & 0xFF, offset >>> 8 & 0xFF, offset & 0xFF // data_offset
	      ], 0);
	      for (i = 0; i < len; i++) {
	        sample = samples[i];
	        duration = sample.duration;
	        size = sample.size;
	        flags = sample.flags;
	        cts = sample.cts;
	        array.set([duration >>> 24 & 0xFF, duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, // sample_duration
	        size >>> 24 & 0xFF, size >>> 16 & 0xFF, size >>> 8 & 0xFF, size & 0xFF, // sample_size
	        flags.isLeading << 2 | flags.dependsOn, flags.isDependedOn << 6 | flags.hasRedundancy << 4 | flags.paddingValue << 1 | flags.isNonSync, flags.degradPrio & 0xF0 << 8, flags.degradPrio & 0x0F, // sample_flags
	        cts >>> 24 & 0xFF, cts >>> 16 & 0xFF, cts >>> 8 & 0xFF, cts & 0xFF // sample_composition_time_offset
	        ], 12 + 16 * i);
	      }
	      return MP4.box(MP4.types.trun, array);
	    }
	  }, {
	    key: 'initSegment',
	    value: function initSegment(tracks) {
	      if (!MP4.types) {
	        MP4.init();
	      }
	      var movie = MP4.moov(tracks),
	          result;
	      result = new Uint8Array(MP4.FTYP.byteLength + movie.byteLength);
	      result.set(MP4.FTYP);
	      result.set(movie, MP4.FTYP.byteLength);
	      return result;
	    }
	  }]);

	  return MP4;
	}();

	exports.default = MP4;

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Cray on 2016/5/9.
	 */

	var BufferUtils = function () {
	    function BufferUtils() {
	        _classCallCheck(this, BufferUtils);
	    }

	    _createClass(BufferUtils, null, [{
	        key: "bufferInfo",
	        value: function bufferInfo(media, pos, maxHoleDuration) {
	            if (media) {
	                var vbuffered = media.buffered,
	                    buffered = [],
	                    i = void 0;
	                for (i = 0; i < vbuffered.length; i++) {
	                    buffered.push({ start: vbuffered.start(i), end: vbuffered.end(i) });
	                }
	                return this.bufferedInfo(buffered, pos, maxHoleDuration);
	            } else {
	                return { len: 0, start: 0, end: 0, nextStart: undefined };
	            }
	        }
	    }, {
	        key: "bufferedInfo",
	        value: function bufferedInfo(buffered, pos, maxHoleDuration) {
	            var buffered2 = [],
	                bufferLen = void 0,
	                bufferStart = void 0,
	                bufferEnd = void 0,
	                bufferStartNext = void 0,
	                i = void 0;
	            buffered.sort(function (a, b) {
	                var diff = a.start - b.start;
	                if (diff) {
	                    return diff;
	                } else {
	                    return b.end - a.end;
	                }
	            });
	            for (i = 0; i < buffered.length; i++) {
	                var buf2len = buffered2.length;
	                if (buf2len) {
	                    var buf2end = buffered2[buf2len - 1].end;
	                    if (buffered[i].start - buf2end < maxHoleDuration) {
	                        if (buffered[i].end > buf2end) {
	                            buffered2[buf2len - 1].end = buffered[i].end;
	                        }
	                    } else {
	                        buffered2.push(buffered[i]);
	                    }
	                } else {
	                    buffered2.push(buffered[i]);
	                }
	            }
	            for (i = 0, bufferLen = 0, bufferStart = bufferEnd = pos; i < buffered2.length; i++) {
	                var start = buffered2[i].start,
	                    end = buffered2[i].end;
	                if (pos + maxHoleDuration >= start && pos < end) {
	                    bufferStart = start;
	                    bufferEnd = end;
	                    bufferLen = bufferEnd - pos;
	                } else if (pos + maxHoleDuration < start) {
	                    bufferStartNext = start;
	                    break;
	                }
	            }
	            return { len: bufferLen, start: bufferStart, end: bufferEnd, nextStart: bufferStartNext };
	        }
	    }]);

	    return BufferUtils;
	}();

	exports.default = BufferUtils;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Cray on 2016/5/9.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ListUtils = function () {
	    function ListUtils() {
	        _classCallCheck(this, ListUtils);
	    }

	    _createClass(ListUtils, null, [{
	        key: 'mergeDetails',
	        value: function mergeDetails(oldDetails, newDetails) {
	            var start = Math.max(oldDetails.startSN, newDetails.startSN) - newDetails.startSN,
	                end = Math.min(oldDetails.endSN, newDetails.endSN) - newDetails.startSN,
	                delta = newDetails.startSN - oldDetails.startSN,
	                oldfragments = oldDetails.fragments,
	                newfragments = newDetails.fragments,
	                ccOffset = 0,
	                PTSFrag = void 0;

	            if (end < start) {
	                newDetails.PTSKnown = false;
	                return;
	            }

	            for (var i = start; i <= end; i++) {
	                var oldFrag = oldfragments[delta + i],
	                    newFrag = newfragments[i];
	                ccOffset = oldFrag.cc - newFrag.cc;
	                if (!isNaN(oldFrag.startPTS)) {
	                    newFrag.start = newFrag.startPTS = oldFrag.startPTS;
	                    newFrag.endPTS = oldFrag.endPTS;
	                    newFrag.duration = oldFrag.duration;
	                    PTSFrag = newFrag;
	                }
	            }

	            if (ccOffset) {
	                _log2.default.log('discontinuity sliding from playlist, take drift into account');
	                for (var j = 0; j < newfragments.length; j++) {
	                    newfragments[j].cc += ccOffset;
	                }
	            }

	            if (PTSFrag) {
	                ListUtils.updateFragPTS(newDetails, PTSFrag.sn, PTSFrag.startPTS, PTSFrag.endPTS);
	            } else {
	                if (delta >= 0 && delta < oldfragments.length) {
	                    var sliding = oldfragments[delta].start;
	                    for (var m = 0; m < newfragments.length; m++) {
	                        newfragments[m].start += sliding;
	                    }
	                }
	            }
	            newDetails.PTSKnown = oldDetails.PTSKnown;
	            return;
	        }
	    }, {
	        key: 'updateFragPTS',
	        value: function updateFragPTS(details, sn, startPTS, endPTS) {
	            var fragIdx, fragments, frag, i;
	            if (sn < details.startSN || sn > details.endSN) {
	                return 0;
	            }
	            fragIdx = sn - details.startSN;
	            fragments = details.fragments;
	            frag = fragments[fragIdx];
	            if (!isNaN(frag.startPTS)) {
	                startPTS = Math.min(startPTS, frag.startPTS);
	                endPTS = Math.max(endPTS, frag.endPTS);
	            }

	            var drift = startPTS - frag.start;

	            frag.start = frag.startPTS = startPTS;
	            frag.endPTS = endPTS;
	            frag.duration = endPTS - startPTS;
	            for (i = fragIdx; i > 0; i--) {
	                ListUtils.updatePTS(fragments, i, i - 1);
	            }

	            for (i = fragIdx; i < fragments.length - 1; i++) {
	                ListUtils.updatePTS(fragments, i, i + 1);
	            }
	            details.PTSKnown = true;

	            return drift;
	        }
	    }, {
	        key: 'updatePTS',
	        value: function updatePTS(fragments, fromIdx, toIdx) {
	            var fragFrom = fragments[fromIdx],
	                fragTo = fragments[toIdx],
	                fragToPTS = fragTo.startPTS;
	            if (!isNaN(fragToPTS)) {
	                if (toIdx > fromIdx) {
	                    fragFrom.duration = fragToPTS - fragFrom.start;
	                    if (fragFrom.duration < 0) {
	                        _log2.default.error('negative duration computed for frag ' + fragFrom.sn + ',level ' + fragFrom.level + ', there should be some duration drift between playlist and fragment!');
	                    }
	                } else {
	                    fragTo.duration = fragFrom.start - fragToPTS;
	                    if (fragTo.duration < 0) {
	                        _log2.default.error('negative duration computed for frag ' + fragTo.sn + ',level ' + fragTo.level + ', there should be some duration drift between playlist and fragment!');
	                    }
	                }
	            } else {
	                if (toIdx > fromIdx) {
	                    fragTo.start = fragFrom.start + fragFrom.duration;
	                } else {
	                    fragTo.start = fragFrom.start - fragTo.duration;
	                }
	            }
	        }
	    }]);

	    return ListUtils;
	}();

	exports.default = ListUtils;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _eventDispatcher = __webpack_require__(3);

	var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

	var _hlsEvent = __webpack_require__(5);

	var _hlsEvent2 = _interopRequireDefault(_hlsEvent);

	var _errors = __webpack_require__(10);

	var _hlsConfig = __webpack_require__(11);

	var _hlsConfig2 = _interopRequireDefault(_hlsConfig);

	var _xhrLoader2 = __webpack_require__(25);

	var _xhrLoader3 = _interopRequireDefault(_xhrLoader2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Cray on 2016/5/10.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var _this = null,
	    _xhrLoader = null;

	var KeyLoader = function (_EventDispatcher) {
	    _inherits(KeyLoader, _EventDispatcher);

	    function KeyLoader() {
	        _classCallCheck(this, KeyLoader);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(KeyLoader).call(this));

	        _this2.frag = null;
	        _this = _this2;
	        return _this2;
	    }

	    _createClass(KeyLoader, [{
	        key: 'loadKey',
	        value: function loadKey(data) {
	            var frag = this.frag = data.frag,
	                decryptdata = frag.decryptdata,
	                uri = decryptdata.uri;
	            var retry = _hlsConfig2.default.fragLoadingMaxRetry,
	                timeout = _hlsConfig2.default.fragLoadingTimeOut,
	                retryDelay = _hlsConfig2.default.fragLoadingRetryDelay;

	            if (uri !== this.decrypturl || this.decryptkey === null) {
	                this.decrypturl = uri;
	                this.decryptkey = null;
	                _xhrLoader = new _xhrLoader3.default();
	                _xhrLoader.load(uri, 'arraybuffer', _loadSuccess, _loadError, _loadTimeout, timeout, retry, retryDelay, null, frag);
	            } else if (this.decryptkey) {
	                decryptdata.key = this.decryptkey;
	                this.fire(_hlsEvent2.default.KEY_LOADED, { frag: frag });
	            }
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            if (_xhrLoader) {
	                _xhrLoader.dispose();
	                _xhrLoader = null;
	            }
	        }
	    }]);

	    return KeyLoader;
	}(_eventDispatcher2.default);

	function _loadSuccess(event) {
	    _this.decryptkey = _this.frag.decryptdata.key = new Uint8Array(event.currentTarget.response);
	    _this.frag.loader = undefined;
	    _this.fire(_hlsEvent2.default.KEY_LOADED, { frag: _this.frag });
	}

	function _loadError(event) {
	    if (_xhrLoader) {
	        _xhrLoader.abort();
	    }
	    _this.fire(_hlsEvent2.default.ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: _errors.ErrorDetails.KEY_LOAD_ERROR, fatal: false, frag: this.frag, response: event });
	}

	function _loadTimeout() {
	    if (_xhrLoader) {
	        _xhrLoader.abort();
	    }
	    _this.fire(_hlsEvent2.default.ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: _errors.ErrorDetails.KEY_LOAD_TIMEOUT, fatal: false, frag: this.frag });
	}

	exports.default = KeyLoader;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	var _eventDispatcher = __webpack_require__(3);

	var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

	var _ticker = __webpack_require__(9);

	var _ticker2 = _interopRequireDefault(_ticker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Cray on 2016/5/4.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var _xhrLoader = null;

	var XHRLoader = function (_EventDispatcher) {
	    _inherits(XHRLoader, _EventDispatcher);

	    function XHRLoader() {
	        _classCallCheck(this, XHRLoader);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(XHRLoader).call(this));

	        _xhrLoader = _this;
	        return _this;
	    }

	    _createClass(XHRLoader, [{
	        key: 'load',
	        value: function load(url, responseType, onSuccess, onError, onTimeout, timeout, maxRetry, retryDelay) {
	            var onProgress = arguments.length <= 8 || arguments[8] === undefined ? null : arguments[8];
	            var frag = arguments.length <= 9 || arguments[9] === undefined ? null : arguments[9];

	            this.url = url;
	            if (frag && !isNaN(frag.byteRangeStartOffset) && !isNaN(frag.byteRangeEndOffset)) {
	                this.byteRange = frag.byteRangeStartOffset + '-' + (frag.byteRangeEndOffset - 1);
	            }
	            this.responseType = responseType;
	            this.onSuccess = onSuccess;
	            this.onProgress = onProgress;
	            this.onTimeout = onTimeout;
	            this.onError = onError;
	            this.stats = { trequest: performance.now(), retry: 0 };
	            this.timeout = timeout;
	            this.maxRetry = maxRetry;
	            this.retryDelay = retryDelay;
	            this.loader = null;

	            _loadInternal();
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            _get(Object.getPrototypeOf(XHRLoader.prototype), 'dispose', this).call(this);
	            this.abort();
	            this.loader = null;
	        }
	    }, {
	        key: 'abort',
	        value: function abort() {
	            if (this.loader && this.loader.readyState !== 4) {
	                this.stats.aborted = true;
	                this.loader.abort();
	            }

	            _ticker2.default.stop(this.loadtimeout);
	        }
	    }]);

	    return XHRLoader;
	}(_eventDispatcher2.default);

	function _loadInternal() {
	    var xhr = _xhrLoader.loader = new XMLHttpRequest();

	    xhr.onloadend = _loadend;
	    xhr.onprogress = _loadprogress;

	    xhr.open('GET', _xhrLoader.url, true);
	    if (_xhrLoader.byteRange) {
	        xhr.setRequestHeader('Range', 'bytes=' + _xhrLoader.byteRange);
	    }

	    xhr.responseType = _xhrLoader.responseType;

	    _xhrLoader.stats.tfirst = null;
	    _xhrLoader.stats.loaded = 0;

	    if (_xhrLoader.timeout) {
	        _ticker2.default.tick(_xhrLoader.timeout, _loadtimeout);
	    }

	    xhr.send();
	}

	function _loadend(event) {
	    var xhr = event.currentTarget,
	        status = xhr.status,
	        stats = _xhrLoader.stats;

	    if (!stats.aborted) {
	        if (status >= 200 && status < 300) {
	            //window.clearTimeout(this.timeoutHandle);
	            _ticker2.default.stop(_loadtimeout);

	            stats.tload = performance.now();
	            _xhrLoader.onSuccess(event, stats);
	        } else {
	            if (stats.retry < _xhrLoader.maxRetry) {
	                _log2.default.warn(status + ' while loading ' + _xhrLoader.url + ', retrying in ' + _xhrLoader.retryDelay + '...');

	                _xhrLoader.dispose();
	                _ticker2.default.tick(_xhrLoader.retryDelay, _loadInternal);

	                _xhrLoader.retryDelay = Math.min(2 * _xhrLoader.retryDelay, 64000);
	                stats.retry++;
	            } else {

	                _ticker2.default.stop(_loadtimeout);
	                _log2.default.error(status + ' while loading ' + _xhrLoader.url);
	                _xhrLoader.onError(event);
	            }
	        }
	    }
	}

	function _loadtimeout(event) {
	    _log2.default.warn('timeout while loading ' + _xhrLoader.url);
	    _xhrLoader.onTimeout(event, _xhrLoader.stats);
	}

	function _loadprogress(event) {
	    var stats = _xhrLoader.stats;
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

	exports.default = XHRLoader;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _eventDispatcher = __webpack_require__(3);

	var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

	var _hlsEvent = __webpack_require__(5);

	var _hlsEvent2 = _interopRequireDefault(_hlsEvent);

	var _errors = __webpack_require__(10);

	var _hlsConfig = __webpack_require__(11);

	var _hlsConfig2 = _interopRequireDefault(_hlsConfig);

	var _xhrLoader2 = __webpack_require__(25);

	var _xhrLoader3 = _interopRequireDefault(_xhrLoader2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Cray on 2016/5/10.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var _this = null,
	    _xhrLoader = null;

	var SegmentLoader = function (_EventDispatcher) {
	  _inherits(SegmentLoader, _EventDispatcher);

	  function SegmentLoader() {
	    _classCallCheck(this, SegmentLoader);

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SegmentLoader).call(this));

	    _this2.frag = null;
	    _this = _this2;
	    return _this2;
	  }

	  _createClass(SegmentLoader, [{
	    key: 'fragLoad',
	    value: function fragLoad(data) {
	      var frag = this.frag = data.frag;
	      this.frag.loaded = 0;
	      _xhrLoader = new _xhrLoader3.default();
	      _xhrLoader.load(frag.url, 'arraybuffer', _loadSuccess, _loadError, _loadTimeout, _hlsConfig2.default.fragLoadingTimeOut, 1, 0, _loadProgress, frag);
	    }
	  }, {
	    key: 'dispose',
	    value: function dispose() {
	      if (_xhrLoader) {
	        _xhrLoader.dispose();
	        _xhrLoader = null;
	      }
	    }
	  }]);

	  return SegmentLoader;
	}(_eventDispatcher2.default);

	function _loadSuccess(event, stats) {
	  var payload = event.currentTarget.response;
	  stats.length = payload.byteLength;
	  _this.frag.loader = undefined;
	  _this.fire(_hlsEvent2.default.SEG_LOADED, { payload: payload, frag: _this.frag, stats: stats });
	}

	function _loadError(event) {
	  if (_xhrLoader) {
	    _xhrLoader.abort();
	  }
	  _this.fire(_hlsEvent2.default.ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: _errors.ErrorDetails.FRAG_LOAD_ERROR, fatal: false, frag: _this.frag, response: event });
	}

	function _loadTimeout() {
	  if (_xhrLoader) {
	    _xhrLoader.abort();
	  }
	  _this.fire(_hlsEvent2.default.ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: _errors.ErrorDetails.FRAG_LOAD_TIMEOUT, fatal: false, frag: _this.frag });
	}

	function _loadProgress(stats) {
	  _this.frag.loaded = stats.loaded;
	  _this.fire(_hlsEvent2.default.SEG_LOAD_PROGRESS, { frag: _this.frag, stats: stats });
	}

	exports.default = SegmentLoader;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Cray on 2016/5/6.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _playlistLoader = __webpack_require__(28);

	var _playlistLoader2 = _interopRequireDefault(_playlistLoader);

	var _hlsEvent = __webpack_require__(5);

	var _hlsEvent2 = _interopRequireDefault(_hlsEvent);

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	var _ticker = __webpack_require__(9);

	var _ticker2 = _interopRequireDefault(_ticker);

	var _errors = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _this = null;

	var PlayList = function () {
	    function PlayList(hls) {
	        var _this2 = this;

	        _classCallCheck(this, PlayList);

	        this.hls = hls;
	        this._e = this.hls._e;
	        this._e.on(_hlsEvent2.default.ERROR, _onError);

	        this._levels = [];
	        this._level = -1;
	        this._defaultLevel = 0;
	        this._manualLevel = -1;
	        this._nextAutoLevel = -1;
	        this.canload = true;

	        _this = this;

	        this.loader = new _playlistLoader2.default();
	        this.loader.on(_hlsEvent2.default.MANIFEST_LOADED, _onManifestLoaded);
	        this.loader.on(_hlsEvent2.default.LEVEL_LOADED, _onLevelLoaded);
	        this.loader.on(_hlsEvent2.default.ERROR, function (event) {
	            _this2._e.fire(_hlsEvent2.default.ERROR, event);
	        });
	    }

	    _createClass(PlayList, [{
	        key: 'src',
	        value: function src(url) {
	            if (this.loader) {
	                this.loader.loadMainfestFile(url);
	            }
	        }
	    }, {
	        key: 'levels',
	        get: function get() {
	            return this._levels;
	        }
	    }, {
	        key: 'level',
	        get: function get() {
	            return this._level;
	        },
	        set: function set(value) {
	            if (this._level !== value) {
	                this._level = value;
	                if (this._levels[value].details === undefined) {
	                    _setLevelInternal(value);
	                } else {
	                    this._e.fire(_hlsEvent2.default.LEVEL_LOADED, _this._levels[0]);
	                }
	            }
	        }
	    }, {
	        key: 'defaultLevel',
	        get: function get() {
	            return this._defaultLevel;
	        },
	        set: function set(value) {
	            this._defaultLevel = value;
	        }
	    }, {
	        key: 'currentLevel',
	        get: function get() {
	            if (this._currentLevel === undefined) {
	                return this._defaultLevel;
	            } else {
	                return this._currentLevel;
	            }
	        },
	        set: function set(value) {
	            this._currentLevel = value;
	        }
	    }, {
	        key: 'manualLevel',
	        get: function get() {
	            return this._manualLevel;
	        },
	        set: function set(value) {
	            this._manualLevel = value;
	            if (value !== -1) {
	                this.level = value;
	            }
	        }
	    }, {
	        key: 'nextLoadLevel',
	        get: function get() {
	            if (this._manualLevel !== -1) {
	                return this._manualLevel;
	            } else {
	                return this._nextAutoLevel;
	            }
	        },
	        set: function set(value) {
	            this.level = value;
	            if (this._manualLevel === -1) {
	                this._nextAutoLevel = value;
	            }
	        }
	    }]);

	    return PlayList;
	}();

	function _onManifestLoaded(data) {
	    var tempLevels = [],
	        levels = [],
	        defaultBitrate = void 0,
	        i = void 0,
	        bitrateSet = {},
	        videoCodec = false,
	        audioCodec = false;

	    if (data.levels[0].details) {
	        _this._levels = data.levels;
	        _this._levels[0].urlId = 0;

	        _this._e.fire(_hlsEvent2.default.MANIFEST_PARSED, {
	            levels: _this._levels,
	            currentLevel: _this._defaultLevel,
	            stats: _this._levels[0].stats
	        });
	        return;
	    }

	    data.levels.forEach(function (level) {
	        if (level.videoCodec) {
	            videoCodec = true;
	        }
	        if (level.audioCodec) {
	            audioCodec = true;
	        }
	        var index = bitrateSet[level.bitrate];
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
	        tempLevels.forEach(function (level) {
	            if (level.videoCodec) {
	                levels.push(level);
	            }
	        });
	    } else {
	        levels = tempLevels;
	    }

	    levels = levels.filter(function (level) {
	        var checkAudio = function checkAudio(codec) {
	            return MediaSource.isTypeSupported('audio/mp4;codecs=' + codec);
	        };

	        var checkVideo = function checkVideo(codec) {
	            return MediaSource.isTypeSupported('video/mp4;codecs=' + codec);
	        };
	        var audioCodec = level.audioCodec,
	            videoCodec = level.videoCodec;

	        return (!audioCodec || checkAudio(audioCodec)) && (!videoCodec || checkVideo(videoCodec));
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
	                _log2.default.log('manifest loaded, ' + levels.length + ' levels, default bitrate:' + defaultBitrate);
	                break;
	            }
	        }

	        _this._e.fire(_hlsEvent2.default.MANIFEST_PARSED, {
	            levels: _this._levels,
	            currentLevel: _this._currentLevel,
	            stats: data.stats
	        });
	    } else {
	        _this._e.fire(_hlsEvent2.default.ERROR, {
	            type: _errors.ErrorTypes.MEDIA_ERROR,
	            details: _errors.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
	            fatal: true,
	            url: data.url,
	            reason: 'no level with compatible codecs found in manifest'
	        });
	    }
	}

	function _onLevelLoaded(data) {
	    if (data.details.live) {
	        var time = data.details.averagetargetduration ? data.details.averagetargetduration : data.details.targetduration;
	        _ticker2.default.stop(_loadLevelFile);
	        _ticker2.default.tick(1000 * time, _loadLevelFile, 0);
	    } else {
	        _ticker2.default.stop(_loadLevelFile);
	    }
	}

	function _onError(data) {
	    if (data.fatal) {
	        _log2.default.error('[PlayList] fatal error');
	        return;
	    }

	    var details = data.details,
	        levelId = void 0,
	        level = void 0;
	    switch (details) {
	        case _errors.ErrorDetails.FRAG_LOAD_ERROR:
	        case _errors.ErrorDetails.FRAG_LOAD_TIMEOUT:
	        case _errors.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
	        case _errors.ErrorDetails.KEY_LOAD_ERROR:
	        case _errors.ErrorDetails.KEY_LOAD_TIMEOUT:
	            levelId = data.frag.level;
	            break;
	        case _errors.ErrorDetails.LEVEL_LOAD_ERROR:
	        case _errors.ErrorDetails.LEVEL_LOAD_TIMEOUT:
	            levelId = data.level;
	            break;
	        default:
	            break;
	    }

	    if (levelId !== undefined) {
	        level = _this._levels[levelId];
	        if (level.urlId < level.url.length - 1) {
	            level.urlId++;
	            level.details = undefined;
	            _log2.default.warn('playlist ,' + details + ' for level ' + levelId + ': switch next id ' + level.urlId);
	        } else {
	            if (_this._manualLevel === -1 && levelId) {
	                _log2.default.warn('playlist,' + details + ': emergency switch-down for next fragment');
	                _this.nextAutoLevel = 0;
	            } else if (level && level.details && level.details.live) {
	                _log2.default.warn('playlist,' + details + ' on live stream, discard');
	            } else if (details !== _errors.ErrorDetails.FRAG_LOAD_ERROR && details !== _errors.ErrorDetails.FRAG_LOAD_TIMEOUT) {
	                _log2.default.error('cannot recover ' + details + ' error');
	                _this._level = undefined;
	                _ticker2.default.stop(_loadLevelFile);

	                data.fatal = true;
	                _this._e.fire(_hlsEvent2.default.ERROR, data);
	            }
	        }
	    }
	}

	function _setLevelInternal(level) {
	    if (level >= 0 && level < _this._levels.length) {
	        _ticker2.default.stop(_loadLevelFile);

	        _log2.default.log('switching to level ' + level);

	        var levelData = _this._levels[level];
	        if (levelData.details === undefined || levelData.details.live === true) {
	            _log2.default.log('reload playlist for level ' + level);
	            var urlId = levelData.urlId;
	            _this.loader.loadLevelFile({ url: levelData.url[urlId], level: level, id: urlId });
	        }
	    } else {
	        _this._e.fire(_hlsEvent2.default.ERROR, {
	            type: _errors.ErrorTypes.OTHER_ERROR,
	            details: _errors.ErrorDetails.LEVEL_SWITCH_ERROR,
	            level: level,
	            fatal: false,
	            reason: 'invalid level idx'
	        });
	    }
	}

	function _loadLevelFile() {
	    var levelId = _this._level;
	    if (levelId !== undefined && _this.canload) {
	        var level = _this._levels[levelId],
	            urlId = level.urlId;
	        _this.loader.loadLevelFile({ url: level.url[urlId], level: levelId, id: urlId });
	    }
	}

	exports.default = PlayList;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _eventDispatcher = __webpack_require__(3);

	var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

	var _hlsConfig = __webpack_require__(11);

	var _hlsConfig2 = _interopRequireDefault(_hlsConfig);

	var _xhrLoader2 = __webpack_require__(25);

	var _xhrLoader3 = _interopRequireDefault(_xhrLoader2);

	var _errors = __webpack_require__(10);

	var _hlsEvent = __webpack_require__(5);

	var _hlsEvent2 = _interopRequireDefault(_hlsEvent);

	var _eventBuilder = __webpack_require__(29);

	var _eventBuilder2 = _interopRequireDefault(_eventBuilder);

	var _attrList = __webpack_require__(30);

	var _attrList2 = _interopRequireDefault(_attrList);

	var _url2 = __webpack_require__(31);

	var _url3 = _interopRequireDefault(_url2);

	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Cray on 2016/5/4.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var _this = null,
	    _xhrLoader = null,
	    _url,
	    _id,
	    _level;

	var PlaylistLoader = function (_EventDispatcher) {
	    _inherits(PlaylistLoader, _EventDispatcher);

	    function PlaylistLoader() {
	        _classCallCheck(this, PlaylistLoader);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(PlaylistLoader).call(this));

	        _this = _this2;
	        return _this2;
	    }

	    _createClass(PlaylistLoader, [{
	        key: 'loadMainfestFile',
	        value: function loadMainfestFile(url) {
	            _load(url);
	        }
	    }, {
	        key: 'loadLevelFile',
	        value: function loadLevelFile(data) {
	            _load(data.url, data.level, data.id);
	        }
	    }, {
	        key: 'dispose',
	        value: function dispose() {
	            _get(Object.getPrototypeOf(PlaylistLoader.prototype), 'dispose', this).call(this);
	            if (_xhrLoader) {
	                _xhrLoader.dispose();
	                _xhrLoader = null;
	            }
	            _url = _level = _id = null;
	        }
	    }]);

	    return PlaylistLoader;
	}(_eventDispatcher2.default);

	function _dispatcher(type, data) {
	    _log2.default.log('[PLoader] type: ' + type, data);
	    _this.fire(type, data);
	}

	function _load(url) {
	    var level = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var id = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	    var retry = void 0,
	        timeout = void 0,
	        retryDelay = void 0;

	    _url = url;
	    _level = level;
	    _id = id;

	    if (level) {
	        retry = _hlsConfig2.default.levelLoadingMaxRetry;
	        timeout = _hlsConfig2.default.levelLoadingTimeOut;
	        retryDelay = _hlsConfig2.default.levelLoadingRetryDelay;
	    } else {
	        retry = _hlsConfig2.default.manifestLoadingMaxRetry;
	        timeout = _hlsConfig2.default.manifestLoadingTimeOut;
	        retryDelay = _hlsConfig2.default.manifestLoadingRetryDelay;
	    }
	    _xhrLoader = new _xhrLoader3.default();
	    _xhrLoader.load(_url, '', _loadSuccess, _loadError, _loadTimeout, timeout, retry, retryDelay);
	}

	function _loadSuccess(event, stats) {
	    var target = event.currentTarget,
	        result = target.responseText,
	        url = target.responseURL,
	        levels = void 0;
	    if (url === undefined || url.indexOf('data:') === 0) {
	        url = _url;
	    }

	    stats.tload = performance.now();
	    stats.mtime = new Date(target.getResponseHeader('Last-Modified'));

	    if (result.indexOf('#EXTM3U') === 0) {
	        if (result.indexOf('#EXTINF:') > 0) {
	            var levelDetails = _parseLevelPlaylist(result, url);
	            stats.tparsed = performance.now();
	            if (_level === null) {
	                _dispatcher(_hlsEvent2.default.MANIFEST_LOADED, { levels: [{ details: levelDetails, url: url, level: 0, id: 0, stats: stats }] });
	            } else {
	                _dispatcher(_hlsEvent2.default.LEVEL_LOADED, { details: levelDetails, level: _level, id: _id, stats: stats });
	            }
	        } else {
	            levels = _parseMasterPlaylist(result, url);
	            if (levels.length) {
	                _dispatcher(_hlsEvent2.default.MANIFEST_LOADED, { levels: levels, url: url, stats: stats });
	            } else {
	                _dispatcher(_hlsEvent2.default.ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: _errors.ErrorDetails.MANIFEST_PARSING_ERROR, fatal: true, url: url, reason: 'no level found in manifest' }, true);
	            }
	        }
	    } else {
	        _dispatcher(_hlsEvent2.default.ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: _errors.ErrorDetails.MANIFEST_PARSING_ERROR, fatal: true, url: url, reason: 'no EXTM3U delimiter' }, true);
	    }
	}

	function _loadError(event) {
	    var details = void 0,
	        fatal = void 0;
	    //details = _level === null ? ErrorDetails.MANIFEST_LOAD_ERROR : ErrorDetails.LEVEL_LOAD_ERROR;
	    if (_level === null) {
	        details = _errors.ErrorDetails.MANIFEST_LOAD_ERROR;
	        fatal = true;
	    } else {
	        details = _errors.ErrorDetails.LEVEL_LOAD_ERROR;
	        fatal = false;
	    }
	    if (_xhrLoader) {
	        _xhrLoader.abort();
	    }
	    _dispatcher(_hlsEvent2.default.ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: details, fatal: fatal, url: _url, response: event.currentTarget, level: _level, id: _id }, true);
	}

	function _loadTimeout() {
	    var details = void 0,
	        fatal = void 0;
	    //details = _level === null ? ErrorDetails.MANIFEST_LOAD_ERROR : ErrorDetails.LEVEL_LOAD_ERROR;
	    if (_level === null) {
	        details = _errors.ErrorDetails.MANIFEST_LOAD_TIMEOUT;
	        fatal = true;
	    } else {
	        details = _errors.ErrorDetails.LEVEL_LOAD_TIMEOUT;
	        fatal = false;
	    }
	    if (_xhrLoader) {
	        _xhrLoader.abort();
	    }
	    _dispatcher(_hlsEvent2.default.ERROR, { type: _errors.ErrorTypes.NETWORK_ERROR, details: details, fatal: fatal, url: _url, level: _level, id: _id }, true);
	}

	function _parseMasterPlaylist(value, baseurl) {
	    var levels = [],
	        result = void 0;

	    var re = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g;
	    while ((result = re.exec(value)) != null) {
	        var level = {};

	        var attrs = level.attrs = new _attrList2.default(result[1]);
	        level.url = _resolve(result[2], baseurl);

	        var resolution = attrs.decimalResolution('RESOLUTION');
	        if (resolution) {
	            level.width = resolution.width;
	            level.height = resolution.height;
	        }
	        level.bitrate = attrs.decimalInteger('AVERAGE-BANDWIDTH') || attrs.decimalInteger('BANDWIDTH');
	        level.name = attrs.NAME;

	        var codecs = attrs.CODECS;
	        if (codecs) {
	            codecs = codecs.split(',');
	            for (var i = 0; i < codecs.length; i++) {
	                var codec = codecs[i];
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
	    var currentSN = 0,
	        totalduration = 0,
	        levelDetails = { url: baseurl, fragments: [], live: true, startSN: 0 },
	        levelkey = { method: null, key: null, iv: null, uri: null },
	        cc = 0,
	        programDateTime = null,
	        frag = null,
	        result = void 0,
	        regexp = void 0,
	        byteRangeEndOffset = void 0,
	        byteRangeStartOffset = void 0;

	    regexp = /(?:#EXT-X-(MEDIA-SEQUENCE):(\d+))|(?:#EXT-X-(TARGETDURATION):(\d+))|(?:#EXT-X-(KEY):(.*))|(?:#EXT(INF):([\d\.]+)[^\r\n]*([\r\n]+[^#|\r\n]+)?)|(?:#EXT-X-(BYTERANGE):([\d]+[@[\d]*)]*[\r\n]+([^#|\r\n]+)?|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(PROGRAM-DATE-TIME):(.*))/g;
	    while ((result = regexp.exec(value)) !== null) {
	        result.shift();
	        result = result.filter(function (n) {
	            return n !== undefined;
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
	                var params = result[1].split('@');
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
	                    var fragdecryptdata = void 0,
	                        sn = currentSN++;
	                    if (levelkey.method && levelkey.uri && !levelkey.iv) {
	                        fragdecryptdata = _utils2.default.copy(levelkey);
	                        var uint8View = new Uint8Array(16);
	                        for (var i = 12; i < 16; i++) {
	                            uint8View[i] = sn >> 8 * (15 - i) & 0xff;
	                        }
	                        fragdecryptdata.iv = uint8View;
	                    } else {
	                        fragdecryptdata = levelkey;
	                    }
	                    var url = result[2] ? _resolve(result[2], baseurl) : null;
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
	                var decryptparams = result[1];
	                var keyAttrs = new _attrList2.default(decryptparams);
	                var decryptmethod = keyAttrs.enumeratedString('METHOD'),
	                    decrypturi = keyAttrs.URI,
	                    decryptiv = keyAttrs.hexadecimalInteger('IV');
	                if (decryptmethod) {
	                    levelkey = { method: null, key: null, iv: null, uri: null };
	                    if (decrypturi && decryptmethod === 'AES-128') {
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
	    return _url3.default.getURL(baseUrl, url);
	}

	function _avc1toavcoti(codec) {
	    var result = void 0,
	        avcdata = codec.split('.');
	    if (avcdata.length > 2) {
	        result = avcdata.shift() + '.';
	        result += parseInt(avcdata.shift()).toString(16);
	        result += ('000' + parseInt(avcdata.shift()).toString(16)).substr(-4);
	    } else {
	        result = codec;
	    }
	    return result;
	}

	exports.default = PlaylistLoader;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Cray on 2016/5/4.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventBuilder = function () {
	    function EventBuilder() {
	        _classCallCheck(this, EventBuilder);

	        this.registry = {};
	    }

	    _createClass(EventBuilder, [{
	        key: 'toggleHandler',
	        value: function toggleHandler(ele, events, callback, toggle) {
	            var eventList = events.split(' ');
	            if (ele instanceof NodeList) {
	                for (var x = 0; x < ele.length; x++) {
	                    if (ele[x] instanceof Node) {
	                        this.toggleHandler(ele[x], arguments[1], arguments[2], arguments[3]);
	                    }
	                }
	                return;
	            }
	            for (var i = 0; i < eventList.length; i++) {
	                ele[toggle ? 'addEventListener' : 'removeEventListener'](eventList[i], callback, false);
	            }
	            return this;
	        }
	    }, {
	        key: 'fire',
	        value: function fire(ele, type, data) {
	            if (ele instanceof HTMLElement) {
	                var fauxEvent = document.createEvent('MouseEvents');
	                fauxEvent.initEvent(type, true, true);
	                ele.dispatchEvent(fauxEvent);
	                return this;
	            }

	            data = type;
	            type = ele;

	            var array = void 0,
	                func = void 0,
	                handler = void 0,
	                result = void 0,
	                i = void 0;
	            if (this.registry.hasOwnProperty(type)) {
	                array = this.registry[type];
	                for (i = 0; i < array.length; i++) {
	                    handler = array[i];
	                    func = handler.method;
	                    result = func.apply(null, [data]);
	                    if (handler.guid == 1) {
	                        this.off(type, func);
	                    }
	                }
	            }
	            return result;
	        }
	    }, {
	        key: 'on',
	        value: function on(ele, type, method, guid) {
	            if (ele instanceof HTMLElement || ele == window || ele == document) {
	                this.toggleHandler(ele, type, method, true);
	                return this;
	            }

	            guid = method;
	            method = type;
	            type = ele;

	            if (typeof method != 'function') {
	                _log2.default.error('[EventBuilder] on method not function');
	                return this;
	            }

	            var handler = {
	                method: method,
	                guid: guid
	            };
	            if (this.registry.hasOwnProperty(type)) {
	                this.registry[type].push(handler);
	            } else {
	                this.registry[type] = [handler];
	            }
	            return this;
	        }
	    }, {
	        key: 'off',
	        value: function off(ele, type, method) {
	            if (ele instanceof HTMLElement) {
	                this.toggleHandler(ele, type, method, false);
	                return this;
	            }

	            method = type;
	            type = ele;

	            var array = void 0,
	                handler = void 0,
	                i = void 0;
	            if (this.registry.hasOwnProperty(type)) {
	                array = this.registry[type];
	                if (method && array.length > 0) {
	                    for (i = 0; i < array.length; i++) {
	                        handler = array[i];
	                        if (handler.method == method) array.splice(i, 1);
	                    }
	                    this.registry[type] = array;
	                } else {
	                    delete this.registry[type];
	                }
	            }
	            return this;
	        }
	    }, {
	        key: 'one',
	        value: function one(type, method) {
	            this.on(type, method, 1);
	            return this;
	        }
	    }]);

	    return EventBuilder;
	}();

	exports.default = EventBuilder;

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// adapted from https://github.com/kanongil/node-m3u8parse/blob/master/attrlist.js

	var AttrList = function () {
	  function AttrList(attrs) {
	    _classCallCheck(this, AttrList);

	    if (typeof attrs === 'string') {
	      attrs = AttrList.parseAttrList(attrs);
	    }
	    for (var attr in attrs) {
	      if (attrs.hasOwnProperty(attr)) {
	        this[attr] = attrs[attr];
	      }
	    }
	  }

	  _createClass(AttrList, [{
	    key: 'decimalInteger',
	    value: function decimalInteger(attrName) {
	      var intValue = parseInt(this[attrName], 10);
	      if (intValue > Number.MAX_SAFE_INTEGER) {
	        return Infinity;
	      }
	      return intValue;
	    }
	  }, {
	    key: 'hexadecimalInteger',
	    value: function hexadecimalInteger(attrName) {
	      if (this[attrName]) {
	        var stringValue = (this[attrName] || '0x').slice(2);
	        stringValue = (stringValue.length & 1 ? '0' : '') + stringValue;

	        var value = new Uint8Array(stringValue.length / 2);
	        for (var i = 0; i < stringValue.length / 2; i++) {
	          value[i] = parseInt(stringValue.slice(i * 2, i * 2 + 2), 16);
	        }
	        return value;
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'hexadecimalIntegerAsNumber',
	    value: function hexadecimalIntegerAsNumber(attrName) {
	      var intValue = parseInt(this[attrName], 16);
	      if (intValue > Number.MAX_SAFE_INTEGER) {
	        return Infinity;
	      }
	      return intValue;
	    }
	  }, {
	    key: 'decimalFloatingPoint',
	    value: function decimalFloatingPoint(attrName) {
	      return parseFloat(this[attrName]);
	    }
	  }, {
	    key: 'enumeratedString',
	    value: function enumeratedString(attrName) {
	      return this[attrName];
	    }
	  }, {
	    key: 'decimalResolution',
	    value: function decimalResolution(attrName) {
	      var res = /^(\d+)x(\d+)$/.exec(this[attrName]);
	      if (res === null) {
	        return undefined;
	      }
	      return {
	        width: parseInt(res[1], 10),
	        height: parseInt(res[2], 10)
	      };
	    }
	  }], [{
	    key: 'parseAttrList',
	    value: function parseAttrList(input) {
	      var re = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g;
	      var match,
	          attrs = {};
	      while ((match = re.exec(input)) !== null) {
	        var value = match[2],
	            quote = '"';

	        if (value.indexOf(quote) === 0 && value.lastIndexOf(quote) === value.length - 1) {
	          value = value.slice(1, -1);
	        }
	        attrs[match[1]] = value;
	      }
	      return attrs;
	    }
	  }]);

	  return AttrList;
	}();

	exports.default = AttrList;

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	var URLUitls = {

	  getURL: function getURL(baseURL, relativeURL) {
	    relativeURL = relativeURL.trim();
	    if (/^[a-z]+:/i.test(relativeURL)) {
	      // complete url, not relative
	      return relativeURL;
	    }

	    var relativeURLQuery = null;
	    var relativeURLHash = null;

	    var relativeURLHashSplit = /^([^#]*)(.*)$/.exec(relativeURL);
	    if (relativeURLHashSplit) {
	      relativeURLHash = relativeURLHashSplit[2];
	      relativeURL = relativeURLHashSplit[1];
	    }
	    var relativeURLQuerySplit = /^([^\?]*)(.*)$/.exec(relativeURL);
	    if (relativeURLQuerySplit) {
	      relativeURLQuery = relativeURLQuerySplit[2];
	      relativeURL = relativeURLQuerySplit[1];
	    }

	    var baseURLHashSplit = /^([^#]*)(.*)$/.exec(baseURL);
	    if (baseURLHashSplit) {
	      baseURL = baseURLHashSplit[1];
	    }
	    var baseURLQuerySplit = /^([^\?]*)(.*)$/.exec(baseURL);
	    if (baseURLQuerySplit) {
	      baseURL = baseURLQuerySplit[1];
	    }

	    var baseURLDomainSplit = /^((([a-z]+):)?\/\/[a-z0-9\.\-_~]+(:[0-9]+)?\/)(.*)$/i.exec(baseURL);
	    var baseURLProtocol = baseURLDomainSplit[3];
	    var baseURLDomain = baseURLDomainSplit[1];
	    var baseURLPath = baseURLDomainSplit[5];

	    var builtURL = null;
	    if (/^\/\//.test(relativeURL)) {
	      builtURL = baseURLProtocol + '://' + this.getPath('', relativeURL.substring(2));
	    } else if (/^\//.test(relativeURL)) {
	      builtURL = baseURLDomain + this.getPath('', relativeURL.substring(1));
	    } else {
	      builtURL = this.getPath(baseURLDomain + baseURLPath, relativeURL);
	    }

	    // put the query and hash parts back
	    if (relativeURLQuery) {
	      builtURL += relativeURLQuery;
	    }
	    if (relativeURLHash) {
	      builtURL += relativeURLHash;
	    }
	    return builtURL;
	  },

	  getPath: function getPath(basePath, relativePath) {
	    var sRelPath = relativePath;
	    var nUpLn,
	        sDir = '',
	        sPath = basePath.replace(/[^\/]*$/, sRelPath.replace(/(\/|^)(?:\.?\/+)+/g, '$1'));
	    for (var nEnd, nStart = 0; nEnd = sPath.indexOf('/../', nStart), nEnd > -1; nStart = nEnd + nUpLn) {
	      nUpLn = /^\/(?:\.\.\/)*/.exec(sPath.slice(nEnd))[0].length;
	      sDir = (sDir + sPath.substring(nStart, nEnd)).replace(new RegExp('(?:\\\/+[^\\\/]*){0,' + (nUpLn - 1) / 3 + '}$'), '/');
	    }
	    return sDir + sPath.substr(nStart);
	  }
	};

	module.exports = URLUitls;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _eventBuilder = __webpack_require__(29);

	var _eventBuilder2 = _interopRequireDefault(_eventBuilder);

	var _queue = __webpack_require__(33);

	var _queue2 = _interopRequireDefault(_queue);

	var _preloader = __webpack_require__(34);

	var _preloader2 = _interopRequireDefault(_preloader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $ = {}; /**
	             * Created by Cray on 2016/5/12.
	             */

	(function () {
	    $.queue = new _queue2.default();
	    $.preloader = new _preloader2.default();
	    $.e = new _eventBuilder2.default();

	    $.storage = window.localStorage;
	})();

	exports.default = $;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _event = __webpack_require__(6);

	var _event2 = _interopRequireDefault(_event);

	var _eventDispatcher = __webpack_require__(3);

	var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Cray on 2016/4/8.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var _taskArray = [],
	    _currentTask = null,
	    _onComplete = null;

	/***** Queue Controller Class************/

	var Queue = function (_EventDispatcher) {
	    _inherits(Queue, _EventDispatcher);

	    function Queue() {
	        _classCallCheck(this, Queue);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Queue).call(this));
	    }

	    _createClass(Queue, [{
	        key: 'startUp',
	        value: function startUp() {
	            _checkQueue();
	        }
	    }, {
	        key: 'addTask',
	        value: function addTask(task) {
	            task.on(_event2.default.TASK_COMPLETE, _checkQueue);
	            _taskArray.push(task);
	        }
	    }, {
	        key: 'currentTask',
	        get: function get() {
	            return _currentTask;
	        }
	    }, {
	        key: 'onComplete',
	        set: function set(callback) {
	            _onComplete = callback;
	        }
	    }]);

	    return Queue;
	}(_eventDispatcher2.default);

	function _checkQueue() {

	    if (_taskArray.length > 0) {
	        _currentTask = _taskArray.shift();
	        _currentTask.startUp();
	    } else {
	        _currentTask = null;
	        if (_onComplete && typeof _onComplete == 'function') {
	            _onComplete.call(null);
	            _onComplete = null;
	        }

	        this.fire(_event2.default.QUEUE_COMPLETE);
	    }
	}

	exports.default = Queue;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Cray on 2016/4/15.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	var _eventBuilder = __webpack_require__(29);

	var _eventBuilder2 = _interopRequireDefault(_eventBuilder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var fileMaps = {},
	    support = null,
	    isLoading = false,
	    FILETYPE = {
	    VIDEO: 'video',
	    AUDIO: 'audio',
	    IMAGE: 'image'
	},
	    file_preifx = "File@";

	var Preloader = function () {
	    function Preloader() {
	        _classCallCheck(this, Preloader);

	        support = _support();
	    }

	    _createClass(Preloader, [{
	        key: 'addFile',
	        value: function addFile(filename) {
	            var fileId = '';
	            if (typeof filename == 'string') {
	                fileId = file_preifx + new Date().getTime();
	                fileMaps[fileId] = _packageFile(filename);
	                _updateLoadQueue();
	            }

	            _log2.default.log('[PrLoad] add file: ' + fileId);
	            return fileId;
	        }
	    }, {
	        key: 'getFile',
	        value: function getFile(fileId) {
	            _log2.default.log('[PrLoad] get file: ' + fileId);
	            return typeof fileId == 'string' ? fileMaps[fileId] : null;
	        }
	    }, {
	        key: 'removeFile',
	        value: function removeFile(fileId) {
	            _log2.default.log('[PrLoad] remove file: ' + fileId);
	            if (typeof fileId == 'string') {
	                delete fileMaps[fileId];
	            }
	        }
	    }]);

	    return Preloader;
	}();

	function _packageFile(filename) {

	    var fileType = '';
	    var suffix = /\.[^\.]+$/.exec(filename)[0];
	    _utils2.default.each(support, function (key, value) {
	        if (value.indexOf(suffix) != -1) {
	            fileType = key;
	            return false;
	        }
	    });

	    var fileElement = _getDomElement(fileType);

	    fileElement.loaded = false;

	    fileElement.filePath = filename;
	    fileElement.loadError = false;

	    if (fileElement.tagName.toLowerCase() === 'embed') {
	        return fileElement;
	    }

	    _eventBuilder2.default.on(fileElement, 'load canplaythrough', _onready);
	    _eventBuilder2.default.on(fileElement, 'error', _onerror);

	    function _onready(event) {

	        _eventBuilder2.default.off(fileElement, 'load canplaythrough', _onready);
	        _eventBuilder2.default.off(fileElement, 'error', _onerror);

	        fileElement.loaded = true;
	        isLoading = false;

	        _log2.default.log('[PrLoad] file : ' + fileElement.src + ' loaded.');

	        _updateLoadQueue();
	    }

	    function _onerror(event) {
	        fileElement.loadError = true;
	        _loadError(filename);
	    }

	    return fileElement;
	}

	/**
	 * 获得Dom元素
	 * @param fileType
	 * @returns {*}
	 * @private
	 */
	function _getDomElement(fileType) {
	    var element = null;
	    switch (fileType) {
	        case FILETYPE.AUDIO:
	            {
	                element = typeof Audio !== 'undefined' ? new Audio() : document.createElement('audio');
	                break;
	            }
	        case FILETYPE.VIDEO:
	            {
	                element = document.createElement('video');
	                break;
	            }
	        case FILETYPE.IMAGE:
	            {
	                element = new Image();
	                break;
	            }
	    }

	    return element;
	}

	/**
	 * 更新下载队列
	 * @private
	 */
	function _updateLoadQueue() {
	    _utils2.default.each(fileMaps, function (key, element) {
	        if (element.src == "" && !element.loaded && !isLoading) {
	            isLoading = true;
	            element.src = element.filePath;
	            return false;
	        }
	    });
	}

	/**
	 * 下载出错
	 * @param filename
	 * @private
	 */
	function _loadError(filename) {
	    _log2.default.error(filename);

	    _updateLoadQueue();
	}

	/**
	 * 支持Media类型
	 * @returns {{audio: string[], video: string[], image: string[]}}
	 * @private
	 */
	function _support() {
	    return {
	        audio: ['.mp3', '.wav', '.oga'],
	        video: ['.mp4', '.webm', '.ogg'],
	        image: ['.jpg', '.png', '.jpeg', '.tiff', '.gif'],
	        flash: ['.swf']
	    };
	}

	exports.default = Preloader;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * Created by Cray on 2016/5/4.
	                                                                                                                                                                                                                                                   */

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Dom = {
	    getElements: function getElements(selector) {
	        return document.querySelectorAll(selector);
	    },
	    getElement: function getElement(selector) {
	        try {
	            return this.getElements(selector)[0];
	        } catch (e) {
	            _log2.default.log("Not found " + selector + " element", true);
	        }
	        return null;
	    },
	    getElementById: function getElementById(id) {
	        try {
	            return document.getElementById(id);
	        } catch (e) {
	            _log2.default.log("Not found id" + id + " element", true);
	        }
	        return null;
	    },
	    newElement: function newElement(selector) {
	        return document.createElement(selector);
	    },
	    newTextNode: function newTextNode(text) {
	        return document.createTextNode(text);
	    },
	    wrap: function wrap(elements, wrapper) {
	        if (!elements.length) {
	            elements = [elements];
	        }
	        for (var i = elements.length - 1; i >= 0; i--) {
	            var child = i > 0 ? wrapper.cloneNode(true) : wrapper;
	            var element = elements[i];
	            var parent = element.parentNode;
	            var sibling = element.nextSibling;
	            child.appendChild(element);
	            if (sibling) {
	                parent.insertBefore(child, sibling);
	            } else {
	                parent.appendChild(child);
	            }
	        }
	    },
	    unwrap: function unwrap(wrapper) {
	        var parent = wrapper.parentNode;
	        while (wrapper.firstChild) {
	            parent.insertBefore(wrapper.firstChild, wrapper);
	        }
	        parent.removeChild(wrapper);
	    },
	    remove: function remove(element) {
	        if (element.parentNode) {
	            element.parentNode.removeChild(element);
	        }
	    },
	    removeAllChild: function removeAllChild(parent) {
	        while (parent.hasChildNodes()) {
	            parent.removeChild(parent.firstChild);
	        }
	    },

	    insertAfter: function insertAfter(element, target) {
	        var parent = target.parentNode;
	        if (parent.lastChild == target) {
	            parent.appendChild(element);
	        } else {
	            parent.insertBefore(element, target.nextSibling);
	        }
	    },
	    prependChild: function prependChild(element, parent) {
	        parent.insertBefore(element, parent.firstChild);
	    },
	    setAttributes: function setAttributes(element, attributes) {
	        for (var key in attributes) {
	            element.setAttribute(key, attributes[key]);
	        }
	    },
	    toggleClass: function toggleClass(element, name, state) {
	        if (element) {
	            if (element.classList) {
	                element.classList[state ? 'add' : 'remove'](name);
	            } else {
	                var className = (' ' + element.className + ' ').replace(/\s+/g, ' ').replace(' ' + name + ' ', '');
	                element.className = className + (state ? ' ' + name : '');
	            }
	        }
	    },
	    css: function css(element, props) {
	        var currentStyle = element.currentStyle || element.ownerDocument.defaultView.getComputedStyle(element, null);
	        if (props && 'object' == (typeof props === 'undefined' ? 'undefined' : _typeof(props))) {
	            var empty = true;
	            _utils2.default.each(props, function (prop, value) {
	                empty = false;
	                element.style[prop] = value;
	            });
	            if (empty) {
	                element.style.cssText = "";
	            }
	            return empty;
	        } else if ('string' == typeof props) {
	            return currentStyle[props];
	        }

	        return currentStyle;
	    },
	    insertScript: function insertScript(source) {
	        if (document.querySelectorAll('script[src="' + source + '"]').length) {
	            return;
	        }

	        var tag = document.createElement('script');
	        tag.src = source;
	        var firstScriptTag = document.getElementsByTagName('script')[0];
	        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	    },
	    toggleState: function toggleState(target, state) {
	        var attrState = target.getAttribute('state') || false;
	        attrState = typeof attrState === 'boolean' ? attrState : attrState === 'true';
	        if (state === undefined) {
	            state = attrState;
	        } else {
	            state = typeof state === 'boolean' ? state : !attrState;
	            target.setAttribute('state', state);
	        }
	        return state;
	    }
	};

	exports.default = Dom;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _eventDispatcher = __webpack_require__(3);

	var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	var _context = __webpack_require__(32);

	var _context2 = _interopRequireDefault(_context);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Cray on 2016/4/5.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Sprite = function (_EventDispatcher) {
	    _inherits(Sprite, _EventDispatcher);

	    function Sprite() {
	        _classCallCheck(this, Sprite);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sprite).call(this));

	        _this.fullscreen = _context2.default.fullscreen = _utils2.default.fullScreenSupport();
	        _this.supported = _context2.default.supported = _utils2.default.supported();

	        _context2.default.e.on(window, 'resize', function (event) {
	            _context2.default.e.fire('resize');
	        });

	        _context2.default.e.on(window, 'keyup', function (event) {
	            switch (event.keyCode) {
	                case 27:
	                    {
	                        //esc
	                        _context2.default.e.fire('resize');
	                        break;
	                    }
	            }
	        });
	        return _this;
	    }

	    return Sprite;
	}(_eventDispatcher2.default);

	exports.default = Sprite;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _iplayer = __webpack_require__(38);

	var _iplayer2 = _interopRequireDefault(_iplayer);

	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	var _playerConfig = __webpack_require__(39);

	var _playerConfig2 = _interopRequireDefault(_playerConfig);

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	var _dom = __webpack_require__(35);

	var _dom2 = _interopRequireDefault(_dom);

	var _skin = __webpack_require__(40);

	var _skin2 = _interopRequireDefault(_skin);

	var _ui = __webpack_require__(42);

	var _ui2 = _interopRequireDefault(_ui);

	var _control = __webpack_require__(43);

	var _control2 = _interopRequireDefault(_control);

	var _context = __webpack_require__(32);

	var _context2 = _interopRequireDefault(_context);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Cray flex.on 2015/12/28.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var _this = void 0,
	    config = _playerConfig2.default;

	var Player = function (_IPlayer) {
	    _inherits(Player, _IPlayer);

	    function Player() {
	        _classCallCheck(this, Player);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this));

	        _this2.browser = _utils2.default.browserSniff();
	        _this2.supported = _utils2.default.supported();

	        _this = _this2;
	        return _this2;
	    }

	    _createClass(Player, [{
	        key: 'startup',
	        value: function startup(media) {
	            _get(Object.getPrototypeOf(Player.prototype), 'startup', this).call(this, media);
	            _log2.default.log('[Player] init Player~ ');
	            _log2.default.log('[Player] browser:' + this.browser.name + ' version:' + this.browser.version);

	            this.box = media.parentNode;

	            _setupMedia();

	            if (config.control) {
	                _context2.default.skin = new _skin2.default();
	                _context2.default.skin.loadSkin(config.skin);

	                _context2.default.ui = new _ui2.default();
	                _context2.default.ui.startup(this);

	                _context2.default.control = new _control2.default();
	                _context2.default.control.startup(this);

	                if (config.displayDuration) {
	                    _context2.default.control.displayDuration();
	                }
	            }
	        }
	    }, {
	        key: 'resize',
	        value: function resize(w, h) {
	            config.videoWidth = w;
	            config.videoHeight = h;
	            w = w < 0 ? "100%" : w + 'px';
	            h = h < 0 ? "100%" : h + 'px';
	            _dom2.default.css(_this.videoContainer, { width: w, height: h });
	        }
	    }, {
	        key: 'removeSources',
	        value: function removeSources() {
	            var sources = _this.media.querySelectorAll('source');
	            for (var i = sources.length - 1; i >= 0; i--) {
	                _dom2.default.remove(sources[i]);
	            }
	            _this.media.removeAttribute('src');
	        }
	    }, {
	        key: 'addSource',
	        value: function addSource(attributes) {
	            if (attributes.src) {
	                var e = document.createElement('source');
	                _dom2.default.setAttributes(e, attributes);
	                _dom2.default.prependChild(e, _this.media);
	            }
	        }
	    }, {
	        key: 'updateSource',
	        value: function updateSource(sources) {

	            this.media.pause();
	            this.removeSources();

	            if (typeof sources === 'string') {
	                this.addSource({ src: sources });
	            } else if (sources.constructor === Array) {
	                for (var index in sources) {
	                    this.addSource(sources[index]);
	                }
	            }
	            this.media.load();
	        }
	    }, {
	        key: 'updatePoster',
	        value: function updatePoster(source) {
	            if (this.media) {
	                this.media.setAttribute('poster', source);
	            }
	        }
	    }, {
	        key: 'supportMime',
	        value: function supportMime(mimeType) {
	            var media = this.media;
	            if (this.type == 'video') {
	                switch (mimeType) {
	                    case 'video/webm':
	                        return !!(media.canPlayType && media.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/, '')); //probably,maybe,-
	                    case 'video/mp4':
	                        return !!(media.canPlayType && media.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/, ''));
	                    case 'video/ogg':
	                        return !!(media.canPlayType && media.canPlayType('video/ogg; codecs="theora"').replace(/no/, ''));
	                }
	            }
	            return false;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            _get(Object.getPrototypeOf(Player.prototype), 'destroy', this).call(this);
	            if (this.media) {
	                this.container.setAttribute('class', config.selectors.container.replace('.', ''));

	                _dom2.default.remove(_dom2.default.getElement(config.selectors.controls));
	                _dom2.default.unwrap(this.videoContainer);
	                this.media.setAttribute('controls', '');

	                var clone = this.media.cloneNode(true);
	                this.media.parentNode.replaceChild(clone, this.media);
	            }
	        }
	    }, {
	        key: 'isFullscreen',
	        get: function get() {
	            return _context2.default.fullscreen.isFullScreen(this.container);
	        }
	    }]);

	    return Player;
	}(_iplayer2.default);

	function _setupMedia() {

	    if (_this.supported.full && config.control) {

	        var container = _dom2.default.newElement('div');
	        container.setAttribute('class', 'player flex-player');
	        _this.box.appendChild(container);
	        _this.container = container;
	        _this.container.appendChild(_this.media);

	        var w = void 0,
	            h = void 0;
	        w = _this.box.offsetWidth;
	        h = _this.box.offsetHeight;
	        _dom2.default.css(container, { width: w + 'px', height: h + 'px' });

	        var wrapper = _dom2.default.newElement('div');
	        wrapper.setAttribute('class', config.classes.videoWrapper);
	        _dom2.default.wrap(_this.media, wrapper);
	        _this.videoContainer = wrapper;

	        _dom2.default.toggleClass(_this.container, config.classes.type.replace('{0}', _this.type), true);
	        _dom2.default.toggleClass(_this.container, config.classes.stopped, _this.media.getAttribute('autoplay') === null);

	        if (_this.browser.ios) {
	            _dom2.default.toggleClass(_this.container, 'ios', true);
	        }
	    } else {

	        config.control = false;
	        _dom2.default.setAttributes(_this.media, { controls: 'controls' });
	    }

	    if (config.poster !== "") {
	        _this.updatePoster(config.poster);
	    }
	    if (!config.menu) {
	        _dom2.default.setAttributes(_this.media, { oncontextmenu: "return false;" });
	    }
	    //CORS
	    _dom2.default.setAttributes(_this.media, { crossOrigin: 'anonymous' });
	}

	exports.default = Player;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _eventDispatcher = __webpack_require__(3);

	var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Cray on 2016/5/12.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var IPlayer = function (_EventDispatcher) {
	    _inherits(IPlayer, _EventDispatcher);

	    function IPlayer() {
	        _classCallCheck(this, IPlayer);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(IPlayer).call(this));
	    }

	    _createClass(IPlayer, [{
	        key: 'startup',
	        value: function startup(media) {
	            this.media = media;
	            this.type = this.media.tagName.toLowerCase();
	        }
	    }, {
	        key: 'play',
	        value: function play() {
	            this.media.play();
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {
	            this.media.pause();
	        }
	    }, {
	        key: 'rewind',
	        value: function rewind(seekTime) {
	            this.seek(this.media.currentTime - seekTime);
	        }
	    }, {
	        key: 'forward',
	        value: function forward(seekTime) {
	            this.seek(this.media.currentTime + seekTime);
	        }
	    }, {
	        key: 'seek',
	        value: function seek(input) {
	            var targetTime = 0;

	            if (typeof input === 'number') {
	                targetTime = input;
	            } else if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && (input.type === 'input' || input.type === 'change')) {
	                targetTime = input.target.value / input.target.max * this.media.duration;
	            }

	            if (targetTime < 0) {
	                targetTime = 0;
	            } else if (targetTime > this.media.duration) {
	                targetTime = this.media.duration;
	            }

	            try {
	                this.media.currentTime = targetTime.toFixed(1);
	            } catch (e) {}
	        }
	    }, {
	        key: 'setVolume',
	        value: function setVolume(volume) {

	            if (volume > 10) {
	                volume = 10;
	            }
	            if (volume < 0) {
	                volume = 0;
	            }

	            this.media.volume = parseFloat(volume / 10);

	            if (this.media.muted && volume > 0) {
	                this.toggleMute();
	            }
	        }
	    }, {
	        key: 'toggleMute',
	        value: function toggleMute(muted) {
	            if (typeof muted !== 'boolean') {
	                muted = !this.media.muted;
	            }
	            this.media.muted = muted;
	        }
	    }, {
	        key: 'togglePlay',
	        value: function togglePlay(toggle) {
	            if (toggle === true) {
	                this.play();
	            } else if (toggle === false) {
	                this.pause();
	            } else {
	                this.media[this.media.paused ? 'play' : 'pause']();
	            }
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {}
	    }]);

	    return IPlayer;
	}(_eventDispatcher2.default);

	exports.default = IPlayer;

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * playerWidth | playerHeight = -1:100% || number
	 *
	 */
	var playerConfig = {
	    seekTime: 10,
	    volume: 5,
	    poster: "",
	    menu: true,
	    click: true,
	    tooltips: false,
	    control: true,
	    autoPlay: false,
	    displayDuration: true,
	    duration: 0,
	    size: 0,
	    offsetProgress: 0,
	    playerWidth: 0,
	    playerHeight: 0,
	    videoWidth: 0,
	    videoHeight: 0,
	    playerAdWidth: 0,
	    playerAdHeight: 0,
	    controlHeight: 48,
	    iconPrefix: 'icon',
	    selectors: {
	        container: '.flex-player',
	        controls: '.player-controls',
	        controlsAd: '.player-controls-ad',
	        labels: '[data-player] .sr-only, label',
	        buttons: {
	            seek: '[data-player="seek"]',
	            play: '[data-player="play"]',
	            pause: '[data-player="pause"]',
	            restart: '[data-player="restart"]',
	            rewind: '[data-player="rewind"]',
	            forward: '[data-player="fast-forward"]',
	            mute: '[data-player="mute"]',
	            volume: '[data-player="volume"]',
	            quality: '[data-player="quality"]',
	            fullscreen: '[data-player="fullscreen"]',
	            muteAd: '[data-player="mute-ad"]',
	            fullscreenAd: '[data-player="fullscreen-ad"]',
	            jumpToAd: '[data-player="jumpTo"]'
	        },
	        progress: {
	            container: '.player-progress',
	            buffer: '.player-progress-buffer',
	            played: '.player-progress-played'
	        },
	        currentTime: '.player-current-time',
	        duration: '.player-duration'
	    },
	    classes: {
	        videoWrapper: 'player-video-wrapper',
	        embedWrapper: 'player-video-embed',
	        adVideoWrapper: 'player-adVideo-wrapper',
	        loaderLayer: 'player-loader-layer',
	        videoOverlay: 'player-video-overlay',
	        coverLayer: 'player-cover-layer',
	        popLayer: 'player-pop-layer',
	        pauseAdWrapper: 'player-pause-ad',
	        adCountDown: 'player-ad-countdown',
	        type: 'player-{0}',
	        stopped: 'stopped',
	        playing: 'playing',
	        muted: 'muted',
	        mutedAd: 'mutedAd',
	        loading: 'loading',
	        tooltip: 'player-tooltip',
	        hidden: 'sr-only',
	        hideConver: 'hide',
	        qualityList: 'player-qualityList',
	        hover: 'player-hover',
	        fullscreen: {
	            enabled: 'fullscreen-enabled',
	            active: 'fullscreen-active',
	            hideControls: 'fullscreen-hide-controls'
	        }
	    },
	    fullscreen: {
	        enabled: true,
	        fallback: true,
	        hideControls: true
	    },
	    storage: {
	        enabled: true,
	        key: 'player_volume'
	    },
	    controls: ['restart', 'rewind', 'play', 'fast-forward', 'current-time', 'duration', 'mute', 'volume', 'quality', 'captions', 'fullscreen'],
	    cn: {
	        restart: '重播',
	        rewind: '后退 {seektime} 秒',
	        play: '播放',
	        pause: '暂停',
	        forward: '前进 {seektime} 秒',
	        played: '已播放',
	        buffered: '已缓冲',
	        currentTime: '当前时间',
	        duration: '总时间',
	        volume: '音量',
	        toggleMute: '开关静音',
	        quality: '清晰度',
	        toggleFullscreen: '开关全屏',
	        fullTipExit: '退出',
	        fullTipIn: '全屏'
	    },
	    i18n: {
	        restart: 'Restart',
	        rewind: 'Rewind {seektime} secs',
	        play: 'Play',
	        pause: 'Pause',
	        forward: 'Forward {seektime} secs',
	        played: 'played',
	        buffered: 'buffered',
	        currentTime: 'Current time',
	        duration: 'Duration',
	        volume: 'Volume',
	        toggleMute: 'Toggle Mute',
	        toggleFullscreen: 'Toggle Fullscreen'
	    }
	};

	exports.default = playerConfig;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Cray on 2016/5/12.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _xhrLoader = __webpack_require__(25);

	var _xhrLoader2 = _interopRequireDefault(_xhrLoader);

	var _playerConfig = __webpack_require__(39);

	var _playerConfig2 = _interopRequireDefault(_playerConfig);

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	var _playerEvent = __webpack_require__(41);

	var _playerEvent2 = _interopRequireDefault(_playerEvent);

	var _dom = __webpack_require__(35);

	var _dom2 = _interopRequireDefault(_dom);

	var _context = __webpack_require__(32);

	var _context2 = _interopRequireDefault(_context);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _body = document.body;

	var Skin = function () {
	    function Skin() {
	        _classCallCheck(this, Skin);
	    }

	    _createClass(Skin, [{
	        key: 'loadSkin',
	        value: function loadSkin(url) {
	            _log2.default.log('[SM] start load skin url ' + url);

	            this.xhrLoader = new _xhrLoader2.default();
	            this.xhrLoader.load(url, '', _loadSuccess, _loadError, _loadTimeout, 5000, 3, 500);
	        }
	    }]);

	    return Skin;
	}();

	function _loadSuccess(event) {
	    var target = event.currentTarget,
	        result = target.responseText;
	    var c = _dom2.default.newElement("div");
	    c.setAttribute("hidden", "");
	    c.innerHTML = result;
	    _body.insertBefore(c, _body.childNodes[0]);
	}

	function _loadError(event) {
	    _log2.default.error('[Skin] loaded skin on error');
	    //$.e.fire(PEvent.ERROR, {});
	}

	function _loadTimeout() {
	    _log2.default.error('[Skin] loaded skin on timeout');
	}

	exports.default = Skin;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _event = __webpack_require__(6);

	var _event2 = _interopRequireDefault(_event);

	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by Cray on 2016/5/12.
	 */


	var PEvent = _utils2.default.merge({
	    RESIZE: 'resize',
	    HIDE_COVER: 'hide_cover',
	    PLAY_STATE: 'play_state'
	}, _event2.default);

	exports.default = PEvent;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Cray on 2015/12/17.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _context = __webpack_require__(32);

	var _context2 = _interopRequireDefault(_context);

	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	var _ticker = __webpack_require__(9);

	var _ticker2 = _interopRequireDefault(_ticker);

	var _playerConfig = __webpack_require__(39);

	var _playerConfig2 = _interopRequireDefault(_playerConfig);

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	var _dom = __webpack_require__(35);

	var _dom2 = _interopRequireDefault(_dom);

	var _playerEvent = __webpack_require__(41);

	var _playerEvent2 = _interopRequireDefault(_playerEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _this = void 0,
	    config = null,
	    player = null,
	    fullscreen = null;

	var UI = function () {
	    function UI() {
	        _classCallCheck(this, UI);

	        _log2.default.log('[UI] init ui');

	        config = _playerConfig2.default;
	        fullscreen = _utils2.default.fullScreenSupport();

	        _this = this;
	    }

	    _createClass(UI, [{
	        key: 'startup',
	        value: function startup($player) {

	            this.player = player = $player;

	            /** Loading界面 **/
	            _initLoadingUI();
	            /** 控制条界面 **/
	            _initControlUI();
	            /** 控制元素 **/
	            _initPlayerElements();
	            /** popLayer **/
	            _initPopLayer();
	            /** 初始化全屏 **/
	            _initFullscreen();
	            /** 显示布局 **/
	            _initDisplayLayer();

	            this.showCover();

	            _context2.default.e.on(_playerEvent2.default.RESIZE, _resizeHandler);
	        }
	    }, {
	        key: 'pop',
	        value: function pop(element, options) {
	            _dom2.default.removeAllChild(player.popLayer);

	            if (element instanceof HTMLElement) {
	                player.popLayer.appendChild(element);
	            } else if (typeof element != 'undefined') {
	                player.popLayer.innerHTML = element;
	            } else {
	                _log2.default.error('[UI] pop content error');
	                return;
	            }

	            _updatePopDisplay();
	        }
	    }, {
	        key: 'showCover',
	        value: function showCover() {
	            var playerCover = _dom2.default.newElement('div');
	            player.container.appendChild(playerCover);
	            playerCover.setAttribute('class', config.classes.coverLayer);

	            this.cover = playerCover;

	            var img = _dom2.default.newElement('img');
	            img.src = config.cover;
	            img.setAttribute('class', config.classes.coverLayer);
	            playerCover.appendChild(img);

	            var span = _dom2.default.newElement('span');
	            span.setAttribute('class', config.classes.coverLayer);
	            playerCover.appendChild(span);

	            _context2.default.e.on(playerCover, 'transitionend webkitTransitionEnd mozTransitionEnd', function (event) {
	                _dom2.default.remove(playerCover);
	            });
	            _context2.default.e.on(_playerEvent2.default.HIDE_COVER, function (event) {
	                _ticker2.default.tick(300, _hideCover);
	            });

	            function _hideCover() {
	                _dom2.default.toggleClass(_this.cover, config.classes.hideConver, true);
	                _dom2.default.toggleState(_this.cover, true);
	            }
	        }
	    }, {
	        key: 'measureWidth',
	        get: function get() {
	            var w = void 0;
	            if (player.isFullscreen) {
	                w = window.innerWidth;
	            } else {
	                w = config.playerWidth;
	            }
	            return w;
	        }
	    }, {
	        key: 'measureHeight',
	        get: function get() {
	            var h = void 0;
	            if (player.isFullscreen) {
	                h = window.innerHeight;
	            } else {
	                h = config.playerHeight;
	            }
	            return h;
	        }
	    }]);

	    return UI;
	}();

	/** 初始化dom元素 **/


	function _initPlayerElements() {
	    _this.controls = _dom2.default.getElement(config.selectors.controls);

	    _this.buttons = {};
	    _this.buttons.seek = _dom2.default.getElement(config.selectors.buttons.seek);
	    _this.buttons.play = _dom2.default.getElement(config.selectors.buttons.play);
	    _this.buttons.pause = _dom2.default.getElement(config.selectors.buttons.pause);
	    _this.buttons.restart = _dom2.default.getElement(config.selectors.buttons.restart);
	    _this.buttons.rewind = _dom2.default.getElement(config.selectors.buttons.rewind);
	    _this.buttons.forward = _dom2.default.getElement(config.selectors.buttons.forward);
	    _this.buttons.fullscreen = _dom2.default.getElement(config.selectors.buttons.fullscreen);

	    _this.buttons.mute = _dom2.default.getElement(config.selectors.buttons.mute);
	    _this.buttons.quality = _dom2.default.getElement(config.selectors.buttons.quality);
	    _this.checkboxes = _dom2.default.getElements('[type="checkbox"]');

	    _this.progress = {};
	    _this.progress.container = _dom2.default.getElement(config.selectors.progress.container);

	    _this.progress.buffer = {};
	    _this.progress.buffer.bar = _dom2.default.getElement(config.selectors.progress.buffer);
	    _this.progress.buffer.text = _this.progress.buffer.bar && _this.progress.buffer.bar.getElementsByTagName('span')[0];

	    _this.progress.played = {};
	    _this.progress.played.bar = _dom2.default.getElement(config.selectors.progress.played);
	    _this.progress.played.text = _this.progress.played.bar && _this.progress.played.bar.getElementsByTagName('span')[0];

	    _this.volume = _dom2.default.getElement(config.selectors.buttons.volume);

	    _this.duration = _dom2.default.getElement(config.selectors.duration);
	    _this.currentTime = _dom2.default.getElement(config.selectors.currentTime);
	    _this.seekTime = _dom2.default.getElements(config.selectors.seekTime);
	}

	/**
	 * 初始化显示布局
	 * @private
	 */
	function _initDisplayLayer() {

	    _updateConfig();
	    if (_this.isFullScreen) {
	        _dom2.default.css(player.container, {});
	        _dom2.default.css(player.videoContainer, {});
	    } else {
	        _dom2.default.css(player.container, { width: config.playerWidth + 'px', height: config.playerHeight + 'px' });
	        player.resize(config.videoWidth, config.videoHeight);
	    }
	    if (_dom2.default.toggleState(_this.buttons.fullscreen) != player.isFullscreen) {
	        _updateControlsDisplay();
	    }
	    if (_this.popLayer.childNodes.length > 0) {
	        _updatePopDisplay();
	    }
	}

	/**
	 * 更新pop层显示
	 * @private
	 */
	function _updatePopDisplay() {
	    var element = _this.popLayer.firstChild,
	        w = void 0,
	        h = void 0,
	        left = void 0,
	        top = void 0;
	    if (player.isFullscreen) {
	        w = window.innerWidth;
	        h = window.innerHeight;
	    } else {
	        w = config.videoWidth;
	        h = config.videoHeight;
	    }

	    left = Number.parseInt((w - element.offsetWidth) / 2);
	    top = Number.parseInt((h - element.offsetHeight) / 2);

	    _dom2.default.css(element, { position: 'absolute', top: top + 'px', left: left + 'px' });
	}

	/**
	 * 大小改变
	 * @private
	 */
	function _resizeHandler() {
	    _initDisplayLayer();
	}

	/**
	 * 更新配置文件播放器和视频大小
	 * @private
	 */
	function _updateConfig() {
	    config.playerWidth = player.container.parentNode.offsetWidth;
	    config.playerHeight = player.container.parentNode.offsetHeight;

	    config.videoWidth = config.playerWidth;
	    config.videoHeight = config.playerHeight - config.controlHeight;
	}

	function _initFullscreen() {
	    if (config.fullscreen.enabled) {
	        var nativeSupport = fullscreen.supportsFullScreen;

	        if (nativeSupport || config.fullscreen.fallback && !_utils2.default.inFrame()) {
	            _log2.default.log('[CM] ' + (nativeSupport ? 'Native' : 'Fallback') + ' fullscreen enabled.');
	            _dom2.default.toggleClass(player.container, config.classes.fullscreen.enabled, true);
	        }
	        _dom2.default.toggleState(_this.buttons.fullscreen, _this.isFullScreen);
	    }
	}

	function _updateControlsDisplay() {

	    var tipEle = _dom2.default.getElement(config.selectors.buttons.fullscreen + ' .' + config.classes.tooltip);
	    if (player.isFullscreen) {
	        tipEle.innerText = config.cn.fullTipExit;
	    } else {
	        tipEle.innerText = config.cn.fullTipIn;
	    }

	    _dom2.default.toggleClass(player.container, config.classes.fullscreen.active, player.isFullscreen);
	    _dom2.default.toggleState(_this.buttons.fullscreen, player.isFullscreen);

	    var hoverTimer = void 0,
	        isMouseOver = false;

	    function _showControls() {
	        _dom2.default.toggleClass(player.container, config.classes.hover, true);

	        window.clearTimeout(hoverTimer);

	        if (!isMouseOver) {
	            hoverTimer = window.setTimeout(function () {
	                flex.toggleClass(player.container, config.classes.hover, false);
	            }, 2000);
	        }
	    }

	    function _setMouseOver(event) {
	        isMouseOver = event.type === 'mouseenter';
	    }

	    if (config.fullscreen.hideControls) {
	        _dom2.default.toggleClass(player.container, config.classes.fullscreen.hideControls, player.isFullscreen);

	        _context2.default.e.toggleHandler(_this.controls, 'mouseenter mouseleave', _setMouseOver, player.isFullscreen);
	        _context2.default.e.toggleHandler(player.container, 'mousemove', _showControls, player.isFullscreen);
	    }
	}

	/**
	 * 初始化pop层
	 * @private
	 */
	function _initPopLayer() {
	    var popLayer = _dom2.default.newElement('div');
	    _dom2.default.insertAfter(popLayer, _this.controls);
	    popLayer.setAttribute('class', config.classes.popLayer);

	    _this.popLayer = popLayer;
	}

	/**
	 * Loading
	 * @private
	 */
	function _initLoadingUI() {
	    var loader = _dom2.default.newElement('div');
	    loader.setAttribute('class', config.classes.loaderLayer);
	    _dom2.default.insertAfter(loader, player.videoContainer);

	    var inner = _dom2.default.newElement('div');
	    inner.setAttribute('class', 'inner ball-spin-fade-loader');
	    loader.appendChild(inner);

	    var l = Math.round(config.playerWidth / 2) - 10,
	        t = Math.round(config.playerHeight / 2) - 20;
	    _dom2.default.css(inner, { top: t + 'px', left: l + 'px' });

	    for (var i = 0; i < 8; i++) {
	        inner.appendChild(_dom2.default.newElement('div'));
	    }

	    _this.loader = loader;
	}

	/** 初始化控制界面 **/
	function _initControlUI() {
	    var html = config.ctrlHTML;

	    if (!html) {
	        html = _customTemplte();
	    }

	    html = _utils2.default.replaceAll(html, '{seektime}', config.seekTime);
	    html = _utils2.default.replaceAll(html, '{id}', Math.floor(Math.random() * 10000));

	    player.container.insertAdjacentHTML('beforeend', html);

	    if (config.tooltips) {
	        var labels = _dom2.default.getElements(config.selectors.labels);

	        for (var i = labels.length - 1; i >= 0; i--) {
	            var label = labels[i];
	            if (label.classList.contains('sr-only')) {
	                _dom2.default.toggleClass(label, config.classes.hidden, false);
	                _dom2.default.toggleClass(label, config.classes.tooltip, true);
	            }
	        }
	    }
	}

	function _customTemplte() {
	    var html = ['<div class="player-controls">', '<div class="player-progress">', '<label for="seek{id}" class="sr-only">Seek</label>', '<input id="seek{id}" class="player-progress-seek" type="range" min="0" max="100" step="0.5" value="0" data-player="seek">', '<progress class="player-progress-played" max="100" value="0">', '<span>0</span>% ' + config.cn.played, '</progress>', '<progress class="player-progress-buffer" max="100" value="0">', '<span>0</span>% ' + config.cn.buffered, '</progress>', '</div>', '<span class="player-controls-left">'];

	    if (_utils2.default.inArray(config.controls, 'restart')) {
	        html.push('<button type="button" data-player="restart">', '<svg><use xlink:href="#' + config.iconPrefix + '-restart" /></svg>', '<span class="sr-only">' + config.cn.restart + '</span>', '</button>');
	    }

	    if (_utils2.default.inArray(config.controls, 'rewind')) {
	        html.push('<button type="button" data-player="rewind">', '<svg><use xlink:href="#' + config.iconPrefix + '-rewind" /></svg>', '<span class="sr-only">' + config.cn.rewind + '</span>', '</button>');
	    }

	    if (_utils2.default.inArray(config.controls, 'play')) {
	        html.push('<button type="button" data-player="play">', '<svg><use xlink:href="#' + config.iconPrefix + '-play" /></svg>', '<span class="sr-only">' + config.cn.play + '</span>', '</button>', '<button type="button" data-player="pause">', '<svg><use xlink:href="#' + config.iconPrefix + '-pause" /></svg>', '<span class="sr-only">' + config.cn.pause + '</span>', '</button>');
	    }

	    if (_utils2.default.inArray(config.controls, 'fast-forward')) {
	        html.push('<button type="button" data-player="fast-forward">', '<svg><use xlink:href="#' + config.iconPrefix + '-fast-forward" /></svg>', '<span class="sr-only">' + config.cn.forward + '</span>', '</button>');
	    }

	    if (_utils2.default.inArray(config.controls, 'current-time')) {
	        html.push('<span class="player-time">', '<span class="sr-only">' + config.cn.currentTime + '</span>', '<span class="player-current-time">00:00</span>', '</span>');
	    }

	    if (_utils2.default.inArray(config.controls, 'duration')) {
	        html.push('<span class="player-time">', '<span class="sr-only">' + config.cn.duration + '</span>', '<span class="player-duration">00:00</span>', '</span>');
	    }

	    html.push('</span>', '<span class="player-controls-right">');

	    if (_utils2.default.inArray(config.controls, 'quality')) {
	        html.push('<button type="button" data-player="quality">', '<span class="q-label"></span>', '<span class="player-qualityListWrap"></span>', '</button>');
	    }

	    if (_utils2.default.inArray(config.controls, 'mute')) {
	        html.push('<button type="button" data-player="mute">', '<svg class="icon-muted"><use xlink:href="#' + config.iconPrefix + '-muted" /></svg>', '<svg><use xlink:href="#' + config.iconPrefix + '-volume" /></svg>', '<span class="sr-only">' + config.cn.toggleMute + '</span>', '</button>');
	    }

	    if (_utils2.default.inArray(config.controls, 'volume')) {
	        html.push('<label for="volume{id}" class="sr-only">' + config.cn.volume + '</label>', '<input id="volume{id}" class="player-volume" type="range" min="0" max="10" value="5" data-player="volume">');
	    }

	    //if (Utils.inArray(config.controls, 'captions')) {
	    //    html.push(
	    //        '<button type="button" data-player="captions">',
	    //        '<svg class="icon-captions-on"><use xlink:href="#' + config.iconPrefix + '-captions-on" /></svg>',
	    //        '<svg><use xlink:href="#' + config.iconPrefix + '-captions-off" /></svg>',
	    //        '<span class="sr-only">' + config.cn.toggleCaptions + '</span>',
	    //        '</button>'
	    //    );
	    //}

	    if (_utils2.default.inArray(config.controls, 'fullscreen')) {
	        html.push('<button type="button" data-player="fullscreen">', '<svg class="icon-exit-fullscreen"><use xlink:href="#' + config.iconPrefix + '-exit-fullscreen" /></svg>', '<svg><use xlink:href="#' + config.iconPrefix + '-enter-fullscreen" /></svg>', '<span class="sr-only">' + config.cn.toggleFullscreen + '</span>', '</button>');
	    }

	    html.push('</span>', '</div>');

	    return html.join('');
	}

	exports.default = UI;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Cray on 2016/5/13.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _context = __webpack_require__(32);

	var _context2 = _interopRequireDefault(_context);

	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	var _ticker = __webpack_require__(9);

	var _ticker2 = _interopRequireDefault(_ticker);

	var _playerConfig = __webpack_require__(39);

	var _playerConfig2 = _interopRequireDefault(_playerConfig);

	var _log = __webpack_require__(8);

	var _log2 = _interopRequireDefault(_log);

	var _dom = __webpack_require__(35);

	var _dom2 = _interopRequireDefault(_dom);

	var _playerEvent = __webpack_require__(41);

	var _playerEvent2 = _interopRequireDefault(_playerEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _this = void 0,
	    player = void 0,
	    config = void 0,
	    _ui = void 0,
	    _e = void 0;

	var Control = function () {
	    function Control() {
	        _classCallCheck(this, Control);

	        _this = this;
	    }

	    _createClass(Control, [{
	        key: 'startup',
	        value: function startup($player) {
	            player = $player;
	            _e = _context2.default.e;
	            _ui = _context2.default.ui;

	            config = _playerConfig2.default;

	            player.setVolume(config.volume);
	            this.updateVolume();

	            _addListeners();
	        }
	    }, {
	        key: 'updateVolume',
	        value: function updateVolume() {
	            var volume = player.media.muted ? 0 : player.media.volume * 10;

	            if (_context2.default.storage) {
	                _context2.default.storage.setItem(config.storage.key, volume);
	            }

	            _dom2.default.toggleClass(player.container, config.classes.muted, volume === 0);
	            if (player.supported.full && _ui.buttons.mute) {
	                _dom2.default.toggleState(_ui.buttons.mute, volume === 0);
	            }
	        }

	        /**
	         * 显示播放时间
	         * **/

	    }, {
	        key: 'displayDuration',
	        value: function displayDuration() {
	            var duration = config.duration || player.media.duration;
	            if (player.duration && config.displayDuration && !!duration) {
	                this.updateTimeDisplay(duration, player.duration);
	            }
	        }

	        /**
	         * 更新时间
	         * @param time
	         * @param element
	         */

	    }, {
	        key: 'updateTimeDisplay',
	        value: function updateTimeDisplay(time, element) {
	            if (!element) {
	                return;
	            }

	            player.secs = parseInt(time % 60);
	            player.mins = parseInt(time / 60 % 60);
	            player.hours = parseInt(time / 60 / 60 % 60);

	            var displayHours = parseInt(player.media.duration / 60 / 60 % 60) > 0;

	            player.secs = ('0' + player.secs).slice(-2);
	            player.mins = ('0' + player.mins).slice(-2);

	            element.innerHTML = (displayHours ? player.hours + ':' : '') + player.mins + ':' + player.secs;
	        }

	        /**
	         * 播放状态
	         */

	    }, {
	        key: 'checkPlaying',
	        value: function checkPlaying(event) {
	            _dom2.default.toggleClass(player.container, config.classes.playing, !player.media.paused);
	            _dom2.default.toggleClass(player.container, config.classes.stopped, player.media.paused);

	            event = event || { type: player.media.paused ? 'pause' : 'play' };
	            _e.fire(_playerEvent2.default.PLAY_STATE, event.type);
	        }
	    }]);

	    return Control;
	}();

	function _addListeners() {
	    var inputEvent = player.browser.name == 'IE' ? 'change' : 'input';

	    function checkFocus() {
	        var focused = document.activeElement;
	        if (!focused || focused == document.body) {
	            focused = null;
	        } else if (document.querySelector) {
	            focused = document.querySelector(':focus');
	        }
	        for (var button in player.buttons) {
	            var element = player.buttons[button];

	            _dom2.default.toggleClass(element, 'tab-focus', element === focused);
	        }
	    }

	    _e.on(window, 'keyup', function (event) {
	        var code = event.keyCode ? event.keyCode : event.which;

	        if (code == 9) {
	            checkFocus();
	        }
	    });

	    var _loop = function _loop(button) {
	        var element = _context2.default.ui.buttons[button];

	        _e.on(element, 'blur', function (event) {
	            _dom2.default.toggleClass(element, 'tab-focus', false);
	        });
	    };

	    for (var button in _context2.default.ui.buttons) {
	        _loop(button);
	    }

	    _e.on(_ui.buttons.play, 'click', function (event) {
	        player.play();
	        _ticker2.default.tick(100, function () {
	            _ui.buttons.pause.focus();
	        });
	    });

	    _e.on(_ui.buttons.pause, 'click', function (event) {
	        player.pause();
	        _ticker2.default.tick(100, function () {
	            _ui.buttons.play.focus();
	        });
	    });

	    _e.on(_ui.buttons.restart, 'click', function (event) {
	        player.seek(event);
	    });

	    _e.on(_ui.buttons.rewind, 'click', function (event) {
	        player.rewind(config.seekTime);
	    });

	    _e.on(_ui.buttons.forward, 'click', function (event) {
	        player.forward(config.seekTime);
	    });

	    _e.on(_ui.buttons.seek, inputEvent, function (event) {
	        player.seek(event);
	    });

	    _e.on(_ui.volume, inputEvent, function (event) {
	        player.setVolume(_ui.volume.value);
	    });

	    _e.on(player.media, 'volumechange', function (event) {
	        _this.updateVolume();
	    });

	    _e.on(_ui.buttons.mute, 'click', function (muted) {
	        player.toggleMute(muted);
	    });

	    _e.on(_ui.buttons.fullscreen, 'click', _toggleFullscreen);
	    if (_context2.default.fullscreen.supportsFullScreen) {
	        _e.on(document, _context2.default.fullscreen.fullScreenEventName, _toggleFullscreen);
	    }

	    _e.on(player.media, 'timeupdate seeking', function (event) {
	        _timeUpdate(event);
	    });

	    _e.on(player.media, 'loadedmetadata', function (event) {
	        _this.displayDuration();
	    });

	    _e.on(player.media, 'ended', function (event) {
	        _this.checkPlaying(event);
	    });

	    _e.on(player.media, 'progress playing', updateProgress);

	    _e.on(player.media, 'play pause', function (event) {
	        _this.checkPlaying(event);
	    });
	    /** 等待 开始播放 寻址完成 处理加载等待 **/
	    _e.on(player.media, 'waiting canplay seeked', checkLoading);

	    /** 播放容器添加点击事件 **/
	    if (config.click) {
	        _e.on(player.videoContainer, 'click', function (event) {
	            if (player.media.paused) {
	                _e.fire(_ui.buttons.play, 'click');
	            } else if (player.media.ended) {
	                _this.seek(0);
	                _e.fire(_ui.buttons.play, 'click');
	            } else {
	                _e.fire(_ui.buttons.pause, 'click');
	            }
	        });
	    }
	}

	/**
	 * 时间更新
	 * **/
	function _timeUpdate(event) {
	    _this.updateTimeDisplay(player.media.currentTime, _ui.currentTime);
	    updateProgress(event);
	}

	function _getPercentage(current, max) {
	    if (current === 0 || max === 0 || isNaN(current) || isNaN(max)) {
	        return 0;
	    }
	    return (current / max * 100).toFixed(2);
	}

	function checkLoading(event) {
	    var loading = event.type === 'waiting';
	    clearTimeout(player.loadingTimer);

	    player.loadingTimer = setTimeout(function () {
	        _dom2.default.toggleClass(player.container, config.classes.loading, loading);
	        _dom2.default.toggleClass(_ui.loader, config.classes.loaderLayer, loading);
	    }, loading ? 250 : 0);

	    if (event.type === 'canplay') {
	        if (_ui.cover && !_dom2.default.toggleState(_ui.cover)) {
	            _e.fire(_playerEvent2.default.HIDE_COVER);
	        }
	    }
	}

	/**
	 * 进度处理函数
	 * @param event
	 */
	function updateProgress(event) {
	    var progress = _ui.progress.played.bar,
	        text = _ui.progress.played.text,
	        value = 0,
	        duration = config.duration || player.media.duration;

	    if (event) {
	        switch (event.type) {
	            case 'timeupdate':
	            case 'seeking':
	                value = _getPercentage(player.media.currentTime + config.offsetProgress, duration);

	                if (event.type == 'timeupdate' && _ui.buttons.seek) {
	                    _ui.buttons.seek.value = value;
	                }

	                break;

	            case 'change':
	            case 'input':
	                value = event.target.value;
	                break;

	            case 'playing':
	            case 'progress':
	                progress = _ui.progress.buffer.bar;
	                text = _ui.progress.buffer.text;
	                value = function () {
	                    var buffered = player.media.buffered;

	                    if (buffered && buffered.length) {
	                        return _getPercentage(buffered.end(0) + config.offsetProgress, duration);
	                    }
	                    return 0;
	                }();
	        }
	    }

	    if (progress) {
	        progress.value = value;
	    }
	    if (text) {
	        text.innerHTML = value;
	    }
	}

	function _toggleFullscreen(event) {
	    var nativeSupport = _context2.default.fullscreen.supportsFullScreen;
	    if (nativeSupport) {
	        if (!player.isFullScreen()) {
	            _context2.default.fullscreen.requestFullScreen(player.container);
	        } else {
	            _context2.default.fullscreen.cancelFullScreen();
	        }
	    }
	}

	exports.default = Control;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * Created by Cray on 2016/1/12.
	                                                                                                                                                                                                                                                   */


	var _promise = __webpack_require__(45);

	var _promise2 = _interopRequireDefault(_promise);

	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	var _dom = __webpack_require__(35);

	var _dom2 = _interopRequireDefault(_dom);

	var _eventBuilder = __webpack_require__(29);

	var _eventBuilder2 = _interopRequireDefault(_eventBuilder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var jsonpID = new Date().getTime(),
	    document = window.document,
	    support = {},
	    key,
	    name,
	    defer,
	    rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	    scriptTypeRE = /^(?:text|application)\/javascript/i,
	    xmlTypeRE = /^(?:text|application)\/xml/i,
	    jsonType = 'application/json',
	    htmlType = 'text/html',
	    allTypes = "*/".concat("*"),
	    blankRE = /^\s*$/; //匹配空字符串

	var ajax = function ajax(options) {
	    var settings = _utils2.default.merge({}, options || {});
	    _utils2.default.each(ajax.settings, function (i, value) {
	        if (settings[i] === undefined) {
	            settings[i] = value;
	        }
	    });
	    ajaxStart(settings);
	    //正则分解url 如果是http地址
	    //$1:http:  $2:host值  所以如果url的host和当前服务的host不同则是跨域
	    if (!settings.crossDomain) {
	        settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host;
	    }

	    var dataType = settings.dataType || "*";
	    if (dataType == 'jsonp') {
	        //设置回调标记
	        settings.url = appendQuery(settings.url, 'callback=?');
	        return ajax.JSONP(settings);
	    }

	    //数据序列化
	    serializeData(settings);
	    //设置返回数据类型 请求头等
	    var mime = settings.accepts[dataType],
	        baseHeaders = {},
	        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
	        xhr = ajax.settings.xhr(),
	        abortTimeout;
	    //如果不是跨域设置请求头ajax异步请求
	    if (!settings.crossDomain) {
	        baseHeaders['X-Requested-With'] = 'XMLHttpRequest';
	    }
	    //如果设置了返回数据类型
	    if (mime) {
	        baseHeaders['Accept'] = mime;
	        if (mime.indexOf(',') > -1) {
	            mime = mime.split(',', 2)[0];
	            xhr.overrideMimeType && xhr.overrideMimeType(mime);
	        }
	    }
	    //如果请求为POST设置提交类型，默认是表单提交
	    if (!!settings.contentType && settings.data && settings.type.toUpperCase() == 'POST') {
	        baseHeaders['Content-Type'] = settings.contentType;
	    }

	    //设置请求头
	    settings.headers = _utils2.default.merge(baseHeaders, settings.headers || {});

	    xhr.onreadystatechange = function () {
	        if (xhr.readyState == 4) {
	            //清除超时计时器
	            clearTimeout(abortTimeout);
	            var result = void 0,
	                error = false;
	            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == 'file:') {
	                dataType = dataType !== "*" || mimeToDataType(xhr.getResponseHeader('Content-Type'));
	                result = xhr.responseText;
	                try {
	                    if (dataType == 'script') {
	                        eval(result);
	                    } //   (1,eval)(result); //context global
	                    else if (dataType == 'xml') {
	                            result = xhr.responseXML;
	                        } else if (dataType == 'json') {
	                            result = blankRE.test(result) ? null : JSON.parse(result + "");
	                        }
	                } catch (e) {
	                    error = e;
	                }

	                if (error) {
	                    ajaxError(error, 'parsererror', xhr, settings);
	                } else {
	                    ajaxSuccess(result, xhr, settings);
	                }
	            } else {
	                ajaxError(null, 'error', xhr, settings);
	            }
	        }
	    };

	    var async = 'async' in settings ? settings.async : true;
	    support.cors = ajax.settings.cors || !!xhr && "withCredentials" in xhr;
	    if (support.cors || xhr && !settings.crossDomain) {
	        ajax.settings.cors = undefined;
	        xhr.open(settings.type, settings.url, async);
	        //跨域cookies
	        //if(support.cors){
	        //    xhr.withCredentials = true;
	        //}
	        _utils2.default.each(settings.headers, function (name, value) {
	            xhr.setRequestHeader(name, value);
	        });

	        if (ajaxBeforeSend(xhr, settings) === false) {
	            xhr.abort();
	            return defer.promise;
	        }
	        //如果超时没有放回数据
	        if (async && settings.timeout > 0) abortTimeout = setTimeout(function () {
	            xhr.onreadystatechange = _empty;
	            xhr.abort();
	            ajaxError(null, 'timeout', xhr, settings);
	        }, settings.timeout);
	        //POST请求 data不为空
	        xhr.send(settings.data ? settings.data : null);
	    }

	    return defer.promise;
	};

	ajax.settings = {
	    url: window.href,
	    type: 'GET',
	    async: true,
	    beforeSend: _empty,
	    success: _empty,
	    error: _empty,
	    complete: _empty,
	    context: null,
	    global: true,
	    contentType: "application/x-www-form-urlencoded; charset=UTF-8", //multipart/form-data || application/json
	    xhr: function xhr() {
	        return new window.XMLHttpRequest();
	    },
	    accepts: {
	        "*": allTypes,
	        script: 'text/javascript, application/javascript',
	        json: jsonType,
	        xml: 'application/xml, text/xml',
	        html: htmlType,
	        text: 'text/plain'
	    },
	    crossDomain: false,
	    timeout: 0
	    /*
	     dataType: null,
	     headers: {},
	     */
	};

	ajax.get = function (url, data, success, error) {
	    if (typeof data === 'function') {
	        error = typeof success === 'function' ? success : _empty;
	        success = data;
	        data = null;
	    }
	    if (!error) {
	        error = _empty;
	    }
	    return ajax({ url: url, data: data, success: success, error: error });
	};

	ajax.post = function (url, data, success, dataType) {
	    if (typeof data === 'function') {
	        dataType = success;
	        success = data;
	        data = null;
	    }
	    return ajax({ type: 'POST', url: url, data: data, success: success, dataType: dataType });
	};

	ajax.getJSON = function (url, success, error) {
	    if (!error) {
	        error = _empty;
	    }
	    return ajax({ url: url, success: success, error: error, dataType: 'json' });
	};

	ajax.JSONP = function (options) {
	    if (!('type' in options)) {
	        return ajax(options);
	    }

	    var callbackName = 'jsonp' + ++jsonpID,
	        script = document.createElement('script'),

	    //终止函数
	    abort = function abort() {
	        //移除标签
	        _dom2.default.remove(script);
	        //清空回调函数
	        if (callbackName in window) {
	            window[callbackName] = _empty;
	        }
	        //ajax请求完成
	        ajaxComplete('abort', xhr, options);
	    },
	        xhr = { abort: abort },
	        abortTimeout,
	        head = _dom2.default.getElement('head') || document.documentElement; //document.getElementsByTagName("head")[0]

	    if (options.error) script.onerror = function () {
	        xhr.abort();
	        options.error();
	    };
	    //成功回调执行
	    window[callbackName] = function (data) {
	        clearTimeout(abortTimeout);
	        _dom2.default.remove(script);
	        delete window[callbackName];
	        ajaxSuccess(data, xhr, options);
	    };

	    serializeData(options);
	    //通过callback=? 添加回调函数
	    script.src = options.url.replace(/=\?/, '=' + callbackName);

	    head.insertBefore(script, head.firstChild);

	    if (options.timeout > 0) abortTimeout = setTimeout(function () {
	        xhr.abort();
	        ajaxComplete('timeout', xhr, options);
	    }, options.timeout);

	    return xhr;
	};

	/**
	 * 默认处理函数
	 */
	function _empty() {}
	/**
	 * 全局事件派发
	 * @param settings
	 * @param eventName
	 * @param data
	 */
	function triggerGlobal(settings, eventName, data) {
	    if (settings.global) {
	        //返回响应函数处理结果
	        return _eventBuilder2.default.fire(eventName, data);
	    }
	}

	ajax.active = 0;
	/**
	 * 请求开始
	 * @param settings
	 */
	function ajaxStart(settings) {
	    defer = _promise2.default.defer();
	    if (settings.global && ajax.active++ === 0) triggerGlobal(settings, 'ajaxStart');
	}

	/**
	 * 请求结束
	 * @param settings
	 */
	function ajaxEnd(settings) {
	    if (settings.global && ! --ajax.active) triggerGlobal(settings, 'ajaxEnd');
	}

	/**
	 * 请求发送之前
	 * @param xhr
	 * @param settings
	 * @returns {boolean}
	 */
	function ajaxBeforeSend(xhr, settings) {
	    var context = settings.context;
	    if (settings.beforeSend.call(context, xhr, settings) === false || triggerGlobal(settings, 'ajaxBeforeSend', [xhr, settings]) === false) {
	        return false;
	    }
	    triggerGlobal(settings, 'ajaxSend', [xhr, settings]);
	}

	/**
	 * 请求成功
	 * @param data
	 * @param xhr
	 * @param settings
	 */
	function ajaxSuccess(data, xhr, settings) {
	    var context = settings.context,
	        status = 'success';
	    defer.resolve(data);
	    settings.success.call(context, data, status, xhr);
	    triggerGlobal(settings, 'ajaxSuccess', [xhr, settings, data]);
	    ajaxComplete(status, xhr, settings);
	}

	/**
	 * 请求失败
	 * @param error
	 * @param type
	 * @param xhr
	 * @param settings
	 */
	function ajaxError(error, type, xhr, settings) {
	    defer.reject(error);
	    var context = settings.context;
	    settings.error.call(context, xhr, type, error);
	    triggerGlobal(settings, 'ajaxError', [xhr, settings, error]);
	    ajaxComplete(type, xhr, settings);
	}

	/**
	 * ajax完成 状态 成功 or 失败 or 挂起
	 * @param status
	 * @param xhr
	 * @param settings
	 */
	function ajaxComplete(status, xhr, settings) {
	    var context = settings.context;
	    settings.complete.call(context, xhr, status);
	    triggerGlobal(settings, 'ajaxComplete', [xhr, settings]);
	    ajaxEnd(settings);
	}

	/**
	 * 从返回content-type确定数据返回类型
	 * @param mime
	 * @returns {*|string}
	 */
	function mimeToDataType(mime) {
	    return mime && (mime == htmlType ? 'html' : mime == jsonType ? 'json' : scriptTypeRE.test(mime) ? 'script' : xmlTypeRE.test(mime) && 'xml') || 'text';
	}

	/**
	 * 确保请求地址参数是从?开始
	 * @param url
	 * @param query
	 * @returns {string}
	 */
	function appendQuery(url, query) {

	    return (url + '&' + query).replace(/[&?]{1,2}/, '?');
	}

	/**
	 * 序列化数据
	 * @param options
	 */
	function serializeData(options) {
	    if (_typeof(options.data) === 'object') {
	        options.data = param(options.data);
	    }

	    if (options.data && (!options.type || options.type.toUpperCase() == 'GET')) {
	        options.url = appendQuery(options.url, options.data);
	        options.data = null;
	    }
	}

	var escape = encodeURIComponent;

	function serialize(params, obj, traditional, scope) {
	    var array = Array.isArray(obj);
	    for (var key in obj) {
	        var value = obj[key];

	        if (scope) {
	            key = traditional ? scope : scope + '[' + (array ? '' : key) + ']';
	        }
	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (traditional ? Array.isArray(value) : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	            serialize(params, value, traditional, key);
	        } else {
	            params.add(key, value);
	        }
	    }
	}

	/**
	 * @param obj
	 * @param traditional
	 * @returns {string}
	 */
	function param(obj, traditional) {

	    var params = [];
	    params.add = function (k, v) {
	        this.push(escape(k) + '=' + escape(v));
	    };
	    serialize(params, obj, traditional);
	    return params.join('&').replace('%20', '+');
	}

	exports.default = ajax;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Cray on 2015/10/21.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Promise = function () {
	    function Promise() {
	        _classCallCheck(this, Promise);

	        this._resolves = [];
	        this._rejects = [];
	        this._readyState = Promise.PENDING;
	        this._data = null;
	        this._reason = null;
	    }

	    _createClass(Promise, [{
	        key: 'toString',
	        value: function toString() {
	            return "Promise";
	        }
	    }, {
	        key: 'then',
	        value: function then(onFulfilled, onRejected) {
	            var _this = this;

	            var deferred = new Defer();

	            function fulfill(data) {
	                var ret = onFulfilled ? onFulfilled(data) : data;
	                if (Promise.isPromise(ret)) {
	                    ret.then(function (data) {
	                        deferred.resolve(data);
	                    });
	                } else {
	                    deferred.resolve(ret);
	                }
	                return ret;
	            }

	            if (this._readyState === Promise.PENDING) {
	                this._resolves.push(fulfill);
	                if (onRejected) {
	                    this._rejects.push(onRejected);
	                } else {
	                    //默认拒绝函数
	                    this._rejects.push(function (reason) {
	                        deferred.reject(reason);
	                    });
	                }
	            } else if (this._readyState === Promise.FULFILLED) {
	                setTimeout(function () {
	                    fulfill(_this._data);
	                });
	            }
	            return deferred.promise;
	        }
	    }, {
	        key: 'otherwise',
	        value: function otherwise(onRejected) {
	            return this.then(undefined, onRejected);
	        }
	    }]);

	    return Promise;
	}();

	_utils2.default.merge(Promise, {
	    PENDING: 0,
	    FULFILLED: 1,
	    REJECTED: 2,
	    isPromise: function isPromise(obj) {
	        return obj != null && typeof obj['then'] == 'function';
	    }
	});

	var Defer = function () {
	    function Defer() {
	        _classCallCheck(this, Defer);

	        this.promise = new Promise();
	    }

	    _createClass(Defer, [{
	        key: 'resolve',
	        value: function resolve(data) {
	            var promise = this.promise;
	            if (promise._readyState != Promise.PENDING) {
	                return;
	            }
	            promise._readyState = Promise.FULFILLED;
	            promise._data = data;
	            promise._resolves.map(function (i, handler) {
	                handler(data);
	            });
	        }
	    }, {
	        key: 'reject',
	        value: function reject(reason) {
	            var promise = this.promise;
	            if (promise._readyState != Promise.PENDING) {
	                return;
	            }
	            promise._readyState = Promise.REJECTED;
	            promise._reason = reason;
	            var handler = promise._rejects[0];
	            if (handler) {
	                handler(reason);
	            }
	        }
	    }]);

	    return Defer;
	}();

	var Deferred = {
	    defer: function defer() {
	        return new Defer();
	    },

	    isPromise: function isPromise(pv) {
	        return Promise.isPromise(pv);
	    },

	    all: function all() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var defer = this.Deferred();
	        if (args.length == 0) {
	            return defer.promise;
	        }
	        if (Array.isArray(args[0])) {
	            args = args[0];
	        }
	        var n = 0,
	            result = [];
	        args.forEach(function (p) {
	            p.then(function (ret) {
	                result.push(ret);
	                n++;
	                if (n >= ps.length) {
	                    defer.resolve(result);
	                }
	            });
	        });

	        return defer.promise;
	    },

	    any: function any() {
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	        }

	        var defer = this.Deferred();
	        if (args.length == 0) {
	            return defer.promise;
	        }
	        if (Array.isArray(args[0])) {
	            args = args[0];
	        }
	        args.forEach(function (p) {
	            p.then(function (ret) {
	                defer.resolve(ret);
	            });
	        });
	        return defer.promise;
	    }
	};

	exports.default = Deferred;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _eventDispatcher = __webpack_require__(3);

	var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

	var _event = __webpack_require__(6);

	var _event2 = _interopRequireDefault(_event);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Cray on 2016/5/12.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Task = function (_EventDispatcher) {
	    _inherits(Task, _EventDispatcher);

	    function Task() {
	        _classCallCheck(this, Task);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Task).call(this));
	    }

	    _createClass(Task, [{
	        key: 'startUp',
	        value: function startUp() {}
	    }, {
	        key: 'complete',
	        value: function complete() {
	            this.fire(_event2.default.TASK_COMPLETE);
	        }
	    }]);

	    return Task;
	}(_eventDispatcher2.default);

	exports.default = Task;

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	var b64tab = function (bin) {
	    var t = {};
	    for (var i = 0, l = bin.length; i < l; i++) {
	        t[bin.charAt(i)] = i;
	    }return t;
	}(b64chars);
	var fromCharCode = String.fromCharCode;

	// encoder stuff
	var cb_utob = function cb_utob(c) {
	    if (c.length < 2) {
	        var cc = c.charCodeAt(0);
	        return cc < 0x80 ? c : cc < 0x800 ? fromCharCode(0xc0 | cc >>> 6) + fromCharCode(0x80 | cc & 0x3f) : fromCharCode(0xe0 | cc >>> 12 & 0x0f) + fromCharCode(0x80 | cc >>> 6 & 0x3f) + fromCharCode(0x80 | cc & 0x3f);
	    } else {
	        var _cc = 0x10000 + (c.charCodeAt(0) - 0xD800) * 0x400 + (c.charCodeAt(1) - 0xDC00);
	        return fromCharCode(0xf0 | _cc >>> 18 & 0x07) + fromCharCode(0x80 | _cc >>> 12 & 0x3f) + fromCharCode(0x80 | _cc >>> 6 & 0x3f) + fromCharCode(0x80 | _cc & 0x3f);
	    }
	};

	var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
	var utob = function utob(u) {
	    return u.replace(re_utob, cb_utob);
	};
	var cb_encode = function cb_encode(ccc) {
	    var padlen = [0, 2, 1][ccc.length % 3],
	        ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0),
	        chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? '=' : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? '=' : b64chars.charAt(ord & 63)];
	    return chars.join('');
	};

	var btoa = function btoa(b) {
	    return b.replace(/[\s\S]{1,3}/g, cb_encode);
	};

	var _encode = function _encode(u) {
	    return btoa(utob(u));
	};

	var encode = function encode(u, urisafe) {
	    return !urisafe ? _encode(String(u)) : _encode(String(u)).replace(/[+\/]/g, function (m0) {
	        return m0 == '+' ? '-' : '_';
	    }).replace(/=/g, '');
	};
	var encodeURI = function encodeURI(u) {
	    return encode(u, true);
	};
	// decoder stuff
	var re_btou = new RegExp(['[\xC0-\xDF][\x80-\xBF]', '[\xE0-\xEF][\x80-\xBF]{2}', '[\xF0-\xF7][\x80-\xBF]{3}'].join('|'), 'g');
	var cb_btou = function cb_btou(cccc) {
	    switch (cccc.length) {
	        case 4:
	            var cp = (0x07 & cccc.charCodeAt(0)) << 18 | (0x3f & cccc.charCodeAt(1)) << 12 | (0x3f & cccc.charCodeAt(2)) << 6 | 0x3f & cccc.charCodeAt(3),
	                offset = cp - 0x10000;
	            return fromCharCode((offset >>> 10) + 0xD800) + fromCharCode((offset & 0x3FF) + 0xDC00);
	        case 3:
	            return fromCharCode((0x0f & cccc.charCodeAt(0)) << 12 | (0x3f & cccc.charCodeAt(1)) << 6 | 0x3f & cccc.charCodeAt(2));
	        default:
	            return fromCharCode((0x1f & cccc.charCodeAt(0)) << 6 | 0x3f & cccc.charCodeAt(1));
	    }
	};
	var btou = function btou(b) {
	    return b.replace(re_btou, cb_btou);
	};
	var cb_decode = function cb_decode(cccc) {
	    var len = cccc.length,
	        padlen = len % 4,
	        n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
	        chars = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 0xff), fromCharCode(n & 0xff)];
	    chars.length -= [0, 0, 2, 1][padlen];
	    return chars.join('');
	};

	var atob = function atob(a) {
	    return a.replace(/[\s\S]{1,4}/g, cb_decode);
	};

	var _decode = function _decode(a) {
	    return btou(atob(a));
	};

	var decode = function decode(a) {
	    return _decode(String(a).replace(/[-_]/g, function (m0) {
	        return m0 == '-' ? '+' : '/';
	    }).replace(/[^A-Za-z0-9\+\/]/g, ''));
	};

	var Base64 = {
	    atob: atob,
	    btoa: btoa,
	    fromBase64: decode,
	    toBase64: encode,
	    utob: utob,
	    encode: encode,
	    encodeURI: encodeURI,
	    btou: btou,
	    decode: decode
	};

	exports.default = Base64;

/***/ }
/******/ ]);