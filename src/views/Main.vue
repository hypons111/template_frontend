<template>
  <el-container>
    <!-- <el-header><p>Header</p></el-header> -->
    <el-main><router-view /></el-main>
    <!-- <el-footer><p>Footer</p></el-footer> -->
  </el-container>
</template>

<script setup></script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  // border: 1px solid magenta;

  .el-header {
    height: 3.5rem;
    border: 1px solid cyan;
  }

  .el-main {
    // border: 1px solid cyan;
  }

  .el-footer {
    height: 3.5rem;
    border: 1px solid cyan;
  }
}
</style>
