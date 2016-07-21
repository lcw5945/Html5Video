'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/1/14.
 */
flex.module('manager.adManager').requires('ad.adDataProxy, ad.adController, ad.adPlayer, ad.adUI, ad.pauseAd').define(function () {

    var config = null,
        _adPlayer = null;

    flex.Class.AdManager = function () {
        function _class() {
            _classCallCheck(this, _class);

            config = flex.config;
        }

        _createClass(_class, [{
            key: 'startup',
            value: function startup(adSourceUrl) {

                _startUpPlayer();

                adSourceUrl = adSourceUrl.replace("{0}", 1) + "&cyt=" + new Date().getTime();
                flex.dataDsp.getAdData(adSourceUrl, _onSuccess, _onFail);
            }
        }, {
            key: 'adPlayer',
            get: function get() {
                return _adPlayer;
            }
        }]);

        return _class;
    }();

    /**
     * 解析数据
     * @param data
     * @private
     */
    function _onSuccess(data) {
        flex.data['adData'] = new flex.Class.HaoyeParse(data);
        flex.adUi = new flex.Class.adUI(_adPlayer);
        flex.adCtrler = new flex.Class.ADController(_adPlayer);
        //初始化暂停广告
        flex.pauseAd = new flex.Class.PauseAD();
    }

    /**
     * 广告数据加载失败
     * @private
     */
    function _onFail() {
        flex.fire(flex.Event.AD_COMPLETE);
    }

    /**
     * 安装播放器
     * @private
     */
    function _startUpPlayer() {

        var ele = flex.getElement(flex.config.selectors.container);
        if (typeof ele.adPlayer === 'undefined') {
            _adPlayer = new flex.Class.AdPlayer(ele);
            ele.adPlayer = Object.keys(_adPlayer).length ? _adPlayer : false;
        }
    }
});