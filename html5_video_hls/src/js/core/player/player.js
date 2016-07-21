/**
 * Created by Cray flex.on 2015/12/28.
 */

import IPlayer from './base/iplayer';
import Utils from '../utils/utils';
import playerConfig from './player-config';
import Logger from '../utils/log';
import Dom from '../utils/dom';
import Skin from './manager/skin';
import UI from './manager/ui';
import Control from './manager/control';
import $ from '../context';


let _this, config = playerConfig;

class Player extends IPlayer{

    constructor() {
        super();

        this.browser = Utils.browserSniff();
        this.supported = Utils.supported();

        _this = this;
    }

    get isFullscreen() {
        return $.fullscreen.isFullScreen(this.container);
    }

    startup(media) {
        super.startup(media);
        Logger.log('[Player] init Player~ ');
        Logger.log('[Player] browser:' + this.browser.name + ' version:' + this.browser.version);

        this.box = media.parentNode;

        _setupMedia();

        if(config.control){
            $.skin = new Skin();
            $.skin.loadSkin(config.skin);

            $.ui = new UI();
            $.ui.startup(this);

            $.control = new Control();
            $.control.startup(this);

            if (config.displayDuration) {
                $.control.displayDuration();
            }
        }
    }

    resize(w, h) {
        config.videoWidth = w;
        config.videoHeight = h;
        w = w < 0 ? "100%" : (w + 'px');
        h = h < 0 ? "100%" : (h + 'px');
        Dom.css(_this.videoContainer, {width: w, height: h});
    }

    removeSources() {
        var sources = _this.media.querySelectorAll('source');
        for (var i = sources.length - 1; i >= 0; i--) {
            Dom.remove(sources[i]);
        }
        _this.media.removeAttribute('src');
    }

    addSource(attributes) {
        if (attributes.src) {
            let e = document.createElement('source');
            Dom.setAttributes(e, attributes);
            Dom.prependChild(e, _this.media);
        }
    }

    updateSource(sources) {

        this.media.pause();
        this.removeSources();

        if (typeof sources === 'string') {
            this.addSource({src: sources});
        }
        else if (sources.constructor === Array) {
            for (var index in sources) {
                this.addSource(sources[index]);
            }
        }
        this.media.load();
    }

    updatePoster(source) {
        if (this.media) {
            this.media.setAttribute('poster', source);
        }
    }

    supportMime(mimeType) {
        let media = this.media;
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

    destroy() {
        super.destroy();
        if(this.media){
            this.container.setAttribute('class', config.selectors.container.replace('.', ''));

            Dom.remove(Dom.getElement(config.selectors.controls));
            Dom.unwrap(this.videoContainer);
            this.media.setAttribute('controls', '');

            let clone = this.media.cloneNode(true);
            this.media.parentNode.replaceChild(clone, this.media);
        }
    }
}


function _setupMedia() {

    if (_this.supported.full && config.control) {

        let container = Dom.newElement('div');
        container.setAttribute('class', 'player flex-player');
        _this.box.appendChild(container);
        _this.container =  container;
        _this.container.appendChild(_this.media);

        let w, h;
        w = _this.box.offsetWidth;
        h = _this.box.offsetHeight;
        Dom.css(container, {width: w + 'px', height: h + 'px'});

        let wrapper = Dom.newElement('div');
        wrapper.setAttribute('class', config.classes.videoWrapper);
        Dom.wrap(_this.media, wrapper);
        _this.videoContainer = wrapper;


        Dom.toggleClass(_this.container, config.classes.type.replace('{0}', _this.type), true);
        Dom.toggleClass(_this.container, config.classes.stopped, (_this.media.getAttribute('autoplay') === null));

        if (_this.browser.ios) {
            Dom.toggleClass(_this.container, 'ios', true);
        }
    } else {

        config.control = false;
        Dom.setAttributes(_this.media, {controls: 'controls'});
    }

    if (config.poster !== "") {
        _this.updatePoster(config.poster);
    }
    if (!config.menu) {
        Dom.setAttributes(_this.media, {oncontextmenu: "return false;"});
    }
    //CORS
    Dom.setAttributes(_this.media, {crossOrigin: 'anonymous'});
}

export default Player;