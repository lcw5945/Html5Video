'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2015/12/17.
 */
flex.module('manager.uiManager').define(function () {
    var config = null,
        player = null,
        fullscreen = null;

    flex.Class.UIManager = function () {
        function _class() {
            _classCallCheck(this, _class);

            flex.log('[UM] init ui manager');

            config = flex.config;
            fullscreen = flex.fullscreen;
        }

        _createClass(_class, [{
            key: 'startup',
            value: function startup($player) {

                player = $player;

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
                /** 视频清晰度 **/
                _initVideoQualityList();

                flex.on(flex.Event.RESIZE, _resizeHandler);
            }
        }, {
            key: 'pop',
            value: function pop(element, options) {
                //删除容器内的元素
                flex.removeAllChild(player.popLayer);

                if (element instanceof HTMLElement) {
                    player.popLayer.appendChild(element);
                } else if (typeof element != 'undefined') {
                    player.popLayer.innerHTML = element;
                } else {
                    flex.log('[UI] pop content error', flex.log.levels.ERROR);
                    return;
                }

                _updatePopDisplay();
            }
        }, {
            key: 'showCover',
            value: function showCover() {
                var playerCover = flex.newElement('div');
                flex.element.container.appendChild(playerCover);
                playerCover.setAttribute('class', config.classes.coverLayer);
                flex.element.cover = playerCover;

                var img = flex.newElement('img');
                img.src = config.cover;
                img.setAttribute('class', config.classes.coverLayer);
                playerCover.appendChild(img);

                var span = flex.newElement('span');
                span.setAttribute('class', config.classes.coverLayer);
                playerCover.appendChild(span);

                flex.on(playerCover, 'transitionend webkitTransitionEnd mozTransitionEnd', function (event) {
                    flex.remove(playerCover);
                });
                flex.on(flex.Event.HIDE_COVER, function (event) {
                    flex.Ticker.tick(300, _hideCover);
                });

                function _hideCover() {
                    flex.toggleClass(flex.element.cover, config.classes.hideConver, true);
                    flex.toggleState(flex.element.cover, true);
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

        return _class;
    }();

    /** 初始化dom元素 **/
    function _initPlayerElements() {
        try {
            player.controls = flex.getElement(config.selectors.controls);

            player.buttons = {};
            player.buttons.seek = flex.getElement(config.selectors.buttons.seek);
            player.buttons.play = flex.getElement(config.selectors.buttons.play);
            player.buttons.pause = flex.getElement(config.selectors.buttons.pause);
            player.buttons.restart = flex.getElement(config.selectors.buttons.restart);
            player.buttons.rewind = flex.getElement(config.selectors.buttons.rewind);
            player.buttons.forward = flex.getElement(config.selectors.buttons.forward);
            player.buttons.fullscreen = flex.getElement(config.selectors.buttons.fullscreen);

            player.buttons.mute = flex.getElement(config.selectors.buttons.mute);
            player.buttons.quality = flex.getElement(config.selectors.buttons.quality);
            player.checkboxes = flex.getElements('[type="checkbox"]');

            player.progress = {};
            player.progress.container = flex.getElement(config.selectors.progress.container);

            player.progress.buffer = {};
            player.progress.buffer.bar = flex.getElement(config.selectors.progress.buffer);
            player.progress.buffer.text = player.progress.buffer.bar && player.progress.buffer.bar.getElementsByTagName('span')[0];

            player.progress.played = {};
            player.progress.played.bar = flex.getElement(config.selectors.progress.played);
            player.progress.played.text = player.progress.played.bar && player.progress.played.bar.getElementsByTagName('span')[0];

            player.volume = flex.getElement(config.selectors.buttons.volume);

            player.duration = flex.getElement(config.selectors.duration);
            player.currentTime = flex.getElement(config.selectors.currentTime);
            player.seekTime = flex.getElements(config.selectors.seekTime);

            return true;
        } catch (e) {
            flex.log('[UM] tag element instance fail.', true);
            player.media.setAttribute('controls', '');
            return false;
        }
    }

    /**
     * 初始化显示布局
     * @private
     */
    function _initDisplayLayer() {

        _updateConfig();

        player.isFullscreen = flex.fullscreen.isFullScreen(player.container);
        if (player.isFullscreen) {
            flex.css(player.container, {});
            flex.css(player.videoContainer, {});
        } else {
            //设置播放器大小
            flex.css(player.container, { width: config.playerWidth + 'px', height: config.playerHeight + 'px' });
            player.resize(config.videoWidth, config.videoHeight);
        }
        if (flex.toggleState(player.buttons.fullscreen) != player.isFullscreen) {
            _updateControlsDisplay();
        }
        //pop层广告
        if (player.popLayer.childNodes.length > 0) {
            _updatePopDisplay();
        }
    }

    /**
     * 更新pop层显示
     * @private
     */
    function _updatePopDisplay() {
        var element = player.popLayer.firstChild,
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

        flex.css(element, { position: 'absolute', top: top + 'px', left: left + 'px' });
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
        //播放器宽高
        config.playerWidth = flex.element.container.parentNode.offsetWidth;
        config.playerHeight = flex.element.container.parentNode.offsetHeight;
        //设置视频宽高
        config.videoWidth = config.playerWidth;
        config.videoHeight = config.playerHeight - config.controlHeight;
    }

    /**
     * 初始化全屏
     * @private
     */
    function _initFullscreen() {
        if (config.fullscreen.enabled) {
            var nativeSupport = fullscreen.supportsFullScreen;

            if (nativeSupport || config.fullscreen.fallback && !flex.inFrame()) {
                flex.log('[CM] ' + (nativeSupport ? 'Native' : 'Fallback') + ' fullscreen enabled.');
                flex.toggleClass(player.container, config.classes.fullscreen.enabled, true);
            }
            player.isFullscreen = flex.fullscreen.isFullScreen(player.container);
            flex.toggleState(player.buttons.fullscreen, player.isFullscreen);
        }
    }

    /**
     * 更新控制条的显示
     * @private
     */
    function _updateControlsDisplay() {

        var tipEle = flex.getElement(config.selectors.buttons.fullscreen + ' .' + config.classes.tooltip);
        if (player.isFullscreen) {
            tipEle.innerText = "退出";
        } else {
            tipEle.innerText = "全屏";
        }

        flex.toggleClass(player.container, config.classes.fullscreen.active, player.isFullscreen);
        flex.toggleState(player.buttons.fullscreen, player.isFullscreen);

        var hoverTimer = void 0,
            isMouseOver = false;

        //hoverTimer = function (){
        //    flex.toggleClass(player.container, config.classes.hover, false);
        //};

        function _showControls() {
            flex.toggleClass(player.container, config.classes.hover, true);
            //flex.Ticker.have(hoverTimer) || flex.Ticker.stop(hoverTimer);
            //isMouseOver || flex.Ticker.tick(2000, hoverTimer);

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
            flex.toggleClass(player.container, config.classes.fullscreen.hideControls, player.isFullscreen);
            //flex.toggleClass(player.controls, config.classes.hover, !player.isFullscreen);

            flex.toggleHandler(player.controls, 'mouseenter mouseleave', _setMouseOver, player.isFullscreen);
            flex.toggleHandler(player.container, 'mousemove', _showControls, player.isFullscreen);
        }
    }

    function _initVideoQualityList() {
        var videoData = flex.data["videoData"];
        var dicQ = {
            1: "标清",
            2: "高清",
            3: "超清"
        };
        if (videoData.length > 0) {
            (function () {
                var ele = flex.getElement('.q-label');
                ele.innerText = dicQ[videoData.currentVD.quality];
                var ulEle = flex.newElement('ul');
                flex.each(videoData.splits, function (i, vd) {
                    var liEle = flex.newElement('li');
                    liEle.innerText = dicQ[vd.quality];
                    liEle.quality = vd.quality;
                    ulEle.appendChild(liEle);

                    flex.on(liEle, "click", function () {
                        ele.innerText = dicQ[this.quality];
                        flex.playerMgr.switchSource(flex.data["videoData"].getVDByQuality(this.quality));
                    }.bind(liEle));
                });
                flex.getElement('.player-qualityListWrap').appendChild(ulEle);

                flex.toggleClass(ulEle, config.classes.qualityList, true);
            })();
        } else {
            flex.css(player.buttons.quality, { display: "none" });
        }
    }

    /**
     * 初始化pop层
     * @private
     */
    function _initPopLayer() {
        var popLayer = flex.newElement('div');
        flex.insertAfter(popLayer, player.controls);
        popLayer.setAttribute('class', config.classes.popLayer);
        player.popLayer = popLayer;
    }

    /**
     * Loading
     * @private
     */
    function _initLoadingUI() {
        var loader = flex.newElement('div');
        loader.setAttribute('class', config.classes.loaderLayer);
        flex.insertAfter(loader, player.videoContainer);

        var inner = flex.newElement('div');
        inner.setAttribute('class', 'inner ball-spin-fade-loader');
        loader.appendChild(inner);

        var l = Math.round(config.playerWidth / 2) - 10,
            t = Math.round(config.playerHeight / 2) - 20;
        flex.css(inner, { top: t + 'px', left: l + 'px' });

        for (var i = 0; i < 8; i++) {
            inner.appendChild(flex.newElement('div'));
        }

        flex.element.loader = loader;
    }

    /** 初始化控制界面 **/
    function _initControlUI() {
        var html = config.ctrlHTML;

        if (!html) {
            html = _customTemplte();
        }

        html = flex.replaceAll(html, '{seektime}', config.seekTime);
        html = flex.replaceAll(html, '{id}', Math.floor(Math.random() * 10000));

        player.container.insertAdjacentHTML('beforeend', html);

        if (config.tooltips) {
            var labels = flex.getElements(config.selectors.labels);

            for (var i = labels.length - 1; i >= 0; i--) {
                var label = labels[i];
                if (label.classList.contains('sr-only')) {
                    flex.toggleClass(label, config.classes.hidden, false);
                    flex.toggleClass(label, config.classes.tooltip, true);
                }
            }
        }
    }

    function _customTemplte() {
        var html = ['<div class="player-controls">', '<div class="player-progress">', '<label for="seek{id}" class="sr-only">Seek</label>', '<input id="seek{id}" class="player-progress-seek" type="range" min="0" max="100" step="0.5" value="0" data-player="seek">', '<progress class="player-progress-played" max="100" value="0">', '<span>0</span>% ' + config.cn.played, '</progress>', '<progress class="player-progress-buffer" max="100" value="0">', '<span>0</span>% ' + config.cn.buffered, '</progress>', '</div>', '<span class="player-controls-left">'];

        if (flex.inArray(config.controls, 'restart')) {
            html.push('<button type="button" data-player="restart">', '<svg><use xlink:href="#' + config.iconPrefix + '-restart" /></svg>', '<span class="sr-only">' + config.cn.restart + '</span>', '</button>');
        }

        if (flex.inArray(config.controls, 'rewind')) {
            html.push('<button type="button" data-player="rewind">', '<svg><use xlink:href="#' + config.iconPrefix + '-rewind" /></svg>', '<span class="sr-only">' + config.cn.rewind + '</span>', '</button>');
        }

        if (flex.inArray(config.controls, 'play')) {
            html.push('<button type="button" data-player="play">', '<svg><use xlink:href="#' + config.iconPrefix + '-play" /></svg>', '<span class="sr-only">' + config.cn.play + '</span>', '</button>', '<button type="button" data-player="pause">', '<svg><use xlink:href="#' + config.iconPrefix + '-pause" /></svg>', '<span class="sr-only">' + config.cn.pause + '</span>', '</button>');
        }

        if (flex.inArray(config.controls, 'fast-forward')) {
            html.push('<button type="button" data-player="fast-forward">', '<svg><use xlink:href="#' + config.iconPrefix + '-fast-forward" /></svg>', '<span class="sr-only">' + config.cn.forward + '</span>', '</button>');
        }

        if (flex.inArray(config.controls, 'current-time')) {
            html.push('<span class="player-time">', '<span class="sr-only">' + config.cn.currentTime + '</span>', '<span class="player-current-time">00:00</span>', '</span>');
        }

        if (flex.inArray(config.controls, 'duration')) {
            html.push('<span class="player-time">', '<span class="sr-only">' + config.cn.duration + '</span>', '<span class="player-duration">00:00</span>', '</span>');
        }

        html.push('</span>', '<span class="player-controls-right">');

        if (flex.inArray(config.controls, 'quality')) {
            html.push('<button type="button" data-player="quality">', '<span class="q-label"></span>', '<span class="player-qualityListWrap"></span>', '</button>');
        }

        if (flex.inArray(config.controls, 'mute')) {
            html.push('<button type="button" data-player="mute">', '<svg class="icon-muted"><use xlink:href="#' + config.iconPrefix + '-muted" /></svg>', '<svg><use xlink:href="#' + config.iconPrefix + '-volume" /></svg>', '<span class="sr-only">' + config.cn.toggleMute + '</span>', '</button>');
        }

        if (flex.inArray(config.controls, 'volume')) {
            html.push('<label for="volume{id}" class="sr-only">' + config.cn.volume + '</label>', '<input id="volume{id}" class="player-volume" type="range" min="0" max="10" value="5" data-player="volume">');
        }

        //if (flex.inArray(config.controls, 'captions')) {
        //    html.push(
        //        '<button type="button" data-player="captions">',
        //        '<svg class="icon-captions-on"><use xlink:href="#' + config.iconPrefix + '-captions-on" /></svg>',
        //        '<svg><use xlink:href="#' + config.iconPrefix + '-captions-off" /></svg>',
        //        '<span class="sr-only">' + config.cn.toggleCaptions + '</span>',
        //        '</button>'
        //    );
        //}

        if (flex.inArray(config.controls, 'fullscreen')) {
            html.push('<button type="button" data-player="fullscreen">', '<svg class="icon-exit-fullscreen"><use xlink:href="#' + config.iconPrefix + '-exit-fullscreen" /></svg>', '<svg><use xlink:href="#' + config.iconPrefix + '-enter-fullscreen" /></svg>', '<span class="sr-only">' + config.cn.toggleFullscreen + '</span>', '</button>');
        }

        html.push('</span>', '</div>');

        return html.join('');
    }
});