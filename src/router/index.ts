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
