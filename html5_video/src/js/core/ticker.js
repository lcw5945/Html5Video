/**
 * Created by Cray on 2016/4/11.
 */
flex.module('core.ticker').define(() => {

    let _lastTime = 0;
    let _tickerList = [];


    flex.Class.TickerLanuch = class {
        constructor(){
            _enterFrame();
        }
        /**
         * @param t -> for Timer t = interval | for frame t = frequency
         * @param callback
         * @param repeatCount
         * @param frame
         */
        tick( t, callback = null, repeatCount = 1, frame = false )
        {
            if(!frame){
                let tticker;
                if( !this.have(callback) )
                {
                    tticker = new TimeTicker(t, repeatCount, callback);
                    tticker.start();
                }
            }else{
                let fticker;
                if( !this.have(callback) )
                {
                    fticker = new FrameTicker(t, repeatCount, callback);
                    fticker.start();
                }
            }
        }

        have(callback)
        {
            let tc = TickerManager.getInstance.getTicker(callback);
            return tc || false;
        }

        stop(callback)
        {
            let tc = TickerManager.getInstance.getTicker(callback);
            if(tc)
            {
                flex.log("删除 "+ "Timer: " + callback +" 监听器成功.");
                TickerManager.getInstance.removeTicker(tc);
            }
        }
    };
    /**
     * 每秒60帧渲染 , 如果浏览器最小化则停止渲染
     * @private
     */
    function _enterFrame(){
        _onUpdate();
        requestAnimationFrame(_enterFrame);
    }

    function _onUpdate(){
        let time = (new Date()).getTime();
        let dtime = time - _lastTime;
        _lastTime = time;
        TickerManager.getInstance.doTick(dtime);
    }


    /***  TickerManager  ***/
    class TickerManager {
        constructor(){
        }

        static get getInstance(){
            if(!(this instanceof TickerManager)){
                TickerManager.instance = new TickerManager();
            }

            return TickerManager.instance;
        }

        doTick(dtime)
        {
            _tickerList.forEach((ticker) => {
                ticker.doTick(dtime);
            });
        }

        addTicker(ticker)
        {
            if(!this.contains(ticker))
                _tickerList.push(ticker);
        }

        contains(ticker)
        {
            return _tickerList.some( (t) =>
            {
                return t == ticker;
            });
        }

        getTicker(callback)
        {
            let ticker;
            let res=false;
            flex.each(_tickerList, (i, t) => {
                if(t.callback == callback)
                {
                    res = true;
                    ticker = t;
                    return false;
                }
            });

            return res ? ticker : null;
        }

        removeTicker(ticker)
        {
            for(var i=0; i<_tickerList.length; i++)
            {
                if(_tickerList[i] == ticker)
                {
                    _tickerList.splice(i,1);
                    break;
                }
            }
        }

        get length(){
            return _tickerList.length;
        }
    }


    /***  TickerBase  ***/
    class TickerBase {
        constructor(callback){
            this.callback = callback;
        }

        start()
        {
            TickerManager.getInstance.addTicker(this);
        }
        /**
         * 停止计时器
         * 将计时器从列表中删除
         */
        stop()
        {
            TickerManager.getInstance.removeTicker(this);
        }
        /**
         * 重置
         */
        reset()
        {
        }
        /**
         * 检查
         * @param dtime
         */
        doTick(dtime)
        {
        }
        /**
         * 计时器完成处理
         */
        dispose()
        {
            this.stop();
            this.reset();
            this.callback = null;
        }
    }

    /***  FrameTicker  ***/
    class FrameTicker extends TickerBase {
        constructor(frequency, repeatCount, callback){
            super(callback);
            this.totalCount = 0;
            this.tickCount = 0;
            this.frequency = Math.max(1, frequency);
            this.repeatCount = Math.max(0, repeatCount);

            this.reset();
        }

        reset()
        {
            this.tickCount = 0;
        }

        doTick(dtime)
        {
            ++ this.tickCount;

            if (this.tickCount == this.frequency)
            {
                this.tickCount = 0;
                ++this.totalCount;
                if (this.callback != null)
                {
                    this.callback();
                }
                if (this.repeatCount > 0 && this.totalCount >= this.repeatCount)
                {
                    this.dispose();
                }
            }
        }
    }

    /*** TimerTicker  ***/
    class TimeTicker extends TickerBase {
        constructor(interval, repeatCount, callback){
            super(callback);
            this.tickTime = 0;
            this.tickCount = 0;
            this.interval = Math.abs(interval);
            this.repeatCount = Math.max(0, repeatCount);

            this.reset();
        }

        reset()
        {
            this.tickCount = 0;
            this.tickTime = 0;
        }

        doTick(dtime)
        {
            this.tickTime += dtime;
            while (this.tickTime >= this.interval)
            {
                this.tickTime -= this.interval;
                ++this.tickCount;
                if (this.callback != null)
                {
                    this.callback();
                }
                if (this.repeatCount > 0 && this.tickCount >= this.repeatCount)
                {
                    this.dispose();
                    return;
                }
            }
        }
    }

});