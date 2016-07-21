/**
 * Created by Cray on 2016/5/9.
 */
class BufferUtils {

    static bufferInfo(media, pos,maxHoleDuration) {
        if (media) {
            let vbuffered = media.buffered, buffered = [],i;
            for (i = 0; i < vbuffered.length; i++) {
                buffered.push({start: vbuffered.start(i), end: vbuffered.end(i)});
            }
            return this.bufferedInfo(buffered,pos,maxHoleDuration);
        } else {
            return {len: 0, start: 0, end: 0, nextStart : undefined} ;
        }
    }

    static bufferedInfo(buffered,pos,maxHoleDuration) {
        let buffered2 = [],
            bufferLen,bufferStart, bufferEnd,bufferStartNext,i;
        buffered.sort(function (a, b) {
            let diff = a.start - b.start;
            if (diff) {
                return diff;
            } else {
                return b.end - a.end;
            }
        });
        for (i = 0; i < buffered.length; i++) {
            let buf2len = buffered2.length;
            if(buf2len) {
                let buf2end = buffered2[buf2len - 1].end;
                if((buffered[i].start - buf2end) < maxHoleDuration) {
                    if(buffered[i].end > buf2end) {
                        buffered2[buf2len - 1].end = buffered[i].end;
                    }
                } else {
                    buffered2.push(buffered[i]);
                }
            } else {
                buffered2.push(buffered[i]);
            }
        }
        for (i = 0, bufferLen = 0, bufferStart = bufferEnd = pos; i < buffered2.length; i++) {
            let start =  buffered2[i].start,
                end = buffered2[i].end;
            if ((pos + maxHoleDuration) >= start && pos < end) {
                bufferStart = start;
                bufferEnd = end;
                bufferLen = bufferEnd - pos;
            } else if ((pos + maxHoleDuration) < start) {
                bufferStartNext = start;
                break;
            }
        }
        return {len: bufferLen, start: bufferStart, end: bufferEnd, nextStart : bufferStartNext};
    }

}

export default BufferUtils;