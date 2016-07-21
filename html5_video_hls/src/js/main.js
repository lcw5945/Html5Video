/**
 * Created by Cray on 2016/1/4.
 */
import Hls from './core/hls/hls';
import Logger from './core/utils/log';
import Dom from './core/utils/dom';
import Sprite from './core/sprite';
import Utils from './core/utils/utils';
import Context from './core/context';
import WinInterface from './com/business/winInterface';
import config from './config';
import Base64 from './core/utils/base64';
import FlashProxy from './com/flash/flashProxy';
import PEvent from './events';
import Manager  from './com/manager/';
import Stat from './com/business/stat';

class Main extends Sprite {
    constructor() {
        super();
    }

    startup(options) {
        Logger.log('[Main] main startup');

        _init();

        if (this.supported.full) {
            Logger.warn('[Main] the browser does not support.');

            _startupFlashPlaer();
            return false;
        }
        //添加监听器
        _addListener();
        _initConfig(options);
        _createContainer();

        //初始化管理对象
        _injectContext();
        //开始业务
        _startBussiness();
    }
}

/**
 * 初始化环境
 * @private
 */
function _init() {
    let VLOG = {
            "videoBase64Id": "MzM0NTQ4OTI",
            "videoId": 33454892,
            "title": "花泽香菜新歌 《闪耀未来~前进吧！钢铁少女~》",
            "playUrl": "http://v.17173.com/v_4_4041520/MzM0NTQ4OTI.html",
            "cate": "4_4041520"
        },
        LDomain = {
            "admin": "v.17173.com",
            "vlog": "v.17173.com",
            "portal": "v.17173.com",
            "jsVersion": "2016040102",
            "cssVersion": "2016020101",
            "swfVersion": "20160407",
            "imgVersion": "201404221",
            "img": "i1.v.17173cdn.com",
            "css": "c.v.17173cdn.com",
            "js": "j.v.17173cdn.com",
            "swf": "f.v.17173cdn.com",
            "payCurrencyName": "金币",
            "settleCurrencyName": "金豆",
            "gBao": "G宝",
            "QQNum": "0"
        };

    window.LDomain = window.LDomain || LDomain;
    window.VLOG = window.VLOG || VLOG;
    //video container
    Context.element.box = Dom.getElementById('video_box');
    //window interface
    Context.winIfs = new WinInterface();
}

/**
 * 创建容器
 * @private
 */
function _createContainer() {
    let container = Dom.newElement('div');
    container.setAttribute('class', 'player flex-player');
    Context.element.box.appendChild(container);

    //container size
    let w, h;
    w =  Context.element.box.offsetWidth;
    h =  Context.element.box.offsetHeight;
    Dom.css(container, {width: w + 'px', height: h + 'px'});
    Context.element.container = container;
}

/**
 * 初始化config文件
 * @private
 */
function _initConfig(options) {
    Context.config = Utils.merge(config, options);
    //cid编码
    Context.config.cid = Base64.decode(window.VLOG.videoBase64Id);
    //video size
}

/**
 * 启动flash播放器
 * @private
 */
function _startupFlashPlaer() {
    Logger.log('[Main] startup flash player.');
    new FlashProxy();
}

/**
 * 添加监听
 * @private
 */
function _addListener() {
    Context.e.on(PEvent.RESTART_FLASH, _startupFlashPlaer);
}

/**
 * 注入对象
 */
function _injectContext() {
    Context.adMgr = new Manager.AdManager();
    Context.skinMgr = new Manager.SkinManager();
    Context.busiMgr = new Manager.BussinessManager();
    Context.controlMgr = new Manager.ControlManager();
    Context.dataDsp = new Manager.DataDispatcher();
    Context.errMgr = new Manager.ErrorManager();
    Context.uiMgr = new Manager.UIManager();
    Context.playerMgr = new Manager.PlayerManager();
    Context.stat = new Stat();
}

/**
 * 开始业务逻辑
 * @private
 */
function _startBussiness() {
    //初始化业务
    Context.busiMgr.startup();
}

/** {debug:true|false, volume: 0-10} **/
(new Main()).startup({
    debug: true,
    ad: true,
    autoPlay: true,
    poster: "../testData/playboy.jpg",
    cover: "../testData/cover.png",
    skin: "assets/sprite.svg",
    def: 1,
    menu: false,
    volume: 6,
    title: "Video demo",
    ctrlHTML: templates['controls'].render({}),
    ctrlAdHTML: templates['controls_ad'].render({}),
    tooltips: true,
    cid: "MzM0NTQ4OTI",
    videoSourceUrl: "http://10.12.68.30/video.json?cid={0}",
    adSourceUrl: "http://10.12.68.30/ad9.json?user=||17173_video&db=17173im&border=0&local=list&t=129&kv=cid|{0}",
    recSourceUrl: "http://v.17173.com/api/video/moreVideo/id/{0}"
});

