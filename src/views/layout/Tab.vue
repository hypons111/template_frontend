<template>
  <div class="tabGroup">
    <router-link v-for="tab in tabStore.tabs"
      :key="tab.label"
      :to="tab.path"
      class="tab"
      :class="{ active: tab.isActive }"
    >
      <p class="tab-label" @click="tabHandler(tab.label)">{{ tab.label }}</p>
      <Close v-if="tab.label !== 'Home'" class="tab-icon" @click.prevent.stop="removeTag(tab.label)" />
    </router-link>
  </div>
  <p id="view-label">{{ tabStore.activeTab }}</p>
</template>

<script setup>
import { useTabStore } from "@/store";
import { Close } from "@element-plus/icons-vue";

const tabStore = useTabStore();
const router = useRouter();

function tabHandler(tabLabel) {
  tabStore.setActiveTab(tabLabel); // activate 指定 tab
}

function removeTag(removeTabLabel) {
  const currentTabLabel = tabStore.getCurrentTab().label
  if(removeTabLabel === currentTabLabel) { // 判斷是否移除 active 的 tab
    tabHandler("Home")
    router.push("/home")
  }
  tabStore.removeTab(removeTabLabel); // 移除 tab
}
</script>

<style lang="scss" scoped>
.tabGroup {
  display: flex;
  border-bottom: 1px solid var(--LIME);
  margin-bottom: 1rem;

  .tab {
    width: fit-content;
    height: 2rem;
    display: flex;
    align-items: center;
    color: var(--LIME);
    padding: 0 0.25rem;
    margin: 0px 2px 0 0;
    border: 1px solid var(--LIME);
    border-bottom-width: 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    
    &.active {
      color: black;
      background-color: var(--LIME);
    }

    .tab-label {
      display: inline-block;
      margin: 0;

    }
    .tab-icon {
      width: 1rem;
      margin: 0 0 0 0.5rem;
    }
  }
}

#view-label {
  font-size: 2rem;
  font-weight: 900;
  padding: 0 0.5rem;
  margin: 0 0 1rem 0;
}
</style>
