/**
 * Created by Administrator on 2015/12/18.
 */
flex.module('config').define(() =>{
    /**
     * playerWidth | playerHeight = -1:100% || number
     *
     */
    flex.config = {
        enabled:                true,
        seekTime:               10,
        volume:                 5,
        poster:                 "",
        menu:                   true,
        click:                  true,
        tooltips:               false,
        autoPlay:               false,
        displayDuration:        true,
        duration:               0,
        size:                   0,
        offsetProgress:         0,
        playerWidth:            0,
        playerHeight:           0,
        videoWidth:             0,
        videoHeight:            0,
        playerAdWidth:          0,
        playerAdHeight:         0,
        controlHeight:          48,
        iconPrefix:             'icon',
        selectors: {
            container:          '.flex-player',
            controls:           '.player-controls',
            controlsAd:         '.player-controls-ad',
            labels:             '[data-player] .sr-only, label',
            buttons: {
                seek:           '[data-player="seek"]',
                play:           '[data-player="play"]',
                pause:          '[data-player="pause"]',
                restart:        '[data-player="restart"]',
                rewind:         '[data-player="rewind"]',
                forward:        '[data-player="fast-forward"]',
                mute:           '[data-player="mute"]',
                volume:         '[data-player="volume"]',
                quality:        '[data-player="quality"]',
                fullscreen:     '[data-player="fullscreen"]',
                muteAd:         '[data-player="mute-ad"]',
                fullscreenAd:   '[data-player="fullscreen-ad"]',
                jumpToAd:       '[data-player="jumpTo"]'
            },
            progress: {
                container:      '.player-progress',
                buffer:         '.player-progress-buffer',
                played:         '.player-progress-played'
            },
            currentTime:        '.player-current-time',
            duration:           '.player-duration'
        },
        classes: {
            videoWrapper:       'player-video-wrapper',
            embedWrapper:       'player-video-embed',
            adVideoWrapper:     'player-adVideo-wrapper',
            loaderLayer:        'player-loader-layer',
            videoOverlay:       'player-video-overlay',
            coverLayer:         'player-cover-layer',
            popLayer:           'player-pop-layer',
            pauseAdWrapper:     'player-pause-ad',
            adCountDown:        'player-ad-countdown',
            type:               'player-{0}',
            stopped:            'stopped',
            playing:            'playing',
            muted:              'muted',
            mutedAd:            'mutedAd',
            loading:            'loading',
            tooltip:            'player-tooltip',
            hidden:             'sr-only',
            hideConver:         'hide',
            qualityList:        'player-qualityList',
            hover:              'player-hover',
            fullscreen: {
                enabled:        'fullscreen-enabled',
                active:         'fullscreen-active',
                hideControls:   'fullscreen-hide-controls'
            }
        },
        fullscreen: {
            enabled:            true,
            fallback:           true,
            hideControls:       true
        },
        storage: {
            enabled:            true,
            key:                'player_volume'
        },
        controls:               ['restart', 'rewind', 'play', 'fast-forward', 'current-time', 'duration', 'mute', 'volume','quality', 'captions', 'fullscreen'],
        cn: {
            restart:            '重播',
            rewind:             '后退 {seektime} 秒',
            play:               '播放',
            pause:              '暂停',
            forward:            '前进 {seektime} 秒',
            played:             '已播放',
            buffered:           '已缓冲',
            currentTime:        '当前时间',
            duration:           '总时间',
            volume:             '音量',
            toggleMute:         '开关静音',
            quality:            '清晰度',
            toggleFullscreen:   '开关全屏'
        },
        i18n: {
            restart:            'Restart',
            rewind:             'Rewind {seektime} secs',
            play:               'Play',
            pause:              'Pause',
            forward:            'Forward {seektime} secs',
            played:             'played',
            buffered:           'buffered',
            currentTime:        'Current time',
            duration:           'Duration',
            volume:             'Volume',
            toggleMute:         'Toggle Mute',
            toggleFullscreen:   'Toggle Fullscreen'
        }
    };
});