/**
 * Created by Cray on 2016/5/9.
 */
import Decrypter from '../decrypter/decrypter';
import TSDemuxer from './tsdemuxer';
import HLSEvent from '../hls-event';
import {ErrorTypes, ErrorDetails} from '../errors';

let _this;
class Demuxer {
    constructor(hls) {
        this.hls = hls;
        this._e = this.hls._e;
        this.demuxer = null;

        _this = this;
    }

    dispose() {
        if(this.demuxer){
            this.demuxer.dispose();
            this.demuxer = null;
        }

        if (this.decrypter) {
            this.decrypter = null;
        }
    }

    pushDecrypted(data, audioCodec, videoCodec, timeOffset, cc, level, sn, duration) {
        let u8Data = new Uint8Array(data);
        if (!this.demuxer) {
            let hls = this.hls;
            if (TSDemuxer.probe(u8Data)) {
                this.demuxer = new TSDemuxer(hls);
            } else {
                this._e.fire(HLSEvent.ERROR, {
                    type: ErrorTypes.MEDIA_ERROR,
                    details: ErrorDetails.FRAG_PARSING_ERROR,
                    fatal: true,
                    reason: 'no demux matching with content found'
                });
                return;
            }
        }
        this.demuxer.push(u8Data, audioCodec, videoCodec, timeOffset, cc, level, sn, duration);
    }

    push(data, audioCodec, videoCodec, timeOffset, cc, level, sn, duration, decryptdata) {
        if ((data.byteLength > 0) && (decryptdata != null) && (decryptdata.key != null) && (decryptdata.method === 'AES-128')) {
            if (this.decrypter == null) {
                this.decrypter = new Decrypter();
            }

            this.decrypter.decrypt(data, decryptdata.key, decryptdata.iv, function (decryptedData) {
                _this.pushDecrypted(decryptedData, audioCodec, videoCodec, timeOffset, cc, level, sn, duration);
            });
        } else {
            this.pushDecrypted(data, audioCodec, videoCodec, timeOffset, cc, level, sn, duration);
        }
    }
}

export default Demuxer;