'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/4/8.
 */
flex.module('ad.adController').requires('core.queue').define(function () {

    var _adData = null,
        _adPlayer = null,
        fullscreen = null,
        config = null,
        muted = false,
        Event = null;

    flex.Class.ADController = function () {
        function _class(adPlayer) {
            _classCallCheck(this, _class);

            _adData = flex.data['adData'];
            _adPlayer = adPlayer;

            fullscreen = flex.fullscreen;
            config = flex.config;
            Event = flex.Event;

            _addListener();
            //第一, 二轮广告
            _createAdTask(_adData.adType.Q_F, _adData.adType.Q_S);

            flex.queue.onComplete = _complete;
            flex.queue.startUp();
        }

        return _class;
    }();
    /**
     * 更新媒体
     * @param media
     * @private
     */
    function _updateMedia(media) {
        _removeMediaListener(_adPlayer.media);
        media.muted = muted;
        _adPlayer.updateMedia(media);
        _addMediaListener(media);
    }
    /**
     * 添加事件监听
     * @private
     */
    function _addListener() {

        flex.on(_adPlayer.buttons.jumpTo, 'click', function (event) {
            _openAd();
        });

        flex.on(_adPlayer.buttons.fullscreen, 'click', function (event) {
            _toggleFullscreen(event);
        });

        flex.on(_adPlayer.buttons.mute, 'click', function (event) {
            _toggleMute(event);
        });
    }

    /**
     * 添加媒体事件
     * @private
     */
    function _addMediaListener(media) {

        flex.on(media, 'canplay', _videoReady);
        //添加播放时间改变事件
        flex.on(media, 'timeupdate', _timeUpdate);
        flex.on(media, 'ended', _playEnded);
        flex.on(media, 'click', _openAd);
    }

    /**
     * 移除媒体事件
     * @param media
     * @private
     */
    function _removeMediaListener(media) {

        flex.off(media, 'canplay', _videoReady);
        //添加播放时间改变事件
        flex.off(media, 'timeupdate', _timeUpdate);
        flex.off(media, 'ended', _playEnded);
        flex.off(media, 'click', _openAd);
    }

    /**
     * 创建广告任务
     * @param args
     * @private
     */
    function _createAdTask() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        args.forEach(function (key) {
            var data = _adData[key];
            var adTask = new ADTask(data);
            flex.adUi.addTime(adTask.data.time);
            flex.queue.addTask(adTask);
        });
    }

    /**
     * 打开广告
     * @private
     */
    function _openAd(event) {
        if (flex.queue.currentTask) {
            flex.toUrl(flex.queue.currentTask.data.jumpTo);
        }
    }

    /**
     * 视频开始播放
     * @private
     */
    function _videoReady() {
        flex.adUi.showCountdown();
        if (!flex.toggleState(flex.element.cover)) {
            flex.fire(Event.HIDE_COVER);
        }
    }

    /**
     * 队列任务完成回调
     * @private
     */
    function _complete() {
        flex.adUi.destory();
        flex.fire(Event.AD_COMPLETE);
    }

    /**
     * 播放结束
     * @param event
     * @private
     */
    function _playEnded(event) {
        if (!flex.queue.currentTask.finish) {
            _adPlayer.media.currentTime = 0;
            _adPlayer.media.play();
        }
    }

    /**
     * 更新广告播放时间
     * @param event
     * @private
     */
    function _timeUpdate(event) {
        var t = Math.floor(_adPlayer.media.currentTime);
        flex.adUi.updateTimeDisplay(t);
        if (flex.queue.currentTask) {
            flex.queue.currentTask.update(t);
        }
    }

    /**
     * 静音
     * @param muted
     * @private
     */
    function _toggleMute($muted) {
        if (typeof $muted !== 'boolean') {
            $muted = !_adPlayer.media.muted;
        }
        //改变静音按钮状态
        flex.toggleClass(_adPlayer.container, flex.config.classes.mutedAd, $muted);
        muted = $muted;
        //设置是否静音
        _adPlayer.media.muted = $muted;
    }

    /**
     * 全屏事件
     * @param event
     * @private
     */
    function _toggleFullscreen(event) {
        var nativeSupport = fullscreen.supportsFullScreen;
        if (nativeSupport) {
            if (!fullscreen.isFullScreen(_adPlayer.container)) {
                fullscreen.requestFullScreen(_adPlayer.container);
            } else {
                fullscreen.cancelFullScreen();
            }

            //_adPlayer.isFullscreen = fullscreen.isFullScreen(_adPlayer.container);
        }

        //flex.adUi.updateControlsDisplay();
    }

    /**
     * 广告任务类
     */

    var ADTask = function (_flex$Class$Task) {
        _inherits(ADTask, _flex$Class$Task);

        function ADTask(data) {
            _classCallCheck(this, ADTask);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ADTask).call(this));

            _this.data = data;
            _this.time = 0;
            _this.baseTime = 0;
            _this.tmpTime = 0;
            _this.finish = false;
            _this.fileId = flex.preloader.addFile(_this.data.url);
            return _this;
        }

        _createClass(ADTask, [{
            key: 'startUp',
            value: function startUp() {
                _get(Object.getPrototypeOf(ADTask.prototype), 'startUp', this).call(this);
                _updateMedia(flex.preloader.getFile(this.fileId));
            }
        }, {
            key: 'update',
            value: function update(value) {
                if (this.tmpTime == value) return;
                if (this.tmpTime > value) {
                    this.baseTime += this.tmpTime;
                }
                this.tmpTime = value;
                if (this.baseTime + value === Number.parseInt(this.data.time)) {
                    this.finish = true;
                    this.complete();
                }
            }
        }]);

        return ADTask;
    }(flex.Class.Task);
});