/**
 * Created by Cray on 2016/1/14.
 */
flex.module('manager.adManager').requires('ad.adDataProxy, ad.adController, ad.adPlayer, ad.adUI, ad.pauseAd').define(() => {

    var config = null,
        _adPlayer = null;

    flex.Class.AdManager = class {
        constructor(){
            config = flex.config;
        }

        startup(adSourceUrl){

            _startUpPlayer();

            adSourceUrl = adSourceUrl.replace("{0}", 1) + "&cyt=" + (new Date()).getTime();
            flex.dataDsp.getAdData(adSourceUrl, _onSuccess, _onFail);
        }

        get adPlayer(){
            return _adPlayer;
        }
    };

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
    function _startUpPlayer(){

        let ele = flex.getElement(flex.config.selectors.container);
        if (typeof ele.adPlayer === 'undefined') {
            _adPlayer = new flex.Class.AdPlayer(ele);
            ele.adPlayer = (Object.keys(_adPlayer).length ? _adPlayer : false);
        }
    }

});