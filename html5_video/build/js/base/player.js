'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray flex.on 2015/12/28.
 */
flex.module('base.player').requires('config').define(function () {

    var player,
        config = flex.config;

    flex.Class.Player = function () {
        function _class(container) {
            _classCallCheck(this, _class);

            this.container = container;
            player = this;

            this.browser = flex.browserSniff();
        }

        /** 初始化 **/


        _createClass(_class, [{
            key: 'startup',
            value: function startup() {
                var _this = this;

                if (this.initFinish) {
                    flex.log('[Player] player init complete. ', true);
                    return null;
                }
                flex.log('[Player] init Player~ ');
                this.media = flex.getElement("flexVideo") || function () {
                    var media = flex.newElement('video');
                    _this.container.appendChild(media);
                    return media;
                }();
                this.media.autoplay = config.autoPlay;
                this.type = this.media.tagName.toLowerCase();
                this.supported = flex.supported;
                //是否是全屏中
                this.isFullscreen = flex.fullscreen.isFullScreen(this.container);
                if (!this.supported.basic) {
                    return false;
                }
                flex.log('[Player] browser:' + this.browser.name + ' version:' + this.browser.version);

                _setupMedia();

                if (this.type === 'video') {
                    if (!this.supported.full) {
                        this.initFinish = true;
                        return;
                    }

                    flex.uiMgr.startup(this);
                    flex.controlMgr.startup(this);

                    if (config.displayDuration) {
                        flex.controlMgr.displayDuration();
                    }
                }

                this.initFinish = true;

                flex.iplayer = {
                    media: this.media,
                    setSource: this.updateSource,
                    setPoster: this.updatePoster,
                    setSize: this.resize,
                    isFullscreen: function isFullscreen() {
                        return this.isFullscreen || false;
                    },
                    supportMime: function supportMime(mimeType) {
                        return _supportMime(mimeType);
                    },
                    destroy: this.destroy
                };
            }

            /**
             * 播放器尺寸设置
             * @param w
             * @param h
             */

        }, {
            key: 'resize',
            value: function resize(w, h) {
                config.videoWidth = w;
                config.videoHeight = h;
                w = w < 0 ? "100%" : w + 'px';
                h = h < 0 ? "100%" : h + 'px';
                flex.css(player.videoContainer, { width: w, height: h });
            }

            /** 移除源 **/

        }, {
            key: 'removeSources',
            value: function removeSources() {
                var sources = player.media.querySelectorAll('source');
                for (var i = sources.length - 1; i >= 0; i--) {
                    flex.remove(sources[i]);
                }
                player.media.removeAttribute('src');
            }

            /** 添加源 **/

        }, {
            key: 'addSource',
            value: function addSource(attributes) {
                if (attributes.src) {
                    var element = document.createElement('source');
                    flex.setAttributes(element, attributes);
                    flex.prependChild(element, player.media);
                }
            }

            /** 设置源 String or Array **/

        }, {
            key: 'updateSource',
            value: function updateSource(sources) {

                player.media.pause();
                //flex.controlMgr.seek();
                player.removeSources();

                if (typeof sources === 'string') {
                    player.addSource({ src: sources });
                } else if (sources.constructor === Array) {
                    for (var index in sources) {
                        player.addSource(sources[index]);
                    }
                }
                player.media.load();
            }

            /** 更新海报 **/

        }, {
            key: 'updatePoster',
            value: function updatePoster(source) {
                if (player.media) {
                    player.media.setAttribute('poster', source);
                }
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                if (!player.initFinish) {
                    return null;
                }

                player.container.setAttribute('class', config.selectors.container.replace('.', ''));
                player.initFinish = false;

                flex.remove(flex.getElement(config.selectors.controls));
                flex.unwrap(player.videoContainer);
                player.media.setAttribute('controls', '');

                var clone = player.media.cloneNode(true);
                player.media.parentNode.replaceChild(clone, player.media);
            }
        }]);

        return _class;
    }();

    function _supportMime(mimeType) {
        var media = player.media;
        if (player.type == 'video') {
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

    /** 设置媒体 **/
    function _setupMedia() {
        if (!player.media) {
            flex.log('[Player] video对象为空!', true);
            return false;
        }

        if (player.supported.full) {
            flex.toggleClass(player.container, config.classes.type.replace('{0}', player.type), true);
            flex.toggleClass(player.container, config.classes.stopped, player.media.getAttribute('autoplay') === null);

            if (player.browser.ios) {
                flex.toggleClass(player.container, 'ios', true);
            }

            var wrapper = flex.newElement('div');
            wrapper.setAttribute('class', config.classes.videoWrapper);
            flex.wrap(player.media, wrapper);
            player.videoContainer = wrapper;
        } else {
            flex.setAttributes(player.media, { controls: 'controls' });
        }

        //海报
        if (config.poster !== "") {
            player.updatePoster(config.poster);
        }
        //右键菜单
        if (!config.menu) {
            flex.setAttributes(player.media, { oncontextmenu: "return false;" });
        }
        //CORS
        flex.setAttributes(player.media, { crossOrigin: 'anonymous' });
    }
});