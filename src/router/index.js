import { createRouter, createWebHistory } from 'vue-router';
import pinia from "@/store"; // 引入 Pinia 實例
import { setActivePinia } from "pinia"; // 手動設置活動 Pinia
import { useTabStore } from "@/store/index"; // 引入 Store

// 手動設置 Pinia 的活動實例
setActivePinia(pinia);
const tabStore = useTabStore();

const guard = (to, from, next) => {
  // const routeData = {
  //   label: to.name,
  //   path: to.href
  // }
  // tabStore.addTab(routeData);
  next();
}

// 導入頁面
const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { title: "Home", affix: true },
    component: () => import('../views/layout/Home.vue'),
    children: [
      {
        path: '/buttons',
        name: 'Buttons',
        meta: { title: "Buttons", affix: true },
        beforeEnter: guard,
        component: () => import('../views/Buttons.vue')
      },
      {
        path: '/selects',
        name: 'Selects',
        meta: { title: "Selects", affix: true },
        beforeEnter: guard,
        component: () => import('../views/Selects.vue')
      },
      {
        path: '/inputs',
        name: 'Inputs',
        meta: { title: "Inputs", affix: true },
        beforeEnter: guard,
        component: () => import('../views/Inputs.vue')
      },
      {
        path: '/csr',
        name: 'CSR',
        meta: { title: "AgGrid CSR", affix: true },
        beforeEnter: guard,
        component: () => import('../views/AgGrid_CSR.vue')
      },
      {
        path: '/ssr',
        name: 'SSR',
        meta: { title: "AgGrid SSR", affix: true },
        beforeEnter: guard,
        component: () => import('../views/AgGrid_SSR.vue')
      },
      {
        path: '/example',
        name: 'Example',
        meta: { title: "AgGrid", affix: true },
        beforeEnter: guard,
        component: () => import('../views/Example.vue')
      },
      {
        path: '/openStreetMap',
        name: 'OpenStreetMap',
        meta: { title: "Open Street Map", affix: true },
        beforeEnter: guard,
        component: () => import('../views/OpenStreetMap.vue')
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
