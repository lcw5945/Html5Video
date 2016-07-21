'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/4/25.
 */
flex.module('business.winInterface').define(function () {
    var player = null;

    flex.Class.WinInterface = function () {
        function _class() {
            _classCallCheck(this, _class);
        }

        _createClass(_class, [{
            key: 'startup',
            value: function startup($player) {
                player = $player;
                //启动接口函数
                _createFlashInterface();
            }
        }, {
            key: 'onLocalPoint',
            value: function onLocalPoint(point) {
                window.onLocalPoint(point);
            }
        }, {
            key: 'showErr',
            value: function showErr() {
                window.showErr();
            }
        }, {
            key: 'ready',
            value: function ready() {
                window.ready();
            }
        }, {
            key: 'play',
            value: function play() {
                window.play();
            }
        }, {
            key: 'playEnd',
            value: function playEnd() {
                window.playEnd();
            }
        }, {
            key: 'showReview',
            value: function showReview() {
                window.showReview();
            }
        }]);

        return _class;
    }();

    /**
     * 向window 绑定flash接口方法方法
     * @private
     */
    function _createFlashInterface() {
        flex.merge(window, {
            /**
             * for flash call
             * @param point
             */
            onLocalPoint: function onLocalPoint(point) {
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

            showErr: function showErr() {},
            /**
             * 准备就绪 播放器加载dom完成
             */
            ready: function ready() {
                player.ready();

                // 第一步，绑定Pspt状态变化回调
                var userPspt = new UserPspt();
                userPspt.on({
                    loginSuccess: function loginSuccess() {
                        player.setUserId(this.data('uid'));
                    },
                    logoutSuccess: function logoutSuccess() {
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
            play: function play() {
                flex.log('[FPROXY] 视频开始播放。');
            },
            /**
             * 播放结束
             */
            playEnd: function playEnd() {
                flex.log('[FPROXY] 视频播放完毕。');
                var next = void 0;
                // 自动播放下一个
                if (!$('#btn_auto_next').hasClass('ico-no-select')) {
                    next = $('#video_list > li.on').next();
                    if (next.length === 1) location.href = next.children('a').data('auto-url');
                }
            },

            showReview: function showReview() {
                $("html, body").animate({ scrollTop: $('#SOHUCS').offset().top }, 300);
            }
        });
    }
});