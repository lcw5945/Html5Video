/**
 * Created by Cray on 2016/4/5.
 */
import EventDispatcher from './events/event-dispatcher';
import Utils from './utils/utils';
import Context from './context';

class Sprite extends EventDispatcher {
    constructor() {
        super();

        this._c = Context;
        this._e = Context.e;
        this.fullscreen = this._c.fullscreen =  Utils.fullScreenSupport();
        this.supported =  this._c.supported = Utils.supported();

        this._e.on(window, 'resize', (event) => {
            Context.e.fire('resize');
        });

        this._e.on(window, 'keyup', (event) => {
            switch (event.keyCode) {
                case 27:
                {
                    //esc
                    Context.e.fire('resize');
                    break;
                }
            }
        });
    }
}

export default Sprite;
