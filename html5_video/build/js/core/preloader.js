'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/4/15.
 */
flex.module('core.preloader').requires('core.ajax').define(function () {

    var fileMaps = {},
        support = null,
        isLoading = false,
        FILETYPE = {
        VIDEO: 'video',
        AUDIO: 'audio',
        IMAGE: 'image',
        FLASH: 'flash'
    },
        file_preifx = "File@";

    flex.Class.Preloader = function () {
        function _class() {
            _classCallCheck(this, _class);

            support = _support();
        }

        _createClass(_class, [{
            key: 'addFile',
            value: function addFile(filename) {
                var fileId = '';
                if (typeof filename == 'string') {
                    fileId = file_preifx + new Date().getTime();
                    fileMaps[fileId] = _packageFile(filename);
                    _updateLoadQueue();
                }

                flex.log('[PrLoad] add file: ' + fileId);
                return fileId;
            }
        }, {
            key: 'getFile',
            value: function getFile(fileId) {
                flex.log('[PrLoad] get file: ' + fileId);
                return typeof fileId == 'string' ? fileMaps[fileId] : null;
            }
        }, {
            key: 'removeFile',
            value: function removeFile(fileId) {
                flex.log('[PrLoad] remove file: ' + fileId);
                if (typeof fileId == 'string') {
                    delete fileMaps[fileId];
                }
            }
        }]);

        return _class;
    }();
    /**
     * 构造Dom元素 并添相关事件和属性
     * @param filename
     * @returns {*}
     * @private
     */
    function _packageFile(filename) {

        var fileType = '';
        var suffix = /\.[^\.]+$/.exec(filename)[0];
        flex.each(support, function (key, value) {
            if (value.indexOf(suffix) != -1) {
                fileType = key;
                return false;
            }
        });

        var fileElement = _getDomElement(fileType);

        fileElement.loaded = false;

        fileElement.filePath = filename;
        fileElement.loadError = false;

        if (fileElement.tagName.toLowerCase() === 'embed') {
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
        var element = null;
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
        flex.each(fileMaps, function (key, element) {
            if (element.src == "" && !element.loaded && !isLoading) {
                isLoading = true;
                element.src = element.filePath;

                if (element.tagName.toLowerCase() === 'embed') {
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
        };
    }
});