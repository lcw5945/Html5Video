/**
 * Created by Cray on 2016/1/14.
 */
import Logger from '../../core/utils/log';
import PEvent from '../../events';
import Dom from '../../core/utils/dom';
import Context from '../../core/context';


var config = null,
    _adPlayer = null;

class AdManager {
    constructor() {
        config = Context.config;
    }

    startup(adSourceUrl) {

        _startUpPlayer();

        adSourceUrl = adSourceUrl.replace("{0}", 1) + "&cyt=" + (new Date()).getTime();
        Context.dataDsp.getAdData(adSourceUrl, _onSuccess, _onFail);
    }

    get adPlayer() {
        return _adPlayer;
    }
}

/**
 * 解析数据
 * @param data
 * @private
 */
function _onSuccess(data) {
    Context.data['adData'] = new HaoyeParse(data);
    Context.adUi = new adUI(_adPlayer);
    Context.adCtrler = new ADController(_adPlayer);
    //初始化暂停广告
    Context.pauseAd = new PauseAD();
}

/**
 * 广告数据加载失败
 * @private
 */
function _onFail() {
    Context.e.fire(PEvent.AD_COMPLETE);
}

/**
 * 安装播放器
 * @private
 */
function _startUpPlayer() {

    let ele = Dom.getElement(config.selectors.container);
    if (typeof ele.adPlayer === 'undefined') {
        _adPlayer = new AdPlayer(ele);
        ele.adPlayer = (Object.keys(_adPlayer).length ? _adPlayer : false);
    }
}
