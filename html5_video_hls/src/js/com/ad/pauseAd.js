/**
 * Created by Cray on 2016/4/18.
 */
import Logger from '../../core/utils/log';
import PEvent from '../../events';
import Dom from '../../core/utils/dom';
import Utils from '../../core/utils/utils';
import Context from '../../core/context';

let _data = null,
    config = null,
    media = null,
    container = null,
    closeBtn = null,
    fileId = null;

class PauseAD {
    constructor() {
        let adData = Context.data['adData'];
        _data = adData[adData.adType.Z_C];
        config = Context.config;

        this.initFinish = false;

        if (!_data) {
            Logger.error('[PAD] pause ad data is null');
            return false;
        }

        _init();
        _addListener();

        this.initFinish = true;
    }

    startup() {
        if (!this.initFinish)return false;

        if (!fileId) {
            fileId = Context.preloader.addFile(_data.url);
        }

        media = media || Context.preloader.getFile(fileId);

        if (media.tagName.toLowerCase() === 'video') {
            media.autoplay = true;
            media.loop = true;
        }
        if (!media.parentNode) {
            Dom.prependChild(media, container);
            Dom.css(media, {width: '100%', height: '100%'});
        }

        Context.uiMgr.pop(container);
    }

    destroy() {
        if (!this.initFinish || !media)return false;

        Dom.remove(container);

        if (!!media && media['pause']) {
            media.pause();
        }
    }
}

/**
 * 初始化
 * @private
 */
function _init() {
    container = Dom.newElement('div');
    container.setAttribute('class', config.classes.pauseAdWrapper);

    closeBtn = Dom.newElement('button');
    closeBtn.innerHTML = 'x';
    container.appendChild(closeBtn);
}

/**
 * 打开广告
 * @private
 */
function _openAd(event) {
    if (_data) {
        Utils.toUrl(_data.jumpTo);
    }
}

/**
 * 添加监听器
 * @private
 */
function _addListener() {
    Context.e.on(PEvent.PLAY_STATE, (event) => {
        if (event.data == 'play' || event.data == 'ended') {
            Context.pauseAd.destroy();
        } else if (event.data == 'pause') {
            Context.pauseAd.startup();
        }
    });

    Context.e.on(container, 'click', (event) => {
        _openAd(event);
    });

    Context.e.on(closeBtn, 'click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        Context.pauseAd.destroy();
    });
}

