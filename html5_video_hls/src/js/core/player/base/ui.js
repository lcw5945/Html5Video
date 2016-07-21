/**
 * Created by Cray on 2015/12/17.
 */
import $ from '../../context';
import Utils from '../../utils/utils';
import Ticker from '../../utils/ticker';
import playerConfig from '../player-config';
import Logger from '../../utils/log';
import Dom from '../../utils/dom';
import PEvent from '../../player/player-event';


let _this,
    config = null,
    player = null,
    fullscreen = null;

class UI {
    constructor() {
        Logger.log('[UI] init ui');

        config = playerConfig;
        fullscreen = Utils.fullScreenSupport();

        _this = this;
    }

    startup($player) {

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

        $.e.on(PEvent.RESIZE, _resizeHandler);
    }

    get measureWidth() {
        let w;
        if (player.isFullscreen) {
            w = window.innerWidth;
        } else {
            w = config.playerWidth;
        }
        return w;
    }

    get measureHeight() {
        let h;
        if (player.isFullscreen) {
            h = window.innerHeight;
        } else {
            h = config.playerHeight;
        }
        return h;
    }

    pop(element, options) {
        Dom.removeAllChild(player.popLayer);

        if (element instanceof HTMLElement) {
            player.popLayer.appendChild(element);
        } else if (typeof element != 'undefined') {
            player.popLayer.innerHTML = element;
        } else {
            Logger.error('[UI] pop content error');
            return;
        }

        _updatePopDisplay();
    }

    showCover() {
        let playerCover = Dom.newElement('div');
        player.container.appendChild(playerCover);
        playerCover.setAttribute('class', config.classes.coverLayer);

        this.cover = playerCover;

        let img = Dom.newElement('img');
        img.src = config.cover;
        img.setAttribute('class', config.classes.coverLayer);
        playerCover.appendChild(img);

        let span = Dom.newElement('span');
        span.setAttribute('class', config.classes.coverLayer);
        playerCover.appendChild(span);

        $.e.on(playerCover, 'transitionend webkitTransitionEnd mozTransitionEnd', (event) => {
            Dom.remove(playerCover);
        });
        $.e.on(PEvent.HIDE_COVER, (event) => {
            Ticker.tick(300, _hideCover);
        });

        function _hideCover() {
            Dom.toggleClass(_this.cover, config.classes.hideConver, true);
            Dom.toggleState(_this.cover, true);
        }
    }
}

/** 初始化dom元素 **/
function _initPlayerElements() {
        _this.controls = Dom.getElement(config.selectors.controls);

        _this.buttons = {};
        _this.buttons.seek = Dom.getElement(config.selectors.buttons.seek);
        _this.buttons.play = Dom.getElement(config.selectors.buttons.play);
        _this.buttons.pause = Dom.getElement(config.selectors.buttons.pause);
        _this.buttons.restart = Dom.getElement(config.selectors.buttons.restart);
        _this.buttons.rewind = Dom.getElement(config.selectors.buttons.rewind);
        _this.buttons.forward = Dom.getElement(config.selectors.buttons.forward);
        _this.buttons.fullscreen = Dom.getElement(config.selectors.buttons.fullscreen);

        _this.buttons.mute = Dom.getElement(config.selectors.buttons.mute);
        _this.buttons.quality = Dom.getElement(config.selectors.buttons.quality);
        _this.checkboxes = Dom.getElements('[type="checkbox"]');

        _this.progress = {};
        _this.progress.container = Dom.getElement(config.selectors.progress.container);

        _this.progress.buffer = {};
        _this.progress.buffer.bar = Dom.getElement(config.selectors.progress.buffer);
        _this.progress.buffer.text = _this.progress.buffer.bar && _this.progress.buffer.bar.getElementsByTagName('span')[0];

        _this.progress.played = {};
        _this.progress.played.bar = Dom.getElement(config.selectors.progress.played);
        _this.progress.played.text = _this.progress.played.bar && _this.progress.played.bar.getElementsByTagName('span')[0];

        _this.volume = Dom.getElement(config.selectors.buttons.volume);

        _this.duration = Dom.getElement(config.selectors.duration);
        _this.currentTime = Dom.getElement(config.selectors.currentTime);
        _this.seekTime = Dom.getElements(config.selectors.seekTime);
}

/**
 * 初始化显示布局
 * @private
 */
function _initDisplayLayer() {

    _updateConfig();
    if (_this.isFullScreen) {
        Dom.css(player.container, {});
        Dom.css(player.videoContainer, {});
    } else {
        Dom.css(player.container, {width: config.playerWidth + 'px', height: config.playerHeight + 'px'});
        player.resize(config.videoWidth, config.videoHeight);
    }
    if (Dom.toggleState(_this.buttons.fullscreen) != player.isFullscreen) {
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
    let element = _this.popLayer.firstChild,
        w, h, left, top;
    if (player.isFullscreen) {
        w = window.innerWidth;
        h = window.innerHeight;
    } else {
        w = config.videoWidth;
        h = config.videoHeight;
    }

    left = Number.parseInt((w - element.offsetWidth) / 2);
    top = Number.parseInt((h - element.offsetHeight) / 2);

    Dom.css(element, {position: 'absolute', top: top + 'px', left: left + 'px'});
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
        let nativeSupport = fullscreen.supportsFullScreen;

        if (nativeSupport || (config.fullscreen.fallback && !Utils.inFrame())) {
            Logger.log('[CM] ' + (nativeSupport ? 'Native' : 'Fallback') + ' fullscreen enabled.');
            Dom.toggleClass(player.container, config.classes.fullscreen.enabled, true);
        }
        Dom.toggleState(_this.buttons.fullscreen, _this.isFullScreen);
    }
}

function _updateControlsDisplay() {

    let tipEle = Dom.getElement(config.selectors.buttons.fullscreen + ' .' + config.classes.tooltip);
    if (player.isFullscreen) {
        tipEle.innerText = config.cn.fullTipExit;
    } else {
        tipEle.innerText = config.cn.fullTipIn;
    }

    Dom.toggleClass(player.container, config.classes.fullscreen.active, player.isFullscreen);
    Dom.toggleState(_this.buttons.fullscreen, player.isFullscreen);

    let hoverTimer, isMouseOver = false;

    function _showControls() {
        Dom.toggleClass(player.container, config.classes.hover, true);

        window.clearTimeout(hoverTimer);

        if (!isMouseOver) {
            hoverTimer = window.setTimeout(function () {
                flex.toggleClass(player.container, config.classes.hover, false);
            }, 2000);
        }
    }

    function _setMouseOver(event) {
        isMouseOver = (event.type === 'mouseenter');
    }

    if (config.fullscreen.hideControls) {
        Dom.toggleClass(player.container, config.classes.fullscreen.hideControls, player.isFullscreen);

        $.e.toggleHandler(_this.controls, 'mouseenter mouseleave', _setMouseOver, player.isFullscreen);
        $.e.toggleHandler(player.container, 'mousemove', _showControls, player.isFullscreen);
    }
}



/**
 * 初始化pop层
 * @private
 */
function _initPopLayer() {
    let popLayer = Dom.newElement('div');
    Dom.insertAfter(popLayer, _this.controls);
    popLayer.setAttribute('class', config.classes.popLayer);

    _this.popLayer = popLayer;
}

/**
 * Loading
 * @private
 */
function _initLoadingUI() {
    let loader = Dom.newElement('div');
    loader.setAttribute('class', config.classes.loaderLayer);
    Dom.insertAfter(loader, player.videoContainer);

    let inner = Dom.newElement('div');
    inner.setAttribute('class', 'inner ball-spin-fade-loader');
    loader.appendChild(inner);

    let l = Math.round(config.playerWidth / 2) - 10,
        t = Math.round(config.playerHeight / 2) - 20;
    Dom.css(inner, {top: t + 'px', left: l + 'px'});

    for (let i = 0; i < 8; i++) {
        inner.appendChild(Dom.newElement('div'));
    }

    _this.loader = loader;
}

/** 初始化控制界面 **/
function _initControlUI() {
    let html = config.ctrlHTML;

    if (!html) {
        html = _customTemplte();
    }

    html = Utils.replaceAll(html, '{seektime}', config.seekTime);
    html = Utils.replaceAll(html, '{id}', Math.floor(Math.random() * (10000)));

    player.container.insertAdjacentHTML('beforeend', html);

    if (config.tooltips) {
        let labels = Dom.getElements(config.selectors.labels);

        for (let i = labels.length - 1; i >= 0; i--) {
            let label = labels[i];
            if (label.classList.contains('sr-only')) {
                Dom.toggleClass(label, config.classes.hidden, false);
                Dom.toggleClass(label, config.classes.tooltip, true);
            }
        }
    }
}

function _customTemplte() {
    let html = [
        '<div class="player-controls">',
        '<div class="player-progress">',
        '<label for="seek{id}" class="sr-only">Seek</label>',
        '<input id="seek{id}" class="player-progress-seek" type="range" min="0" max="100" step="0.5" value="0" data-player="seek">',
        '<progress class="player-progress-played" max="100" value="0">',
        '<span>0</span>% ' + config.cn.played,
        '</progress>',
        '<progress class="player-progress-buffer" max="100" value="0">',
        '<span>0</span>% ' + config.cn.buffered,
        '</progress>',
        '</div>',
        '<span class="player-controls-left">'];

    if (Utils.inArray(config.controls, 'restart')) {
        html.push(
            '<button type="button" data-player="restart">',
            '<svg><use xlink:href="#' + config.iconPrefix + '-restart" /></svg>',
            '<span class="sr-only">' + config.cn.restart + '</span>',
            '</button>'
        );
    }

    if (Utils.inArray(config.controls, 'rewind')) {
        html.push(
            '<button type="button" data-player="rewind">',
            '<svg><use xlink:href="#' + config.iconPrefix + '-rewind" /></svg>',
            '<span class="sr-only">' + config.cn.rewind + '</span>',
            '</button>'
        );
    }

    if (Utils.inArray(config.controls, 'play')) {
        html.push(
            '<button type="button" data-player="play">',
            '<svg><use xlink:href="#' + config.iconPrefix + '-play" /></svg>',
            '<span class="sr-only">' + config.cn.play + '</span>',
            '</button>',
            '<button type="button" data-player="pause">',
            '<svg><use xlink:href="#' + config.iconPrefix + '-pause" /></svg>',
            '<span class="sr-only">' + config.cn.pause + '</span>',
            '</button>'
        );
    }

    if (Utils.inArray(config.controls, 'fast-forward')) {
        html.push(
            '<button type="button" data-player="fast-forward">',
            '<svg><use xlink:href="#' + config.iconPrefix + '-fast-forward" /></svg>',
            '<span class="sr-only">' + config.cn.forward + '</span>',
            '</button>'
        );
    }

    if (Utils.inArray(config.controls, 'current-time')) {
        html.push(
            '<span class="player-time">',
            '<span class="sr-only">' + config.cn.currentTime + '</span>',
            '<span class="player-current-time">00:00</span>',
            '</span>'
        );
    }

    if (Utils.inArray(config.controls, 'duration')) {
        html.push(
            '<span class="player-time">',
            '<span class="sr-only">' + config.cn.duration + '</span>',
            '<span class="player-duration">00:00</span>',
            '</span>'
        );
    }

    html.push(
        '</span>',
        '<span class="player-controls-right">'
    );

    if (Utils.inArray(config.controls, 'quality')) {
        html.push(
            '<button type="button" data-player="quality">',
            '<span class="q-label"></span>',
            '<span class="player-qualityListWrap"></span>',
            '</button>'
        );
    }

    if (Utils.inArray(config.controls, 'mute')) {
        html.push(
            '<button type="button" data-player="mute">',
            '<svg class="icon-muted"><use xlink:href="#' + config.iconPrefix + '-muted" /></svg>',
            '<svg><use xlink:href="#' + config.iconPrefix + '-volume" /></svg>',
            '<span class="sr-only">' + config.cn.toggleMute + '</span>',
            '</button>'
        );
    }

    if (Utils.inArray(config.controls, 'volume')) {
        html.push(
            '<label for="volume{id}" class="sr-only">' + config.cn.volume + '</label>',
            '<input id="volume{id}" class="player-volume" type="range" min="0" max="10" value="5" data-player="volume">'
        );
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

    if (Utils.inArray(config.controls, 'fullscreen')) {
        html.push(
            '<button type="button" data-player="fullscreen">',
            '<svg class="icon-exit-fullscreen"><use xlink:href="#' + config.iconPrefix + '-exit-fullscreen" /></svg>',
            '<svg><use xlink:href="#' + config.iconPrefix + '-enter-fullscreen" /></svg>',
            '<span class="sr-only">' + config.cn.toggleFullscreen + '</span>',
            '</button>'
        );
    }

    html.push(
        '</span>',
        '</div>'
    );

    return html.join('');
}

export default UI;