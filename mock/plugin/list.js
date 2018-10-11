/**
 * @file list.js 插件列表
 * @desc api plugin list
 * @author Bend
*/

module.exports = function () {
    return {
        code: 0,
        msg: '',
        data: {
            total: 20,
            pn: 1,
            ps: 14,
            list: [{
                pluginId: 4,
                name: 'aaa',
                desc: 'Bend解决方案，让B端平台用户降低理解成本，简化操作步骤，缩短跳转流程，从而快捷、方便、个性、定制化地享受线上运营服务',
                avatar: 'http://www.ld12.com/upimg358/allimg/c150617/143452O0515030-31O50.jpg',
                isAdd: 0,
                relApplies: [{
                    id: '1',
                    desc: '完成Bend认证'
                },
                {
                    id: '2',
                    desc: '注册Bend高级认证用户'
                }]
            }]
        }
    };
};
