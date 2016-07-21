/**
 * Created by Cray on 2016/1/12.
 */
import Logger from '../../core/utils/log';
import PEvent from '../../events';
import Dom from '../../core/utils/dom';
import Context from '../../core/context';
import ajax from '../../core/net/ajax';

let _callbackObj = {};

class DataDispatcher {
    constructor() {
    }

    getVideoData(url, callback) {
        Logger.log('[DD] start video data dataDispatcher');
        _callbackObj['video'] = callback;
        ajax.settings.cors = true;
        ajax.get(url, _onVideoData, () => {
            Context.e.fire(PEvent.DATA_DIS_ERROR, {code: '10000', msg: ''});
        }); //.then(ajax.get(url, function(data){Logger.log(data);}))
        //jQuery.ajax(url, {success: _onVideoData});

    }

    getAdData(url, success, fail) {
        Logger.log('[DD] start ad data dataDispatcher');
        _callbackObj['ad'] = success;
        ajax.settings.cors = true;
        ajax.get(url, _onAdData, fail);
    }
}

/**
 * 视频数据回调成功
 * **/
function _onVideoData(data) {
    Logger.log("[DD] video source request success~");
    //视频状态：-1-删除，0-初始状态（未转码），1-正常，2-正在转码，3-关键字过滤，4-图片过滤，5-隐藏，6-非法，7-转码失败
    if (data.success == 0 && data.hasOwnProperty("data") && data.data["code"] != "" && data.data["msg"] != "") {
        Logger.error("[DD] video data error, code: " + data.data["code"] + " msg: " + data.data["msg"]);
        Context.e.fire(PEvent.DATA_DIS_ERROR, {code: data.data["code"], msg: data.data["msg"]});
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
        Logger.error("[DD] video data empty");
    }

    Context.data["videoData"] = new VideoData(data);
    if (_callbackObj['video']) {
        _callbackObj['video'].apply(null);
    }
}

/**
 * 获得广告数据
 * @param data
 * @private
 */
function _onAdData(data) {
    Logger.log("[DD] get ad data success~");
    if (data.root && Array.isArray(data.root)) {
        if (_callbackObj['ad']) {
            _callbackObj['ad'].apply(null, [data.root]);
        }
    } else {
        Logger.error("[DD] ad data  in wrong format ");
        //结束广告
        Context.e.fire(PEvent.AD_COMPLETE);
    }
}

/**
 * 视频数据结构
 * **/
var VideoData = class {
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

        this._data["splitInfo"].forEach(split => {
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
};

export default DataDispatcher;