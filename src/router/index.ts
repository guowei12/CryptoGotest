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
      path: '/scan',
      name: 'scan',
      component: () => import('../views/QRcode/index.vue')
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import('../views/discover/index.vue')
    },
    {
      path: '/balance',
      name: 'balance',
      component: () => import('../views/managebalance/index.vue')
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
