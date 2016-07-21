/**
 * Created by Cray on 2016/5/13.
 */
import $ from '../../context';
import Utils from '../../utils/utils';
import Ticker from '../../utils/ticker';
import playerConfig from '../player-config';
import Logger from '../../utils/log';
import Dom from '../../utils/dom';
import PEvent from '../../player/player-event';


let _this,
    player,
    config,
    _ui,
    _e;

class Control {
    constructor() {
        _this = this;
    }

    startup($player) {
        player =  $player;
        _e =  $.e;
        _ui = $.ui;
        
        config = playerConfig;

        player.setVolume(config.volume);
        this.updateVolume();

        _addListeners();
    }

    updateVolume() {
        let volume = player.media.muted ? 0 : (player.media.volume * 10);

        if ($.storage) {
            $.storage.setItem(config.storage.key, volume);
        }

        Dom.toggleClass(player.container, config.classes.muted, (volume === 0));
        if (player.supported.full && _ui.buttons.mute) {
            Dom.toggleState(_ui.buttons.mute, (volume === 0));
        }
    }

    /**
     * 显示播放时间
     * **/
    displayDuration() {
        let duration = config.duration || player.media.duration;
        if (player.duration && config.displayDuration && !!duration) {
            this.updateTimeDisplay(duration, player.duration);
        }
    }

    /**
     * 更新时间
     * @param time
     * @param element
     */
    updateTimeDisplay(time, element) {
        if (!element) {
            return;
        }

        player.secs = parseInt(time % 60);
        player.mins = parseInt((time / 60) % 60);
        player.hours = parseInt(((time / 60) / 60) % 60);

        let displayHours = (parseInt(((player.media.duration / 60) / 60) % 60) > 0);

        player.secs = ('0' + player.secs).slice(-2);
        player.mins = ('0' + player.mins).slice(-2);

        element.innerHTML = (displayHours ? player.hours + ':' : '') + player.mins + ':' + player.secs;
    }

    /**
     * 播放状态
     */
    checkPlaying(event) {
        Dom.toggleClass(player.container, config.classes.playing, !player.media.paused);
        Dom.toggleClass(player.container, config.classes.stopped, player.media.paused);

        event = event || {type: player.media.paused ? 'pause' : 'play'};
        _e.fire(PEvent.PLAY_STATE, event.type);
    }
}

function _addListeners() {
    let inputEvent = (player.browser.name == 'IE' ? 'change' : 'input');

    function checkFocus() {
        let focused = document.activeElement;
        if (!focused || focused == document.body) {
            focused = null;
        }
        else if (document.querySelector) {
            focused = document.querySelector(':focus');
        }
        for (let button in player.buttons) {
            let element = player.buttons[button];

            Dom.toggleClass(element, 'tab-focus', (element === focused));
        }
    }

    _e.on(window, 'keyup', (event) => {
        let code = (event.keyCode ? event.keyCode : event.which);

        if (code == 9) {
            checkFocus();
        }
    });

    for (let button in $.ui.buttons) {
        let element = $.ui.buttons[button];

        _e.on(element, 'blur', (event) => {
            Dom.toggleClass(element, 'tab-focus', false);
        });
    }

    _e.on(_ui.buttons.play, 'click', (event) => {
        player.play();
        Ticker.tick(100, () => { _ui.buttons.pause.focus();
        });
    });

    _e.on(_ui.buttons.pause, 'click', (event) => {
        player.pause();
        Ticker.tick(100, () => { _ui.buttons.play.focus();
        });
    });

    _e.on(_ui.buttons.restart, 'click', (event) => {
        player.seek(event);
    });

    _e.on(_ui.buttons.rewind, 'click', (event) => {
        player.rewind(config.seekTime);
    });

    _e.on(_ui.buttons.forward, 'click', (event) => {
        player.forward(config.seekTime);
    });

    _e.on(_ui.buttons.seek, inputEvent, (event) => {
        player.seek(event);
    });

    _e.on(_ui.volume, inputEvent, (event) => {
        player.setVolume(_ui.volume.value);
    });

    _e.on(player.media, 'volumechange', (event) => {
        _this.updateVolume();
    });

    _e.on(_ui.buttons.mute, 'click', (muted) => {
        player.toggleMute(muted);
    });

    _e.on(_ui.buttons.fullscreen, 'click', _toggleFullscreen);
    if ($.fullscreen.supportsFullScreen) {
        _e.on(document, $.fullscreen.fullScreenEventName, _toggleFullscreen);
    }

    _e.on(player.media, 'timeupdate seeking', (event) => {
        _timeUpdate(event);
    });

    _e.on(player.media, 'loadedmetadata', (event) => {
        _this.displayDuration();
    });

    _e.on(player.media, 'ended', (event) => {
        _this.checkPlaying(event);
    });

    _e.on(player.media, 'progress playing', updateProgress);

    _e.on(player.media, 'play pause', (event) =>  {
        _this.checkPlaying(event);
    });
    /** 等待 开始播放 寻址完成 处理加载等待 **/
    _e.on(player.media, 'waiting canplay seeked', checkLoading);

    /** 播放容器添加点击事件 **/
    if (config.click) {
        _e.on(player.videoContainer, 'click', (event) => {
            if (player.media.paused) {
                _e.fire(_ui.buttons.play, 'click');
            }
            else if (player.media.ended) {
                _this.seek(0);
                _e.fire(_ui.buttons.play, 'click');
            }
            else {
                _e.fire(_ui.buttons.pause, 'click');
            }
        });
    }
}

/**
 * 时间更新
 * **/
function _timeUpdate(event) {
    _this.updateTimeDisplay(player.media.currentTime, _ui.currentTime);
    updateProgress(event);
}


function _getPercentage(current, max) {
    if (current === 0 || max === 0 || isNaN(current) || isNaN(max)) {
        return 0;
    }
    return ((current / max) * 100).toFixed(2);
}

function checkLoading(event) {
    var loading = (event.type === 'waiting');
    clearTimeout(player.loadingTimer);

    player.loadingTimer = setTimeout(function () {
        Dom.toggleClass(player.container, config.classes.loading, loading);
        Dom.toggleClass(_ui.loader, config.classes.loaderLayer, loading);
    }, (loading ? 250 : 0));

    if(event.type === 'canplay'){
        if(_ui.cover && !Dom.toggleState(_ui.cover)){
            _e.fire(PEvent.HIDE_COVER);
        }
    }
}

/**
 * 进度处理函数
 * @param event
 */
function updateProgress(event) {
    let progress = _ui.progress.played.bar,
        text = _ui.progress.played.text,
        value = 0,
        duration = config.duration || player.media.duration;

    if (event) {
        switch (event.type) {
            case 'timeupdate':
            case 'seeking':
                value = _getPercentage(player.media.currentTime + config.offsetProgress, duration);

                if (event.type == 'timeupdate' && _ui.buttons.seek) {
                    _ui.buttons.seek.value = value;
                }

                break;

            case 'change':
            case 'input':
                value = event.target.value;
                break;


            case 'playing':
            case 'progress':
                progress = _ui.progress.buffer.bar;
                text = _ui.progress.buffer.text;
                value = (() => {
                    let buffered = player.media.buffered;

                    if (buffered && buffered.length) {
                        return _getPercentage(buffered.end(0) + config.offsetProgress, duration);
                    }
                    return 0;
                })();
        }
    }

    if (progress) {
        progress.value = value;
    }
    if (text) {
        text.innerHTML = value;
    }
}

function _toggleFullscreen(event) {
    let nativeSupport = $.fullscreen.supportsFullScreen;
    if (nativeSupport) {
        if (!player.isFullScreen()) {
            $.fullscreen.requestFullScreen(player.container);
        }
        else {
            $.fullscreen.cancelFullScreen();
        }
    }
}


export default Control;