<template>
  <el-col class="selectSeries" :span="span" :xs="24">
    <el-form-item :prop="prop" :label="label">
      <el-select-v2 
        :class="classList"
        :placeholder="placeholder"
        :clearable="clearable"
        :disabled="disabled"
        :multiple="multiple"
        :options="parsedOptions"
        v-model="modelValue"
        :teleported="false"
      />
    </el-form-item>
  </el-col>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const modelValue = defineModel();

interface Interface {
  label: string,
  classList: string,
  span: number
  prop: string,
  placeholder: string,
  clearable: boolean,
  disabled: boolean,
  multiple: boolean;
  options: any[],
  optionFilter?: Function;
  optionParser?: Function;
}

const props = withDefaults(defineProps<Interface>(), {
  classList: "",
  span: 4,
  prop: "",
  placeholder: "請選擇",
  clearable: true,
  disabled: false,
  multiple: false,
});

/* parsed / filter */
const parsedOptions = computed(() => {
  const filteredData = props.optionFilter ? props.optionFilter(props.options) : props.options// 篩選選單
  return filteredData.map((item: any) => ({
    label: props.optionParser!(item), // 選項
    value: item, // 回傳值
  }));
});
</script>

<style lang="scss" scoped>
@import '@/style/selectStyle.scss';
</style>