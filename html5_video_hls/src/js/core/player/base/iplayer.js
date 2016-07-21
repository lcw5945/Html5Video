/**
 * Created by Cray on 2016/5/12.
 */
import EventDispatcher from '../../events/event-dispatcher';

class IPlayer extends EventDispatcher{

    constructor() {
        super();
    }

    startup(media) {
        this.media = media;
        this.type = this.media.tagName.toLowerCase();
    }

    play() {
        this.media.play();
    }

    pause() {
        this.media.pause();
    }

    rewind(seekTime) {
        this.seek(this.media.currentTime - seekTime);
    }

    forward(seekTime) {
        this.seek(this.media.currentTime + seekTime);
    }

    seek(input) {
        var targetTime = 0;

        if (typeof input === 'number') {
            targetTime = input;
        }
        else if (typeof input === 'object' && (input.type === 'input' || input.type === 'change')) {
            targetTime = ((input.target.value / input.target.max) * this.media.duration);
        }

        if (targetTime < 0) {
            targetTime = 0;
        }
        else if (targetTime > this.media.duration) {
            targetTime = this.media.duration;
        }

        try {
            this.media.currentTime = targetTime.toFixed(1);
        }
        catch(e) {}
    }

    setVolume(volume) {

        if (volume > 10) {
            volume = 10;
        }
        if (volume < 0) {
            volume = 0;
        }

        this.media.volume = parseFloat(volume / 10);

        if (this.media.muted && volume > 0) {
            this.toggleMute();
        }
    }

    toggleMute(muted) {
        if (typeof muted !== 'boolean') {
            muted = !this.media.muted;
        }
        this.media.muted = muted;
    }

    togglePlay(toggle) {
        if (toggle === true) {
            this.play();
        }
        else if (toggle === false) {
            this.pause();
        }
        else {
            this.media[this.media.paused ? 'play' : 'pause']();
        }
    }

    destroy() {

    }
}

export default IPlayer;