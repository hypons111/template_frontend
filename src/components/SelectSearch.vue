<template>
  <el-col class="selectComponent" :span="span" :xs="24">
    <el-form-item :prop="prop" :label="label" :label-position="labelPosition">
      <el-select-v2
        :class="classList"
        :placeholder="placeholder"
        :clearable="clearable"
        :disabled="disabled"
        :options="options"
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
  /* 必填 */
  label: string;
  apiUrl: string;
  optionParser: Function;
  /* 非必填 */
  payload?: Object;
  clearable?: boolean;
  disabled?: boolean;
  classList?: string;
  labelPosition?: "top" | "left" | "right"
  placeholder?: string;
  span?: number;
  prop?: string;
  optionFilter?: Function | boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  payload: {} as any,
  clearable: true,
  disabled: false,
  classList: "",
  labelPosition: "top",
  placeholder: "請輸入關鍵字",
  span: 4,
  prop: "",
  optionFilter: false,
});

const remoteMethod = async (keyword: string) => {
  if (keyword) {
    loading.value = true;
    let response = undefined as any
    if (keyword.length > 1) { // 輸入2個字元才會查
      /* 父子元件之間 data 單向流動, 防止子元件亂改 props 影響到父層 */
      const requestPayload = { 
        ...props.payload,
        keyword // 將查詢關鍵字放入 requestPayload
      }; 
      /* await 用來解 promise */
      response = await axiosRequest.postRequest(props.apiUrl, requestPayload)
        /* .then .catch 用來處理 error, 如果不需要顥示 ElNotification, 可以註解 */
        .then((data) => data)
        .catch((errorMessage) => { ElNotification({ title: errorMessage, type: "error", duration: 2500 }) })
    } else {
      return
    }
    const filteredData = props.optionFilter ? (props.optionFilter as Function)(response) : response;
    const data = filteredData.data.map((item: any) => ({
      label: props.optionParser!(item),
      value: item,
    }));
    options.value = data;
    loading.value = false;
  } else {
    options.value = [];
  }
};
</script>

<style lang="scss">
@import '@/style/selectStyle.scss';
</style>

