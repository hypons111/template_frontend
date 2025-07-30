<template>
  <el-col class="select search" :span="span" :xs="24">
    <el-form-item :prop="prop" :label="label" :label-position="labelPosition">
      <el-select-v2
        :clearable="clearable"
        :disabled="disabled"
        :options="options"
        :placeholder="placeholder"
        :class="classList"
        v-model="modelValue"
        filterable
        remote
        :remote-method="remoteMethod"
        :loading="loading"
      />
    </el-form-item>
  </el-col>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axiosRequest from "@/request/axiosRequest";

const modelValue = defineModel();
const loading = ref(false);
const options = ref<any[]>([]);

interface IProps {
  label: string;
  clearable?: boolean;
  disabled?: boolean;

  requestMode?: "get" | "post";
  apiUrl: string;
  payload?: any;

  returnLabel?: Function | null;
  returnValue?: string
  optionFilter?: Function | null;
  
  prop?: string;
  
  labelPosition?: "top" | "left" | "right"
  span?: number;
  placeholder?: string;
  classList?: string;
  
}

const props = withDefaults(defineProps<IProps>(), {
  clearable: true,
  disabled: false,

  requestMode: "get",
  payload: {},
  returnLabel: null,
  returnValue: "",
  optionFilter: null,

  prop: "",
  labelPosition: "top",
  span: 4,
  placeholder: "請輸入關鍵字",
  classList: "",


});

const remoteMethod = async (keyword: string) => {
  if (keyword) {
    loading.value = true;
    let response = undefined as any
    
    if (keyword.length > 1) { // 輸入2個字元才會查
      const payload = { 
        ...props.payload,
        keyword // keyword 放入 payload
      }; 
      /* await 用來解 promise */
      response = await axiosRequest[`${props.requestMode}Request`](props.apiUrl, payload)
        /* .then .catch 用來處理 error, 如果不需要顥示 ElNotification, 可以註解 */
        .then((data) => data)
        .catch((errorMessage) => { ElNotification({ title: errorMessage, type: "error", duration: 2500 }) })
    } else {
      return
    }

    const filteredData = props.optionFilter === null ? response : props.optionFilter(response);
    const data = filteredData.data.items.map((item: any) => ({
      label: props.returnLabel === null ? item : props.returnLabel!(item),
      value: props.returnValue === "" ? item : item[props.returnValue], // 不可回傳 object
    }));
    
    options.value = data;
    loading.value = false;
  } else {
    options.value = [];
  }
};
</script>

<style lang="scss">
@use '@/style/select.scss';
</style>

