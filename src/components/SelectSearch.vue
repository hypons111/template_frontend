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
  label: string;
  labelPosition: "top" | "left" | "right"
  classList: string;
  span: number;
  prop: string;
  placeholder: string;
  clearable: boolean;
  disabled: boolean;
  apiUrl: string;
  searchTextField: string;
  searchNumberField: string;
  optionFilter: Function | false;
  optionParser: Function ;
}

const props = withDefaults(defineProps<IProps>(), {
  labelPosition: "top",
  classList: "",
  span: 4,
  prop: "",
  placeholder: "請輸入關鍵字",
  clearable: true,
  disabled: false,
  optionFilter: false,
  searchTextField: "name",
  searchNumberField: "id"
});

const remoteMethod = async (payload: string) => {
  if (payload) {
    loading.value = true;
    let response = undefined as any

    if (isNaN(Number(payload))) { // 查字串
      /* await 用來解 promise */
      response = await axiosRequest.getRequest(`${props.apiUrl}?${props.searchTextField}`, "")
        /* .then .catch 用來處理 error, 如果不需要顥示 ElNotification, 可以註解 */
        .then((data:any) => data) 
        .catch((errorMessage) => { ElNotification({ title: errorMessage, type: "error", duration: 2500 }) })
    } else if (payload.length > 2) { // 查數字
      /* await 用來解 promise */
      response = await axiosRequest.getRequest(`${props.apiUrl}?${props.searchNumberField}`, "")
        /* .then .catch 用來處理 error, 如果不需要顥示 ElNotification, 可以註解 */
        .then((data:any) => data)
        .catch((errorMessage) => { ElNotification({ title: errorMessage, type: "error", duration: 2500 }) })
    } else {
      return
    }

    const filteredData = props.optionFilter ? props.optionFilter(response) : response;
    const data = filteredData.map((item: any) => ({
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

