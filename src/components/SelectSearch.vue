<template>
  <el-col :span="span" :xs="24">
    <el-form-item :prop="prop" :label="label">
      <el-select-v2
        :class="class"
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
import axios from "axios";

const modelValue = defineModel();
const loading = ref(false)
const options = ref<any[]>([])

interface IProps {
  label: string;
  class: string,
  span: number;
  prop: string;
  placeholder: string,
  clearable: boolean;
  disabled: boolean;
  apiUrl: string;
  optionFilter?: Function;
  optionParser?: Function;
  // remoteMethod: Function;
}

const props = withDefaults(defineProps<IProps>(), {
  class: "",
  span: 24,
  prop: "",
  placeholder: "請輸入關鍵字",
  clearable: true,
  disabled: false,
});

/* fetch & parse & filter */
const remoteMethod = async (query: string) => {
  if (query) {
    loading.value = true
    const response = await axios.get<any[]>(`${props.apiUrl}`)
    const filteredData = props.optionFilter ? props.optionFilter(response.data) : response.data// 篩選選單
    const data = filteredData.map((item: any) => ({
      label: props.optionParser!(item), // 選項
      value: item, // 回傳值
    }));
    options.value = data
    loading.value = false
  } else {
    options.value = []
  }
}
</script>

<style lang="scss" scoped>
:deep(.text-align-right) {
  & > DIV {
    text-align: right;
  }
}
</style>