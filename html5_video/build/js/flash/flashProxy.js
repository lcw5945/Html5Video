'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/4/20.
 */
flex.module('flash.flashProxy').requires('flash.flashPlayer').define(function () {

    var flashPlayer = null,
        flashName = 'PreloaderFile.swf',
        VLOG = null,
        LDomain = null;

    flex.Class.FlashProxy = function () {
        function _class() {
            _classCallCheck(this, _class);

            LDomain = flex.global.LDomain;
            VLOG = flex.global.VLOG;

            var container = flex.element.box;
            var url = 'http://' + LDomain.swf + '/' + LDomain.swfVersion + '/flash/' + flashName;
            var options = {
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

        return _class;
    }();
});