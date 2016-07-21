/**
 * Created by Cray on 2016/5/4.
 */

import Logger from './log';
import Utils from './utils';

const Dom = {

    getElements (selector) {
        return document.querySelectorAll(selector);
    },

    getElement (selector) {
        try {
            return this.getElements(selector)[0];
        } catch (e) {
            Logger.log("Not found " + selector + " element", true);
        }
        return null;
    },

    getElementById (id) {
        try {
            return document.getElementById(id);
        } catch (e) {
            Logger.log("Not found id" + id + " element", true);
        }
        return null;
    },

    newElement (selector) {
        return document.createElement(selector);
    },

    newTextNode(text){
        return document.createTextNode(text);
    },
    wrap (elements, wrapper) {
        if (!elements.length) {
            elements = [elements];
        }
        for (let i = elements.length - 1; i >= 0; i--) {
            var child = (i > 0) ? wrapper.cloneNode(true) : wrapper;
            var element = elements[i];
            var parent = element.parentNode;
            var sibling = element.nextSibling;
            child.appendChild(element);
            if (sibling) {
                parent.insertBefore(child, sibling);
            }
            else {
                parent.appendChild(child);
            }
        }
    },

    unwrap (wrapper) {
        let parent = wrapper.parentNode;
        while (wrapper.firstChild) {
            parent.insertBefore(wrapper.firstChild, wrapper);
        }
        parent.removeChild(wrapper);
    },
    remove (element) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    },
    removeAllChild(parent){
        while (parent.hasChildNodes()) {
            parent.removeChild(parent.firstChild);
        }
    },
    insertAfter: function (element, target) {
        var parent = target.parentNode;
        if (parent.lastChild == target) {
            parent.appendChild(element);
        } else {
            parent.insertBefore(element, target.nextSibling);
        }
    },
    prependChild (element, parent) {
        parent.insertBefore(element, parent.firstChild);
    },
    setAttributes (element, attributes) {
        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    },

    toggleClass (element, name, state) {
        if (element) {
            if (element.classList) {
                element.classList[state ? 'add' : 'remove'](name);
            }
            else {
                var className = (' ' + element.className + ' ').replace(/\s+/g, ' ').replace(' ' + name + ' ', '');
                element.className = className + (state ? ' ' + name : '');
            }
        }
    },
    css (element, props) {
        var currentStyle = element.currentStyle || element.ownerDocument.defaultView.getComputedStyle(element, null);
        if (props && 'object' == typeof props) {
            var empty = true;
            Utils.each(props, function (prop, value) {
                empty = false;
                element.style[prop] = value;
            });
            if (empty) {
                element.style.cssText = "";
            }
            return empty;
        } else if ('string' == typeof props) {
            return currentStyle[props];
        }

        return currentStyle;
    },

    insertScript (source) {
        if (document.querySelectorAll('script[src="' + source + '"]').length) {
            return;
        }

        var tag = document.createElement('script');
        tag.src = source;
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    },

    toggleState (target, state) {
        let attrState = target.getAttribute('state') || false;
        attrState = (typeof attrState === 'boolean') ? attrState : attrState === 'true';
        if (state === undefined) {
            state = attrState;
        } else {
            state = (typeof state === 'boolean' ? state : !attrState);
            target.setAttribute('state', state);
        }
        return state;
    }
};

export default Dom;