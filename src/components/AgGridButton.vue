<template>
  <div class="buttonCell">
    <el-button 
      v-for="(btn, index) in props.params.buttons" 
      :key="index"
      :type="btn.type"
      :class="{ 'hidden': !btn.show, 'disabled': btn.disabled }"
      :disabled="btn.disabled"
      @click="btn.func(params)"
    >
      {{ btn.label }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
interface IButton {
  buttons: {
    label: string;
    type: string;
    show: boolean;
    disabled: boolean;
    func: Function;
  }[]
}
const props = defineProps<IButton>()
</script>

<style>
.buttonCell {
  width: 100%;
  display: flex;
  justify-content: flex-start;

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
}
</style>