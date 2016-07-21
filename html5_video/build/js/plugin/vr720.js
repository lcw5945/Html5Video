'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Cray on 2016/3/9.
 */
flex.module('plugin.vr720').requires('config').define(function () {
    var _camera,
        _scene,
        _renderer,
        _mesh,
        config = null;
    var _texture;

    var isUserInteracting = false,
        mouseX = 0,
        mouseY = 0,
        lon = 0,
        tempLon = 0,
        lat = 0,
        tempLat = 0,
        phi = 0,
        theta = 0;

    flex.Class.VR720 = function () {
        function _class() {
            _classCallCheck(this, _class);

            config = flex.config;
            this.init();
        }

        /**
         * 初始化
         */


        _createClass(_class, [{
            key: 'init',
            value: function init() {
                flex.log('[VR] init VR plugin');

                //如果媒体为空
                if (!flex.iplayer && !flex.iplayer.media) {
                    return null;
                }
                //如果已初始化
                if (this.initfinish) {
                    return null;
                }
                //移除媒体
                flex.remove(flex.iplayer.media);

                _camera = new THREE.PerspectiveCamera(75, config.videoWidth / config.videoHeight, 1, 2000);
                _camera.target = new THREE.Vector3(0, 0, 0);
                _scene = new THREE.Scene();
                var geometry = new THREE.SphereGeometry(500, 60, 40);
                geometry.scale(-1, 1, 1);
                geometry.rotateY(3.1);

                _texture = new THREE.VideoTexture(flex.iplayer.media);
                _texture.minFilter = THREE.LinearFilter;
                var material = new THREE.MeshBasicMaterial({ map: _texture });

                _mesh = new THREE.Mesh(geometry, material);
                _scene.add(_mesh);

                _renderer = new THREE.WebGLRenderer();
                _renderer.setPixelRatio(window.devicePixelRatio);
                _renderer.setSize(config.videoWidth, config.videoHeight);
                flex.player.videoContainer.appendChild(_renderer.domElement);

                var playerOverLayer = flex.newElement('div');
                flex.player.container.insertBefore(playerOverLayer, flex.player.controls);
                playerOverLayer.setAttribute('class', config.classes.videoOverlay);

                flex.on(flex.Event.RESIZE, onPlayerResizeHandler);

                flex.on(playerOverLayer, 'mousedown', onMouseDownHandler);
                flex.on(playerOverLayer, 'mousemove', onMouseMoveHandler);
                flex.on(playerOverLayer, 'mouseup mouseout', onMouseUpHandler);
                flex.on(playerOverLayer, 'mousewheel MozMousePixelScroll', onMouseWheelHandler);

                this.initfinish = true;

                enterFrame();

                onPlayerResizeHandler();
            }
        }]);

        return _class;
    }();

    /**
     * 进入帧动画
     */
    function enterFrame() {
        requestAnimationFrame(enterFrame);
        render();
    }

    /**
     * 渲染
     */
    function render() {

        lat = Math.max(-85, Math.min(85, lat));
        phi = THREE.Math.degToRad(90 - lat);
        theta = THREE.Math.degToRad(lon);

        _camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
        _camera.target.y = 500 * Math.cos(phi);
        _camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);

        _camera.lookAt(_camera.target);
        _renderer.render(_scene, _camera);
    }
    /**
     * 播放器大小改变
     */
    function onPlayerResizeHandler() {
        var w, h;
        if (flex.player.isFullscreen) {
            w = window.innerWidth;
            h = window.innerHeight;
        } else {
            w = config.videoWidth;
            h = config.videoHeight;
        }

        _camera.aspect = w / h;
        _camera.updateProjectionMatrix();
        _renderer.setSize(w, h);
    }
    /**
     * 鼠标按下事件
     */
    function onMouseDownHandler(event) {
        event.preventDefault();
        isUserInteracting = true;
        mouseX = event.clientX;
        mouseY = event.clientY;

        tempLon = lon;
        tempLat = lat;
    }
    /**
     * 鼠标移动事件
     */
    function onMouseMoveHandler(event) {
        if (isUserInteracting === true) {
            lon = (mouseX - event.clientX) * 0.1 + tempLon;
            lat = (event.clientY - mouseY) * 0.1 + tempLat;
        }
    }
    /**
     * 鼠标抬起事件
     */
    function onMouseUpHandler(event) {
        event.preventDefault();
        isUserInteracting = false;
    }
    /**
     * 鼠标滚轮事件
     */
    function onMouseWheelHandler(event) {
        // WebKit
        if (event.wheelDeltaY) {
            _camera.fov -= event.wheelDeltaY * 0.05;
            // Opera / Explorer 9
        } else if (event.wheelDelta) {
                _camera.fov -= event.wheelDelta * 0.05;
                // Firefox
            } else if (event.detail) {
                    _camera.fov += (event.detail - 6) * 0.1;
                }
        _camera.updateProjectionMatrix();
    }
});