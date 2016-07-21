var templates={};templates["controls"]=new Hogan.Template({code:function(n,s,b){var a=this;a.b(b=b||"");a.b('<div class="player-controls">');a.b("\n"+b);a.b('    <div class="player-progress">');a.b("\n"+b);a.b('        <label for="seek{id}" class="sr-only">寻址</label>');a.b("\n"+b);a.b('        <input id="seek{id}" class="player-progress-seek" type="range" min="0" max="100" step="0.5" value="0" data-player="seek">');a.b("\n"+b);a.b('        <progress class="player-progress-played" max="100" value="0">');a.b("\n"+b);a.b("            <span>0</span>% 已播放");a.b("\n"+b);a.b("        </progress>");a.b("\n"+b);a.b('        <progress class="player-progress-buffer" max="100" value="0">');a.b("\n"+b);a.b("            <span>0</span>% 已缓冲");a.b("\n"+b);a.b("        </progress>");a.b("\n"+b);a.b("    </div>");a.b("\n"+b);a.b('    <span class="player-controls-left">');a.b("\n"+b);a.b('        <button type="button" data-player="restart">');a.b("\n"+b);a.b('            <svg><use xlink:href="#icon-restart"></use></svg>');a.b("\n"+b);a.b('            <span class="sr-only">重播</span>');a.b("\n"+b);a.b("        </button>");a.b("\n"+b);a.b('        <button type="button" data-player="rewind">');a.b("\n"+b);a.b('            <svg><use xlink:href="#icon-rewind"></use></svg>');a.b("\n"+b);a.b('            <span class="sr-only">后退 {seektime} 秒</span>');a.b("\n"+b);a.b("        </button>");a.b("\n"+b);a.b('        <button type="button" data-player="play">');a.b("\n"+b);a.b('            <svg><use xlink:href="#icon-play"></use></svg>');a.b("\n"+b);a.b('            <span class="sr-only">播放</span>');a.b("\n"+b);a.b("        </button>");a.b("\n"+b);a.b('        <button type="button" data-player="pause">');a.b("\n"+b);a.b('            <svg><use xlink:href="#icon-pause"></use></svg>');a.b("\n"+b);a.b('            <span class="sr-only">暂停</span>');a.b("\n"+b);a.b("        </button>");a.b("\n"+b);a.b('        <button type="button" data-player="fast-forward">');a.b("\n"+b);a.b('            <svg><use xlink:href="#icon-fast-forward"></use></svg>');a.b("\n"+b);a.b('            <span class="sr-only">前进 {seektime} 秒</span>');a.b("\n"+b);a.b("        </button>");a.b("\n"+b);a.b('        <span class="player-time">');a.b("\n"+b);a.b('            <span class="sr-only">当前时间</span>');a.b("\n"+b);a.b('            <span class="player-current-time">00:00</span>');a.b("\n"+b);a.b("        </span>");a.b("\n"+b);a.b('        <span class="player-time">');a.b("\n"+b);a.b('            <span class="sr-only">总时间</span>');a.b("\n"+b);a.b('            <span class="player-duration">00:00</span>');a.b("\n"+b);a.b("        </span>");a.b("\n"+b);a.b("    </span>");a.b("\n"+b);a.b('    <span class="player-controls-right">');a.b("\n"+b);a.b('        <button type="button" data-player="quality">');a.b("\n"+b);a.b('            <span class="q-label"></span>');a.b("\n"+b);a.b('            <span class="player-qualityListWrap"></span>');a.b("\n"+b);a.b("        </button>");a.b("\n"+b);a.b('        <button type="button" data-player="mute">');a.b("\n"+b);a.b('            <svg class="icon-muted"><use xlink:href="#icon-muted"></use></svg>');a.b("\n"+b);a.b('            <svg><use xlink:href="#icon-volume"></use></svg>');a.b("\n"+b);a.b('            <span class="sr-only">开关静音</span>');a.b("\n"+b);a.b("        </button>");a.b("\n"+b);a.b('        <label for="volume{id}" class="sr-only">音量</label>');a.b("\n"+b);a.b('        <input id="volume{id}" class="player-volume" type="range" min="0" max="10" step="0.5" value="0" data-player="volume">');a.b("\n"+b);a.b('        <button type="button" data-player="fullscreen">');a.b("\n"+b);a.b('            <svg class="icon-exit-fullscreen"><use xlink:href="#icon-exit-fullscreen"></use></svg>');a.b("\n"+b);a.b('            <svg><use xlink:href="#icon-enter-fullscreen"></use></svg>');a.b("\n"+b);a.b('            <span class="sr-only">开关全屏</span>');a.b("\n"+b);a.b("        </button>");a.b("\n"+b);a.b("    </span>");a.b("\n"+b);a.b("</div>");a.b("\n");a.b("\n");return a.fl()},partials:{},subs:{}});templates["controls_ad"]=new Hogan.Template({code:function(n,s,b){var a=this;a.b(b=b||"");a.b('<div class="player-controls-ad">\r');a.b("\n"+b);a.b('    <span class="player-controls-ad-left">\r');a.b("\n"+b);a.b('        <button type="button" data-player="jumpTo">\r');a.b("\n"+b);a.b("            了解详情\r");a.b("\n"+b);a.b("        </button>\r");a.b("\n"+b);a.b("    </span>\r");a.b("\n"+b);a.b('    <span class="player-controls-ad-right">\r');a.b("\n"+b);a.b('        <button type="button" data-player="mute-ad">\r');a.b("\n"+b);a.b('            <svg class="icon-muted"><use xlink:href="#icon-muted"></use></svg>\r');a.b("\n"+b);a.b('            <svg><use xlink:href="#icon-volume"></use></svg>\r');a.b("\n"+b);a.b('            <span class="sr-only">静音</span>\r');a.b("\n"+b);a.b("        </button>\r");a.b("\n"+b);a.b('        <button type="button" data-player="fullscreen-ad">\r');a.b("\n"+b);a.b('            <svg class="icon-exit-fullscreen"><use xlink:href="#icon-exit-fullscreen"></use></svg>\r');a.b("\n"+b);a.b('            <svg><use xlink:href="#icon-enter-fullscreen"></use></svg>\r');a.b("\n"+b);a.b('            <span class="sr-only">全屏</span>\r');a.b("\n"+b);a.b("        </button>\r");a.b("\n"+b);a.b("    </span>\r");a.b("\n"+b);a.b("</div>\r");a.b("\n"+b);a.b("\r");a.b("\n");return a.fl()},partials:{},subs:{}});