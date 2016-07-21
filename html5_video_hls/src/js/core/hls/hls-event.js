/**
 * Created by Cray on 2016/5/5.
 */

import Event from '../events/event';
import Utils from '../utils/utils';

var HLSEvent = Utils.merge({
    MEDIA_SOURCE_OPEN: 'hlsMediaSource_open',
    BUFFER_CODECS: 'hlsBufferCodecs',
    BUFFER_APPENDING: 'hlsBufferAppending',
    BUFFER_APPENDED: 'hlsBufferAppended',
    BUFFER_EOS: 'hlsBufferEos',
    BUFFER_FLUSHING: 'hlsBufferFlushing',
    BUFFER_FLUSHED: 'hlsBufferFlushed',
    MANIFEST_LOADED: 'hlsManifestLoaded',
    MANIFEST_PARSED: 'hlsManifestParsed',
    LEVEL_LOADED: 'hlsLevelLoaded',
    LEVEL_UPDATED: 'hlsLevelUpdated',
    LEVEL_PTS_UPDATED: 'hlsLevelPtsUpdated',
    LEVEL_SWITCH: 'hlsLevelSwitch',
    SEG_LOAD_PROGRESS: 'hlsSegLoadProgress',
    SEG_LOADED: 'hlsSegLoaded',
    SEG_PARSING_INIT_SEGMENT: 'hlsSegParsingInitSegment',
    SEG_PARSING_USERDATA: 'hlsSegParsingUserdata',
    SEG_PARSING_METADATA: 'hlsSegParsingMetadata',
    SEG_PARSING_DATA: 'hlsSegParsingData',
    SEG_PARSED: 'hlsSegParsed',
    SEG_BUFFERED: 'hlsSegBuffered',
    SEG_CHANGED: 'hlsSegChanged',
    ERROR: 'hlsError',
    DESTROYING: 'hlsDestroying',
    KEY_LOADING: 'hlsKeyLoading',
    KEY_LOADED: 'hlsKeyLoaded'
}, Event);

export default HLSEvent;