'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/4/5.
 */
flex.module('base.sprite').requires('core.queue, core.ticker, core.preloader, utils.base64').define(function () {
    flex.Class.Sprite = function () {
        function _class() {
            _classCallCheck(this, _class);

            flex.supported = _supported();
            flex.fullscreen = _fullScreenSupport();
            _addContext();
            _addListener();
        }

        return _class;
    }();

    function _supported() {
        var browser = flex.browserSniff(),
            IE = browser.name === 'IE',
            basic,
            full;

        basic = !!document.createElement('video').canPlayType;
        full = basic && !IE && !browser.mobile;

        return {
            basic: basic,
            full: full
        };
    }
    /** 加载通用管理器 **/
    function _addContext() {
        flex.queue = new flex.Class.QueueController();
        flex.preloader = new flex.Class.Preloader();
        flex.Ticker = new flex.Class.TickerLanuch();
    }

    /**
     * 添加事件
     * @private
     */
    function _addListener() {
        //舞台大小改变
        flex.on(flex.window, 'resize', function (event) {
            flex.fire('resize');
        });

        //键盘事件
        flex.on(flex.window, 'keyup', function (event) {
            switch (event.keyCode) {
                case 27:
                    {
                        //esc
                        flex.fire('resize');
                        break;
                    }
            }
        });
    }

    /**
     * 初始化全屏支持对象
     * @returns {{supportsFullScreen: boolean, isFullScreen: Function, requestFullScreen: Function, cancelFullScreen: Function, fullScreenEventName: string, element: null, prefix: string}}
     * @private
     */
    function _fullScreenSupport() {
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
    }
});