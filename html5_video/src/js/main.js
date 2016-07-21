/**
 * Created by Cray on 2016/1/4.
 */
flex.module('main').requires('base.sprite, config, business.winInterface, business.stat, events, flash.flashProxy, manager.errorManager, manager.adManager, manager.businessManager, manager.controlManager, manager.dataDispatcher, manager.playerManager, manager.skinManager, manager.uiManager').define(() => {

    class Main extends flex.Class.Sprite{
        constructor(){
            super();
        }

        startup(options){
            flex.log('[Main] main startup');
            _init();

            if (!flex.config.enabled || !flex.supported.full) {
                flex.log('[Main] the browser does not support.', flex.log.levels.WARN);

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
    function _init(){
       let VLOG = {"videoBase64Id":"MzM0NTQ4OTI","videoId":33454892,"title":"花泽香菜新歌 《闪耀未来~前进吧！钢铁少女~》","playUrl":"http://v.17173.com/v_4_4041520/MzM0NTQ4OTI.html","cate":"4_4041520"},
        LDomain = {"admin":"v.17173.com","vlog":"v.17173.com","portal":"v.17173.com","jsVersion":"2016040102","cssVersion":"2016020101","swfVersion":"20160407","imgVersion":"201404221","img":"i1.v.17173cdn.com","css":"c.v.17173cdn.com","js":"j.v.17173cdn.com","swf":"f.v.17173cdn.com","payCurrencyName":"金币","settleCurrencyName":"金豆","gBao":"G宝","QQNum":"0"};

        flex.global.LDomain = flex.global.LDomain || LDomain;
        flex.global.VLOG = flex.global.VLOG || VLOG;
        //video container
        flex.element.box = flex.getElementById('video_box');
        //window interface
        flex.winIfs = new flex.Class.WinInterface();
    }

    /**
     * 创建容器
     * @private
     */
    function _createContainer(){
        let container = flex.newElement('div');
        container.setAttribute('class', 'player flex-player');
        flex.element.box.appendChild(container);

        //container size
        let w, h;
        w = flex.element.box.offsetWidth;
        h = flex.element.box.offsetHeight;
        flex.css(container, {width: w + 'px', height: h + 'px'});
        flex.element.container =  container;
    }

    /**
     * 初始化config文件
     * @private
     */
    function _initConfig(options){
        flex.config = flex.merge(flex.config, options);
        //cid编码
        flex.config.cid = flex.Base64.decode(flex.global.VLOG.videoBase64Id);
        //video size
    }

    /**
     * 启动flash播放器
     * @private
     */
    function _startupFlashPlaer(){
        flex.log('[Main] startup flash player.');

        new flex.Class.FlashProxy();
    }

    /**
     * 添加监听
     * @private
     */
    function _addListener(){
        flex.on(flex.Event.RESTART_FLASH, _startupFlashPlaer);
    }

    /**
     * 注入对象
     */
    function _injectContext(){
        flex.adMgr = new flex.Class.AdManager();
        flex.skinMgr = new flex.Class.SkinManager();
        flex.busiMgr = new flex.Class.BussinessManager();
        flex.controlMgr = new flex.Class.ControlManager();
        flex.dataDsp = new flex.Class.DataDispatcher();
        flex.errMgr = new flex.Class.ErrorManager();
        flex.uiMgr = new flex.Class.UIManager();
        flex.playerMgr = new flex.Class.PlayerManager();
        flex.stat = new flex.Class.Stat();
    }

    /**
     * 开始业务逻辑
     * @private
     */
    function _startBussiness(){
        //初始化业务
        flex.busiMgr.startup();
    }

    /** {debug:true|false, volume: 0-10} **/
    (new Main()).startup({
        debug:          true,
        ad:             true,
        autoPlay:       true,
        poster:         "../testData/playboy.jpg",
        cover:          "../testData/cover.png",
        skin:           "assets/sprite.svg",
        def:            1,
        menu:           false,
        volume:         6,
        title:          "Video demo",
        ctrlHTML:       templates['controls'].render({}),
        ctrlAdHTML:     templates['controls_ad'].render({}),
        tooltips:       true,
        cid:            "MzM0NTQ4OTI",
        videoSourceUrl: "../testData/video.json?cid={0}",
        adSourceUrl:    "../testData/ad9.json?user=||17173_video&db=17173im&border=0&local=list&t=129&kv=cid|{0}",
        recSourceUrl:   "../testData/api/video/moreVideo/id/{0}"
    });
});