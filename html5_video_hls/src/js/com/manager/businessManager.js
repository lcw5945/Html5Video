/**
 * Created by Cray on 2016/1/15.
 */
import Logger from '../../core/utils/log';
import Utils from '../../core/utils/utils';
import Context from '../../core/context';
import PEvent from '../../events';
import VR720 from '../../core/plugin/vr720';

var config = null;
class BussinessManager {
    constructor() {
        config = Context.config;
    }

    startup() {

        Logger.log('[BM] init business manager~ ');
        //加载皮肤
        Context.skinMgr.startup();
        //显示cover
        Context.uiMgr.showCover();

        //如果有广告
        if (config.ad && config.adSourceUrl !== "") {
            Context.adMgr.startup(config.adSourceUrl);
            Context.e.on(PEvent.AD_COMPLETE, _startDispacher);
        } else {
            _startDispacher();
        }
    }
}

/**
 * 开始数据调度
 * @param data
 * @private
 */
function _startDispacher() {

    Logger.log('[BM] start data dispacher');

    let vUrl = config.videoSourceUrl;
    let cid = config.cid;
    if (!!vUrl && !!cid) {
        vUrl = vUrl.replace("{0}", cid) + "&t=" + (new Date()).getTime();
        Context.dataDsp.getVideoData(vUrl, _onGetDataHandler);
    } else {
        Logger.log('[DD] video url or cid is empty!', true);
    }
}

/**
 * 数据解析成功开始初始化播放管理
 * @private
 */
function _onGetDataHandler() {
    if (Context.data["videoData"].currentVD) {
        let isVR = Context.data["videoData"].isVR;
        if (isVR && Utils.browserSniff().name === 'IE') {
            Context.e.fire(PEvent.RESTART_FLASH);
            return false;
        }

        Context.playerMgr.startup();
        //是否是全景视频
        if (isVR) {
            new VR720();
        }
    }
}