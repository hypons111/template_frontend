<template>
  <el-main>
    <router-link :to="'/home'"><H1>LOGIN</H1></router-link>
  </el-main>
</template>

<script setup></script>

<style lang="scss" scoped>
.el-main {
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: lime;
    text-decoration: none;
  }

  border: 1px solid gold;
}
</style>