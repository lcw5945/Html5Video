/**
 * Created by Cray on 2016/5/12.
 */
import EventDispatcher from '../events/event-dispatcher';
import Event from '../events/event';

class Task extends EventDispatcher{
    constructor() {
        super();
    }

    startUp() {
    }

    complete() {
        this.fire(Event.TASK_COMPLETE);
    }
}

export default Task;