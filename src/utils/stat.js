/**
 * 统计
 * @author  YernSun(sunyueran@baidu.com)
 * @file    stat.js
 * @version 1.0
 */

/* eslint-disable fecs-properties-quote */
import qs from 'qs';

const prefix = '//' + 'xiongzhang.baidu.com' + '/xzhstatistics/rp';
let pageData = window._pageData || {};
let userInfo = {};

try {
    userInfo.bdstoken = pageData.bdstoken || '';
    userInfo.officeId = pageData.officeInfo.office_id || '';
}
catch (error) {
    userInfo = {
        bdstoken: '',
        officeId: ''
    };
}

export function stat(params) {
    // 默认统计字段
    // 接口文档和统计字段 http://wiki.baidu.com/pages/viewpage.action?pageId=488985187 @rd liuchuang

    const defaultField = {
        'pid': 66,
        'sub_pid': 2,
        'log_type': 2,
        'source': '',
        'sub_source': '',
        's_type': 'click',
        's_id': userInfo.officeId,
        'c_page': 'common_page',
        'c_url': window.location.href,
        'j_url': '',
        'mod_tag': '',
        'mod': '',
        'cli_pos': '',
        'time_used': '',
        'ts': Math.floor(Date.now() / 1000),
        'ext': ''
    };
    // 所有统计字段
    const all = Object.assign({}, defaultField, params);
    const img = new Image();

    img.src = prefix + '?' + qs.stringify(all);
    window.XZStatImg = img;
    img.onload = img.onerror = img.onabort = () => {
        window.XZStatImg = null;
    };
}
/* eslint-enable fecs-properties-quote */

