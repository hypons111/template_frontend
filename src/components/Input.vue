<template>
  <el-col :span="span" :xs="24">
    <el-form-item :prop="prop" :label="label" :label-position="labelPosition">
      <el-input
        v-model="modelValue"
        :class="classList"
        :clearable="clearable"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="onInputChange"
      />
    </el-form-item>
  </el-col>
</template>

<script lang="ts" setup>
interface Interface {
  label: string;
  prop: string;
  labelPosition: "top" | "left" | "right"
  classList: string;
  clearable: boolean;
  disabled: boolean;
  inputType:
  | "chinese"
  | "english"
  | "number"
  | "symbol"
  | "integer"
  | "positive"
  | "posInt"
  | "decimal"
  | "engNumChi"
  | "engNumSym"
  | "engNum"
  | "numSym"
  | "";
  inputLimit: number | null;
  span: number;
  placeholder: string;
}

const modelValue = defineModel() as any;
const props = withDefaults(defineProps<Interface>(), {
  labelPosition: "top",
  classList: "",
  span: 4,
  prop: "",
  placeholder: "請輸入",
  clearable: true,
  disabled: false,
  inputType: "",
  inputLimit: null
});

const REGEX_TYPE = {
  chinese: /[^\u4e00-\u9fa5]/g,                           /* 只允許中文 */
  english: /[^a-zA-Z\s]+/g,                               /* 只允許英文 */
  number: /[^0-9]+/g,                                     /* 只允許數字 */
  symbol: /[\w\s\u4e00-\u9fa5]+/g,                        /* 只允許符號 */
  
  integer: /[^0-9-]|^0|(?<=^|-)(0)|(?!^)-/g,              /* 🟩正數  🟩負數  🟩整數  🟥小數 */
  posInt: /^(0|\D.*)|[^0-9]/g,                            /* 🟩正數  🟥負數  🟩整數  🟥小數 */
  positive: /[^0-9.]|^\.|(?<=\.)\./g,                     /* 🟩正數  🟥負數  🟩整數  🟩小數 */
  decimal: /[^0-9.-]|^\.|(?<=\.)\.|(?<!^)-|(?<=-)-/g,     /* 🟩正數  🟩負數  🟩整數  🟩小數 */
  
  engNumChi: /[^\w\u4e00-\u9fa5\s]+/g,          /* 只允許字母、數字、中文 */
  engNumSym: /[\u4e00-\u9fa5]+/g,               /* 只允許英文、數字和符號 */
  engNum: /[^a-zA-Z0-9]+/g,                     /* 只允許英文和數字 */
  numSym: /[^\d\W_]|[\u4e00-\u9fa5]/g           /* 只允許數字和符號 */
};

function onInputChange(value: string) {
  let newValue = value;
  /* 輸入限制 */
  if(props.inputType) { 
    const regex = REGEX_TYPE[props.inputType];
    newValue = value.replace(regex, "");
  }
  /* 輸入字數限制 */
  if(props.inputLimit && newValue.length > props.inputLimit) {
    newValue = newValue.slice(0, props.inputLimit);
  } 
  modelValue.value = newValue.trim();
}
</script>

<style lang="scss" scoped>
:deep(.text-align-right) {
  border: 1px solid red;
  input {
    text-align: right;
  }
}
</style>