<template>
  <div class="buttonCell">
    <el-button v-if="params.btn1" :type="params?.btn1.type"
      :class="{ 'hidden': !params.btn1.show, 'disabled': params.btn1.disabled }" :disabled=params.btn1.disabled
      @click="params.btn1.func(params)">{{ params.btn1.label }}</el-button>

    <el-button v-if="params.btn2" :type="params.btn2.type"
      :class="{ 'hidden': !params.btn2.show, 'disabled': params.btn2.disabled }" :disabled=params.btn2.disabled
      @click="params.btn2.func(params)">{{ params.btn2.label }}</el-button>

    <el-button v-if="params.btn3" :type="params.btn3.type"
      :class="{ 'hidden': !params.btn3.show, 'disabled': params.btn3.disabled }" :disabled=params.btn3.disabled
      @click="params.btn3.func(params)">{{ params.btn3.label }}</el-button>

    <el-button v-if="params.btn4" :type="params.btn4.type"
      :class="{ 'hidden': !params.btn4.show, 'disabled': params.btn4.disabled }" :disabled=params.btn4.disabled
      @click="params.btn4.func(params)">{{ params.btn4.label }}</el-button>

    <el-button v-if="params.btn5" :type="params.btn5.type"
      :class="{ 'hidden': !params.btn5.show, 'disabled': params.btn5.disabled }" :disabled=params.btn5.disabled
      @click="params.btn5.func(params)">{{ params.btn5.label }}</el-button>

    <el-button v-if="params.btn6" :type="params.btn6.type"
      :class="{ 'hidden': !params.btn6.show, 'disabled': params.btn6.disabled }" :disabled=params.btn6.disabled
      @click="params.btn6.func(params)">{{ params.btn6.label }}</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ICellRendererParams } from 'ag-grid-community'
const { params } = defineProps<{ params: ICellRendererParams }>()
</script>

<style>
.buttonCell {
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