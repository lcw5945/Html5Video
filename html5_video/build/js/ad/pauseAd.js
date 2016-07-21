'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/4/18.
 */
flex.module('ad.pauseAd').requires('config').define(function () {

    var _data = null,
        config = null,
        media = null,
        container = null,
        closeBtn = null,
        fileId = null;

    flex.Class.PauseAD = function () {
        function _class() {
            _classCallCheck(this, _class);

            var adData = flex.data['adData'];
            _data = adData[adData.adType.Z_C];
            config = flex.config;

            this.initFinish = false;

            if (!_data) {
                flex.log('[PAD] pause ad data is null', flex.log.levels.ERROR);
                return false;
            }

            _init();
            _addListener();

            this.initFinish = true;
        }

        _createClass(_class, [{
            key: 'startup',
            value: function startup() {
                if (!this.initFinish) return false;

                if (!fileId) {
                    fileId = flex.preloader.addFile(_data.url);
                }

                media = media || flex.preloader.getFile(fileId);
                if (media.tagName.toLowerCase() === 'video') {
                    media.autoplay = true;
                    media.loop = true;
                }
                if (!media.parentNode) {
                    flex.prependChild(media, container);
                    flex.css(media, { width: '100%', height: '100%' });
                }

                flex.uiMgr.pop(container);
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                if (!this.initFinish || !media) return false;

                flex.remove(container);

                if (!!media && media['pause']) {
                    media.pause();
                }
            }
        }]);

        return _class;
    }();

    /**
     * 初始化
     * @private
     */
    function _init() {
        container = flex.newElement('div');
        container.setAttribute('class', config.classes.pauseAdWrapper);

        closeBtn = flex.newElement('button');
        closeBtn.innerHTML = 'x';
        container.appendChild(closeBtn);
    }

    /**
     * 打开广告
     * @private
     */
    function _openAd(event) {
        if (_data) {
            flex.toUrl(_data.jumpTo);
        }
    }

    /**
     * 添加监听器
     * @private
     */
    function _addListener() {
        flex.on(flex.Event.PLAY_STATE, function (event) {
            if (event.data == 'play' || event.data == 'ended') {
                flex.pauseAd.destroy();
            } else if (event.data == 'pause') {
                flex.pauseAd.startup();
            }
        });

        flex.on(container, 'click', function (event) {
            _openAd(event);
        });

        flex.on(closeBtn, 'click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            flex.pauseAd.destroy();
        });
    }
});