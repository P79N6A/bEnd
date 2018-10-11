/**
 * router
 * @author zhangyong06
 * @file router index
 */
/* eslint-disable fecs-properties-quote */
import Vue from 'vue';
import Router from 'vue-router';
import Dui from '@baidu/cambrian-dui';
import routerMap from './routerMap';

Vue.use(Router);

const instanceAfter = (router, store) => {
    router.beforeEach((to, from, next) => {
        Dui.LoadingBar.start();
        let plugins = store.state.Menu.plugins;
        // 路由&权限merge
        if (plugins && !plugins[to.meta.auth] && to.name !== 'NotFound') {
            next({path: '/'});
        }
        let account = store.state.Account.officeInfo;

        if (!to.query.officeId && account && account.office_id) {
            to.query.officeId = account.office_id;
            next({
                name: to.name,
                path: to.path,
                query: to.query,
                params: to.params
            });
        }
        next();
    });

    router.afterEach((route, from) => {
        if (store.state.loading === true) {
            Dui.LoadingBar.finish();
        }

        let dom = document.getElementById('container');
        if (dom) {
            dom.scrollTop = 0;
        }
    });

};

export default {
    init(store) {
        const router = new Router(routerMap);
        instanceAfter(router, store);
        return router;
    }
};
