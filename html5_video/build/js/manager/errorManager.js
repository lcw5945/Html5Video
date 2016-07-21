'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/4/25.
 */
flex.module('manager.errorManager').requires('error.errorUI').define(function () {

    flex.Class.ErrorManager = function () {
        function _class() {
            _classCallCheck(this, _class);

            _addListener();

            flex.errUI = new flex.Class.ErrorUI();
        }

        _createClass(_class, [{
            key: 'startup',
            value: function startup() {}
        }]);

        return _class;
    }();

    function _addListener() {
        flex.on(flex.Event.DATA_DIS_ERROR, function (event) {
            flex.element.container.innerHTML = flex.errUI.getHtmlByCode(event.data.code);
            var element = flex.element.container.firstChild;
            var w = void 0,
                h = void 0,
                left = void 0,
                top = void 0;
            w = flex.element.container.offsetWidth;
            h = flex.element.container.offsetHeight;
            left = Number.parseInt((w - element.offsetWidth) / 2);
            top = Number.parseInt((h - element.offsetHeight) / 2) - 10;

            flex.css(element, { position: 'absolute', top: top + 'px', left: left + 'px' });
        });
    }
});