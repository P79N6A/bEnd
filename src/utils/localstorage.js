/**
 * @file localstorage.js
 * @author huangjing<huangjing02@baidu.com>
 */

let setItem;
let getItem;


try {
    // 这里如果仅用了localStorage，只要读取就报异常，就加了try catch
    if (window.localStorage) {
        setItem = (key, value) => {
            window.localStorage.setItem(key, value);
        };
        getItem = key => window.localStorage.getItem(key);
    }
    else {
        setItem = () => {};
        getItem = () => null;
    }
}
catch (e) {
    setItem = () => {};
    getItem = () => null;
}

export default {
    setItem,
    getItem
};
