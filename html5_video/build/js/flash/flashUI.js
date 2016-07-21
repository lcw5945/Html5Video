'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/4/19.
 */
flex.module('flash.flashUI').define(function () {

    var flashUi = null,
        _data = null;

    flex.Class.FlashUI = function () {
        function _class(url, options) {
            _classCallCheck(this, _class);

            this.url = url;
            this.options = options;
            this.errorFlash = options.errorFlash || '<div style="text-align: center; width: 100%; height: 100%;">您还未安装Adobe flashplayer，请安装后播放。<a href="http://get.adobe.com/cn/flashplayer/" onclick="postStart=true" target="_blank">下载并安装</a></div>';

            flashUi = this;
        }

        /**
         * 启动
         * @returns {*}
         */


        _createClass(_class, [{
            key: 'startup',
            value: function startup() {
                if (!flashUi.url) {
                    flex.log('[FLASH] swf url is null', flex.log.levels.ERROR);
                    return;
                }

                var fs = this.flashSniff();
                if (!fs.f) {
                    return flash.errorFlash;
                }
                //创建模板
                _createTemplete();

                return _data.html;
            }

            /**
             * 获得html
             * @returns {*}
             */

        }, {
            key: 'html',
            value: function html() {
                return _data.html;
            }

            /**
             * flash兼容性检查
             * @returns {{f: boolean, v: boolean}}
             */

        }, {
            key: 'flashSniff',
            value: function flashSniff() {
                var f = false;
                var v = false;
                if (window.navigator.plugins) {
                    for (var i = 0; i < window.navigator.plugins.length; i++) {
                        if (window.navigator.plugins[i].name.toLowerCase().indexOf("shockwave flash") >= 0) {
                            f = true;
                            v = window.navigator.plugins[i].description.substring(window.navigator.plugins[i].description.toLowerCase().lastIndexOf("flash ") + 6, window.navigator.plugins[i].description.length);
                        }
                    }
                } else if ('ActiveXObject' in window) {
                    try {
                        var act = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                        if (act) {
                            f = true;
                            v = this.decToHex(act.FlashVersion());
                        }
                    } catch (e) {}
                }
                return { f: f, v: v };
            }
        }, {
            key: 'decToHex',
            value: function decToHex(dec) {
                var hexa = "0123456789ABCDEF";
                var hex = "";
                while (dec > 15) {
                    tmp = dec - Math.floor(dec / 16) * 16;
                    hex = hexa.charAt(tmp) + hex;
                    dec = Math.floor(dec / 16);
                }
                hex = hexa.charAt(dec) + hex;
                return hex;
            }
        }]);

        return _class;
    }();

    /**
     * 创建flash html内容
     * @returns {{id: string, width: number, height: number, attrs: {}, paras: {}, flashvars: {}, style: {}, html: string}}
     * @private
     */
    function _createTemplete() {
        var tmplObj = {
            'id': 'f_' + new Date().getTime(),
            'width': '100%',
            'height': '100%',
            'attrs': {},
            'paras': {},
            'flashvars': {},
            'style': {},
            'html': ''
        };

        _data = flex.extend(tmplObj, flashUi.options);

        var key = void 0,
            html = [],
            attrs = [],
            flashvars = [],
            styles = [];

        for (key in _data.attrs) {
            attrs.push(key + '="' + _data.attrs[key] + '" ');
        }

        for (key in _data.flashvars) {
            flashvars.push(key + '=' + _data.flashvars[key]);
        }

        _data.paras['flashvars'] = flashvars.join('&');

        for (key in _data.style) {
            styles.push(key + ':' + _data.style[key]);
        }

        if (flex.browserSniff().name == 'IE' && flex.browserSniff().version < 11) {
            // 头部
            html.push('<object width=" ' + _data.width + '" height="' + _data.height + '" id="' + _data.id + '" name="' + _data.id + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ');

            html.push('style="' + styles.join(';') + '" ');
            // 属性写入
            html.push(attrs.join(''));

            // 结束属性标签并为IE写入url(兼容)
            html.push('><param name="movie" value="' + flashUi.url + '" />');

            // 参数写入(FlashVars已经在前文填入到参数里了)
            for (key in _data.paras) {
                html.push('<param name="' + key + '" value="' + _data.paras[key] + '" />');
            }
            html.push('</object>');
        } else {
            // 头部
            html.push('<embed width="' + _data.width + '" height="' + _data.height + '" name="' + _data.id + '" src="' + flashUi.url + '" id="' + _data.id + '" type="application/x-shockwave-flash" ');

            html.push('style="' + styles.join(';') + '" ');
            // 属性写入
            html.push(attrs.join(''));

            // 参数写入(FlashVars已经在前文填入到参数里了)
            for (key in _data.paras) {
                html.push(key + '="' + _data.paras[key] + '" ');
            }

            html.push('/>');
        }
        _data.html = html.join('');

        return _data;
    }
});