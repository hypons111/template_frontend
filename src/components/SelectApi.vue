<template>
  <el-col :span="span" :xs="24">
    <el-skeleton v-if="isPending" :rows="1" animated />

    <el-form-item v-else-if="isError" :label="label">
      <el-input :value="'錯誤 : ' + error?.message" :disabled="disabled" />
    </el-form-item>

    <el-form-item v-else-if="data" :prop="prop" :label="label">
      <el-select-v2 v-model="modelValue" :clearable="clearable" :multiple="multiple" :disabled="disabled"
        :placeholder="placeholder" :options="options" />
    </el-form-item>
  </el-col>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import axios from "axios";
import { useQuery } from "@tanstack/vue-query";

const modelValue = defineModel();

interface IProps {
  label: string;
  apiUrl: string;
  options: Function;
  span: number;
  placeholder?: string,
  clearable?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  prop?: string;
  optionParser: Function;
  optionFilter?: Function;
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: "請選擇",
  clearable: true,
  multiple: false,
  disabled: false,
  optionLabelFilter: (data) => data
});

const options = computed(() => {
  const filteredData = props.optionFilter ? props.optionFilter(data.value) : data.value// 篩選選單
  return filteredData.map((item: any) => ({
    label: props.optionParser(item), // 選項
    value: item, // 回傳值
  }));
});

/* fetch data */
const { isPending, isError, data, error } = useQuery({
  queryKey: [props.apiUrl],
  queryFn: async () => await axios.get(props.apiUrl).then(({data}) => data)
});
</script>
