'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/4/8.
 */
flex.module('core.queue').define(function () {

    var _taskArray = [],
        _currentTask = null,
        _onComplete = null;

    /***** Queue Controller Class************/
    flex.Class.QueueController = function () {
        function _class() {
            _classCallCheck(this, _class);

            flex.on("queue-complete", _checkQueue);
        }

        _createClass(_class, [{
            key: 'startUp',
            value: function startUp() {
                _checkQueue();
            }
        }, {
            key: 'addTask',
            value: function addTask(task) {
                _taskArray.push(task);
            }
        }, {
            key: 'currentTask',
            get: function get() {
                return _currentTask;
            }
        }, {
            key: 'onComplete',
            set: function set(callback) {
                _onComplete = callback;
            }
        }]);

        return _class;
    }();
    /**
     * 检查队列
     * @private
     */
    function _checkQueue() {

        if (_taskArray.length > 0) {
            _currentTask = _taskArray.shift();
            _currentTask.startUp();
        } else {
            _currentTask = null;
            if (_onComplete && typeof _onComplete == 'function') {
                _onComplete.call(null);
                _onComplete = null;
            }
        }
    }
    /***** Task Class************/
    flex.Class.Task = function () {
        function _class2() {
            _classCallCheck(this, _class2);
        }

        _createClass(_class2, [{
            key: 'startUp',
            value: function startUp() {}
        }, {
            key: 'complete',
            value: function complete() {
                flex.fire("queue-complete");
            }
        }]);

        return _class2;
    }();
});