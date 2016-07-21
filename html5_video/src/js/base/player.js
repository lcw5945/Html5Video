/**
 * Created by Cray flex.on 2015/12/28.
 */
flex.module('base.player').requires('config').define(() => {

    var player, config = flex.config;

    flex.Class.Player = class {
        constructor(container) {
            this.container = container;
            player = this;

            this.browser = flex.browserSniff();
        }

        /** 初始化 **/
        startup() {
            if (this.initFinish) {
                flex.log('[Player] player init complete. ', true);
                return null;
            }
            flex.log('[Player] init Player~ ');
            this.media = flex.getElement("flexVideo") || (() => {
                    let media = flex.newElement('video');
                    this.container.appendChild(media);
                    return media;
                })();
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
                isFullscreen: function () {
                    return this.isFullscreen || false;
                },
                supportMime: function (mimeType) {
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
        resize(w, h) {
            config.videoWidth = w;
            config.videoHeight = h;
            w = w < 0 ? "100%" : (w + 'px');
            h = h < 0 ? "100%" : (h + 'px');
            flex.css(player.videoContainer, {width: w, height: h});
        }

        /** 移除源 **/
        removeSources() {
            var sources = player.media.querySelectorAll('source');
            for (var i = sources.length - 1; i >= 0; i--) {
                flex.remove(sources[i]);
            }
            player.media.removeAttribute('src');
        }

        /** 添加源 **/
        addSource(attributes) {
            if (attributes.src) {
                var element = document.createElement('source');
                flex.setAttributes(element, attributes);
                flex.prependChild(element, player.media);
            }
        }

        /** 设置源 String or Array **/
        updateSource(sources) {

            player.media.pause();
            //flex.controlMgr.seek();
            player.removeSources();

            if (typeof sources === 'string') {
                player.addSource({src: sources});
            }
            else if (sources.constructor === Array) {
                for (var index in sources) {
                    player.addSource(sources[index]);
                }
            }
            player.media.load();
        }

        /** 更新海报 **/
        updatePoster(source) {
            if (player.media) {
                player.media.setAttribute('poster', source);
            }
        }

        destroy() {
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
    };

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
            flex.toggleClass(player.container, config.classes.stopped, (player.media.getAttribute('autoplay') === null));

            if (player.browser.ios) {
                flex.toggleClass(player.container, 'ios', true);
            }

            var wrapper = flex.newElement('div');
            wrapper.setAttribute('class', config.classes.videoWrapper);
            flex.wrap(player.media, wrapper);
            player.videoContainer = wrapper;

        } else {
            flex.setAttributes(player.media, {controls: 'controls'});
        }

        //海报
        if (config.poster !== "") {
            player.updatePoster(config.poster);
        }
        //右键菜单
        if (!config.menu) {
            flex.setAttributes(player.media, {oncontextmenu: "return false;"});
        }
        //CORS
        flex.setAttributes(player.media, {crossOrigin: 'anonymous'});
    }
});