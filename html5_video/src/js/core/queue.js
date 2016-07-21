/**
 * Created by Cray on 2016/4/8.
 */
flex.module('core.queue').define(() => {

    var _taskArray = [],
        _currentTask = null,
        _onComplete = null;

    /***** Queue Controller Class************/
    flex.Class.QueueController = class{
        constructor(){
            flex.on("queue-complete", _checkQueue);
        }

        startUp(){
            _checkQueue();
        }

        addTask(task){
            _taskArray.push(task);
        }

        get currentTask(){
            return _currentTask;
        }

        set onComplete(callback){
            _onComplete = callback;
        }
    };
    /**
     * 检查队列
     * @private
     */
    function _checkQueue(){

        if(_taskArray.length > 0)
        {
            _currentTask = _taskArray.shift();
            _currentTask.startUp();
        }else{
            _currentTask = null;
            if(_onComplete && typeof _onComplete == 'function')
            {
                _onComplete.call(null);
                _onComplete = null;
            }
        }
    }
    /***** Task Class************/
    flex.Class.Task = class {
        constructor(){}

        startUp(){}

        complete(){
            flex.fire("queue-complete");
        }
    }

});