/**
 * @file cookie.js
 * @author huangjing<huangjing02@baidu.com>
 */

function isValidKey(key) {
    return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24')).test(key);
}

export function getRaw(key) {
    if (isValidKey(key)) {
        let pattern = new RegExp('(^| )' + key + '=([^;]*)(;|\x24)');
        let result = pattern.exec(document.cookie);
        if (result) {
            return result[2] || null;
        }
    }
    return null;
}

export function get(key) {
    let value = getRaw(key);
    if ('string' === typeof value) {
        value = decodeURIComponent(value);
        return value;
    }
    return null;
}

export function setRaw(key, value, payload = {}) {
    if (!isValidKey(key)) {
        return;
    }

    let date = payload.expires;
    if ('number' === typeof payload.expires) {
        date = new Date();
        date.setTime(date.getTime() + payload.expires);
    }
    document.cookie = key + '=' + value + (payload.path ? '; path=' + payload.path : '')
        + (date ? '; expires=' + date.toGMTString() : '')
        + (payload.domain ? '; domain=' + payload.domain : '')
        + (payload.secure ? '; secure' : '');
}

export function set(key, value, payload) {
    setRaw(key, encodeURIComponent(value), payload);
}


export function remove(key, payload = {}) {
    payload.expires = new Date(0);
    setRaw(key, '', payload);
}






