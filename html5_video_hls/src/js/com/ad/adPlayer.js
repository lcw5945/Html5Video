/**
 * Created by Cray on 2016/4/7.
 */
flex.module('ad.adPlayer').requires('config').define(() => {

    var player, config = flex.config;

    flex.Class.AdPlayer = class {
        constructor(container){
            this.container = container;
            player = this;

            if (this.initFinish) {
                flex.log('[ADPlayer] adPlayer init complete. ', true);
                return null;
            }

            flex.log('[ADPlayer] init adPlayer~ ');

            this.media = flex.newElement('video');
            this.container.appendChild(this.media);
            this.supported = flex.supported;

            if (!this.supported.basic) {
                this.initFinish = true;
                return false;
            }

            _setupMedia();

            this.initFinish = true;
        }


        /**
         * 播放器尺寸设置
         * @param w
         * @param h
         */
        resize(w, h) {
            config.playerAdWidth = w;
            config.playerAdHeight = h;
            w = w < 0 ? "100%" : (w + 'px');
            h = h < 0 ? "100%" : (h + 'px');
            flex.css(player.videoContainer, {width: w, height: h});
        }

        /**
         * 更新媒体
         * @param media
         */
        updateMedia(media){
            if(player.media){
                player.media.pause();
                flex.remove(player.media);
            }

            player.media = media;
            player.videoContainer.appendChild(media);
            player.media.play();
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

            player.initFinish = false;

            player.media.pause();
            flex.remove(player.videoContainer);
            //player.media.setAttribute('controls', '');
        }
    };

    function _setupMedia() {

        var wrapper = flex.newElement('div');
        wrapper.setAttribute('class', config.classes.adVideoWrapper);
        flex.wrap(player.media, wrapper);
        player.videoContainer = wrapper;
    }

});