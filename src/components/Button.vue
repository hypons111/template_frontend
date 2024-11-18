<template>
  <el-row :gutter="0">
    <el-col :span="12">
      <el-button v-for="(btn, index) in buttons" :key="index" :class="{ 'hidden': !btn.show, 'disabled': btn.disabled }"
        :type="btn.type" :disabled=btn.disabled @click="btn.func(param)">
        {{ btn.label }}
      </el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">

interface IButton {
  buttons: {
    label: string;
    type: string;
    show: boolean;
    disabled: boolean;
    func: (param?: string) => void
  }[]
}
const props = withDefaults(defineProps<IButton>(), {})
</script>

<style lang="scss" scoped>
#buttonGroup {
  padding: 0.5rem;

  .hidden {
    display: none;
  }

  .disabled {
    color: black;
    background-color: lightgray !important;
    border: 1px solid lightgray !important;
  }
}
</style>
