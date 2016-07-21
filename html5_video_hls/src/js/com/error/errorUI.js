/**
 * Created by Cray on 2016/4/25.
 */
flex.module('error.errorUI').define(() => {

    flex.Class.ErrorUI = class {
        constructor() {
        }

        getHtmlByCode(code) {
            let html;
            if(code == '10000'){
                html = ['<div class="player-error-data">',
                    '    <img src="assets/errorImage.png">',
                    '    <p>抱歉，目前无法观看视频，您可以尝试 <a href=\'javascript:void(window.location.reload())\'>刷新</a> 操作。</p>',
                    '    <p>如果问题仍未解决，请 <a href=\'http://help.17173.com/help/wenti.shtml\' target="_blank">反馈</a> 给我们</p>',
                    '    <p>code {code}</p>',
                    '</div>'].join("");
            }else{
                html = ['<div class="player-error-data">',
                    '    <img src="assets/errorImage.png">',
                    '    <p>抱歉，该视频已被删除。</p>',
                    '    <p>如果有异议，请 <a href=\'http://help.17173.com/help/wenti.shtml\' target="_blank">反馈</a> 给我们</p>',
                    '    <p>code {code}</p>',
                    '</div>'].join("");
            }

            html = html.replace('{code}', code);
            return html;
        }
    }


});