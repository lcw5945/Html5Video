/**
 * Created by Cray on 2016/4/20.
 */
import Context from '../../core/context';
import Logger from '../../core/utils/log';
import FlashPlayer from './flashPlayer';

let flashPlayer = null,
    flashName = 'PreloaderFile.swf',
    VLOG = null,
    LDomain = null;

class FlashProxy {
    constructor() {

        LDomain = window.LDomain;
        VLOG = window.VLOG;

        let container = Context.element.box;
        let url = 'http://' + LDomain.swf + '/' + LDomain.swfVersion + '/flash/' + flashName;
        let options = {
            id: 'MainPlayer',
            flashvars: {
                cid: VLOG.videoBase64Id,
                lrt: $('[utag="live-recommend"]').length > 0 ? $('[utag="live-recommend"]').html() : "高玩教你玩游戏",
                liveurl: encodeURIComponent($('[utag="live-url"]').length > 0 ? $('[utag="live-url"]').html() : "")
            }
        };

        flashPlayer = new FlashPlayer(container, url, options);
        flashPlayer.startup();
        //启动win接口
        Context.winIfs.startup(flashPlayer);
        //set flash player
        Context.flashPlayer = flashPlayer;
    }
}

export default FlashProxy;