<template>
  <el-col class="selectSeries" :span="span" :xs="24">
    <el-form-item :prop="prop" :label="label">
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
import axios from "axios";

const modelValue = defineModel();
const loading = ref(false);
const options = ref<any[]>([]);

interface Interface {
  label: string;
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

const props = withDefaults(defineProps<Interface>(), {
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

const remoteMethod = async (query: string) => {
  if (query) {
    loading.value = true;
    let response = undefined as any
    if (isNaN(Number(query))) {
      response = await axios.get(`${props.apiUrl}?${props.searchTextField}.contains=${query}`)
    } else if (query.length > 2) {
      response = await axios.get(`${props.apiUrl}?${props.searchNumberField}.contains=${query}`)
    } else {
      options.value = []
      return
    }
    const filteredData = props.optionFilter ? props.optionFilter(response.data) : response.data;
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

