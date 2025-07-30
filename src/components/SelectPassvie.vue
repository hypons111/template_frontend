<template>
  <el-col class="select passvie" :span="span" :xs="24">
    <el-form-item :prop="prop" :label="label" :label-position="labelPosition">
      <el-select-v2 
        :clearable="clearable"
        :disabled="disabled"
        :multiple="multiple"
        :options="processedOptions"
        :placeholder="placeholder"
        :class="classList"
        v-model="modelValue"
      />
    </el-form-item>
  </el-col>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const modelValue = defineModel();

interface Interface {
  label: string,
  clearable: boolean,
  disabled: boolean,
  multiple: boolean;
  options: any[],
  returnLabel?: Function | null;
  returnValue?: string
  optionFilter?: Function | null;
  prop: string,
  labelPosition: "top" | "left" | "right"
  span: number
  placeholder: string,
  classList: string,  
}

const props = withDefaults(defineProps<Interface>(), {
  clearable: true,
  disabled: false,
  multiple: false,

  returnLabel: null,
  returnValue: "",
  optionFilter: null,
  
  prop: "",
  labelPosition: "top",
  span: 4,
  placeholder: "請選擇",
  classList: "",
});

const processedOptions = computed(() => {
  const filteredData = props.optionFilter === null ? props.options : props.optionFilter!(props.options) // 篩選選單
  return filteredData.map((item: any) => ({
    label: props.returnLabel === null ? item : props.returnLabel(item),
    value: props.returnValue === "" ? item : item[props.returnValue], // 不可回傳 object
  }));
});
</script>

<style lang="scss">
@use '@/style/select.scss';
</style>