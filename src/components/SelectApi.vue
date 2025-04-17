<template>
  <el-col class="selectComponent" :span="span" :xs="24">
    <el-skeleton v-if="isPending" :rows="1" animated />

    <el-form-item v-else-if="isError" :label="label">
      <el-input :value="'錯誤 : ' + error?.message" disabled />
    </el-form-item>

    <el-form-item v-else-if="data" :prop="prop" :label="label" :label-position="labelPosition">
      <el-select-v2 
        :class="classList"
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
  labelPosition: "top" | "left" | "right"
  classList: string,
  span: number,
  prop: string,
  placeholder: string,
  clearable: boolean,
  disabled: boolean,
  multiple: boolean;
  apiUrl: string;
  returnValue: string;
  optionFilter?: Function;
  optionParser?: Function;
}


const props = withDefaults(defineProps<IProps>(), {
  labelPosition: "top",
  classList: "",
  span: 4,
  prop: "",
  placeholder: "請選擇",
  clearable: true,
  multiple: false,
  disabled: false,
  returnValue: ""
});

/* fetch */
const { isPending, isError, data, error } = useQuery({
  queryKey: [props.apiUrl],
  queryFn: async () => await axios.get(props.apiUrl).then(({data}) => data)
});

/* parse & filter */
const parsedOptions = computed(() => {
  const filteredData = props.optionFilter ? props.optionFilter(data.value) : data.value// 篩選選單
  return filteredData.map((item: any) => ({
    label: props.optionParser!(item), // 選項
    value: item[props.returnValue], // 不可回傳 object
  }));
});
</script>

<style lang="scss">
@import '@/style/selectStyle.scss';
</style>