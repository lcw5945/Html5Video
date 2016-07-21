'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/1/15.
 */
flex.module('manager.businessManager').requires('plugin.vr720, config').define(function () {

    var config = null;
    flex.Class.BussinessManager = function () {
        function _class() {
            _classCallCheck(this, _class);

            config = flex.config;
        }

        _createClass(_class, [{
            key: 'startup',
            value: function startup() {
                flex.log('[BM] init business manager~ ');
                //加载皮肤
                flex.skinMgr.startup();
                //显示cover
                flex.uiMgr.showCover();

                //如果有广告
                if (config.ad && config.adSourceUrl !== "") {
                    flex.adMgr.startup(config.adSourceUrl);
                    flex.on(flex.Event.AD_COMPLETE, _startDispacher);
                } else {
                    _startDispacher();
                }
            }
        }]);

        return _class;
    }();

    /**
     * 开始数据调度
     * @param data
     * @private
     */
    function _startDispacher() {

        flex.log('[BM] start data dispacher');

        var vUrl = flex.config.videoSourceUrl;
        var cid = flex.config.cid;
        if (!!vUrl && !!cid) {
            vUrl = vUrl.replace("{0}", cid) + "&t=" + new Date().getTime();
            flex.dataDsp.getVideoData(vUrl, _onGetDataHandler);
        } else {
            flex.log('[DD] video url or cid is empty!', true);
        }
    }

    /**
     * 数据解析成功开始初始化播放管理
     * @private
     */
    function _onGetDataHandler() {
        if (flex.data["videoData"].currentVD) {
            var isVR = flex.data["videoData"].isVR;
            if (isVR && flex.browserSniff().name === 'IE') {
                flex.fire(flex.Event.RESTART_FLASH);
                return false;
            }

            flex.playerMgr.startup();
            //是否是全景视频
            if (isVR) {
                new flex.Class.VR720();
            }
        }
    }
});