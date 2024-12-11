import { createRouter, createWebHistory } from 'vue-router';

// 導入頁面
const routes = [
  {
    path: '/',
    name: 'Login',
    meta: { title: "Login", affix: true },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: "Home", affix: true },
    children: [
      {
        path: '/buttons',
        name: 'Buttons',
        meta: { title: "Buttons", affix: true },
        component: () => import('../views/Buttons.vue')
      },
      {
        path: '/selects',
        name: 'Selects',
        meta: { title: "Selects", affix: true },
        component: () => import('../views/Selects.vue')
      },
      {
        path: '/inputs',
        name: 'Inputs',
        meta: { title: "Inputs", affix: true },
        component: () => import('../views/Inputs.vue')
      },
      {
        path: '/agGrid',
        name: 'AgGrid',
        meta: { title: "AgGrid", affix: true },
        component: () => import('../views/AgGrid.vue')
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
