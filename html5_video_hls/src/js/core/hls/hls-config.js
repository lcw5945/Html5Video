/**
 * Created by Cray on 2016/5/5.
 */

const hlsConfig = {
    debug: false,
    maxBufferLength: 30,
    maxBufferSize: 60 * 1000 * 1000,
    maxBufferHole: 0.5,
    maxSeekHole: 2,
    seekHoleNudgeDuration : 0.01,
    maxFragLookUpTolerance : 0.2,
    liveSyncDurationCount:3,
    liveMaxLatencyDurationCount: Infinity,
    liveSyncDuration: undefined,
    liveMaxLatencyDuration: undefined,
    maxMaxBufferLength: 600,
    manifestLoadingTimeOut: 10000,
    manifestLoadingMaxRetry: 1,
    manifestLoadingRetryDelay: 1000,
    levelLoadingTimeOut: 10000,
    levelLoadingMaxRetry: 4,
    levelLoadingRetryDelay: 1000,
    fragLoadingTimeOut: 20000,
    fragLoadingMaxRetry: 6,
    fragLoadingRetryDelay: 1000,
    fragLoadingLoopThreshold: 3,
    startFragPrefetch : false,
    appendErrorMaxRetry: 3
};

export default hlsConfig;