<template>
  <el-main>
    <router-link :to="'/layout'"><H1>LOGIN</H1></router-link>
  </el-main>
</template>

<script setup></script>

<style lang="scss" scoped>
.el-main {
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: var(--lime);
    text-decoration: none;
  }

  // border: 1px solid gold;
}
</style>