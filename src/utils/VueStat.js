/**
 * 统计
 * @author  YernSun(sunyueran@baidu.com)
 * @file    stat.js
 * @version 1.0
 */

/* eslint-disable fecs-properties-quote */
import qs from 'qs';
import {get} from '../utils/cookie';

/**
 * 判断是不是线上环境
 *
 * @return {bollean} 是不是线上环境
 */
function isOnlineEnv() {
    return window.location.hostname  === 'xiongzhang.baidu.com';
}

// 测试的时候发到@刘创机器上
const TEST_STAT_URL = 'http://cp01-rdqa04-dev103-liuchuang03.epc.baidu.com:8700/xzhstatistics/rp';
const prefix = isOnlineEnv() ? '//' + window.location.hostname + '/xzhstatistics/rp' : TEST_STAT_URL;

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

/**
 * 发起统计
 *
 * @param {Object} params 统计所用的字段
 */
export function stat(params) {
    // 获取每次浏览页面时的pv id，用于关联标记在此路由上的所有点击类型的流量
    // 一次页面浏览 会对应跟多次页面内点击，多次浏览同一个页面，同一个位置的点击s_id_ext1也不同
    let uniquePageid = '';
    try {
        uniquePageid = get('s_id_ext1') || '';
    }
    catch (error) {
        uniquePageid = '';
    }

    // 默认统计字段
    // 接口文档和统计字段 http://wiki.baidu.com/pages/viewpage.action?pageId=488928105 @rd liuchuang

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
        'ext': '',
        's_id_ext1': uniquePageid
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

/**
 * 用于Vue全局安装此统计插件的公开方法
 *
 * @param {Object} Vue Vue构造器
 * @param {?Object} options 可选的选项对象
 */
export function install(Vue, options) {
        Vue.prototype.$stat = stat;
    }

/* eslint-enable fecs-properties-quote */

