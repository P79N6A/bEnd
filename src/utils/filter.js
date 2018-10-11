/**
 * 全局filter
 * @file filter.js
 * @author YongZhang(zhangyong06@baidu.com)
 */
import Vue from 'vue';

import moment from 'moment';

Vue.filter('dateFormat', (datetime, format) => {
    if (/^\d{10}$/.test(datetime)) {
        datetime *= 1000;
    }
    return moment(datetime).format(format || 'YYYY-MM-DD');
});

Vue.filter('truncation', function (str = '', len = 10) {
    let strLen = str.length;

    return strLen > len
        ? str.slice(0, len - 1) + '...'
        : str;
});
