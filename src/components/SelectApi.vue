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
import { useQuery } from "@tanstack/vue-query";
import axiosRequest from "@/request/axiosRequest";

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
  requestMode?: "get" | "post";
  apiUrl: string;
  payload?: Object;
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
  requestMode: "get",
});

const queryFn = { // 用 useQuery 就不用加 async await
  get: () => axiosRequest.getRequest(props.apiUrl)
    /* .then .catch 用來處理 error, 如果不需要顥示 ElNotification, 可以註解 */
    .then((data) => data)
    .catch((errorMessage) => { ElNotification({ title: errorMessage, type: "error", duration: 2500 }) }),
  post: () => axiosRequest.postRequest(props.apiUrl, props.payload)
    /* .then .catch 用來處理 error, 如果不需要顥示 ElNotification, 可以註解 */
    .then((data) => data)
    .catch((errorMessage) => { ElNotification({ title: errorMessage, type: "error", duration: 2500 }) }),
}

/* fetch */
const { isPending, isError, data, error } = useQuery({
  queryKey: [props.apiUrl],
  queryFn: queryFn[props.requestMode]
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