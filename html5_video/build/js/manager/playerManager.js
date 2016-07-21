'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/1/19.
 */
flex.module('manager.playerManager').requires('base.player').define(function () {
    var _vInfos = [],
        _splitIndex = 0,
        _playingTime = 0,
        _currentTime = 0;

    flex.Class.PlayerManager = function () {
        function _class() {
            _classCallCheck(this, _class);
        }

        _createClass(_class, [{
            key: 'startup',
            value: function startup() {
                flex.log('[PM] init player manager');
                var ele = flex.element.container || flex.getElement(flex.config.selectors.container);
                if (typeof ele.player === 'undefined') {
                    flex.player = new flex.Class.Player(ele);
                    flex.player.startup();

                    if (!flex.iplayer) {
                        return false;
                    }

                    //启动win接口
                    flex.winIfs.startup(this);
                    flex.winIfs.ready();
                }

                this.setUpSource();
                flex.iplayer.setPoster(flex.data["videoData"]["picUrl"]);
                this.playSplit(0);
            }
        }, {
            key: 'ready',
            value: function ready() {}
        }, {
            key: 'setUserId',
            value: function setUserId() {}
        }, {
            key: 'playByTime',
            value: function playByTime(time) {
                var tempTime = 0;
                var totalSplitTime = 0;
                if (_vInfos.length > 0) {
                    flex.each(_vInfos, function (i, obj) {
                        totalSplitTime += parseInt(obj.duration);
                        if (time < totalSplitTime) {
                            _currentTime = time - tempTime;
                            flex.config.offsetProgress = tempTime;
                            flex.playerMgr.playSplit(i);
                            return false;
                        } else {
                            tempTime = totalSplitTime;
                        }
                    });
                } else {
                    _currentTime = time;
                }

                flex.log('[PM] ' + 'seek play time: ' + time + ' s');
            }
        }, {
            key: 'playNextSplit',
            value: function playNextSplit() {
                _splitIndex++;
                if (_splitIndex < _vInfos.length) {
                    this.playSplit(_splitIndex);
                    return true;
                }
                flex.log('[PM] nothing any split!');
                return false;
            }
        }, {
            key: 'playSplit',
            value: function playSplit(index) {
                flex.log('[PM] play the ' + index + ' split~');
                _splitIndex = index;
                //if (index != 0) {
                //    flex.iplayer.setPoster("loading.jpg");
                //}

                //flex.iplayer.setSource([{src:_vd.info[index].url[0], type: "video/mp4"},{src:_vd.info[index].url[1], type: "video/webm"}]);
                flex.iplayer.setSource([{ src: _vInfos[index].url[0], type: "video/mp4" }]);
                flex.on(flex.iplayer.media, 'loadedmetadata', function () {
                    if (_currentTime !== 0) {
                        try {
                            flex.iplayer.media.currentTime = _currentTime.toFixed(1);
                        } catch (e) {
                            flex.log('[PM] seek currentTime to: ' + _currentTime.toFixed(1) + ' s error');
                        }
                        _currentTime = 0;
                    }
                    if (flex.supported.full) {
                        flex.controlMgr.checkPlaying();
                        flex.controlMgr.updateTimeDisplay(flex.iplayer.media.currentTime + flex.config.offsetProgress, flex.iplayer.currentTime);
                    }

                    if (index == 0 && flex.config.autoPlay || index != 0) {
                        flex.iplayer.media.play();
                    }
                });
            }
        }, {
            key: 'playingTime',
            value: function playingTime(value) {
                if (value) {
                    _playingTime = value;
                }
                return _playingTime;
            }

            /**
             * 启动视频源
             */

        }, {
            key: 'setUpSource',
            value: function setUpSource() {
                _vInfos = flex.data["videoData"].currentVD["info"];
                var vd = flex.data["videoData"].currentVD;
                flex.config.duration = vd.duration || 0;
                flex.config.size = vd.size || 0;

                flex.supported.full && flex.controlMgr.displayDuration();
            }

            /**
             * 切换源
             * @param source
             */

        }, {
            key: 'switchSource',
            value: function switchSource(source) {
                if (source) {
                    flex.log('[PM] setup source');
                    flex.data["videoData"].currentVD = source;

                    this.setUpSource();
                    this.playByTime(this.playingTime());
                } else {
                    flex.log('[PM] source setup fail', true);
                }
            }
        }]);

        return _class;
    }();
});