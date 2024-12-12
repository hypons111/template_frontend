import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import ElementPlus from "element-plus";
import { VueQueryPlugin } from "@tanstack/vue-query";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";

/* 自定 gridOptions */
import { agGridOptions } from "@/settings/agGridOptions";

/* 樣式 */
import "element-plus/dist/index.css";
import "./style/style.scss";

/*  vue-query 配置 */
const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 24 * 60 * 60 * 1000, // 每 24 小時更新
      },
    },
  },
};

const app = createApp(App);

app.provide("agGridOptions", agGridOptions);

app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.use(VueQueryPlugin, vueQueryPluginOptions);
app.component("ag-grid-vue", AgGridVue);

app.mount("#app");
