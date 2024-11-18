<template>
  <el-container>
    <el-header>
      <router-link class="routerButton" to="/home"><el-button>Home</el-button></router-link>
      <router-link class="routerButton" to="/Buttons"><el-button type="primary">Buttons</el-button></router-link>
      <router-link class="routerButton" to="/Selects"><el-button type="success">Selects</el-button></router-link>
      <router-link class="routerButton" to="/Inputs"><el-button type="success">Inputs</el-button></router-link>
      <router-link class="routerButton" to="AgGrid"><el-button type="info">AgGrid</el-button></router-link>
      <router-link class="routerButton" to=""><el-button type="warning">View 4</el-button></router-link>
      <router-link class="routerButton" to=""><el-button type="danger">View 5</el-button></router-link>
    </el-header>

    <el-main>
      <router-view id="routerView" />
    </el-main>

    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>


<script setup>
import { ref } from "vue";

</script>

<style scoped>
.el-header {
  display: flex;
  align-items: center;

  .routerButton {
    margin-right: 0.5rem;
  }
}
</style>
