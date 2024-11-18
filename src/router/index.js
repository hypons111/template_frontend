// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// 導入頁面
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/Buttons',
    name: 'Buttons',
    component: () => import('../views/Buttons.vue')
  },
  {
    path: '/Selects',
    name: 'Selects',
    component: () => import('../views/Selects.vue')
  },
  {
    path: '/Inputs',
    name: 'Inputs',
    component: () => import('../views/Inputs.vue')
  },
  {
    path: '/AgGrid',
    name: 'AgGrid',
    component: () => import('../views/AgGrid.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
