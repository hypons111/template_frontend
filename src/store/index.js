import { createPinia } from "pinia";

/* 創建 Pinia 實例 */
const pinia = createPinia();

/* 定義 Tab store */
export const useTabStore = defineStore("tab", {
  state: () => ({
    activeTab: "Home",
    tabs: {
      "Home": { label: "Home", isActive: true, path: "/home" },
    }
  }),
  actions: {
    /* 指定 tab 為活動狀態 */
    setActiveTab(tabLabel) {
      this.deactivateAllTabs()
      this.tabs[tabLabel].isActive = true;
      this.activeTab = tabLabel;
    },
    /* 添加 tab */
    addTab(tab) {
      this.deactivateAllTabs()
      this.tabs[tab.label] = { label: tab.label, isActive: true, path: tab.path };
      this.activeTab = tab.label;
    },
    /* 移除指定的 tab */
    removeTab(tabLabel) {
      delete this.tabs[tabLabel];
    },

    /* 內部 function  */
    /* deactivate 全部 tabs  */
    deactivateAllTabs() {
      for (const key in this.tabs) {
        this.tabs[key].isActive = false;
      }
    },
  },
});

export default pinia;
