/**
 * Created by Cray on 2016/4/8.
 */
import Event from '../events/event';
import EventDispatcher from '../events/event-dispatcher';

var _taskArray = [],
    _currentTask = null,
    _onComplete = null;

/***** Queue Controller Class************/
class Queue extends EventDispatcher{
    constructor() {
        super();
    }

    startUp() {
        _checkQueue();
    }

    addTask(task) {
        task.on(Event.TASK_COMPLETE, _checkQueue);
        _taskArray.push(task);
    }

    get currentTask() {
        return _currentTask;
    }

    set onComplete(callback) {
        _onComplete = callback;
    }
}

function _checkQueue() {

    if (_taskArray.length > 0) {
        _currentTask = _taskArray.shift();
        _currentTask.startUp();
    } else {
        _currentTask = null;
        if (_onComplete && typeof _onComplete == 'function') {
            _onComplete.call(null);
            _onComplete = null;
        }

        this.fire(Event.QUEUE_COMPLETE);
    }
}

export default Queue;
