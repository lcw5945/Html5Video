/**
 * Created by Cray on 2016/4/28.
 */
import EventDispatcher from '../events/event-dispatcher';
import Buffer from './m3u8/buffer';
import Stream from './m3u8/stream';
import PlayList from './m3u8/playlist';
import HLSEvent from './hls-event';
import hlsConfig from './hls-config';
import $ from '../context';

class Hls extends EventDispatcher{

    static isSupported() {
        return (window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'));
    }

    constructor(){
        super();

        this._e = $.e;

        this.buffer = new Buffer(this);
        this.stream = new Stream(this);
        this.playList = new PlayList(this);
    }

    startup(url, media) {
        this.url = url;
        this.media = media;
        this.playList.src(url);
    }
}

export default Hls;
