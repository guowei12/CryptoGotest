import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/home.vue';
import 'nprogress/nprogress.css';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '系统首页',
                    noAuth: true,
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard/dashboard.vue'),
            },
            {
                path: '/payment',
                name: 'payment',
                meta: {
                    title: 'Payment',
                    permiss: '11',
                },
                component: () => import(/* webpackChunkName: "system-user" */ '../views/system/user.vue'),
            },
            {
                path: '/refund',
                name: 'refund',
                meta: {
                    title: 'Refund',
                    permiss: '12',
                },
                component: () => import(/* webpackChunkName: "system-role" */ '../views/system/role.vue'),
            },
            // {
            //     path: '/ucenter',
            //     name: 'ucenter',
            //     meta: {
            //         title: '个人中心',
            //     },
            //     component: () => import(/* webpackChunkName: "ucenter" */ '../views/pages/ucenter.vue'),
            // },
            {
                path: '/account',
                name: 'account',
                meta: {
                    title: 'account',
                    noAuth: true,
                },
                component: () => import(/* webpackChunkName: "import" */ '../views/account/account.vue'),
            },
            {
                path: '/theme',
                name: 'theme',
                meta: {
                    title: 'theme',
                    permiss: '7',
                },
                component: () => import(/* webpackChunkName: "theme" */ '../views/pages/theme.vue'),
            },

            {
                path: '/balance',
                name: 'balance',
                meta: {
                    title: 'balance',
                    permiss: '28',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/settlement/balance.vue'),
            },
            {
                path: '/createMerchant',
                name: 'createMerchant',
                meta: {
                    title: 'createMerchant',
                    permiss: '29',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/management/createMerchant.vue'),
            },
            {
                path: '/merchantList',
                name: 'merchantList',
                meta: {
                    title: 'merchantList',
                    permiss: '29',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/management/merchantList.vue'),
            },
        ],
    },
    {
        path: '/login',
        meta: {
            title: 'login',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/pages/login.vue'),
    },
    // {
    //     path: '/register',
    //     meta: {
    //         title: '注册',
    //         noAuth: true,
    //     },
    //     component: () => import(/* webpackChunkName: "register" */ '../views/pages/register.vue'),
    // },
    // {
    //     path: '/reset-pwd',
    //     meta: {
    //         title: '重置密码',
    //         noAuth: true,
    //     },
    //     component: () => import(/* webpackChunkName: "reset-pwd" */ '../views/pages/reset-pwd.vue'),
    // },
    {
        path: '/403',
        meta: {
            title: '没有权限',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/pages/403.vue'),
    },
    {
        path: '/404',
        meta: {
            title: '找不到页面',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "404" */ '../views/pages/404.vue'),
    },
    { path: '/:path(.*)', redirect: '/404' },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('vuems_name');
    if (to.path !== '/login' && !token) {
        // 如果没有token且不是登录页面，重定向到登录页面
        next('/login');
    } else {
        next();
    }
});

export default router;
