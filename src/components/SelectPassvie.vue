<template>
  <el-col :span="span" :xs="24">
    <el-form-item :prop="prop" :label="label">
      <el-select-v2 
        v-model="modelValue" 
        :clearable="clearable" 
        :multiple="multiple" 
        :disabled="disabled"
        :placeholder="placeholder"
        :options="parsedOptions" 
      />
    </el-form-item>
  </el-col>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const modelValue = defineModel();

interface IProps {
  label: string;
  options: any[]
  span: number;
  placeholder?: string,
  clearable?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  prop?: string;
  optionFilter?: Function;
  optionParser: Function;
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: "請選擇",
  clearable: true,
  multiple: false,
  disabled: false
});

const parsedOptions = computed(() => {
  const filteredData = props.optionFilter ? props.optionFilter(props.options) : props.options// 篩選選單
  return filteredData.map((item: any) => ({
    label: props.optionParser(item), // 選項
    value: item, // 回傳值
  }));
});
</script>
