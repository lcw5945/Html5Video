/**
 * Created by Cray on 2016/4/15.
 */
import Logger from './log';
import Utils from './utils';
import EventManager from './event-builder';

let fileMaps = {},
    support = null,
    isLoading = false,
    FILETYPE = {
        VIDEO: 'video',
        AUDIO: 'audio',
        IMAGE: 'image'
    },
    file_preifx = "File@";

class Preloader {
    constructor() {
        support = _support();
    }

    addFile(filename) {
        let fileId = '';
        if (typeof filename == 'string') {
            fileId = file_preifx + (new Date()).getTime();
            fileMaps[fileId] = _packageFile(filename);
            _updateLoadQueue();
        }

        Logger.log('[PrLoad] add file: ' + fileId);
        return fileId;
    }

    getFile(fileId) {
        Logger.log('[PrLoad] get file: ' + fileId);
        return typeof fileId == 'string' ? fileMaps[fileId] : null;
    }

    removeFile(fileId) {
        Logger.log('[PrLoad] remove file: ' + fileId);
        if (typeof fileId == 'string') {
            delete fileMaps[fileId];
        }
    }
}

function _packageFile(filename) {

    let fileType = '';
    let suffix = /\.[^\.]+$/.exec(filename)[0];
    Utils.each(support, (key, value) => {
        if (value.indexOf(suffix) != -1) {
            fileType = key;
            return false;
        }
    });

    let fileElement = _getDomElement(fileType);

    fileElement.loaded = false;

    fileElement.filePath = filename;
    fileElement.loadError = false;

    if (fileElement.tagName.toLowerCase() === 'embed') {
        return fileElement;
    }

    EventManager.on(fileElement, 'load canplaythrough', _onready);
    EventManager.on(fileElement, 'error', _onerror);

    function _onready(event) {

        EventManager.off(fileElement, 'load canplaythrough', _onready);
        EventManager.off(fileElement, 'error', _onerror);

        fileElement.loaded = true;
        isLoading = false;

        Logger.log('[PrLoad] file : ' + fileElement.src + ' loaded.');

        _updateLoadQueue();
    }

    function _onerror(event) {
        fileElement.loadError = true;
        _loadError(filename);
    }

    return fileElement;
}


/**
 * 获得Dom元素
 * @param fileType
 * @returns {*}
 * @private
 */
function _getDomElement(fileType) {
    let element = null;
    switch (fileType) {
        case FILETYPE.AUDIO:
        {
            element = typeof Audio !== 'undefined' ? new Audio() : document.createElement('audio');
            break;
        }
        case FILETYPE.VIDEO:
        {
            element = document.createElement('video');
            break;
        }
        case FILETYPE.IMAGE:
        {
            element = new Image();
            break;
        }
    }

    return element;
}

/**
 * 更新下载队列
 * @private
 */
function _updateLoadQueue() {
    Utils.each(fileMaps, (key, element) => {
        if (element.src == "" && !element.loaded && !isLoading) {
            isLoading = true;
            element.src = element.filePath;
            return false;
        }
    });
}

/**
 * 下载出错
 * @param filename
 * @private
 */
function _loadError(filename) {
    Logger.error(filename);

    _updateLoadQueue();
}

/**
 * 支持Media类型
 * @returns {{audio: string[], video: string[], image: string[]}}
 * @private
 */
function _support() {
    return {
        audio: ['.mp3', '.wav', '.oga'],
        video: ['.mp4', '.webm', '.ogg'],
        image: ['.jpg', '.png', '.jpeg', '.tiff', '.gif'],
        flash: ['.swf']
    }
}

export default Preloader;