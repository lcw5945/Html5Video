/**
 * Created by Cray on 2016/4/20.
 */
import FlashUI from './flashUI';
import Logger from '../../core/utils/log';
import Utils from '../../core/utils/utils';
import Dom from '../../core/utils/dom';

let defaultValue = {
        id: '173player' + new Date().getTime(),
        flashvars: {},
        paras: {
            quality: 'high',
            bgcolor: '#131313',
            allowscriptaccess: 'always',
            allowfullscreenInteractive: 'true',
            wmode: 'transparent'
        }
    };

class FlashPlayer {
    constructor(container, url, options) {
        this.container = container;
        this.options = (typeof options == 'undefined') ? defaultValue : Utils.merge(defaultValue, options);
        this.id = this.options.id;
        this.url = url;

        this.flashUi = new FlashUI(this.url, this.options);

        return this;
    }

    startup() {
        if (!this.container) {
            Logger.error('[FLASH] container is null');
            return false;
        }
        this.container.innerHTML = this.flashUi.startup();
    }

    ready() {
        this.movie = Dom.getElementById(this.id);
    }

    html() {
        return this.flashUi.html();
    }

    getPlayedTime() {
        return this.movie.getPlayedTime()
    }

    pause() {
        if (this.movie) {
            this.movie.setPause();
        }
    }

    pauseWithoutAd() {
        if (this.movie) {
            this.movie.setPauseOnly();
        }
    }

    pauseAdToPlay() {
        if (this.movie) {
            this.movie.toPlay();
        }
    }

    play(n) {
        if (this.movie) {
            this.movie.setPlay(n);
        }
    }

    setUserId(v) {
        if (this.movie) {
            this.movie.onUserStatus(v);
        }
    }

    stop() {
        if (this.movie) {
            this.movie.setEnd();
        }
    }
}

export default FlashPlayer;