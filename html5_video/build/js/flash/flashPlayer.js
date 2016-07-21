'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/4/20.
 */
flex.module('flash.flashPlayer').requires('flash.flashUI').define(function () {
    var flashPlayer = null,
        defaultValue = {
        id: '173player' + new Date().getTime(),
        flashvars: {},
        paras: {
            quality: 'high',
            bgcolor: '#131313',
            allowscriptaccess: 'always',
            allowfullscreenInteractive: 'true',
            wmode: 'transparent'
        }
    };

    flex.Class.FlashPlayer = function () {
        function _class(container, url, options) {
            _classCallCheck(this, _class);

            this.container = container;
            this.options = typeof options == 'undefined' ? defaultValue : flex.merge(defaultValue, options);
            this.id = this.options.id;
            this.url = url;

            this.flashUi = new flex.Class.FlashUI(this.url, this.options);
            flex.flashPlayer = flashPlayer = this;
            return this;
        }

        _createClass(_class, [{
            key: 'startup',
            value: function startup() {
                if (!this.container) {
                    flex.log('[FLASH] container is null', flex.log.levels.ERROR);
                    return false;
                }
                this.container.innerHTML = this.flashUi.startup();
            }
        }, {
            key: 'ready',
            value: function ready() {
                this.movie = flex.getElementById(this.id);
            }
        }, {
            key: 'html',
            value: function html() {
                return this.flashUi.html();
            }
        }, {
            key: 'getPlayedTime',
            value: function getPlayedTime() {
                return this.movie.getPlayedTime();
            }
        }, {
            key: 'pause',
            value: function pause() {
                if (this.movie) {
                    this.movie.setPause();
                }
            }
        }, {
            key: 'pauseWithoutAd',
            value: function pauseWithoutAd() {
                if (this.movie) {
                    this.movie.setPauseOnly();
                }
            }
        }, {
            key: 'pauseAdToPlay',
            value: function pauseAdToPlay() {
                if (this.movie) {
                    this.movie.toPlay();
                }
            }
        }, {
            key: 'play',
            value: function play(n) {
                if (this.movie) {
                    this.movie.setPlay(n);
                }
            }
        }, {
            key: 'setUserId',
            value: function setUserId(v) {
                if (this.movie) {
                    this.movie.onUserStatus(v);
                }
            }
        }, {
            key: 'stop',
            value: function stop() {
                if (this.movie) {
                    this.movie.setEnd();
                }
            }
        }]);

        return _class;
    }();
});