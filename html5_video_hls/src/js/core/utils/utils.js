/**
 * Created by Cray on 2016/5/4.
 */

const Utils = {
    merge (original, extended) {
        for (let key in extended) {
            let ext = extended[key];
            if (typeof(ext) != 'object' || ext instanceof HTMLElement || ext === null) {
                original[key] = ext;
            }
            else {
                if (!original[key] || typeof(original[key]) != 'object') {
                    original[key] = (Array.isArray(ext)) ? [] : {};
                }
                this.merge(original[key], ext);
            }
        }
        return original;
    },
    copy (object) {
        if (!object || typeof(object) != 'object' || object instanceof HTMLElement) {
            return object;
        }
        else if (Array.isArray(object)) {
            let array = [];
            for (let i = 0, l = object.length; i < l; i++) {
                array[i] = this.copy(object[i]);
            }
            return array;
        }
        else {
            let obj = {};
            for (let j in object) {
                obj[j] = this.copy(object[j]);
            }
            return obj;
        }
    },
    browserSniff () {
        var nAgt = navigator.userAgent,
            name = navigator.appName,
            fullVersion = '' + parseFloat(navigator.appVersion),
            majorVersion = parseInt(navigator.appVersion, 10),
            nameOffset,
            verOffset,
            ix;

        if ((navigator.appVersion.indexOf('Windows NT') !== -1) && (navigator.appVersion.indexOf('rv:11') !== -1)) {
            name = 'IE';
            fullVersion = '11;';
        }
        else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
            name = 'IE';
            fullVersion = nAgt.substring(verOffset + 5);
        }
        else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
            name = 'Chrome';
            fullVersion = nAgt.substring(verOffset + 7);
        }
        else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
            name = 'Safari';
            fullVersion = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                fullVersion = nAgt.substring(verOffset + 8);
            }
        }
        else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
            name = 'Firefox';
            fullVersion = nAgt.substring(verOffset + 8);
        }
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
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
            mobile: (/AppleWebKit.*Mobile.*/).test(nAgt)
        };
    },
    supported () {
        let browser = this.browserSniff(),
            IE = (browser.name === 'IE' && browser.version <= 9 ),
            basic, full;

        basic = !!document.createElement('video').canPlayType;
        full = ((basic && !IE) && !browser.mobile);

        return {
            basic: basic,
            full: full
        };
    },
    fullScreenSupport() {
        let fullscreen = {
            supportsFullScreen: false,
            isFullScreen: function () {
                return false;
            },
            requestFullScreen: function () {
            },
            cancelFullScreen: function () {
            },
            fullScreenEventName: '',
            element: null,
            prefix: ''
        };

        let browserPrefixes = 'webkit moz o ms khtml'.split(' ');

        if (typeof document.cancelFullScreen !== 'undefined') {
            fullscreen.supportsFullScreen = true;
        }
        else {
            for (let i = 0, il = browserPrefixes.length; i < il; i++) {
                fullscreen.prefix = browserPrefixes[i];

                if (typeof document[fullscreen.prefix + 'CancelFullScreen'] !== 'undefined') {
                    fullscreen.supportsFullScreen = true;
                    break;
                }
                else if (typeof document.msExitFullscreen !== 'undefined' && document.msFullscreenEnabled) {
                    fullscreen.prefix = 'ms';
                    fullscreen.supportsFullScreen = true;
                    break;
                }
            }
        }

        if (fullscreen.supportsFullScreen) {
            fullscreen.fullScreenEventName = (fullscreen.prefix == 'ms' ? 'MSFullscreenChange' : fullscreen.prefix + 'fullscreenchange');

            fullscreen.isFullScreen = function (element) {
                if (typeof element === 'undefined') {
                    element = document.body;
                }
                switch (fullscreen.prefix) {
                    case '':
                        return document.fullscreenElement == element;
                    case 'moz':
                        return document.mozFullScreenElement == element;
                    default:
                        return document[fullscreen.prefix + 'FullscreenElement'] == element;
                }
            };
            fullscreen.requestFullScreen = function (element) {
                if (typeof element === 'undefined') {
                    element = document.body;
                }
                return (fullscreen.prefix === '') ? element.requestFullScreen() : element[fullscreen.prefix + (fullscreen.prefix == 'ms' ? 'RequestFullscreen' : 'RequestFullScreen')]();
            };
            fullscreen.cancelFullScreen = function () {
                return (fullscreen.prefix === '') ? document.cancelFullScreen() : document[fullscreen.prefix + (fullscreen.prefix == 'ms' ? 'ExitFullscreen' : 'CancelFullScreen')]();
            };
            fullscreen.element = function () {
                return (fullscreen.prefix === '') ? document.fullscreenElement : document[fullscreen.prefix + 'FullscreenElement'];
            };
        }

        return fullscreen;
    },
    inFrame () {
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    },
    inArray (haystack, needle) {
        return Array.prototype.indexOf && (haystack.indexOf(needle) != -1);
    },
    replaceAll (string, find, replace) {
        return string.replace(new RegExp(find.replace(/([.*+?\^=!:flex{}()|\[\]\/\\])/g, '\\$1'), 'g'), replace);
    },
    isNumber (value) {
        return typeof value === 'number' && isFinite(value);
    },
    trim (text) {
        let rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        return text == null ? "" : (text + "").replace(rtrim, "");
    },
    each (obj, callback) {
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
    toUrl(url){
        let a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('target', '_blank');

        let event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        a.dispatchEvent(event);
    },
    throttle (method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
            method.call(context);
        }, 100);
    },
    extend (target) {
        var slice = Array.prototype.slice;
        slice.call(arguments, 1).forEach(function (source) {
            for (let key in source) {
                if (source[key] !== undefined) {
                    target[key] = source[key];
                }
            }
        });
        return target;
    },
    keys (o){
        let a = [];
        for (let k in o) if (o[k]) {
            a.push(k);
        }
        return a;
    },
    equals (x, y){
        if (x === y) {
            // 针对+0 不等于 -0的情况
            return x !== 0 || 1 / x === 1 / y;
        }
        // 针对NaN的情况
        return x !== x && y !== y;
    },
    search (list, comparisonFunction) {
        var minIndex = 0;
        var maxIndex = list.length - 1;
        var currentIndex = null;
        var currentElement = null;

        while (minIndex <= maxIndex) {
            currentIndex = (minIndex + maxIndex) / 2 | 0;
            currentElement = list[currentIndex];

            var comparisonResult = comparisonFunction(currentElement);
            if (comparisonResult > 0) {
                minIndex = currentIndex + 1;
            }
            else if (comparisonResult < 0) {
                maxIndex = currentIndex - 1;
            }
            else {
                return currentElement;
            }
        }

        return null;
    }
};

export default Utils;