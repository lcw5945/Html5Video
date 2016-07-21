'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/4/8.
 */
flex.module('ad.adUI').requires('config').define(function () {
    var _adPlayer = null,
        _cInfoPanel = null,
        _time = 0,
        _baseTime = 0,
        _tmpTime = 0,
        _prefixText = '广告时间: ',
        config = flex.config;

    flex.Class.adUI = function () {
        function _class(adPlayer) {
            _classCallCheck(this, _class);

            _adPlayer = adPlayer;

            if (_adPlayer) {
                var html = flex.config.ctrlAdHTML;
                _adPlayer.container.insertAdjacentHTML('beforeend', html);

                _initElements();

                _initDisplayLayer();

                _initFullscreen();

                flex.on(flex.Event.RESIZE, _resizeHandler);
            }
        }

        _createClass(_class, [{
            key: 'addTime',
            value: function addTime(value) {
                _time += Number.parseInt(value);
            }
        }, {
            key: 'updateTimeDisplay',
            value: function updateTimeDisplay(value) {
                if (_tmpTime == value) return;
                if (_tmpTime > value) {
                    _baseTime += _tmpTime;
                }
                _tmpTime = value;
                _cInfoPanel.innerHTML = _prefixText + (_time - _baseTime - value);
            }
        }, {
            key: 'showCountdown',
            value: function showCountdown() {
                if (!_cInfoPanel) {
                    _createCountDownPanel();
                    _cInfoPanel.innerHTML = _prefixText + _time;
                }
            }
        }, {
            key: 'destory',
            value: function destory() {
                _adPlayer.destroy();
                flex.remove(flex.getElement(flex.config.selectors.controlsAd));
                flex.remove(_cInfoPanel);
            }
        }]);

        return _class;
    }();

    /** 初始化dom元素 **/
    function _initElements() {

        try {
            _adPlayer.controls = flex.getElement(config.selectors.controlsAd);
            _adPlayer.buttons = {};
            _adPlayer.buttons.jumpTo = flex.getElement(config.selectors.buttons.jumpToAd);
            _adPlayer.buttons.fullscreen = flex.getElement(config.selectors.buttons.fullscreenAd);
            _adPlayer.buttons.mute = flex.getElement(config.selectors.buttons.muteAd);
            return true;
        } catch (e) {
            flex.log('[ADUM] tag element instance fail.', true);
            _adPlayer.media.setAttribute('controls', '');
            return false;
        }
    }

    /**
     * 创建倒计时面板
     * @private
     */
    function _createCountDownPanel() {
        if (!_cInfoPanel) {
            _cInfoPanel = flex.newElement('div');
            _adPlayer.container.appendChild(_cInfoPanel);
            _cInfoPanel.setAttribute('class', config.classes.adCountDown);
        }
    }

    /**
     * 设置显示布局
     * @private
     */
    function _initDisplayLayer() {
        _updateConfig();
        //设置播放器大小
        flex.css(_adPlayer.container, { width: config.playerWidth + 'px', height: config.playerHeight + 'px' });
        //设置广告视频大小
        _adPlayer.resize(config.playerAdWidth, config.playerAdHeight);
    }

    /**
     * 大小改变
     * @private
     */
    function _resizeHandler() {
        _updateConfig();
        _adPlayer.isFullscreen = flex.fullscreen.isFullScreen(_adPlayer.container);
        if (_adPlayer.isFullscreen) {
            flex.css(_adPlayer.container, {});
            flex.css(_adPlayer.videoContainer, {});
        } else {
            _initDisplayLayer();
        }
        if (flex.toggleState(_adPlayer.buttons.fullscreen) != _adPlayer.isFullscreen) {
            _updateControlsDisplay();
        }
    }

    /**
     * 更新配置文件播放器和视频大小
     * @private
     */
    function _updateConfig() {
        //播放器宽高
        config.playerWidth = flex.element.container.parentNode.offsetWidth;
        config.playerHeight = flex.element.container.parentNode.offsetHeight;
        //设置视频宽高
        config.playerAdWidth = config.playerWidth;
        config.playerAdHeight = config.playerHeight - config.controlHeight - 10;
    }

    /**
     * 默认不显示全屏功能
     * @private
     */
    function _initFullscreen() {
        if (config.fullscreen.enabled) {
            var nativeSupport = flex.fullscreen.supportsFullScreen;
            if (nativeSupport || config.fullscreen.fallback && !flex.inFrame()) {
                flex.toggleClass(_adPlayer.container, config.classes.fullscreen.enabled, true);
            }

            flex.toggleState(_adPlayer.buttons.fullscreen, false);
        }
    }

    /**
     * 设置控制条隐藏
     * @private
     */
    function _updateControlsDisplay() {

        flex.toggleState(_adPlayer.buttons.fullscreen, _adPlayer.isFullscreen);
        flex.toggleClass(_adPlayer.container, config.classes.fullscreen.active, _adPlayer.isFullscreen);

        var hoverTimer = void 0,
            isMouseOver = false;

        hoverTimer = function hoverTimer() {
            flex.toggleClass(_adPlayer.container, config.classes.hover, false);
        };

        function _showControls() {
            flex.toggleClass(_adPlayer.container, config.classes.hover, true);

            flex.Ticker.have(hoverTimer) || flex.Ticker.stop(hoverTimer);
            isMouseOver || flex.Ticker.tick(2000, hoverTimer);
        }

        function _setMouseOver(event) {
            isMouseOver = event.type === 'mouseenter';
        }

        if (config.fullscreen.hideControls) {

            flex.toggleClass(_adPlayer.container, config.classes.fullscreen.hideControls, _adPlayer.isFullscreen);
            //flex.toggleClass(_adPlayer.controls, config.classes.hover, !_adPlayer.isFullscreen);

            flex.toggleHandler(_adPlayer.controls, 'mouseenter mouseleave', _setMouseOver, _adPlayer.isFullscreen);
            flex.toggleHandler(_adPlayer.container, 'mousemove', _showControls, _adPlayer.isFullscreen);
        }
    }
});