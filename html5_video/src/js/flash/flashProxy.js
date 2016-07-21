/**
 * Created by Cray on 2016/4/20.
 */
flex.module('flash.flashProxy').requires('flash.flashPlayer').define(() => {

    let flashPlayer = null,
        flashName = 'PreloaderFile.swf',
        VLOG = null,
        LDomain = null;

    flex.Class.FlashProxy = class {
        constructor(){

            LDomain = flex.global.LDomain;
            VLOG = flex.global.VLOG;

            let container = flex.element.box;
            let url = 'http://' + LDomain.swf + '/' + LDomain.swfVersion + '/flash/' + flashName;
            let options = {
                id: 'MainPlayer',
                flashvars: {
                    cid: VLOG.videoBase64Id,
                    lrt: $('[utag="live-recommend"]').length > 0 ? $('[utag="live-recommend"]').html() : "高玩教你玩游戏",
                    liveurl: encodeURIComponent($('[utag="live-url"]').length > 0 ? $('[utag="live-url"]').html() : "")
                }
            };

            flashPlayer = new flex.Class.FlashPlayer(container, url, options);
            flashPlayer.startup();
            //启动win接口
            flex.winIfs.startup(flashPlayer);
        }
    };
});