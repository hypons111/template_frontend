<template>
  <el-col :span="span" :xs="24">
    <el-skeleton v-if="isPending" :rows="1" animated />

    <el-form-item v-else-if="isError" :label="label">
      <el-input :value="'錯誤 : ' + error?.message" disabled />
    </el-form-item>

    <el-form-item v-else-if="data" :prop="prop" :label="label">
      <el-select-v2 
        :class="class"
        :placeholder="placeholder" 
        :clearable="clearable" 
        :disabled="disabled"
        :multiple="multiple" 
        :options="parsedOptions" 
        v-model="modelValue" 
      />
    </el-form-item>
  </el-col>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import axios from "axios";
import { useQuery } from "@tanstack/vue-query";

const modelValue = defineModel();

interface IProps {
  label: string,
  class: string,
  span: number,
  prop: string,
  placeholder: string,
  clearable: boolean,
  disabled: boolean,
  multiple: boolean;
  apiUrl: string;
  optionFilter?: Function;
  optionParser?: Function;
}

const props = withDefaults(defineProps<IProps>(), {
  class: "",
  span: 24,
  prop: "",
  placeholder: "請選擇",
  clearable: true,
  multiple: false,
  disabled: false,
});

/* fetch */
const { isPending, isError, data, error } = useQuery({
  queryKey: [props.apiUrl],
  queryFn: async () => await axios.get(props.apiUrl).then(({data}) => data)
});

/* parse & filter */
const parsedOptions = computed(() => {
  console.log(data.value)
  const filteredData = props.optionFilter ? props.optionFilter(data.value) : data.value// 篩選選單
  return filteredData.map((item: any) => ({
    label: props.optionParser!(item), // 選項
    value: item, // 回傳值
  }));
});
</script>

<style lang="scss" scoped>
:deep(.text-align-right) {
  & > DIV  {
    text-align: right;
  }
}
</style>