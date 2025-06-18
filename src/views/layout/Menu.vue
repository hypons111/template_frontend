<template>
  <el-main>
    <div id="collapseBtnContainer">
      <el-icon @click="collapse = !collapse">
        <Expand v-if="collapse" />
        <Fold v-else />
      </el-icon>
    </div>

    <el-scrollbar>
      <el-menu default-active="2" :collapse="collapse" popper-class="menu-popper">
        <div v-for="(item, index) in menu" :index="index">
          
          <el-menu-item v-if="item.children.length === 0 && item.available" :class="{ on: currentView === item.index }" :index="item.label" @click="menuHandler(item)">
            <router-link :to="item.path">
              <el-icon><setting /></el-icon>
              <span v-if="!collapse">{{ item.label }}</span>
            </router-link>
          </el-menu-item>

          <el-sub-menu v-else-if="item.available" :index="item.index">
            <template #title>
              <el-icon><setting /></el-icon>
              <span v-if="!collapse">{{ item.label }}</span>
            </template>

            <div v-for="child in item.children">
              <el-menu-item v-if="child.available" :class="{ on: currentView === child.index }" :index="child.label" @click="menuHandler(child)">
                <router-link :to="child.path">
                  <el-icon><setting /></el-icon>
                  <span>{{ child.label }}</span>
                </router-link>
              </el-menu-item>
            </div>
          </el-sub-menu>
        </div>
      </el-menu>
    </el-scrollbar>
  </el-main>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useTabStore } from "@/store";
import axiosRequest from "@/request/axiosRequest.ts";
import { Expand, Fold, Setting } from "@element-plus/icons-vue";

/* status */
const tabStore = useTabStore(); // tab store
const menu = ref([]); // menu 清單
const collapse = ref(false); // menu 開啟/關閉
const currentView = ref("Home_0"); // 目前頁面

function menuHandler(event) {
  currentView.value = event.index;
  tabStore.addTab(event);
}

async function getMenu() {
  Promise.all([
    axiosRequest.getRequest("/json/menu.json", ""), // 全部 menu
    axiosRequest.getRequest("/json/permittedMenu.json", "") // 有權限的 menu
  ])
  .then(data => { setPermittedMenu(data) })
  .catch((error) => { ElNotification({ title: error?.response?.data?.detail, type: "error", duration: 2500 }) })
}

function setPermittedMenu(data) {
  const [fullMenu, permittedMenu ] = data
  permittedMenu.forEach((item) => {
    /* 將有權限的頁面設為 available === true */
    const availableItem = fullMenu[item.index];
    if (availableItem) {
      availableItem.available = true;
      /* 將有權限的子頁面設為 available === true */
      item.children.forEach((child) => {
        availableItem.children[child.index].available = true;
      });
    }
  });
  menu.value = fullMenu;
}


onBeforeMount(() => {
  getMenu()
});
</script>

<style lang="scss" scoped>
.el-main {
  overflow: hidden;

  #collapseBtnContainer {
    width: 100%;
    height: 3.5rem;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;

    .el-icon {
      font-size: 1.5rem;
    }
  }

  .el-menu {
    border-width: 0;

    &>DIV {
      width: 100%;
    }

    DIV * {
      color: #03c03c;
      text-decoration: none;
      background-color: black;
    }

    .el-menu-item {
      a {
        width: 100%;
      }

      &:hover {
        * {
          font-weight: bold;
          color: var(--LIME);
        }
      }

      &.on {
        * {
          font-weight: bold;
          color: var(--LIME);
        }
      }
    }

    &.el-menu--collapse .el-sub-menu :deep(.el-sub-menu__icon-arrow) {
      display: none;
    }
  }
}
</style>

<style lang="scss">
.menu-popper {
  border: 1px solid var(--LIME) !important;

  .el-menu--popup {
    background-color: black;
    
    .el-menu-item > A {
      color: var(--LIME);
      text-decoration: none;
    }
  }
}
</style>