/**
 * Created by Cray on 2016/1/12.
 */
import Deferred from '../utils/promise';
import Utils from '../utils/utils';
import Dom from '../utils/dom';
import EventManager from '../utils/event-builder';


var jsonpID = (new Date()).getTime(),
    document = window.document,
    support = {},
    key,
    name,
    defer,
    rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    scriptTypeRE = /^(?:text|application)\/javascript/i,
    xmlTypeRE = /^(?:text|application)\/xml/i,
    jsonType = 'application/json',
    htmlType = 'text/html',
    allTypes = "*/".concat("*"),
    blankRE = /^\s*$/; //匹配空字符串

const ajax = function (options) {
    let settings = Utils.merge({}, options || {});
    Utils.each(ajax.settings, function (i, value) {
        if (settings[i] === undefined) {
            settings[i] = value;
        }
    });
    ajaxStart(settings);
    //正则分解url 如果是http地址
    //$1:http:  $2:host值  所以如果url的host和当前服务的host不同则是跨域
    if (!settings.crossDomain) {
        settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
            RegExp.$2 != window.location.host;
    }

    let dataType = settings.dataType || "*";
    if (dataType == 'jsonp') {
        //设置回调标记
        settings.url = appendQuery(settings.url, 'callback=?');
        return ajax.JSONP(settings);
    }

    //数据序列化
    serializeData(settings);
    //设置返回数据类型 请求头等
    var mime = settings.accepts[dataType],
        baseHeaders = {},
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = ajax.settings.xhr(), abortTimeout;
    //如果不是跨域设置请求头ajax异步请求
    if (!settings.crossDomain) {
        baseHeaders['X-Requested-With'] = 'XMLHttpRequest';
    }
    //如果设置了返回数据类型
    if (mime) {
        baseHeaders['Accept'] = mime;
        if (mime.indexOf(',') > -1) {
            mime = mime.split(',', 2)[0];
            xhr.overrideMimeType && xhr.overrideMimeType(mime);
        }
    }
    //如果请求为POST设置提交类型，默认是表单提交
    if (!!settings.contentType && (settings.data && settings.type.toUpperCase() == 'POST')) {
        baseHeaders['Content-Type'] = settings.contentType;
    }

    //设置请求头
    settings.headers = Utils.merge(baseHeaders, settings.headers || {});

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            //清除超时计时器
            clearTimeout(abortTimeout);
            let result, error = false;
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
                dataType = dataType !== "*" || mimeToDataType(xhr.getResponseHeader('Content-Type'));
                result = xhr.responseText;
                try {
                    if (dataType == 'script') {
                        eval(result);
                    }//   (1,eval)(result); //context global
                    else if (dataType == 'xml') {
                        result = xhr.responseXML;
                    }
                    else if (dataType == 'json') {
                        result = blankRE.test(result) ? null : JSON.parse(result + "");
                    }
                } catch (e) {
                    error = e
                }

                if (error) {
                    ajaxError(error, 'parsererror', xhr, settings);
                }
                else {
                    ajaxSuccess(result, xhr, settings)
                }
            } else {
                ajaxError(null, 'error', xhr, settings)
            }
        }
    };

    let async = 'async' in settings ? settings.async : true;
    support.cors = ajax.settings.cors || !!xhr && ( "withCredentials" in xhr );
    if (support.cors || xhr && !settings.crossDomain) {
        ajax.settings.cors = undefined;
        xhr.open(settings.type, settings.url, async);
        //跨域cookies
        //if(support.cors){
        //    xhr.withCredentials = true;
        //}
        Utils.each(settings.headers, function (name, value) {
            xhr.setRequestHeader(name, value);
        });

        if (ajaxBeforeSend(xhr, settings) === false) {
            xhr.abort();
            return defer.promise;
        }
        //如果超时没有放回数据
        if (async && settings.timeout > 0) abortTimeout = setTimeout(function () {
            xhr.onreadystatechange = _empty;
            xhr.abort();
            ajaxError(null, 'timeout', xhr, settings);
        }, settings.timeout);
        //POST请求 data不为空
        xhr.send(settings.data ? settings.data : null);
    }

    return defer.promise;
};

ajax.settings = {
    url: window.href,
    type: 'GET',
    async: true,
    beforeSend: _empty,
    success: _empty,
    error: _empty,
    complete: _empty,
    context: null,
    global: true,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8", //multipart/form-data || application/json
    xhr: function () {
        return new window.XMLHttpRequest()
    },
    accepts: {
        "*": allTypes,
        script: 'text/javascript, application/javascript',
        json: jsonType,
        xml: 'application/xml, text/xml',
        html: htmlType,
        text: 'text/plain'
    },
    crossDomain: false,
    timeout: 0
    /*
     dataType: null,
     headers: {},
     */
};


ajax.get = function (url, data, success, error) {
    if (typeof(data) === 'function') {
        error = typeof(success) === 'function' ? success : _empty;
        success = data;
        data = null;
    }
    if (!error) {
        error = _empty;
    }
    return ajax({url: url, data: data, success: success, error: error});
};

ajax.post = function (url, data, success, dataType) {
    if (typeof(data) === 'function') {
        dataType = success;
        success = data;
        data = null;
    }
    return ajax({type: 'POST', url: url, data: data, success: success, dataType: dataType})
};

ajax.getJSON = function (url, success, error) {
    if (!error) {
        error = _empty;
    }
    return ajax({url: url, success: success, error: error, dataType: 'json'})
};

ajax.JSONP = function (options) {
    if (!('type' in options)) {
        return ajax(options);
    }

    var callbackName = 'jsonp' + (++jsonpID),
        script = document.createElement('script'),
    //终止函数
        abort = function () {
            //移除标签
            Dom.remove(script);
            //清空回调函数
            if (callbackName in window) {
                window[callbackName] = _empty;
            }
            //ajax请求完成
            ajaxComplete('abort', xhr, options)
        },
        xhr = {abort: abort}, abortTimeout,
        head = Dom.getElement('head') || document.documentElement; //document.getElementsByTagName("head")[0]

    if (options.error) script.onerror = function () {
        xhr.abort();
        options.error();
    };
    //成功回调执行
    window[callbackName] = function (data) {
        clearTimeout(abortTimeout);
        Dom.remove(script);
        delete window[callbackName];
        ajaxSuccess(data, xhr, options);
    };

    serializeData(options);
    //通过callback=? 添加回调函数
    script.src = options.url.replace(/=\?/, '=' + callbackName);

    head.insertBefore(script, head.firstChild);

    if (options.timeout > 0) abortTimeout = setTimeout(function () {
        xhr.abort();
        ajaxComplete('timeout', xhr, options);
    }, options.timeout);

    return xhr;
};

/**
 * 默认处理函数
 */
function _empty() {
}
/**
 * 全局事件派发
 * @param settings
 * @param eventName
 * @param data
 */
function triggerGlobal(settings, eventName, data) {
    if (settings.global) {
        //返回响应函数处理结果
        return EventManager.fire(eventName, data);
    }
}

ajax.active = 0;
/**
 * 请求开始
 * @param settings
 */
function ajaxStart(settings) {
    defer = Deferred.defer();
    if (settings.global && ajax.active++ === 0) triggerGlobal(settings, 'ajaxStart')
}

/**
 * 请求结束
 * @param settings
 */
function ajaxEnd(settings) {
    if (settings.global && !(--ajax.active)) triggerGlobal(settings, 'ajaxEnd')
}

/**
 * 请求发送之前
 * @param xhr
 * @param settings
 * @returns {boolean}
 */
function ajaxBeforeSend(xhr, settings) {
    var context = settings.context;
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, 'ajaxBeforeSend', [xhr, settings]) === false) {
        return false;
    }
    triggerGlobal(settings, 'ajaxSend', [xhr, settings]);
}

/**
 * 请求成功
 * @param data
 * @param xhr
 * @param settings
 */
function ajaxSuccess(data, xhr, settings) {
    var context = settings.context, status = 'success';
    defer.resolve(data);
    settings.success.call(context, data, status, xhr);
    triggerGlobal(settings, 'ajaxSuccess', [xhr, settings, data]);
    ajaxComplete(status, xhr, settings)
}

/**
 * 请求失败
 * @param error
 * @param type
 * @param xhr
 * @param settings
 */
function ajaxError(error, type, xhr, settings) {
    defer.reject(error);
    var context = settings.context;
    settings.error.call(context, xhr, type, error);
    triggerGlobal(settings, 'ajaxError', [xhr, settings, error]);
    ajaxComplete(type, xhr, settings)
}

/**
 * ajax完成 状态 成功 or 失败 or 挂起
 * @param status
 * @param xhr
 * @param settings
 */
function ajaxComplete(status, xhr, settings) {
    var context = settings.context;
    settings.complete.call(context, xhr, status);
    triggerGlobal(settings, 'ajaxComplete', [xhr, settings]);
    ajaxEnd(settings);
}

/**
 * 从返回content-type确定数据返回类型
 * @param mime
 * @returns {*|string}
 */
function mimeToDataType(mime) {
    return mime && ( mime == htmlType ? 'html' :
            mime == jsonType ? 'json' :
                scriptTypeRE.test(mime) ? 'script' :
                xmlTypeRE.test(mime) && 'xml' ) || 'text';
}

/**
 * 确保请求地址参数是从?开始
 * @param url
 * @param query
 * @returns {string}
 */
function appendQuery(url, query) {

    return (url + '&' + query).replace(/[&?]{1,2}/, '?');
}

/**
 * 序列化数据
 * @param options
 */
function serializeData(options) {
    if (typeof(options.data) === 'object') {
        options.data = param(options.data);
    }

    if (options.data && (!options.type || options.type.toUpperCase() == 'GET')) {
        options.url = appendQuery(options.url, options.data);
        options.data = null;
    }
}

var escape = encodeURIComponent;

function serialize(params, obj, traditional, scope) {
    var array = Array.isArray(obj);
    for (var key in obj) {
        var value = obj[key];

        if (scope) {
            key = traditional ? scope : scope + '[' + (array ? '' : key) + ']';
        }
        if (!scope && array) {
            params.add(value.name, value.value);
        }
        else if (traditional ? Array.isArray(value) : (typeof(value) === 'object')) {
            serialize(params, value, traditional, key);
        }
        else {
            params.add(key, value);
        }
    }
}

/**
 * @param obj
 * @param traditional
 * @returns {string}
 */
function param(obj, traditional) {

    var params = [];
    params.add = function (k, v) {
        this.push(escape(k) + '=' + escape(v))
    };
    serialize(params, obj, traditional);
    return params.join('&').replace('%20', '+');
}

export default ajax;
