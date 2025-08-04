<template>
  <el-container>
    <el-header>
      <router-link :to="'/buttons'"><H1>BUTTONS</H1></router-link> |
      <router-link :to="'/inputs'"><H1>INPUTS</H1></router-link> |
      <router-link :to="'/selects'"><H1>SELECTS</H1></router-link> |
      <router-link :to="'/csr'"><H1>AG GRID(CSR)</H1></router-link> |
      <!-- <router-link :to="'/ssr'"><H1>AG GRID(SSR)</H1></router-link> | -->
      <router-link :to="'/example'"><H1>example</H1></router-link> |
      <router-link :to="'/openStreetMap'"><H1>Open Street Map</H1></router-link>
    </el-header>

    <el-main>
      <!-- <Tab /> -->
      <router-view id="view-container"/>
    </el-main>
    
    <el-footer><p>Footer</p></el-footer>

  </el-container>
</template>

<script setup>
import Tab from "@/views/layout/Tab.vue";
</script>

<style lang="scss" scoped>
.el-container {
  border: 3px solid var(--LIME);
  

  .el-header {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main {
    border: 1px solid blue;
  }

  .el-footer {
  }
}

</style>