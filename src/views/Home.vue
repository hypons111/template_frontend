<template>
  <el-container>
    <el-aside><Aside :collapse="collapse" /></el-aside>
    <el-main><Main /></el-main>
  </el-container>
</template>

<script setup>
import Aside from "@/views/Aside.vue";
import Main from "@/views/Main.vue";
</script>

<style lang="scss" scoped>
.el-aside {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid gold;
}

.el-main {
  height: 100%;
  padding: 0;
  border: 1px solid gold;
}
</style>
