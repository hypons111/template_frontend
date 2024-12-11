<template>
  <el-col :span="span" :xs="24">
    <el-form-item :prop="prop" :label="label">
      <el-select-v2 
        v-model="modelValue" 
        :clearable="clearable"
        :disabled="disabled"
        :placeholder="placeholder" 
        :options="options" 
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
import axios from "axios";

const modelValue = defineModel();
const loading = ref(false)
const options = ref<any[]>([])

interface IProps {
  label: string;
  apiUrl: string;
  span: number;
  placeholder?: string,
  clearable?: boolean;
  disabled?: boolean;
  prop?: string;
  remoteMethod: Function;
  optionFilter?: Function;
  optionParser: Function;
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: "請輸入關鍵字",
  clearable: true,
  multiple: false,
  disabled: false,
  optionLabelFilter: (data) => data
});

/* fetch data */
const remoteMethod = async (query: string) => {
  if (query) {
    loading.value = true
    const response = await axios.get<any[]>(`${props.apiUrl}`)
    const filteredData = props.optionFilter ? props.optionFilter(response.data) : response.data// 篩選選單
    const data = filteredData.map((item: any) => ({
      label: props.optionParser(item), // 選項
      value: item, // 回傳值
    }));
    options.value = data
    loading.value = false
  } else {
    options.value = []
  }
}
</script>
