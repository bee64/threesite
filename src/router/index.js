import { createRouter, createWebHistory } from 'vue-router'
import CuteView from '../views/Cute.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cute',
      component: CuteView
    },
    {
      path: '/edgy',
      name: 'edgy',
      component: () => import('../views/Edgy.vue')
    }
  ]
})

export default router
