/**
 * Created by Cray on 2016/4/8.
 */
flex.module('ad.adController').requires('core.queue').define(() => {

    var _adData = null,
        _adPlayer = null,
        fullscreen = null,
        config = null,
        muted = false,
        Event = null;

    flex.Class.ADController = class {
        constructor(adPlayer){
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
    };
    /**
     * 更新媒体
     * @param media
     * @private
     */
    function _updateMedia(media){
        _removeMediaListener(_adPlayer.media);
        media.muted = muted;
        _adPlayer.updateMedia(media);
        _addMediaListener(media);
    }
    /**
     * 添加事件监听
     * @private
     */
    function _addListener(){

        flex.on(_adPlayer.buttons.jumpTo, 'click', (event) => {
            _openAd();
        });

        flex.on(_adPlayer.buttons.fullscreen, 'click', (event) => {
            _toggleFullscreen(event);
        });

        flex.on(_adPlayer.buttons.mute, 'click', (event) => {
            _toggleMute(event);
        });
    }

    /**
     * 添加媒体事件
     * @private
     */
    function _addMediaListener(media){

        flex.on(media, 'canplay', _videoReady);
        //添加播放时间改变事件
        flex.on(media, 'timeupdate',  _timeUpdate);
        flex.on(media, 'ended', _playEnded);
        flex.on(media, 'click', _openAd);
    }

    /**
     * 移除媒体事件
     * @param media
     * @private
     */
    function _removeMediaListener(media){

        flex.off(media, 'canplay', _videoReady);
        //添加播放时间改变事件
        flex.off(media, 'timeupdate',  _timeUpdate);
        flex.off(media, 'ended', _playEnded);
        flex.off(media, 'click', _openAd);
    }


    /**
     * 创建广告任务
     * @param args
     * @private
     */
    function _createAdTask(...args){
        args.forEach((key) => {
            let data = _adData[key];
            let adTask = new ADTask(data);
            flex.adUi.addTime(adTask.data.time);
            flex.queue.addTask(adTask);
        });
    }

    /**
     * 打开广告
     * @private
     */
    function _openAd(event){
        if(flex.queue.currentTask){
            flex.toUrl(flex.queue.currentTask.data.jumpTo);
        }
    }

    /**
     * 视频开始播放
     * @private
     */
    function _videoReady(){
        flex.adUi.showCountdown();
        if(!flex.toggleState(flex.element.cover)){
            flex.fire(Event.HIDE_COVER);
        }
    }

    /**
     * 队列任务完成回调
     * @private
     */
    function _complete(){
        flex.adUi.destory();
        flex.fire(Event.AD_COMPLETE);
    }

    /**
     * 播放结束
     * @param event
     * @private
     */
    function _playEnded(event){
        if(!flex.queue.currentTask.finish){
            _adPlayer.media.currentTime = 0;
            _adPlayer.media.play();
        }
    }

    /**
     * 更新广告播放时间
     * @param event
     * @private
     */
    function _timeUpdate(event){
        let t = Math.floor(_adPlayer.media.currentTime);
        flex.adUi.updateTimeDisplay(t);
        if(flex.queue.currentTask){
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
    function _toggleFullscreen(event){
        let nativeSupport = fullscreen.supportsFullScreen;
        if (nativeSupport) {
            if (!fullscreen.isFullScreen(_adPlayer.container)) {
                fullscreen.requestFullScreen(_adPlayer.container);
            }
            else {
                fullscreen.cancelFullScreen();
            }

            //_adPlayer.isFullscreen = fullscreen.isFullScreen(_adPlayer.container);
        }

        //flex.adUi.updateControlsDisplay();
    }


    /**
     * 广告任务类
     */
    class ADTask extends flex.Class.Task{
        constructor(data){
            super();
            this.data = data;
            this.time = 0;
            this.baseTime = 0;
            this.tmpTime = 0;
            this.finish = false;
            this.fileId = flex.preloader.addFile(this.data.url);
        }

        startUp(){
            super.startUp();
            _updateMedia(flex.preloader.getFile(this.fileId));
        }

        update(value){
            if(this.tmpTime == value)return;
            if(this.tmpTime > value){
                this.baseTime += this.tmpTime;
            }
            this.tmpTime = value;
            if((this.baseTime + value) === Number.parseInt(this.data.time)){
                this.finish = true;
                this.complete();
            }
        }
    }
});