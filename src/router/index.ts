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
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')    
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/signin/index.vue')    
    },
    {
      path: '/payMent',
      name: 'payMent',
      component: () => import('../views/payMent/index.vue')    
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import('../views/loading/index.vue')    
    },
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
      path: '/siCurrency',
      name: 'siCurrency',
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
      path: '/depositb',
      name: 'depositb',
      component: () => import('../views/managebalance/components/deposit/index.vue')
    },
    {
      path: '/withdrawb',
      name: 'withdrawb',
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
      path: '/deposit',
      name: 'deposit',
      component: () => import('../views/orderDetail/details/deposit/index.vue')
    },
    {
      path: '/refund',
      name: 'refund',
      component: () => import('../views/orderDetail/details/refund/index.vue')
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: () => import('../views/orderDetail/details/withdraw/index.vue')
    },
    {
      path: '/complete',
      name: 'complete',
      component: () => import('../views/orderDetail/payMent/complete/index.vue')    
    },
    {
      path: '/failed',
      name: 'failed',
      component: () => import('../views/orderDetail/payMent/failed/index.vue')    
    },
    {
      path: '/payWithdraw',
      name: 'payWithdraw',
      component: () => import('../views/orderDetail/payWithdraw/index.vue')    
    },
    {
      path: '/transactionComplete',
      name: 'transactionComplete',
      component: () => import('../views/orderDetail/transaction/complete/index.vue')    
    },
    {
      path: '/transactionFailed',
      name: 'transactionFailed',
      component: () => import('../views/orderDetail/transaction/failed/index.vue')    
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
