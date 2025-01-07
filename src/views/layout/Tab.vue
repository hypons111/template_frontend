<template>
  <el-scrollbar>
    <div class="scrollbar-content">
      <router-link
        :to="tab.path"
        v-for="tab in tabStore.tabs"
        :key="tab.label"
        class="scrollbar-item"
        :class="{ active: tab.isActive }"
      >
        <p class="scrollbar-item-label" @click="tabHandler(tab.label)">{{ tab.label }}</p>
        <Close
          v-if="tab.label !== 'Home'"
          class="scrollbar-item-icon"
          @click.prevent.stop="removeTag(tab.label)"
        />
      </router-link>
    </div>
  </el-scrollbar>
  <h1 id="">{{ tabStore.activeTab }}</h1>
</template>

<script setup>
import { useTabStore } from "@/store";
import { Close } from "@element-plus/icons-vue";

const tabStore = useTabStore();
const router = useRouter();

function tabHandler(tabLabel) {
  tabStore.setActiveTab(tabLabel); // activate 指定 tab
}

function removeTag(tabLabel) {
  tabStore.removeTab(tabLabel); // 移除 tab
}
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: fit-content;
  border-bottom: 1px solid var(--LIME);
  margin-bottom: 1rem;

  .scrollbar-content {
    display: flex;
  }

  .scrollbar-item {
    width: fit-content;
    height: 2rem;
    display: flex;
    align-items: center;
    color: var(--LIME);
    padding: 0 0.25rem;
    margin: 0;
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

    .scrollbar-item-label {
      display: inline-block;
      margin: 0;

    }
    .scrollbar-item-icon {
      width: 1rem;
      margin: 0 0 0 0.5rem;
    }
  }
}

h1 {
  margin: 0 1rem;
}
</style>
