/**
 * Created by Cray on 2016/4/21.
 */
import Event from './core/events/event';
import Utils from './core/utils/utils';

const PEvent = Utils.merge({
    RESIZE:             'resize',
    AD_COMPLETE:        'ad_complete',
    HIDE_COVER:         'hide_cover',
    RESTART_FLASH:      'restart_flash',
    PLAY_STATE:         'play_state',
    DATA_DIS_ERROR:     'data_dis_error'
}, Event);

export default PEvent;