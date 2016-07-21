'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2015/10/21.
 *
 */
flex.module('core.promise').define(function () {
    var Promise = function () {
        function Promise() {
            _classCallCheck(this, Promise);

            this._resolves = [];
            this._rejects = [];
            this._readyState = Promise.PENDING;
            this._data = null;
            this._reason = null;
        }

        _createClass(Promise, [{
            key: 'toString',
            value: function toString() {
                return "Promise";
            }
        }, {
            key: 'then',
            value: function then(onFulfilled, onRejected) {
                var _this = this;

                var deferred = new Defer();

                function fulfill(data) {
                    var ret = onFulfilled ? onFulfilled(data) : data;
                    if (Promise.isPromise(ret)) {
                        ret.then(function (data) {
                            deferred.resolve(data);
                        });
                    } else {
                        deferred.resolve(ret);
                    }
                    return ret;
                }

                if (this._readyState === Promise.PENDING) {
                    this._resolves.push(fulfill);
                    if (onRejected) {
                        this._rejects.push(onRejected);
                    } else {
                        //默认拒绝函数
                        this._rejects.push(function (reason) {
                            deferred.reject(reason);
                        });
                    }
                } else if (this._readyState === Promise.FULFILLED) {
                    setTimeout(function () {
                        fulfill(_this._data);
                    });
                }
                return deferred.promise;
            }
        }, {
            key: 'otherwise',
            value: function otherwise(onRejected) {
                return this.then(undefined, onRejected);
            }
        }]);

        return Promise;
    }();

    flex.merge(Promise, {
        PENDING: 0,
        FULFILLED: 1,
        REJECTED: 2,
        isPromise: function isPromise(obj) {
            return obj != null && typeof obj['then'] == 'function';
        }
    });

    var Defer = function () {
        function Defer() {
            _classCallCheck(this, Defer);

            this.promise = new Promise();
        }

        _createClass(Defer, [{
            key: 'resolve',
            value: function resolve(data) {
                var promise = this.promise;
                if (promise._readyState != Promise.PENDING) {
                    return;
                }
                promise._readyState = Promise.FULFILLED;
                promise._data = data;
                promise._resolves.map(function (i, handler) {
                    handler(data);
                });
            }
        }, {
            key: 'reject',
            value: function reject(reason) {
                var promise = this.promise;
                if (promise._readyState != Promise.PENDING) {
                    return;
                }
                promise._readyState = Promise.REJECTED;
                promise._reason = reason;
                var handler = promise._rejects[0];
                if (handler) {
                    handler(reason);
                }
            }
        }]);

        return Defer;
    }();

    flex.merge(flex, {
        Deferred: function Deferred() {
            return new Defer();
        },

        isPromise: function isPromise(pv) {
            return Promise.isPromise(pv);
        },

        all: function all() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var defer = flex.Deferred();
            if (args.length == 0) {
                return defer.promise;
            }
            if (Array.isArray(args[0])) {
                args = args[0];
            }
            var n = 0,
                result = [];
            args.forEach(function (p) {
                p.then(function (ret) {
                    result.push(ret);
                    n++;
                    if (n >= ps.length) {
                        defer.resolve(result);
                    }
                });
            });

            return defer.promise;
        },

        any: function any() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var defer = flex.Deferred();
            if (args.length == 0) {
                return defer.promise;
            }
            if (Array.isArray(args[0])) {
                args = args[0];
            }
            args.forEach(function (p) {
                p.then(function (ret) {
                    defer.resolve(ret);
                });
            });
            return defer.promise;
        }
    });
});