<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import { useBasicStore } from "../store";
import { routeHandle } from "../hooks/route-handle";
const route = useRoute();
const router = useRouter();
const basicStore = useBasicStore();
const { navigation } = routeHandle();
const { visitedViews, getVisitedViews } = storeToRefs(basicStore);
/* 顯示 front page tag */
const frontPage = computed(() => useBasicStore().getUserLastName === "2" ? "/vo/search" : "/dashboard")

const state = reactive({
  visible: false,
  top: 0,
  left: 0,
  x: 0,
  y: 0,
  selectedTag: {},
  scrollValue: 0,
});

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();

const scrollLeftNumber = ref(0);

const scrollWrapper = computed(() => {
  return scrollbarRef.value;
});

watch(
  () => route.name,
  (val) => {
    nextTick(() => {
      state.visible = false;
      const lastView = visitedViews.value.at(-1);
      if (lastView.name == val) {
        toCurrentView();
      }
    });
  },
  {
    immediate: false,
  }
);

const isActive = (param: any) => {
  return route.path === param.path;
};

const isAffix = (tag: any) => {
  return tag.meta.affix;
};

const closeSelectedTag = (view: any) => {
  if(view.path === frontPage.value) return 
  basicStore.delVisitedView(view).then((visitedViews) => {
    toLastView(view);
  });
};

const toCurrentView = () => {
  const to =
    scrollbarRef.value?.wrapRef!.scrollWidth == undefined
      ? 0
      : scrollbarRef.value?.wrapRef!.scrollWidth;

  scrollbarRef.value?.setScrollLeft(to);
};

const toLastView = (view: any | undefined) => {
  const views = getVisitedViews;
  const latestView = views.value.at(-1);
  toCurrentView();
  if (latestView) {
    router.push(latestView.path);
  } else {
    // if (view.name === "Dashboard") {
    //   router.replace({ path: `/redirect${view.fullPath}` });
    // } else {
      // router.push("/");
    // }
  }
};

const click = (event: any) => {
  state.visible = false;
  if (event == "CANAEL") {
    return;
  }

  if (event == "CLOSE_ALL") {
    basicStore.delAllVisitedViews();
    navigation(frontPage.value);
  }
  if (event == "CLOSE") {
    basicStore;
    closeSelectedTag(state.selectedTag);
  }
  if (event == "CLOSE_OTHER") {
    basicStore.delOthersVisitedViews(state.selectedTag);
    //closeSelectedTag(state.selectedTag);
  }
};

const openMenu = (event: any, tag: any) => {
  state.top = 28;
  state.left = event.x - 160;
  state.x = event.clientX;
  state.y = event.clientY;
  state.visible = true;
  state.selectedTag = tag;
};

const scroll = ({ scrollLeft }: { scrollLeft: any }) => {
  scrollLeftNumber.value = scrollLeft as number;
};
</script>

<template>
  <div id="tags-view-container" class="tags-view-container">
    <ElScrollbar
      ref="scrollbarRef"
      v-model="scrollLeftNumber"
      :vertical="false"
      @scroll="scroll"
      class="scroll-container"
    >
      <div class="tags-view-wrapper">
        <router-link
          v-for="tag in visitedViews"
          v-slot="{ navigate }"
          :to="{ path: tag.path, query: tag.query }"
          custom
        >
          <div
            class="tags-view-item"
            :class="isActive(tag) ? 'active' : ''"
            @click="navigate"
            @contextmenu.prevent="openMenu($event, tag)"
          >
            {{ tag.meta.title }}
            <Close
              v-if="isAffix(tag)"
              class="el-icon-close"
              @click.prevent.stop="closeSelectedTag(tag)"
            />
          </div>
        </router-link>
      </div>
    </ElScrollbar>
    <!-- 
      
    -->
    <ul
      v-show="state.visible"
      :style="{ left: state.left + 'px', top: state.top + 'px' }"
      class="contextmenu"
    >
      <li @click="click('CANAEL')">取消</li>
      <!-- <li @click="click('CLOSE')">關閉</li> -->
      <li @click="click('CLOSE_OTHER')">關閉其他</li>
      <li @click="click('CLOSE_ALL')">關閉全部</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  --tags-view-item-active-background: #4db6ac;
  --tags-view-item-active-border-color: #4db6ac;
  --tags-view-item-active-color: #fff;
  --tags-view-contextmenu-background: #e0e0e0;
  --tags-view-contextmenu-hover-background: #e0e0e0;
  margin-top: 8px;
  height: var(--tag-view-height);
  width: 100%;
  position: relative;
  z-index: 10;
  background: var(--tags-view-background);
  border-bottom: 1px solid var(--tags-view-border-bottom);
  box-shadow: var(--tags-view-box-shadow);
  font-size: 16px;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 27px;
      line-height: 26px;
      border: 1px solid var(--tags-view-item-border-color);
      color: var(--tags-view-item-color);
      background: var(--tags-view-item-background);
      padding: 0 8px;
      border-radius: 0px;
      font-size: 13px;
      &:first-of-type {
        margin-left: 10px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: var(--tags-view-item-active-background);
        color: var(--tags-view-item-active-color);
        border-color: var(--tags-view-item-active-border-color);
        &::before {
          content: "*";
          background: var(--tags-view-background);
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: var(--tags-view-contextmenu-background);
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 3px;
    font-size: 12px;
    font-weight: 400;
    color: var(--tags-view-contextmenu-color);
    box-shadow: var(--tags-view-contextmenu-box-shadow);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: var(--tags-view-contextmenu-hover-background);
      }
    }
  }
}
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px !important;
    }
  }
}

//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    border-radius: 3px;
    .el-icon-close {
      border-radius: 6px;
      width: 12px;
      height: 12px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      vertical-align: -2px;

      &:hover {
        background-color: var(--tags-view-close-icon-hover-background);
        color: var(--tags-view-close-icon-hover-color);
      }
    }
  }
}
</style>
