/**
 * Created by Cray on 2016/5/9.
 */
import Logger from './log';

class ListUtils {

    static mergeDetails(oldDetails,newDetails) {
        let start = Math.max(oldDetails.startSN,newDetails.startSN)-newDetails.startSN,
            end = Math.min(oldDetails.endSN,newDetails.endSN)-newDetails.startSN,
            delta = newDetails.startSN - oldDetails.startSN,
            oldfragments = oldDetails.fragments,
            newfragments = newDetails.fragments,
            ccOffset =0,
            PTSFrag;

        if ( end < start) {
            newDetails.PTSKnown = false;
            return;
        }

        for(let i = start ; i <= end ; i++) {
            let oldFrag = oldfragments[delta+i],
                newFrag = newfragments[i];
            ccOffset = oldFrag.cc - newFrag.cc;
            if (!isNaN(oldFrag.startPTS)) {
                newFrag.start = newFrag.startPTS = oldFrag.startPTS;
                newFrag.endPTS = oldFrag.endPTS;
                newFrag.duration = oldFrag.duration;
                PTSFrag = newFrag;
            }
        }

        if(ccOffset) {
            Logger.log(`discontinuity sliding from playlist, take drift into account`);
            for(let j = 0 ; j  < newfragments.length ; j ++) {
                newfragments[j].cc += ccOffset;
            }
        }

        if(PTSFrag) {
            ListUtils.updateFragPTS(newDetails,PTSFrag.sn,PTSFrag.startPTS,PTSFrag.endPTS);
        } else {
            if (delta >= 0 && delta < oldfragments.length) {
                let sliding = oldfragments[delta].start;
                for(let m = 0 ; m < newfragments.length ; m++) {
                    newfragments[m].start += sliding;
                }
            }
        }
        newDetails.PTSKnown = oldDetails.PTSKnown;
        return;
    }

    static updateFragPTS(details,sn,startPTS,endPTS) {
        var fragIdx, fragments, frag, i;
        if (sn < details.startSN || sn > details.endSN) {
            return 0;
        }
        fragIdx = sn - details.startSN;
        fragments = details.fragments;
        frag = fragments[fragIdx];
        if(!isNaN(frag.startPTS)) {
            startPTS = Math.min(startPTS,frag.startPTS);
            endPTS = Math.max(endPTS, frag.endPTS);
        }

        var drift = startPTS - frag.start;

        frag.start = frag.startPTS = startPTS;
        frag.endPTS = endPTS;
        frag.duration = endPTS - startPTS;
        for(i = fragIdx ; i > 0 ; i--) {
            ListUtils.updatePTS(fragments,i,i-1);
        }

        for(i = fragIdx ; i < fragments.length - 1 ; i++) {
            ListUtils.updatePTS(fragments,i,i+1);
        }
        details.PTSKnown = true;

        return drift;
    }

    static updatePTS(fragments,fromIdx, toIdx) {
        var fragFrom = fragments[fromIdx],fragTo = fragments[toIdx], fragToPTS = fragTo.startPTS;
        if(!isNaN(fragToPTS)) {
            if (toIdx > fromIdx) {
                fragFrom.duration = fragToPTS-fragFrom.start;
                if(fragFrom.duration < 0) {
                    Logger.error(`negative duration computed for frag ${fragFrom.sn},level ${fragFrom.level}, there should be some duration drift between playlist and fragment!`);
                }
            } else {
                fragTo.duration = fragFrom.start - fragToPTS;
                if(fragTo.duration < 0) {
                    Logger.error(`negative duration computed for frag ${fragTo.sn},level ${fragTo.level}, there should be some duration drift between playlist and fragment!`);
                }
            }
        } else {
            if (toIdx > fromIdx) {
                fragTo.start = fragFrom.start + fragFrom.duration;
            } else {
                fragTo.start = fragFrom.start - fragTo.duration;
            }
        }
    }
}

export default ListUtils;