/**
 * @desc router
 * @author Bend
 * @file routerMap
*/
import NotFound from '@/components/NotFound';

export default {
    mode: window.historyDisable ? undefined : 'history',
    base: '/',
    routes: [{
        path: '/',
        name: 'home',
        meta: {auth: 'bend'},
        component: () => import('../views/Home')
    },
    {
        path: '/setting',
        name: 'setting',
        meta: {auth: 'bend'},
        component: () => import('../views/Setting')
    },
    {
        path: '/pluginlist',
        name: 'pluginlist',
        meta: {auth: 'bend'},
        component: () => import('../views/Pluginlist')
    },
    {
        path: '/pluginlist/detail',
        name: 'plugindetail',
        meta: {auth: 'bend'},
        component: () => import('../views/PluginDetail')
    },
    {
        path: '*',
        component: NotFound,
        meta: {auth: 'bend'},
        name: 'NotFound'
    }
]};
