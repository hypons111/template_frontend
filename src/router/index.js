import { createRouter, createWebHistory } from 'vue-router';

// 導入頁面
const routes = [
  {
    path: '/',
    name: 'Login',
    meta: { title: "Login", affix: true },
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('../views/layout/Layout.vue'),
    meta: { title: "Layout", affix: true },
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: "Home", affix: true },
        component: () => import('../views/templates/Home.vue')
      },
      {
        path: '/buttons',
        name: 'Buttons',
        meta: { title: "Buttons", affix: true },
        component: () => import('../views/templates/Buttons.vue')
      },
      {
        path: '/selects',
        name: 'Selects',
        meta: { title: "Selects", affix: true },
        component: () => import('../views/templates/Selects.vue')
      },
      {
        path: '/inputs',
        name: 'Inputs',
        meta: { title: "Inputs", affix: true },
        component: () => import('../views/templates/Inputs.vue')
      },
      {
        path: '/agGrid',
        name: 'AgGrid',
        meta: { title: "AgGrid", affix: true },
        component: () => import('../views/templates/AgGrid.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;  // 設置瀏覽器標籤頁的標題
  }
  next();
});

export default router;
