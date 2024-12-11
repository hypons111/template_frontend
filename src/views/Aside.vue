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
            v-if="item.childs.length === 0"
            :class="{ on: currentView === item.index }"
            :index="item.index"
            @click="menuHander"
          >
            <router-link :to="item.path">
              <el-icon><setting /></el-icon>
              <span v-if="!collapse">{{ item.label }}</span>
            </router-link>
          </el-menu-item>

          <el-sub-menu v-else :index="item.index">
            <template #title>
              <el-icon>
                <setting />
              </el-icon>
              <span v-if="!collapse">{{ item.label }}</span>
            </template>
            <el-menu-item
              v-for="child in item.childs"
              :class="{ on: currentView === child.index }"
              :index="child.index"
              @click="menuHander"
            >
              <router-link :to="child.path">
                <el-icon><setting /></el-icon>
                <span v-if="!collapse">{{ child.label }}</span>
              </router-link>
            </el-menu-item>
          </el-sub-menu>
        </div>
      </el-menu>
    </el-scrollbar>
  </el-main>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Expand, Fold, Setting } from "@element-plus/icons-vue";

/* status */
const collapse = ref(false);
const currentView = ref("Home_0");

function menuHander(event) {
  currentView.value = event.index;
}

const menu = [
  {
    index: "Home_0",
    label: "Home",
    path: "/home",
    icon: "document",
    childs: [
      {
        index: "Buttons_0",
        label: "Buttons",
        path: "/buttons",
        icon: "",
        childs: [],
        on: false,
      },
      {
        index: "Selects_0",
        label: "Selects",
        path: "/selects",
        icon: "",
        childs: [],
        on: false,
      },
      {
        index: "Inputs_0",
        label: "Inputs",
        path: "/inputs",
        icon: "",
        childs: [],
        on: false,
      },
      {
        index: "AgGrid_0",
        label: "AgGrid",
        path: "/agGrid",
        icon: "",
        childs: [],
        on: false,
      },
    ],
    on: true,
  }
];
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

    .el-menu-item:hover {
      * {
        font-weight: bold;
        color: lime !important;
      }
    }

    .el-menu-item.on {
      * {
        font-weight: bold;
        color: lime !important;
      }
    }
  }
}
</style>
