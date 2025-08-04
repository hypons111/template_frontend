<template>
  <el-container>
    <el-main>
      <View />
    </el-main>
  </el-container>
</template>

<script setup>
import View from "@/views/layout/View.vue";
</script>

<style lang="scss" scoped>
.el-aside {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-main {
  height: 100%;
  padding: 0;
}
</style>
