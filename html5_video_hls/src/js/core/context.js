/**
 * Created by Cray on 2016/5/12.
 */

import EventBuilder from './utils/event-builder';
import Queue from './queue/queue';
import Preloader from './utils/preloader';

const Context = {};
(() => {
    Context.queue = new Queue();
    Context.preloader = new Preloader();
    Context.e = new EventBuilder();

    Context.storage = window.localStorage;
    Context.element = {};
    Context.data = {};
})();

export default Context;