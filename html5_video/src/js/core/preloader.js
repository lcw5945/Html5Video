/**
 * Created by Cray on 2016/4/15.
 */
flex.module('core.preloader').requires('core.ajax').define(() => {

    let fileMaps = {},
        support = null,
        isLoading = false,
        FILETYPE = {
            VIDEO: 'video',
            AUDIO: 'audio',
            IMAGE: 'image',
            FLASH: 'flash'
        },
        file_preifx = "File@";

    flex.Class.Preloader = class {
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

            flex.log('[PrLoad] add file: ' + fileId);
            return fileId;
        }

        getFile(fileId) {
            flex.log('[PrLoad] get file: ' + fileId);
            return typeof fileId == 'string' ? fileMaps[fileId] : null;
        }

        removeFile(fileId) {
            flex.log('[PrLoad] remove file: ' + fileId);
            if (typeof fileId == 'string') {
                delete fileMaps[fileId];
            }
        }
    };
    /**
     * 构造Dom元素 并添相关事件和属性
     * @param filename
     * @returns {*}
     * @private
     */
    function _packageFile(filename) {

        let fileType = '';
        let suffix = /\.[^\.]+$/.exec(filename)[0];
        flex.each(support, (key, value) => {
            if (value.indexOf(suffix) != -1) {
                fileType = key;
                return false;
            }
        });

        let fileElement = _getDomElement(fileType);

        fileElement.loaded = false;

        fileElement.filePath = filename;
        fileElement.loadError = false;

        if(fileElement.tagName.toLowerCase() === 'embed'){
            return fileElement;
        }

        flex.on(fileElement, 'load canplaythrough', _onready);
        flex.on(fileElement, 'error', _onerror);

        function _onready(event) {

            flex.off(fileElement, 'load canplaythrough', _onready);
            flex.off(fileElement, 'error', _onerror);

            fileElement.loaded = true;
            isLoading = false;

            flex.log('[PrLoad] file : ' + fileElement.src + ' loaded.');

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
            case FILETYPE.FLASH:
            {
                element = document.createElement('embed');
                element.setAttribute('wmode', 'transparent');
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
        flex.each(fileMaps, (key, element) => {
            if (element.src == "" && !element.loaded && !isLoading) {
                isLoading = true;
                element.src = element.filePath;

                if(element.tagName.toLowerCase() === 'embed'){
                    element.loaded = true;
                    isLoading = false;
                }
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
        flex.log(filename, flex.log.levels.ERROR);

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
});