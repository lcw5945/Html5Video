/**
 * Created by Cray on 2016/4/25.
 */
flex.module('manager.errorManager').requires('error.errorUI').define(() => {

    flex.Class.ErrorManager = class {
        constructor() {
            _addListener();

            flex.errUI = new flex.Class.ErrorUI();
        }

        startup() {

        }
    };


    function _addListener() {
        flex.on(flex.Event.DATA_DIS_ERROR, (event) => {
            flex.element.container.innerHTML = flex.errUI.getHtmlByCode(event.data.code);
            let element = flex.element.container.firstChild;
            let w, h, left, top;
            w = flex.element.container.offsetWidth;
            h = flex.element.container.offsetHeight;
            left = Number.parseInt((w - element.offsetWidth) / 2);
            top = Number.parseInt((h - element.offsetHeight) / 2) - 10;

            flex.css(element, {position: 'absolute', top: top + 'px', left: left + 'px'});
        });
    }
});