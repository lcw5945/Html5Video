/**
 * Created by Cray on 2016/1/15.
 */
flex.module('manager.businessManager').requires('plugin.vr720, config').define(() => {

    var config = null;
    flex.Class.BussinessManager = class {
        constructor(){
            config = flex.config;
        }

        startup (){
            flex.log('[BM] init business manager~ ');
            //加载皮肤
            flex.skinMgr.startup();
            //显示cover
            flex.uiMgr.showCover();

            //如果有广告
            if(config.ad && config.adSourceUrl !== ""){
                flex.adMgr.startup(config.adSourceUrl);
                flex.on(flex.Event.AD_COMPLETE, _startDispacher);
            }else{
                _startDispacher();
            }
        }
    };

    /**
     * 开始数据调度
     * @param data
     * @private
     */
    function _startDispacher(){

        flex.log('[BM] start data dispacher');

        let vUrl = flex.config.videoSourceUrl;
        let cid = flex.config.cid;
        if(!!vUrl && !!cid){
            vUrl = vUrl.replace("{0}", cid) + "&t=" + (new Date()).getTime();
            flex.dataDsp.getVideoData(vUrl, _onGetDataHandler);
        }else{
            flex.log('[DD] video url or cid is empty!' , true);
        }
    }

    /**
     * 数据解析成功开始初始化播放管理
     * @private
     */
    function _onGetDataHandler(){
        if(flex.data["videoData"].currentVD){
            let isVR = flex.data["videoData"].isVR;
            if(isVR && flex.browserSniff().name === 'IE'){
               flex.fire(flex.Event.RESTART_FLASH);
                return false;
            }

            flex.playerMgr.startup();
            //是否是全景视频
            if(isVR){
                new flex.Class.VR720();
            }
        }
    }
});