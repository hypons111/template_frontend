<template>
  <el-container>
    <el-header><p>Header</p></el-header>
    <el-main>
      <Tab />
      <router-view />
    </el-main>
    <el-footer><p>Footer</p></el-footer>
  </el-container>
</template>

<script setup>
import Tab from "@/views/layout/Tab.vue";
</script>

<style lang="scss" scoped>
.el-container {
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--lime);

  .el-header {
    height: 3.5rem;
    border-bottom: 1px solid var(--lime);
  }

  .el-main {}

  .el-footer {
    height: 3.5rem;
    border-top: 1px solid var(--lime);
  }
}
</style>
