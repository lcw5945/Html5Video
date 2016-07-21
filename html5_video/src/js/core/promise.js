/**
 * Created by Cray on 2015/10/21.
 *
 */
flex.module('core.promise').define(() => {

    class Promise {
        constructor() {
            this._resolves = [];
            this._rejects = [];
            this._readyState = Promise.PENDING;
            this._data = null;
            this._reason = null;
        }

        toString() {
            return "Promise";
        }

        then(onFulfilled, onRejected) {
            let deferred = new Defer();

            function fulfill(data) {
                let ret = onFulfilled ? onFulfilled(data) : data;
                if (Promise.isPromise(ret)) {
                    ret.then(data => {
                        deferred.resolve(data)
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
                setTimeout(() => {
                    fulfill(this._data);
                });
            }
            return deferred.promise;
        }

        otherwise(onRejected) {
            return this.then(undefined, onRejected);
        }
    }

    flex.merge(Promise, {
        PENDING: 0,
        FULFILLED: 1,
        REJECTED: 2,
        isPromise: function (obj) {
            return obj != null && typeof obj['then'] == 'function';
        }
    });

    class Defer {
        constructor() {
            this.promise = new Promise();
        }

        resolve(data) {
            let promise = this.promise;
            if (promise._readyState != Promise.PENDING) {
                return;
            }
            promise._readyState = Promise.FULFILLED;
            promise._data = data;
            promise._resolves.map((i, handler) => {
                handler(data);
            });
        }

        reject(reason) {
            let promise = this.promise;
            if (promise._readyState != Promise.PENDING) {
                return;
            }
            promise._readyState = Promise.REJECTED;
            promise._reason = reason;
            let handler = promise._rejects[0];
            if (handler) {
                handler(reason);
            }
        }
    }

    flex.merge(flex, {
        Deferred: function () {
            return new Defer();
        },

        isPromise: function (pv) {
            return Promise.isPromise(pv);
        },

        all: function (...args) {
            let defer = flex.Deferred();
            if (args.length == 0) {
                return defer.promise;
            }
            if (Array.isArray(args[0])) {
                args = args[0];
            }
            let n = 0, result = [];
            args.forEach((p) => {
                p.then((ret) => {
                    result.push(ret);
                    n++;
                    if (n >= ps.length) {
                        defer.resolve(result);
                    }
                });
            });

            return defer.promise;
        },

        any: function (...args) {
            let defer = flex.Deferred();
            if (args.length == 0) {
                return defer.promise;
            }
            if (Array.isArray(args[0])) {
                args = args[0];
            }
            args.forEach((p) => {
                p.then((ret) => {
                    defer.resolve(ret);
                });
            });
            return defer.promise;
        }
    });
});

