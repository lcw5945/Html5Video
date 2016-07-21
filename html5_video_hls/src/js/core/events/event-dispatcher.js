/**
 * Created by Cray on 2016/4/29.
 */

class EventDispatcher{
    constructor(){
        this.listeners = {};
    }

    on (type, listener) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(listener);
    }

    off (type, listener){
        let index;

        if (!this.listeners[type]) {
            return false;
        }
        index = this.listeners[type].indexOf(listener);
        this.listeners[type].splice(index, 1);
        return index > -1;
    }

    fire (type){
        let callbacks;        let i;
        let length;
        let args;

        callbacks = this.listeners[type];
        if (!callbacks) {
            return;
        }
        if (arguments.length === 2) {
            length = callbacks.length;
            for (i = 0; i < length; ++i) {
                callbacks[i].call(this, arguments[1]);
            }
        } else {
            args = Array.prototype.slice.call(arguments, 1);
            length = callbacks.length;
            for (i = 0; i < length; ++i) {
                callbacks[i].apply(this, args);
            }
        }
    }

    dispose() {
        this.listeners = {};
    }
}

export default EventDispatcher;