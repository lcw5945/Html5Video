/**
 * Created by Cray on 2016/1/12.
 */
flex.module('manager.dataDispatcher').requires('core.ajax').define(() => {

    var _callbackObj = {};

    flex.Class.DataDispatcher = class {
        constructor() {
        }

        getVideoData(url, callback) {
            flex.log('[DD] start video data dataDispatcher');
            _callbackObj['video'] = callback;
            flex.ajax.settings.cors = true;
            flex.ajax.get(url, _onVideoData, () => {
                flex.fire(flex.Event.DATA_DIS_ERROR, {code: '10000', msg: ''});
            }); //.then(flex.ajax.get(url, function(data){flex.log(data);}))
            //jQuery.ajax(url, {success: _onVideoData});

        }

        getAdData(url, success, fail){
            flex.log('[DD] start ad data dataDispatcher');
            _callbackObj['ad'] = success;
            flex.ajax.settings.cors = true;
            flex.ajax.get(url, _onAdData, fail);
        }
    };

    /**
     * 视频数据回调成功
     * **/
    function _onVideoData(data) {
        flex.log("[DD] video source request success~");
        //视频状态：-1-删除，0-初始状态（未转码），1-正常，2-正在转码，3-关键字过滤，4-图片过滤，5-隐藏，6-非法，7-转码失败
        if (data.success == 0 && data.hasOwnProperty("data") && data.data["code"] != "" && data.data["msg"] != "") {
            flex.log("[DD] video data error, code: " + data.data["code"] + " msg: " + data.data["msg"], flex.log.levels.ERROR);
            flex.fire(flex.Event.DATA_DIS_ERROR, {code: data.data["code"], msg: data.data["msg"]});
            return false;
        } else {
            _parseJSONToData(data.data);
        }
    }

    /**
     * 解析视频数据
     * **/
    function _parseJSONToData(data) {
        if (!data) {
            flex.log("[DD] video data empty", flex.log.levels.ERROR);
        }

        flex.data["videoData"] = new flex.Class.VideoData(data);
        if (_callbackObj['video']) {
            _callbackObj['video'].apply(null);
        }
    }

    /**
     * 获得广告数据
     * @param data
     * @private
     */
    function _onAdData(data){
        flex.log("[DD] get ad data success~");
        if(data.root && Array.isArray(data.root)){
            if (_callbackObj['ad']) {
                _callbackObj['ad'].apply(null, [data.root]);
            }
        }else{
            flex.log("[DD] ad data  in wrong format ", flex.log.levels.ERROR);
            //结束广告
            flex.fire(flex.Event.AD_COMPLETE);
        }
    }

    /**
     * 视频数据结构
     * **/
    flex.Class.VideoData = class {
        constructor(data) {
            this._data = data;
            this.currentVD = null;
            this.splits = [];
            this.length = 0;

            this.init();
        }

        init() {
            this.title = this._data["title"];
            this.picUrl = this._data["picUrl"];
            this.isVR = this._data["isVR"];

            this._data["splitInfo"].forEach( split => {
                this.splits.push(_analysisData(split));
            });

            this.length = this.splits.length;
            this.currentVD = this.splits.length > 0 ? this.splits[0] : null;

            function _analysisData(data) {
                var vd = {};
                vd.quality = data["quality"];
                vd.size = 0;
                vd.duration = 0;
                vd.info = data["info"];
                for (let i = 0; i < vd.info.length; i++) {
                    vd.size += parseInt(vd.info[i]["size"]);
                    vd.duration += parseInt(vd.info[i]["duration"]);
                }
                return vd;
            }
        }

        getVDByIndex(index) {
            return this.splits[index];
        }

        getVDByQuality(value) {
            this.splits.forEach((vd) => {
                if (vd.quality == value) {
                    this.currentVD = vd;
                    return false;
                }
            });
            return this.currentVD;
        }
    }
});