<template>
  <el-col :span="24" :xs="24">
    <el-button v-for="(btn, index) in buttons" :key="index"
      :class="{ 'hidden': !btn.show, 'disabled': btn.disabled }"
      :type="btn.type"
      :disabled="btn.disabled"
      @click="btn.func(parameter)"
    >
      {{ btn.label }}
    </el-button>
  </el-col>
</template>

<script lang="ts" setup>
interface IProps {
  buttons: {
    label: string;
    type: "primary" | "success" | "warning" | "danger" | "info" | "";
    show: boolean;
    disabled: boolean;
    func: Function;
  }[]
}

defineProps<IProps>();
const parameter: any = undefined;
</script>

<style lang="scss" scoped>
  .el-button {
    margin-bottom: 1rem;
  }

  .el-button+.el-button {
    margin-left: 0.5rem;
  }

  .el-button,
  .hidden+.el-button {
    margin-left: 0;
  }

  .hidden {
    display: none !important;
  }

  .disabled {
    color: black;
    background-color: lightgray !important;
    border: 1px solid lightgray !important;
  }
</style>