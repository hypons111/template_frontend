<template>
  <div class="AgGridButtonGroup">
    <el-button v-for="(btn, index) in buttons" :key="index"
      :class="{ 'hidden': !btn.show, 'disabled': btn.disabled }"
      :type="btn.type"
      :disabled="btn.disabled"
      @click="btn.func(params)"
    >
      {{ btn.label }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  params: {
    buttons: {
      label: string;
      type: "primary" | "success" | "warning" | "danger" | "info" | "";
      show: boolean;
      disabled: boolean;
      func: Function;
    }[]
  };
}

const props = defineProps<IProps>();
const buttons = props.params.buttons; // ag grid 會將 buttons 參數放入 props.params
const params = props.params;
</script>

<style lang="scss">
.AgGridButtonGroup {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

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

  &,.center {
    justify-content: center;
  }
}
</style>