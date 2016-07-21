/**
 * Created by Cray on 2016/4/8.
 */
import Logger from '../../core/utils/log';
import PEvent from '../../events';
import Dom from '../../core/utils/dom';
import Utils from '../../core/utils/utils';
import Context from '../../core/context';
import Ticker from '../../core/utils/ticker';

var _adPlayer = null,
    _cInfoPanel = null,
    _time = 0,
    _baseTime = 0,
    _tmpTime = 0,
    _prefixText = '广告时间: ',
    config;

class AdUI {
    constructor(adPlayer) {
        _adPlayer = adPlayer;
        config = Context.config;

        if (_adPlayer) {
            let html = config.ctrlAdHTML;
            _adPlayer.container.insertAdjacentHTML('beforeend', html);

            _initElements();

            _initDisplayLayer();

            _initFullscreen();

            Context.e.on(PEvent.RESIZE, _resizeHandler);
        }
    }

    addTime(value) {
        _time += Number.parseInt(value);
    }

    updateTimeDisplay(value) {
        if (_tmpTime == value)return;
        if (_tmpTime > value) {
            _baseTime += _tmpTime;
        }
        _tmpTime = value;
        _cInfoPanel.innerHTML = _prefixText + (_time - _baseTime - value);
    }

    showCountdown() {
        if (!_cInfoPanel) {
            _createCountDownPanel();
            _cInfoPanel.innerHTML = _prefixText + _time;
        }
    }

    destory() {
        _adPlayer.destroy();
        Dom.remove(Dom.getElement(config.selectors.controlsAd));
        Dom.remove(_cInfoPanel);
    }
}


/** 初始化dom元素 **/
function _initElements() {

    try {
        _adPlayer.controls = Dom.getElement(config.selectors.controlsAd);
        _adPlayer.buttons = {};
        _adPlayer.buttons.jumpTo = Dom.getElement(config.selectors.buttons.jumpToAd);
        _adPlayer.buttons.fullscreen = Dom.getElement(config.selectors.buttons.fullscreenAd);
        _adPlayer.buttons.mute = Dom.getElement(config.selectors.buttons.muteAd);
        return true;
    }
    catch (e) {
        Logger.error('[ADUM] tag element instance fail.');
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
        _cInfoPanel = Dom.newElement('div');
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
    Dom.css(_adPlayer.container, {width: config.playerWidth + 'px', height: config.playerHeight + 'px'});
    //设置广告视频大小
    _adPlayer.resize(config.playerAdWidth, config.playerAdHeight);
}

/**
 * 大小改变
 * @private
 */
function _resizeHandler() {
    _updateConfig();
    _adPlayer.isFullscreen = Context.fullscreen.isFullScreen(_adPlayer.container);
    if (_adPlayer.isFullscreen) {
        Dom.css(_adPlayer.container, {});
        Dom.css(_adPlayer.videoContainer, {});
    } else {
        _initDisplayLayer();
    }
    if (Dom.toggleState(_adPlayer.buttons.fullscreen) != _adPlayer.isFullscreen) {
        _updateControlsDisplay();
    }
}

/**
 * 更新配置文件播放器和视频大小
 * @private
 */
function _updateConfig() {
    //播放器宽高
    config.playerWidth = Context.element.container.parentNode.offsetWidth;
    config.playerHeight = Context.element.container.parentNode.offsetHeight;
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
        let nativeSupport = Context.fullscreen.supportsFullScreen;
        if (nativeSupport || (config.fullscreen.fallback && !Utils.inFrame())) {
            Dom.toggleClass(_adPlayer.container, config.classes.fullscreen.enabled, true);
        }

        Dom.toggleState(_adPlayer.buttons.fullscreen, false);
    }
}

/**
 * 设置控制条隐藏
 * @private
 */
function _updateControlsDisplay() {

    Dom.toggleState(_adPlayer.buttons.fullscreen, _adPlayer.isFullscreen);
    Dom.toggleClass(_adPlayer.container, config.classes.fullscreen.active, _adPlayer.isFullscreen);

    let hoverTimer, isMouseOver = false;

    hoverTimer = function () {
        Dom.toggleClass(_adPlayer.container, config.classes.hover, false);
    };

    function _showControls() {
        Dom.toggleClass(_adPlayer.container, config.classes.hover, true);

        Ticker.have(hoverTimer) || Ticker.stop(hoverTimer);
        isMouseOver || Ticker.tick(2000, hoverTimer);
    }

    function _setMouseOver(event) {
        isMouseOver = (event.type === 'mouseenter');
    }

    if (config.fullscreen.hideControls) {

        Dom.toggleClass(_adPlayer.container, config.classes.fullscreen.hideControls, _adPlayer.isFullscreen);
        //Dom.toggleClass(_adPlayer.controls, config.classes.hover, !_adPlayer.isFullscreen);

        Dom.toggleHandler(_adPlayer.controls, 'mouseenter mouseleave', _setMouseOver, _adPlayer.isFullscreen);
        Dom.toggleHandler(_adPlayer.container, 'mousemove', _showControls, _adPlayer.isFullscreen);
    }
}