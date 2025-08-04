<template>
  <el-col :span="24" :xs="24" :class="verticalAlign">
    <el-button v-for="(btn, index) in buttons" :key="index"
      :type="btn.type"
      :plain="btn.plain"
      :round="btn.round"
      :class="{ 'hidden': !btn.show, 'disabled': btn.disabled }"
      :disabled="btn.disabled"
      @click="btn.func(parameter)"
    >
    {{ btn.label }}
    </el-button>
  </el-col>
</template>

<script lang="ts" setup>
interface IProps {
  verticalAlign: string;
  buttons: {
    label: "left" | "center" | "right";
    type: "primary" | "success" | "warning" | "danger" | "info" | "";
    plain: boolean;
    round: boolean;
    show: boolean;
    disabled: boolean;
    func: Function;
  }[]
}

withDefaults(defineProps<IProps>(), {})

const parameter: any = undefined;
</script>

<style lang="scss" scoped>
  .el-button {
    margin-top: 0;
    margin-bottom: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  .left {
    text-align: left;
    .el-button {
      margin-left: 0;
      margin-right: 1rem;
    }
  }
  
  .center {
    text-align: center;
  }

  .right {
    text-align: right;
    .el-button {
      margin-left: 1rem;
      margin-right: 0;
    }
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