'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/4/25.
 */
flex.module('error.errorUI').define(function () {

    flex.Class.ErrorUI = function () {
        function _class() {
            _classCallCheck(this, _class);
        }

        _createClass(_class, [{
            key: 'getHtmlByCode',
            value: function getHtmlByCode(code) {
                var html = void 0;
                if (code == '10000') {
                    html = ['<div class="player-error-data">', '    <img src="assets/errorImage.png">', '    <p>抱歉，目前无法观看视频，您可以尝试 <a href=\'javascript:void(window.location.reload())\'>刷新</a> 操作。</p>', '    <p>如果问题仍未解决，请 <a href=\'http://help.17173.com/help/wenti.shtml\' target="_blank">反馈</a> 给我们</p>', '    <p>code {code}</p>', '</div>'].join("");
                } else {
                    html = ['<div class="player-error-data">', '    <img src="assets/errorImage.png">', '    <p>抱歉，该视频已被删除。</p>', '    <p>如果有异议，请 <a href=\'http://help.17173.com/help/wenti.shtml\' target="_blank">反馈</a> 给我们</p>', '    <p>code {code}</p>', '</div>'].join("");
                }

                html = html.replace('{code}', code);
                return html;
            }
        }]);

        return _class;
    }();
});