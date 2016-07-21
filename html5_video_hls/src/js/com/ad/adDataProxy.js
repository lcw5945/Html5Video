/**
 * Created by Cray on 2016/4/6.
 */
flex.module('ad.adDataProxy').define(() => {

    var adType = {
        Q_F: 74,
        Q_S: 75,
        Z_C: 76,
        X_D: 78
    }; //前贴1 前贴2 暂停 底角

    /**
     * 好耶解析类
     */
    flex.Class.HaoyeParse = class {
        constructor(data){
            let adObj = {length: 0, totalTime: 0};
            data.forEach( (value) => {
                let chan = value['chan'];
                if(chan.id == adType.Q_F){
                    adObj[adType.Q_F] = new flex.Class.HaoyeData(chan);
                    adObj.totalTime += adObj[adType.Q_F]['time'];
                    adObj.length += 1;
                }else if(chan.id == adType.Q_S){
                    adObj[adType.Q_S] = new flex.Class.HaoyeData(chan);
                    adObj.totalTime += adObj[adType.Q_S]['time'];
                    adObj.length += 1;
                } else if(chan.id == adType.Z_C){
                    adObj[adType.Z_C] = new flex.Class.HaoyeData(chan);
                    adObj.length += 1;
                }
            });

            adObj['adType'] = adType;
            return adObj;
        }
    };

    /**
     * 好耶数据模型
     */
    flex.Class.HaoyeData = class {
        constructor(data){
            this.id = data.id;
            this.name = data.name;
            this.type = null;
            this.sc = data.sc;
            this.cc = data.cc;
            this.tsc = data.trd.u;

            this.url = data.custom.u;
            this.time = data.custom.t;
            this.extension = data.custom.e;
            this.round = data.custom.r;
            this.jumpTo = data.custom.j;

        }
    }
});