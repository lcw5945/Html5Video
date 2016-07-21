/**
 * Created by Cray on 2016/4/25.
 */
import Utils from '../../core/utils/utils';
import Logger from '../../core/utils/log';

let player = null;
class WinInterface {
    constructor() {
    }

    startup($player) {
        player = $player;
        //启动接口函数
        _createFlashInterface();
    }

    onLocalPoint(point) {
        window.onLocalPoint(point);
    }

    showErr() {
        window.showErr();
    }

    ready() {
        window.ready();
    }

    play() {
        window.play();
    }

    playEnd() {
        window.playEnd();
    }

    showReview() {
        window.showReview();
    }
}

/**
 * 向window 绑定flash接口方法方法
 * @private
 */
function _createFlashInterface() {
    Utils.merge(window, {
        /**
         * for flash call
         * @param point
         */
        onLocalPoint: function (point) {
            if (point.isfinished) {
                new PlayRecord({}).clear(VLOG.videoId);
            } else {
                new PlayRecord({}).set(VLOG.videoId, {
                    videoid: VLOG.videoId,
                    title: VLOG.title,
                    seconds: point.playtime,
                    percent: point.per,
                    playurl: VLOG.playUrl,
                    datetime: point.date
                });
            }
        },

        showErr: function () {

        },
        /**
         * 准备就绪 播放器加载dom完成
         */
        ready: function () {
            player.ready();

            // 第一步，绑定Pspt状态变化回调
            let userPspt = new UserPspt();
            userPspt.on({
                loginSuccess: function () {
                    player.setUserId(this.data('uid'));
                },
                logoutSuccess: function () {
                    player.setUserId('');
                }
            });
            // 第二步，判断Pspt当前状态
            if (userPspt.isLogin()) {
                player.setUserId(userPspt.data('uid'));
            }
        },
        /**
         * 播放
         */
        play: function () {
            Logger.log('[FPROXY] 视频开始播放。');
        },
        /**
         * 播放结束
         */
        playEnd: function () {
            Logger.log('[FPROXY] 视频播放完毕。');
            let next;
            // 自动播放下一个
            if (!$('#btn_auto_next').hasClass('ico-no-select')) {
                next = $('#video_list > li.on').next();
                if (next.length === 1)
                    location.href = next.children('a').data('auto-url');
            }
        },

        showReview: function () {
            $("html, body").animate({scrollTop: $('#SOHUCS').offset().top}, 300);
        }
    });
}

export default WinInterface;