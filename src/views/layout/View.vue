<template>
  <el-container>
    <el-main>
      <Tab />
      <router-view id="view-container"/>
    </el-main>
  </el-container>
</template>

<script setup>
import Tab from "@/views/layout/Tab.vue";
</script>

<style lang="scss" scoped>
.el-container {
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--LIME);

  .el-header {
    height: 3.5rem;
    border-bottom: 1px solid var(--LIME);
  }

  .el-main {
    display: flex;
    flex-direction: column;
    
    #view-container {
      flex-grow: 1;
      overflow-x: hidden;      
      overflow-y: auto;      
    }
  }

  .el-footer {
    height: 3.5rem;
    border-top: 1px solid var(--LIME);
  }
}
</style>
