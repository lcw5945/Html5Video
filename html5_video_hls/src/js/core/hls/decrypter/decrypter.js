import AES128Decrypter from './aes128-decrypter';
import Logger from '../../utils/log';


class Decrypter {

    constructor() {
    }

    decrypt($data, $key, $iv, $callback) {
        Logger.log('[Decrypter] decrypt aes128');

        let view,
            key,
            iv,
            decrypter;

        view = new DataView($key.buffer);
        key = new Uint32Array([
            view.getUint32(0),
            view.getUint32(4),
            view.getUint32(8),
            view.getUint32(12)
        ]);

        view = new DataView($iv.buffer);
        iv = new Uint32Array([
            view.getUint32(0),
            view.getUint32(4),
            view.getUint32(8),
            view.getUint32(12)
        ]);

        decrypter = new AES128Decrypter(key, iv);
        $callback(decrypter.decrypt($data).buffer);
    }
}

export default Decrypter;
