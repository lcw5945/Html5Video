"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/4/11.
 */
flex.module('core.ticker').define(function () {

    var _lastTime = 0;
    var _tickerList = [];

    flex.Class.TickerLanuch = function () {
        function _class() {
            _classCallCheck(this, _class);

            _enterFrame();
        }
        /**
         * @param t -> for Timer t = interval | for frame t = frequency
         * @param callback
         * @param repeatCount
         * @param frame
         */


        _createClass(_class, [{
            key: "tick",
            value: function tick(t) {
                var callback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                var repeatCount = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
                var frame = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

                if (!frame) {
                    var tticker = void 0;
                    if (!this.have(callback)) {
                        tticker = new TimeTicker(t, repeatCount, callback);
                        tticker.start();
                    }
                } else {
                    var fticker = void 0;
                    if (!this.have(callback)) {
                        fticker = new FrameTicker(t, repeatCount, callback);
                        fticker.start();
                    }
                }
            }
        }, {
            key: "have",
            value: function have(callback) {
                var tc = TickerManager.getInstance.getTicker(callback);
                return tc || false;
            }
        }, {
            key: "stop",
            value: function stop(callback) {
                var tc = TickerManager.getInstance.getTicker(callback);
                if (tc) {
                    flex.log("删除 " + "Timer: " + callback + " 监听器成功.");
                    TickerManager.getInstance.removeTicker(tc);
                }
            }
        }]);

        return _class;
    }();
    /**
     * 每秒60帧渲染 , 如果浏览器最小化则停止渲染
     * @private
     */
    function _enterFrame() {
        _onUpdate();
        requestAnimationFrame(_enterFrame);
    }

    function _onUpdate() {
        var time = new Date().getTime();
        var dtime = time - _lastTime;
        _lastTime = time;
        TickerManager.getInstance.doTick(dtime);
    }

    /***  TickerManager  ***/

    var TickerManager = function () {
        function TickerManager() {
            _classCallCheck(this, TickerManager);
        }

        _createClass(TickerManager, [{
            key: "doTick",
            value: function doTick(dtime) {
                _tickerList.forEach(function (ticker) {
                    ticker.doTick(dtime);
                });
            }
        }, {
            key: "addTicker",
            value: function addTicker(ticker) {
                if (!this.contains(ticker)) _tickerList.push(ticker);
            }
        }, {
            key: "contains",
            value: function contains(ticker) {
                return _tickerList.some(function (t) {
                    return t == ticker;
                });
            }
        }, {
            key: "getTicker",
            value: function getTicker(callback) {
                var ticker = void 0;
                var res = false;
                flex.each(_tickerList, function (i, t) {
                    if (t.callback == callback) {
                        res = true;
                        ticker = t;
                        return false;
                    }
                });

                return res ? ticker : null;
            }
        }, {
            key: "removeTicker",
            value: function removeTicker(ticker) {
                for (var i = 0; i < _tickerList.length; i++) {
                    if (_tickerList[i] == ticker) {
                        _tickerList.splice(i, 1);
                        break;
                    }
                }
            }
        }, {
            key: "length",
            get: function get() {
                return _tickerList.length;
            }
        }], [{
            key: "getInstance",
            get: function get() {
                if (!(this instanceof TickerManager)) {
                    TickerManager.instance = new TickerManager();
                }

                return TickerManager.instance;
            }
        }]);

        return TickerManager;
    }();

    /***  TickerBase  ***/


    var TickerBase = function () {
        function TickerBase(callback) {
            _classCallCheck(this, TickerBase);

            this.callback = callback;
        }

        _createClass(TickerBase, [{
            key: "start",
            value: function start() {
                TickerManager.getInstance.addTicker(this);
            }
            /**
             * 停止计时器
             * 将计时器从列表中删除
             */

        }, {
            key: "stop",
            value: function stop() {
                TickerManager.getInstance.removeTicker(this);
            }
            /**
             * 重置
             */

        }, {
            key: "reset",
            value: function reset() {}
            /**
             * 检查
             * @param dtime
             */

        }, {
            key: "doTick",
            value: function doTick(dtime) {}
            /**
             * 计时器完成处理
             */

        }, {
            key: "dispose",
            value: function dispose() {
                this.stop();
                this.reset();
                this.callback = null;
            }
        }]);

        return TickerBase;
    }();

    /***  FrameTicker  ***/


    var FrameTicker = function (_TickerBase) {
        _inherits(FrameTicker, _TickerBase);

        function FrameTicker(frequency, repeatCount, callback) {
            _classCallCheck(this, FrameTicker);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FrameTicker).call(this, callback));

            _this.totalCount = 0;
            _this.tickCount = 0;
            _this.frequency = Math.max(1, frequency);
            _this.repeatCount = Math.max(0, repeatCount);

            _this.reset();
            return _this;
        }

        _createClass(FrameTicker, [{
            key: "reset",
            value: function reset() {
                this.tickCount = 0;
            }
        }, {
            key: "doTick",
            value: function doTick(dtime) {
                ++this.tickCount;

                if (this.tickCount == this.frequency) {
                    this.tickCount = 0;
                    ++this.totalCount;
                    if (this.callback != null) {
                        this.callback();
                    }
                    if (this.repeatCount > 0 && this.totalCount >= this.repeatCount) {
                        this.dispose();
                    }
                }
            }
        }]);

        return FrameTicker;
    }(TickerBase);

    /*** TimerTicker  ***/


    var TimeTicker = function (_TickerBase2) {
        _inherits(TimeTicker, _TickerBase2);

        function TimeTicker(interval, repeatCount, callback) {
            _classCallCheck(this, TimeTicker);

            var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(TimeTicker).call(this, callback));

            _this2.tickTime = 0;
            _this2.tickCount = 0;
            _this2.interval = Math.abs(interval);
            _this2.repeatCount = Math.max(0, repeatCount);

            _this2.reset();
            return _this2;
        }

        _createClass(TimeTicker, [{
            key: "reset",
            value: function reset() {
                this.tickCount = 0;
                this.tickTime = 0;
            }
        }, {
            key: "doTick",
            value: function doTick(dtime) {
                this.tickTime += dtime;
                while (this.tickTime >= this.interval) {
                    this.tickTime -= this.interval;
                    ++this.tickCount;
                    if (this.callback != null) {
                        this.callback();
                    }
                    if (this.repeatCount > 0 && this.tickCount >= this.repeatCount) {
                        this.dispose();
                        return;
                    }
                }
            }
        }]);

        return TimeTicker;
    }(TickerBase);
});