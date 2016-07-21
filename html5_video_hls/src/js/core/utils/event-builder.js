/**
 * Created by Cray on 2016/5/4.
 */
import Logger from './log';

class EventBuilder {
    constructor(){
        this.registry = {};
    }

    toggleHandler (ele, events, callback, toggle) {
        let eventList = events.split(' ');
        if (ele instanceof NodeList) {
            for (let x = 0; x < ele.length; x++) {
                if (ele[x] instanceof Node) {
                    this.toggleHandler(ele[x], arguments[1], arguments[2], arguments[3]);
                }
            }
            return;
        }
        for (let i = 0; i < eventList.length; i++) {
            ele[toggle ? 'addEventListener' : 'removeEventListener'](eventList[i], callback, false);
        }
        return this;
    }

    fire(ele, type, data)
    {
        if (ele instanceof HTMLElement) {
            let fauxEvent = document.createEvent('MouseEvents');
            fauxEvent.initEvent(type, true, true);
            ele.dispatchEvent(fauxEvent);
            return this;
        }

        data = type;
        type = ele;

        let array,
            func,
            handler,
            result,
            i;
        if (this.registry.hasOwnProperty(type)) {
            array = this.registry[type];
            for (i = 0; i < array.length; i++) {
                handler = array[i];
                func = handler.method;
                result = func.apply(null, [data]);
                if (handler.guid == 1) {
                    this.off(type, func);
                }
            }
        }
        return result;
    }

    on(ele, type, method, guid)
    {
        if (ele instanceof HTMLElement || ele == window || ele == document) {
            this.toggleHandler(ele, type, method, true);
            return this;
        }

        guid = method;
        method = type;
        type = ele;

        if(typeof method != 'function'){
            Logger.error('[EventBuilder] on method not function');
            return this;
        }

        let handler = {
            method: method,
            guid: guid
        };
        if (this.registry.hasOwnProperty(type)) {
            this.registry[type].push(handler);
        } else {
            this.registry[type] = [handler];
        }
        return this;
    }

    off(ele, type, method)
    {
        if (ele instanceof HTMLElement) {
            this.toggleHandler(ele, type, method, false);
            return this;
        }

        method = type;
        type = ele;

        let array,
            handler,
            i;
        if (this.registry.hasOwnProperty(type)) {
            array = this.registry[type];
            if (method && array.length > 0) {
                for (i = 0; i < array.length; i++) {
                    handler = array[i];
                    if (handler.method == method)
                        array.splice(i, 1);
                }
                this.registry[type] = array;
            } else {
                delete this.registry[type];
            }
        }
        return this;
    }

    one(type, method)
    {
        this.on(type, method, 1);
        return this;
    }
}

export default EventBuilder;
