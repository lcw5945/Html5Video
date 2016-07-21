'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Administrator on 2016/1/7.
 */
flex.module('manager.controlManager').requires('config').define(function () {
    var config = null,
        fullscreen = null,
        player = null,
        initInstance = false;

    flex.Class.ControlManager = function () {
        function _class() {
            _classCallCheck(this, _class);

            flex.log('[CM] init control manager');

            config = flex.config;
            fullscreen = flex.fullscreen;
        }

        _createClass(_class, [{
            key: 'startup',
            value: function startup($player) {
                if (initInstance) {
                    return;
                }

                player = $player;

                this.setVolume(config.volume);
                this.updateVolume();

                _addListeners();

                initInstance = true;
            }

            /**
             * 播放
             * **/

        }, {
            key: 'play',
            value: function play() {
                player.media.play();
            }

            /**
             * 暂停
             * **/

        }, {
            key: 'pause',
            value: function pause() {
                player.media.pause();
            }

            /**
             * 暂停或播放
             * @param toggle
             */

        }, {
            key: 'togglePlay',
            value: function togglePlay(toggle) {
                if (toggle === true) {
                    this.play();
                } else if (toggle === false) {
                    this.pause();
                } else {
                    player.media[player.media.paused ? 'play' : 'pause']();
                }
            }

            /**
             * 后退
             * **/

        }, {
            key: 'rewind',
            value: function rewind(seekTime) {
                if (typeof seekTime !== 'number') {
                    seekTime = config.seekTime;
                }
                flex.playerMgr.playByTime(flex.playerMgr.playingTime() - seekTime);
            }

            /**
             * 快进
             * **/

        }, {
            key: 'forward',
            value: function forward(seekTime) {
                if (typeof seekTime !== 'number') {
                    seekTime = config.seekTime;
                }
                flex.playerMgr.playByTime(flex.playerMgr.playingTime() + seekTime);
            }

            /**
             * 寻址
             * **/

        }, {
            key: 'seek',
            value: function seek(input) {
                var targetTime = 0,
                    duration = flex.config.duration || player.media.duration;

                if (typeof input === 'number') {
                    targetTime = input;
                } else if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && (input.type === 'input' || input.type === 'change')) {
                    targetTime = input.target.value / input.target.max * duration;
                }

                if (targetTime < 0) {
                    targetTime = 0;
                } else if (targetTime > duration) {
                    targetTime = duration;
                }

                flex.playerMgr.playByTime(targetTime);
            }

            /**
             * 设置音量
             * **/

        }, {
            key: 'setVolume',
            value: function setVolume(volume) {
                if (typeof volume === 'undefined') {
                    if (config.storage.enabled) {
                        volume = flex.storage.getItem(config.storage.key) || config.volume;
                    } else {
                        volume = config.volume;
                    }
                }

                if (volume > 10) {
                    volume = 10;
                }
                if (volume < 0) {
                    volume = 0;
                }

                player.media.volume = parseFloat(volume / 10);

                if (player.media.muted && volume > 0) {
                    this.toggleMute();
                }
            }
        }, {
            key: 'toggleMute',
            value: function toggleMute(muted) {
                if (typeof muted !== 'boolean') {
                    muted = !player.media.muted;
                }
                //改变静音按钮状态
                flex.toggleState(player.buttons.mute, muted);
                //设置是否静音
                player.media.muted = muted;
                //设置提示
                var tipEle = flex.getElement(config.selectors.buttons.mute + ' .' + config.classes.tooltip);
                muted ? tipEle.innerText = "开音" : tipEle.innerText = "静音";
            }

            /**
             * 更新音量
             * **/

        }, {
            key: 'updateVolume',
            value: function updateVolume() {
                var volume = player.media.muted ? 0 : player.media.volume * 10;

                if (player.supported.full && player.volume) {
                    player.volume.value = volume;
                }

                if (config.storage.enabled) {
                    flex.storage.setItem(config.storage.key, volume);
                }

                flex.toggleClass(player.container, config.classes.muted, volume === 0);

                if (player.supported.full && player.buttons.mute) {
                    flex.toggleState(player.buttons.mute, volume === 0);
                }
            }

            /**
             * 显示播放时间
             * **/

        }, {
            key: 'displayDuration',
            value: function displayDuration() {
                var duration = config.duration || player.media.duration;
                if (player.duration && config.displayDuration && !!duration) {
                    this.updateTimeDisplay(duration, player.duration);
                }
            }

            /**
             * 更新时间
             * @param time
             * @param element
             */

        }, {
            key: 'updateTimeDisplay',
            value: function updateTimeDisplay(time, element) {
                if (!element) {
                    return;
                }

                player.secs = parseInt(time % 60);
                player.mins = parseInt(time / 60 % 60);
                player.hours = parseInt(time / 60 / 60 % 60);

                var displayHours = parseInt(player.media.duration / 60 / 60 % 60) > 0;

                player.secs = ('0' + player.secs).slice(-2);
                player.mins = ('0' + player.mins).slice(-2);

                element.innerHTML = (displayHours ? player.hours + ':' : '') + player.mins + ':' + player.secs;
            }

            /**
             * 播放状态
             */

        }, {
            key: 'checkPlaying',
            value: function checkPlaying(event) {
                flex.toggleClass(player.container, config.classes.playing, !player.media.paused);
                flex.toggleClass(player.container, config.classes.stopped, player.media.paused);

                event = event || { type: player.media.paused ? 'pause' : 'play' };
                flex.fire(flex.Event.PLAY_STATE, event.type);
            }
        }]);

        return _class;
    }();

    /**
     * 添加控制监听
     * @private
     */
    function _addListeners() {
        var inputEvent = player.browser.name == 'IE' ? 'change' : 'input';

        /**
         * 检查焦点
         */
        function checkFocus() {
            var focused = document.activeElement;
            if (!focused || focused == document.body) {
                focused = null;
            } else if (document.querySelector) {
                focused = document.querySelector(':focus');
            }
            for (var button in player.buttons) {
                var element = player.buttons[button];

                flex.toggleClass(element, 'tab-focus', element === focused);
            }
        }

        /**
         * 监听键盘抬起事件，如果是tab键检查焦点
         */
        flex.on(window, 'keyup', function (event) {
            var code = event.keyCode ? event.keyCode : event.which;

            if (code == 9) {
                checkFocus();
            }
        });
        /** 控制键添加失去焦点样式 **/

        var _loop = function _loop(button) {
            var element = player.buttons[button];

            flex.on(element, 'blur', function (event) {
                flex.toggleClass(element, 'tab-focus', false);
            });
        };

        for (var button in player.buttons) {
            _loop(button);
        }
        /** 播放点击事件 **/
        flex.on(player.buttons.play, 'click', function (event) {
            flex.controlMgr.play();
            flex.Ticker.tick(100, function () {
                player.buttons.pause.focus();
            });
            //setTimeout(function () {
            //    player.buttons.pause.focus();
            //}, 100);
        });
        /** 点击暂停事件 **/
        flex.on(player.buttons.pause, 'click', function (event) {
            flex.controlMgr.pause();
            flex.Ticker.tick(100, function () {
                player.buttons.play.focus();
            });
        });
        /** 点击重新开始事件 **/
        flex.on(player.buttons.restart, 'click', function (input) {
            flex.controlMgr.seek(input);
        });
        /** 点击后退事件 **/
        flex.on(player.buttons.rewind, 'click', function (seekTime) {
            flex.controlMgr.rewind(seekTime);
        });
        /** 点击快进事件  **/
        flex.on(player.buttons.forward, 'click', function (seekTime) {
            flex.controlMgr.forward(seekTime);
        });
        /** 寻址事件 **/
        flex.on(player.buttons.seek, inputEvent, function (event) {
            flex.controlMgr.seek(event);
        });
        /** 设置音量事件**/
        flex.on(player.volume, inputEvent, function (event) {
            flex.controlMgr.setVolume(player.volume.value);
        });
        /** 音量改变事件 **/
        flex.on(player.media, 'volumechange', function (event) {
            flex.controlMgr.updateVolume();
        });
        /** 点击静音事件 **/
        flex.on(player.buttons.mute, 'click', function (muted) {
            flex.controlMgr.toggleMute(muted);
        });
        /** 点击全屏事件 **/
        flex.on(player.buttons.fullscreen, 'click', _toggleFullscreen);

        if (fullscreen.supportsFullScreen) {
            flex.on(flex.document, fullscreen.fullScreenEventName, _toggleFullscreen);
        }
        /** 时间更新和寻址处理事件 **/
        flex.on(player.media, 'timeupdate seeking', function (event) {
            _timeUpdate(event);
        });
        /** 数据描述加载完成  **/
        flex.on(player.media, 'loadedmetadata', function (event) {
            flex.controlMgr.displayDuration();
        });
        /** 播放完成 **/
        flex.on(player.media, 'ended', function (event) {
            if (!flex.playerMgr.playNextSplit()) {
                flex.controlMgr.checkPlaying(event);
                //通知win接口播放完成
                flex.winIfs.playEnd();
            }
        });

        /** 进度更新和播放处理 **/
        flex.on(player.media, 'progress playing', updateProgress);
        /** 播放和暂停处理事件 **/
        flex.on(player.media, 'play pause', function (event) {
            flex.controlMgr.checkPlaying(event);
        });
        /** 等待 开始播放 寻址完成 处理加载等待 **/
        flex.on(player.media, 'waiting canplay seeked', checkLoading);

        /** 播放容器添加点击事件 **/
        if (player.type === 'video' && config.click) {
            flex.on(player.videoContainer, 'click', function (event) {
                if (player.media.paused) {
                    flex.fire(player.buttons.play, 'click');
                } else if (player.media.ended) {
                    seek();
                    flex.fire(player.buttons.play, 'click');
                } else {
                    flex.fire(player.buttons.pause, 'click');
                }
            });
        }
    }

    /**
     * 时间更新
     * **/
    function _timeUpdate(event) {
        flex.controlMgr.updateTimeDisplay(flex.playerMgr.playingTime(player.media.currentTime + flex.config.offsetProgress), player.currentTime);
        updateProgress(event);
    }

    function _getPercentage(current, max) {
        if (current === 0 || max === 0 || isNaN(current) || isNaN(max)) {
            return 0;
        }
        return (current / max * 100).toFixed(2);
    }

    function checkLoading(event) {
        var loading = event.type === 'waiting';
        clearTimeout(player.loadingTimer);

        player.loadingTimer = setTimeout(function () {
            flex.toggleClass(player.container, config.classes.loading, loading);
            flex.toggleClass(flex.element.loader, config.classes.loaderLayer, loading);
        }, loading ? 250 : 0);

        if (event.type === 'canplay') {
            if (!flex.toggleState(flex.element.cover)) {
                flex.fire(flex.Event.HIDE_COVER);
            }
        }
    }

    /**
     * 进度处理函数
     * @param event
     */
    function updateProgress(event) {
        var progress = player.progress.played.bar,
            text = player.progress.played.text,
            value = 0,
            duration = config.duration || player.media.duration;

        if (event) {
            switch (event.type) {
                case 'timeupdate':
                case 'seeking':
                    value = _getPercentage(player.media.currentTime + config.offsetProgress, duration);

                    if (event.type == 'timeupdate' && player.buttons.seek) {
                        player.buttons.seek.value = value;
                    }

                    break;

                case 'change':
                case 'input':
                    value = event.target.value;
                    break;

                case 'playing':
                case 'progress':
                    progress = player.progress.buffer.bar;
                    text = player.progress.buffer.text;
                    value = function () {
                        var buffered = player.media.buffered;

                        if (buffered && buffered.length) {
                            return _getPercentage(buffered.end(0) + config.offsetProgress, duration);
                        }
                        //else if (typeof buffered === 'number') {
                        //    return (buffered * 100);
                        //}
                        return 0;
                    }();
            }
        }

        if (progress) {
            progress.value = value;
        }
        if (text) {
            text.innerHTML = value;
        }
    }

    /**
     * 全屏事件函数
     * @param event
     */
    function _toggleFullscreen(event) {
        var nativeSupport = fullscreen.supportsFullScreen;

        if (event && event.type === fullscreen.fullScreenEventName) {
            player.isFullscreen = fullscreen.isFullScreen(player.container);
        } else if (nativeSupport) {
            if (!fullscreen.isFullScreen(player.container)) {
                fullscreen.requestFullScreen(player.container);
            } else {
                fullscreen.cancelFullScreen();
            }

            player.isFullscreen = fullscreen.isFullScreen(player.container);
        } else {
            player.isFullscreen = !player.isFullscreen;

            if (player.isFullscreen) {
                flex.on(document, 'keyup', handleEscapeFullscreen);
                document.body.style.overflow = 'hidden';
            } else {
                flex.off(document, 'keyup', handleEscapeFullscreen);
                document.body.style.overflow = '';
            }
        }
    }

    function handleEscapeFullscreen(event) {
        if ((event.which || event.charCode || event.keyCode) === 27 && player.isFullscreen) {
            _toggleFullscreen();
        }
    }
});