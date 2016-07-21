/**
 * Created by Cray on 2016/4/29.
 */

const LEVEL_CONFIG = {'debug':true, 'log':true, 'info':true, 'warn':true, 'error':true};

class Logger {
    static startup(value = 'debug') {
        let array = ['debug', 'log', 'info', 'warn', 'error'];
        let enable = false;
        array.forEach((type) => {

            type == value ? (enable = true) : (LEVEL_CONFIG[type] = false);

            if (enable) {
                LEVEL_CONFIG[type] = true;
            }
        });

    }

    static debug(...msg) {
        _consolePrint('debug', msg);
    }

    static log(...msg) {
        _consolePrint('log', msg);
    }

    static info(...msg) {
        _consolePrint('info', msg);
    }

    static warn(...msg) {
        _consolePrint('warn', msg);
    }

    static error(...msg) {
        _consolePrint('error', msg);
    }

}

function _consolePrint(type, msg){
    if(LEVEL_CONFIG[type]){
        const fn = window.console[type];
        if(fn){
            fn.apply(window.console, _formatMsg(type, msg));
        }
    }
}

function _getTime() {
    let d = new Date();
    return String(d.getHours()) + ":" + String(d.getMinutes()) + ":" + String(d.getSeconds());
}


function _formatMsg(type, msg) {
    msg.unshift(_getTime() +  ' [' + type + '] > ');
    return msg;
}

export default Logger;
