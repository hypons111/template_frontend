<template>
  <el-col class="select api" :span="span" :xs="24">
    <el-skeleton v-if="isPending" :rows="1" animated />

    <el-form-item v-else-if="isError" :label="label">
      <el-input :value="'錯誤 : ' + error?.message" disabled />
    </el-form-item>

    <el-form-item v-else-if="data" :prop="prop" :label="label" :label-position="labelPosition">
      <el-select-v2 
        :clearable="clearable" 
        :disabled="disabled"
        :multiple="multiple" 
        :options="parsedOptions" 
        :placeholder="placeholder" 
        :class="classList"
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
  clearable: boolean,
  disabled: boolean,
  multiple: boolean;

  requestMode?: "get" | "post";
  apiUrl: string;
  payload?: any;

  returnLabel?: Function | null;
  returnValue?: string
  optionFilter?: Function | null;
  
  prop: string,

  labelPosition: "top" | "left" | "right"
  span: number,
  placeholder: string,
  classList: string,
}


const props = withDefaults(defineProps<IProps>(), {
  clearable: true,
  multiple: false,
  disabled: false,

  requestMode: "get",
  payload: {},
  returnLabel: null,
  returnValue: "",
  optionFilter: null,

  prop: "",
  labelPosition: "top",
  span: 4,
  placeholder: "請選擇",
  classList: "",
});

const queryFn = { // 用 useQuery 就不用加 async await
  get: () => axiosRequest.getRequest(props.apiUrl)
    /* .then .catch 用來處理 error, 如果不需要顥示 ElNotification, 可以註解 */
    .then((data) => data) // .data.items
    .catch((errorMessage) => {
      ElNotification({ title: errorMessage, type: "error", duration: 2500 })
      throw errorMessage; // 拋俾 useQuery 判斷 isError
    }),
  post: () => axiosRequest.postRequest(props.apiUrl, props.payload)
    /* .then .catch 用來處理 error, 如果不需要顥示 ElNotification, 可以註解 */
    .then((data) => data)
    .catch((errorMessage) => { 
      ElNotification({ title: errorMessage, type: "error", duration: 2500 }) 
      throw errorMessage; // 拋俾 useQuery 判斷 isError
    }),
}

const parsedOptions = computed(() => {
  const filteredData = props.optionFilter ? props.optionFilter(data.value) : data.value // 篩選選單
  return filteredData.map((item: any) => ({
    label: props.returnLabel === null ? item : props.returnLabel!(item),
    value: props.returnValue === "" ? item : item[props.returnValue] // 不可回傳 object
  }));
});

/* fetch */
const { isPending, isError, data, error } = useQuery({
  queryKey: [props.apiUrl],
  queryFn: queryFn[props.requestMode]
});

</script>

<style lang="scss">
@use '@/style/select.scss';
</style>