/**
 * Created by Cray on 2016/1/12.
 */
flex.module('manager.skinManager').requires('core.ajax').define(() => {
    let body = flex.document.body;

    flex.Class.SkinManager = class {
        constructor() {
        }

        startup() {
            _addSkin();
        }
    };

    function _addSkin() {
        flex.log('[SM] start load skin');
        flex.ajax.get(flex.config.skin, function (data) {
            var c = flex.newElement("div");
            c.setAttribute("hidden", "");
            c.innerHTML = data;
            body.insertBefore(c, body.childNodes[0]);
        });
    }
});