/**
 * @file proxy.js
 * @author Bend
 */

module.exports = {
    hosts: {
        test: {
            proxy: 'http://cp01-rdqa-dev301-xingbaoping.epc.baidu.com/',
            receiver: 'http://cp01-rdqa-dev301-xingbaoping.epc.baidu.com:8500/receiver.php',
            path: '/home/users/xingbaoping/search/officeplatform/data'
        }
    },
    use: 'test'
};
