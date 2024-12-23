<template>
  <el-main>
    <div id="collapseBtnContainer">
      <el-icon @click="collapse = !collapse">
        <Expand v-if="collapse" />
        <Fold v-else />
      </el-icon>
    </div>

    <el-scrollbar>
      <el-menu default-active="1" :collapse="collapse">
        <div v-for="(item, index) in menu" :index="index">
          <el-menu-item
            v-if="item.children.length === 0 && item.available"
            :class="{ on: currentView === item.index }"
            :index="item.label"
            @click="menuHander(item)"
          >
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
              <el-menu-item
                v-if="child.available"
                :class="{ on: currentView === child.index }"
                :index="child.label"
                @click="menuHander(child)"
              >
                <router-link :to="child.path">
                  <el-icon><setting /></el-icon>
                  <span v-if="!collapse">{{ child.label }}</span>
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
import service from "@/api/service";
import { Expand, Fold, Setting } from "@element-plus/icons-vue";

/* status */
const tabStore = useTabStore(); // tab store
const menu = ref([]); // menu 清單
const collapse = ref(false); // menu 開啟/關閉
const currentView = ref("Home_0"); // 目前頁面

function menuHander(event) {
  currentView.value = event.index;
  tabStore.addTab(event);
}

onBeforeMount(async () => {
  /* 全部 menu */
  /* 有權限的 menu */

  // const response = await service.getMenu();
  const { jsonMenu, permittedMenu } = await service.getMenu();
  console.log(jsonMenu);
  console.log(permittedMenu);

  if (jsonMenu.success && permittedMenu.success) {
    // menu.value = menu.data;

    permittedMenu.data.forEach((item) => {
      /* 將有權限的頁面設為 available === true */
      const availableItem = jsonMenu.data[item.index];
      if (availableItem) {
        availableItem.available = true;
        /* 將有權限的子頁面設為 available === true */
        item.children.forEach((child) => {
          availableItem.children[child.index].available = true;
        });
      }
    });

    menu.value = jsonMenu.data;
  } else {
    console.log(`[ERROR] menu : ${response.menu.error}`);
    console.log(`[ERROR] permittedMenu : ${response.permittedMenu.error}`);
  }
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

    & > DIV {
      width: 15rem;
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
          color: var(--lime);
        }
      }

      &.on {
        * {
          font-weight: bold;
          color: var(--lime);
        }
      }
    }
  }
}
</style>
