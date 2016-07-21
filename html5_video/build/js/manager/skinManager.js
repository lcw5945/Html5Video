'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/1/12.
 */
flex.module('manager.skinManager').requires('core.ajax').define(function () {
    var body = flex.document.body;

    flex.Class.SkinManager = function () {
        function _class() {
            _classCallCheck(this, _class);
        }

        _createClass(_class, [{
            key: 'startup',
            value: function startup() {
                _addSkin();
            }
        }]);

        return _class;
    }();

    function _addSkin() {
        flex.log('[SM] start load skin');
        flex.ajax.get(flex.config.skin, function (data) {
            var c = flex.newElement("div");
            c.setAttribute("hidden", "");
            c.innerHTML = data;
            body.insertBefore(c, body.childNodes[0]);
        });
    }
});