"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2015/12/21.
 */
(function (gloabl) {
    "use strict";

    gloabl.flex = new (function () {
        function _class() {
            _classCallCheck(this, _class);

            this.modules = {};
            this.ready = false;
            this.document = gloabl.document;
            this.window = this.global = gloabl;
            this.data = {};
            this.ua = null;
            this.cache = false;
            this.debug = true;
            this.prefix = 'js/';
            this._current = null;
            this._loadQueue = [];
            this._waitForOnload = 0;
            this.Class = {};
            this.element = {};
            this.storage = gloabl.localStorage;
        }

        _createClass(_class, [{
            key: "module",
            value: function module(name) {
                if (flex._current) {
                    throw "Module '" + flex._current.name + "' defines nothing";
                }
                if (flex.modules[name] && flex.modules[name].body) {
                    throw "Module '" + name + "' is already defined";
                }
                flex._current = { name: name, requires: [], loaded: false, body: null };
                flex.modules[name] = flex._current;
                flex._loadQueue.push(flex._current);
                return flex;
            }
        }, {
            key: "requires",
            value: function requires() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                if (args.length > 0 && Array.isArray(args[0])) {
                    args = args[0];
                }
                if (args.indexOf(',')) {
                    flex._current.requires = args[0].split(',');
                } else {
                    flex._current.requires = args;
                }
                return flex;
            }
        }, {
            key: "define",
            value: function define(body) {
                flex._current.body = body;
                flex._current = null;
                _initDOMReady();
            }
        }, {
            key: "copy",
            value: function copy(object) {
                if (!object || (typeof object === "undefined" ? "undefined" : _typeof(object)) != 'object' || object instanceof HTMLElement) {
                    return object;
                } else if (Array.isArray(object)) {
                    var array = [];
                    for (var i = 0, l = object.length; i < l; i++) {
                        array[i] = flex.copy(object[i]);
                    }
                    return array;
                } else {
                    var obj = {};
                    for (var j in object) {
                        obj[j] = flex.copy(object[j]);
                    }
                    return obj;
                }
            }
        }, {
            key: "merge",
            value: function merge(original, extended) {
                for (var key in extended) {
                    var ext = extended[key];
                    if ((typeof ext === "undefined" ? "undefined" : _typeof(ext)) != 'object' || ext instanceof HTMLElement || ext === null) {
                        original[key] = ext;
                    } else {
                        if (!original[key] || _typeof(original[key]) != 'object') {
                            original[key] = Array.isArray(ext) ? [] : {};
                        }
                        flex.merge(original[key], ext);
                    }
                }
                return original;
            }
        }, {
            key: "setNocache",
            value: function setNocache(value) {
                flex.cache = value ? '?' + Date.now() : '';
            }
        }, {
            key: "log",
            value: function log(text) {
                var level = arguments.length <= 1 || arguments[1] === undefined ? flex.log.levels.INFO : arguments[1];

                if (flex.debug && gloabl.console) {
                    var type = '';
                    switch (level) {
                        case flex.log.levels.DEBUG:
                            {
                                type = 'debug';
                                break;
                            }
                        case flex.log.levels.INFO:
                            {
                                type = 'log';
                                break;
                            }
                        case flex.log.levels.WARN:
                            {
                                type = 'warn';
                                break;
                            }
                        case flex.log.levels.ERROR:
                            {
                                type = 'error';
                                break;
                            }
                    }
                    gloabl.console[type]('[' + _getTime() + ']', text);
                }

                function _getTime() {
                    var d = new Date();
                    return String(d.getHours()) + ":" + String(d.getMinutes()) + ":" + String(d.getSeconds());
                }
            }
        }]);

        return _class;
    }())();

    //log level
    flex.log.levels = {
        DEBUG: 'debug',
        INFO: 'info',
        WARN: 'warn',
        ERROR: 'error'
    };

    /**
     ************** private function ********************
     */
    function _loadScript(name, requiredFrom) {
        flex.modules[name] = { name: name, requires: [], loaded: false, body: null };
        var t = flex.cache ? '?' + Date.now() : '';
        var utilName = name.includes('.') ? name.replace(/\./g, '/') : name;
        var path = flex.prefix + utilName + '.js' + t;
        flex.log("start load " + path);
        var script = flex.newElement('script');
        script.type = 'text/javascript';
        script.src = path;
        script.onload = function () {
            flex._waitForOnload--;
            _execModules();
        };
        script.onerror = function () {
            throw '模块加载失败: ' + name + ' · 路径 ' + path + ' ' + '模块 ' + requiredFrom;
        };
        flex.getElement('head').appendChild(script);
    }

    function _execModules() {
        var modulesLoaded = false;
        flex.each(flex._loadQueue, function (i, m) {
            if (m == undefined) return false;
            var dependenciesLoaded = true;
            flex.each(m.requires, function (j, name) {
                name = flex.trim(name);
                if (!flex.modules[name]) {
                    dependenciesLoaded = false;
                    _loadScript(name, m.name);
                } else if (!flex.modules[name].loaded) {
                    dependenciesLoaded = false;
                }
            });
            if (dependenciesLoaded && m.body) {
                flex._loadQueue.splice(i, 1);
                m.loaded = true;
                m.body();
                modulesLoaded = true;
            }
        });

        if (modulesLoaded) {
            _execModules();
        } else if (flex._waitForOnload == 0 && flex._loadQueue.length != 0) {
            var unresolved = [];
            for (var i = 0; i < flex._loadQueue.length; i++) {
                var unloaded = [];
                var requires = flex._loadQueue[i].requires;
                for (var j = 0; j < requires.length; j++) {
                    var m = flex.modules[requires[j]];
                    if (!m || !m.loaded) {
                        unloaded.push(requires[j]);
                    }
                }
                unresolved.push(flex._loadQueue[i].name + ' (requires: ' + unloaded.join(', ') + ')');
            }
            throw "依赖错误. " + "可能是名字或路径匹配错误，或者是加载前缀错误.\n" + unresolved.join('\n');
        }
    }

    function _domReady() {
        if (!flex.modules['dom.ready'].loaded) {
            if (!flex.document.body) {
                return setTimeout(_domReady, 13);
            }
            flex.modules['dom.ready'].loaded = true;
            _execModules();
        }
        return 0;
    }

    function _initUa() {
        flex.ua = {};
        if (flex.document.location.href.match(/\?nocache/)) {
            flex.setNocache(true);
        }
        flex.ua.pixelRatio = gloabl.devicePixelRatio || 1;
        flex.ua.viewport = { width: gloabl.innerWidth, height: gloabl.innerHeight };
        flex.ua.screen = {
            width: gloabl.screen.availWidth * flex.ua.pixelRatio,
            height: gloabl.screen.availHeight * flex.ua.pixelRatio
        };
        flex.ua.iPhone = /iPhone/i.test(navigator.userAgent);
        flex.ua.iPhone4 = flex.ua.iPhone && flex.ua.pixelRatio == 2;
        flex.ua.iPad = /iPad/i.test(navigator.userAgent);
        flex.ua.android = /android/i.test(navigator.userAgent);
        flex.ua.winPhone = /Windows Phone/i.test(navigator.userAgent);
        flex.ua.iOS = flex.ua.iPhone || flex.ua.iPad;
        flex.ua.mobile = flex.ua.iOS || flex.ua.android || flex.ua.winPhone || /mobile/i.test(navigator.userAgent);
        flex.ua.touchDevice = 'ontouchstart' in gloabl || gloabl.navigator.msMaxTouchPoints;
    }

    function _initDOMReady() {
        //if (flex.modules['dom.ready'].loaded) {
        //    _execModules();
        //    return;
        //}
        flex._waitForOnload++;
        if (!flex.ua) {
            _initUa();
            flex.modules['dom.ready'] = { requires: [], loaded: false, body: null };
            if (flex.document.readyState === 'complete') {
                _domReady();
            } else {
                flex.document.addEventListener('DOMContentLoaded', _domReady, false);
                gloabl.addEventListener('load', _domReady, false);
            }
        }
    }

    //dom操作
    flex.merge(flex, {
        getElements: function getElements(selector) {
            return document.querySelectorAll(selector);
        },
        getElement: function getElement(selector) {
            try {
                return flex.getElements(selector)[0];
            } catch (e) {
                flex.log("Not found " + selector + " element", true);
            }
            return null;
        },
        getElementById: function getElementById(id) {
            try {
                return flex.document.getElementById(id);
            } catch (e) {
                flex.log("Not found id" + id + " element", true);
            }
            return null;
        },
        newElement: function newElement(selector) {
            return document.createElement(selector);
        },
        newTextNode: function newTextNode(text) {
            return document.createTextNode(text);
        },

        /**
         * 打包元素
         */
        wrap: function wrap(elements, wrapper) {
            if (!elements.length) {
                elements = [elements];
            }
            for (var i = elements.length - 1; i >= 0; i--) {
                var child = i > 0 ? wrapper.cloneNode(true) : wrapper;
                var element = elements[i];
                var parent = element.parentNode;
                var sibling = element.nextSibling;
                child.appendChild(element);
                if (sibling) {
                    parent.insertBefore(child, sibling);
                } else {
                    parent.appendChild(child);
                }
            }
        },
        unwrap: function unwrap(wrapper) {
            var parent = wrapper.parentNode;
            while (wrapper.firstChild) {
                parent.insertBefore(wrapper.firstChild, wrapper);
            }
            parent.removeChild(wrapper);
        },

        /**
         * 移除元素
         */
        remove: function remove(element) {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        },

        /**
         * 删除容器内所有child
         */
        removeAllChild: function removeAllChild(parent) {
            while (parent.hasChildNodes()) {
                parent.removeChild(parent.firstChild);
            }
        },

        /**
         * 将元素插入目标元素之后
         * @param newElement
         * @param target
         */
        insertAfter: function insertAfter(element, target) {
            var parent = target.parentNode;
            if (parent.lastChild == target) {
                parent.appendChild(element);
            } else {
                parent.insertBefore(element, target.nextSibling);
            }
        },
        /**
         * 将元素插入父元素的第一位
         * @param element
         * @param parent
         */
        prependChild: function prependChild(element, parent) {
            parent.insertBefore(element, parent.firstChild);
        },

        /**
         * 对元素设置多个属性
         */
        setAttributes: function setAttributes(element, attributes) {
            for (var key in attributes) {
                element.setAttribute(key, attributes[key]);
            }
        },
        inFrame: function inFrame() {
            try {
                return flex.window.self !== flex.window.top;
            } catch (e) {
                return true;
            }
        },
        toggleClass: function toggleClass(element, name, state) {
            if (element) {
                if (element.classList) {
                    element.classList[state ? 'add' : 'remove'](name);
                } else {
                    var className = (' ' + element.className + ' ').replace(/\s+/g, ' ').replace(' ' + name + ' ', '');
                    element.className = className + (state ? ' ' + name : '');
                }
            }
        },

        /**
         * 获取设置当前样式
         * @param element
         * @param props
         */
        css: function css(element, props) {
            var currentStyle = element.currentStyle || element.ownerDocument.defaultView.getComputedStyle(element, null);
            if (props && 'object' == (typeof props === "undefined" ? "undefined" : _typeof(props))) {
                var empty = true;
                flex.each(props, function (prop, value) {
                    empty = false;
                    element.style[prop] = value;
                });
                if (empty) {
                    element.style.cssText = "";
                }
                return empty;
            } else if ('string' == typeof props) {
                return currentStyle[props];
            }

            return currentStyle;
        },
        insertScript: function insertScript(source) {
            if (document.querySelectorAll('script[src="' + source + '"]').length) {
                return;
            }

            var tag = document.createElement('script');
            tag.src = source;
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        },
        toggleState: function toggleState(target, state) {
            var attrState = target.getAttribute('state') || false;
            attrState = typeof attrState === 'boolean' ? attrState : attrState === 'true';
            if (state === undefined) {
                state = attrState;
            } else {
                state = typeof state === 'boolean' ? state : !attrState;
                target.setAttribute('state', state);
            }
            return state;
        }
    });

    //event
    (function (that) {
        var registry = {};

        that.toggleHandler = function (ele, events, callback, toggle) {
            var eventList = events.split(' ');
            if (ele instanceof NodeList) {
                for (var x = 0; x < ele.length; x++) {
                    if (ele[x] instanceof Node) {
                        that.toggleHandler(ele[x], arguments[1], arguments[2], arguments[3]);
                    }
                }
                return;
            }
            for (var i = 0; i < eventList.length; i++) {
                ele[toggle ? 'addEventListener' : 'removeEventListener'](eventList[i], callback, false);
            }

            return flex;
        };

        that.fire = function (ele, type, data) {
            if (ele instanceof HTMLElement) {
                var fauxEvent = document.createEvent('MouseEvents');
                fauxEvent.initEvent(type, true, true);
                ele.dispatchEvent(fauxEvent);
                return flex;
            }

            data = type;
            type = ele;

            var array = void 0,
                func = void 0,
                handler = void 0,
                result = void 0,
                i = void 0;
            if (registry.hasOwnProperty(type)) {
                array = registry[type];
                for (i = 0; i < array.length; i++) {
                    handler = array[i];
                    func = handler.method;
                    if (typeof func === 'string') {
                        func = flex[func];
                    }
                    result = func.apply(flex, [{ "data": data, "onData": handler.data, "eventType": type }]);
                    if (handler.guid == 1) {
                        flex.off(type, func);
                    }
                }
            }
            return result;
        };

        that.on = function (ele, type, method, data, guid) {
            if (ele instanceof HTMLElement || ele == flex.window || ele == flex.document) {
                that.toggleHandler(ele, type, method, true);
                return flex;
            }

            guid = data;
            data = method;
            method = type;
            type = ele;

            var handler = {
                method: method,
                data: data,
                guid: guid
            };
            if (registry.hasOwnProperty(type)) {
                registry[type].push(handler);
            } else {
                registry[type] = [handler];
            }
            return flex;
        };

        that.off = function (ele, type, method) {
            if (ele instanceof HTMLElement) {
                that.toggleHandler(ele, type, method, false);
                return flex;
            }

            method = type;
            type = ele;

            var array = void 0,
                handler = void 0,
                i = void 0;
            if (registry.hasOwnProperty(type)) {
                array = registry[type];
                if (method && array.length > 0) {
                    for (i = 0; i < array.length; i++) {
                        handler = array[i];
                        if (handler.method == method) array.splice(i, 1);
                    }
                    registry[type] = array;
                } else {
                    delete registry[type];
                }
            }
            return flex;
        };

        that.one = function (type, method, data) {
            flex.on(type, method, data, 1);
            return flex;
        };
    })(gloabl.flex);

    //utils
    flex.merge(flex, {
        browserSniff: function browserSniff() {
            var nAgt = navigator.userAgent,
                name = navigator.appName,
                fullVersion = '' + parseFloat(navigator.appVersion),
                majorVersion = parseInt(navigator.appVersion, 10),
                nameOffset,
                verOffset,
                ix;

            if (navigator.appVersion.indexOf('Windows NT') !== -1 && navigator.appVersion.indexOf('rv:11') !== -1) {
                name = 'IE';
                fullVersion = '11;';
            } else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
                name = 'IE';
                fullVersion = nAgt.substring(verOffset + 5);
            } else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
                name = 'Chrome';
                fullVersion = nAgt.substring(verOffset + 7);
            } else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
                name = 'Safari';
                fullVersion = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                    fullVersion = nAgt.substring(verOffset + 8);
                }
            } else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
                name = 'Firefox';
                fullVersion = nAgt.substring(verOffset + 8);
            } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                name = nAgt.substring(nameOffset, verOffset);
                fullVersion = nAgt.substring(verOffset + 1);

                if (name.toLowerCase() == name.toUpperCase()) {
                    name = navigator.appName;
                }
            }
            if ((ix = fullVersion.indexOf(';')) !== -1) {
                fullVersion = fullVersion.substring(0, ix);
            }
            if ((ix = fullVersion.indexOf(' ')) !== -1) {
                fullVersion = fullVersion.substring(0, ix);
            }
            majorVersion = parseInt('' + fullVersion, 10);
            if (isNaN(majorVersion)) {
                fullVersion = '' + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }
            return {
                name: name,
                version: majorVersion,
                ios: /(iPad|iPhone|iPod)/g.test(navigator.platform),
                mobile: /AppleWebKit.*Mobile.*/.test(nAgt)
            };
        },

        inArray: function inArray(haystack, needle) {
            return Array.prototype.indexOf && haystack.indexOf(needle) != -1;
        },
        replaceAll: function replaceAll(string, find, replace) {
            return string.replace(new RegExp(find.replace(/([.*+?\^=!:flex{}()|\[\]\/\\])/g, '\\$1'), 'g'), replace);
        },

        /**
         * 是否是数字
         * */
        isNumber: function isNumber(value) {
            return typeof value === 'number' && isFinite(value);
        },

        /**
         * 去首位空格
         * @param text
         * @returns {string}
         */
        trim: function trim(text) {
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            return text == null ? "" : (text + "").replace(rtrim, "");
        },
        each: function each(obj, callback) {
            var value,
                i = 0,
                length = obj.length,
                isArray = Array.isArray(obj);
            if (isArray) {
                for (; i < length; i++) {
                    value = callback.call(obj[i], i, obj[i]);
                    if (value === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    value = callback.call(obj[i], i, obj[i]);
                    if (value === false) {
                        break;
                    }
                }
            }
            return obj;
        },
        toUrl: function toUrl(url) {
            var a = flex.newElement('a');
            flex.setAttributes(a, { href: url, target: '_blank' });
            flex.fire(a, 'click');
        },

        /**
         * 节流方法 每100ms执行一次
         * eg window.onresize = function(){ throttle(bussifn); };
         * */
        throttle: function throttle(method, context) {
            clearTimeout(method.tId);
            method.tId = setTimeout(function () {
                method.call(context);
            }, 100);
        },

        /**
         * 多继承 extend(target,so1,so2)
         * @param target
         * @returns {*}
         */
        extend: function extend(target) {
            var slice = Array.prototype.slice;
            slice.call(arguments, 1).forEach(function (source) {
                for (var key in source) {
                    if (source[key] !== undefined) {
                        target[key] = source[key];
                    }
                }
            });
            return target;
        },

        /**
         * 返回对象的key
         */
        keys: function keys(o) {
            var a = [];
            for (var k in o) {
                if (o[k]) {
                    a.push(k);
                }
            }return a;
        },

        /**
         * 判断两个值是否相等
         */
        equals: function equals(x, y) {
            if (x === y) {
                // 针对+0 不等于 -0的情况
                return x !== 0 || 1 / x === 1 / y;
            }
            // 针对NaN的情况
            return x !== x && y !== y;
        }
    });

    if (!('includes' in String.prototype)) {
        String.prototype.includes = function (value) {
            return this.indexOf(value) >= 0;
        };
    }
})(window);