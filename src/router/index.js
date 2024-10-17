import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import Home from '@/views/home/Home.vue'
const routes = [
  {
    path: '/index',
    component: Home,
    children: [{ path: '', component: Home }],
  },
  {
    path: '/home',
    component: Home,
    children: [{ path: '', component: Home }],
  },
]

export default createRouter({
history: createWebHistory(),
routes,
})