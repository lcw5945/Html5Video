/**
 * Created by Cray on 2016/1/12.
 */

import XHRLoader from '../../core/net/xhr-loader';
import Logger from '../../core/utils/log';
import PEvent from '../../events';
import Dom from '../../core/utils/dom';
import Context from '../../core/context';

let _body = document.body;

class SkinManager {
    constructor() {
    }

    loadSkin(url) {
        Logger.log(`[SM] start load skin url ${url}`);

        this.xhrLoader = new XHRLoader();
        this.xhrLoader.load(url, '', _loadSuccess, _loadError, _loadTimeout, 5000, 3, 500);
    }
}

function _loadSuccess(event) {
    let target = event.currentTarget,
        result = target.responseText;
    var c = Dom.newElement("div");
    c.setAttribute("hidden", "");
    c.innerHTML = result;
    _body.insertBefore(c, _body.childNodes[0]);
}

function _loadError(event) {
    Logger.error('[Skin] loaded skin on error');
}

function _loadTimeout() {
    Logger.error('[Skin] loaded skin on timeout');
}

export default SkinManager;