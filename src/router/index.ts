import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home/home.vue'

const router = createRouter({
  // history
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/signin/index.vue')    },
    {
      path: '/scan',
      name: 'scan',
      component: () => import('../views/QRcode/index.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/map/index.vue')
    },
    {
      path: '/balance',
      name: 'balance',
      component: () => import('../views/managebalance/index.vue')
    },
    {
      path: '/currency',
      name: 'currency',
      component: () => import('../views/singleCurrency/index.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/history/index.vue')
    },
    {
      path: '/googleAuthInfo',
      name: 'googleAuthInfo',
      component: () => import('../views/googleAuth/components/googleAuthInfo/index.vue')
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: () => import('../views/managebalance/components/deposit/index.vue')
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: () => import('../views/managebalance/components/withdraw/index.vue')
    },
    {
      path: '/depositDetail',
      name: 'depositDetail',
      component: () => import('../views/managebalance/components/detail/deposit/index.vue')
    },
    {
      path: '/withdrawDetail',
      name: 'withdrawDetail',
      component: () => import('../views/managebalance/components/detail/withdraw/index.vue')
    },
    {
      path: '/googleAuth',
      name: 'googleAuth',
      component: () => import('../views/googleAuth/index.vue')
    },
    {
      path: '/downloadAPP',
      name: 'downloadAPP',
      component: () => import('../views/googleAuth/components/downloadAPP/index.vue')
    },
    {
      path: '/googleAuthInfo',
      name: 'googleAuthInfo',
      component: () => import('../views/googleAuth/components/googleAuthInfo/index.vue')
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: () => import('../views/orderDetail/index.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings/index.vue')
    },
    {
      path: '/currency',
      name: 'currency',
      component: () => import('../views/settings/components/currency/index.vue')
    },
    {
      path: '/language',
      name: 'language',
      component: () => import('../views/settings/components/language/index.vue')
    },
    // {
      // path: '/about',
      // name: 'about',
      // component: () => import('../views/AboutView.vue')
    // }
  ],
  // hash
  // history: createWebHashHistory(),
})
router.beforeEach((to, from, next) => {
  // chrome
  document.body.scrollTop = 0;
  // firefox
  document.documentElement.scrollTop = 0;
  // safari
  window.pageYOffset = 0;
  next();
})
export default router
