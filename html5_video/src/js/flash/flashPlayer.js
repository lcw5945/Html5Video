/**
 * Created by Cray on 2016/4/20.
 */
flex.module('flash.flashPlayer').requires('flash.flashUI').define(() => {
    let flashPlayer = null,
        defaultValue = {
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

    flex.Class.FlashPlayer = class {
        constructor (container, url, options){
            this.container = container;
            this.options = (typeof options == 'undefined') ? defaultValue : flex.merge(defaultValue, options);
            this.id = this.options.id;
            this.url = url;

            this.flashUi = new flex.Class.FlashUI(this.url, this.options);
            flex.flashPlayer = flashPlayer =  this;
            return this;
        }

        startup (){
            if(!this.container){
                flex.log('[FLASH] container is null', flex.log.levels.ERROR);
                return false;
            }
            this.container.innerHTML = this.flashUi.startup();
        }

        ready() {
            this.movie = flex.getElementById(this.id);
        }

        html () {
            return this.flashUi.html();
        }

        getPlayedTime () {
            return this.movie.getPlayedTime()
        }

        pause () {
            if (this.movie){
                this.movie.setPause();
            }
        }

        pauseWithoutAd () {
            if (this.movie){
                this.movie.setPauseOnly();
            }
        }
        pauseAdToPlay () {
            if (this.movie){
                this.movie.toPlay();
            }
        }
        play (n) {
            if (this.movie){
                this.movie.setPlay(n);
            }
        }

        setUserId (v) {
            if (this.movie){
                this.movie.onUserStatus(v);
            }
        }

        stop () {
            if (this.movie){
                this.movie.setEnd();
            }
        }
    }
});