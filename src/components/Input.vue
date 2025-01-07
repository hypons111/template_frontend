<template>
  <el-col :span="span" :xs="24">
    <el-form-item :prop="prop" :label="label">
      <el-input
        :class="class"
        :placeholder="placeholder"
        :clearable="clearable"
        :disabled="disabled"
        v-model="modelValue"
        @input="onInputChange"
      />
    </el-form-item>
  </el-col>
</template>

<script lang="ts" setup>
interface IInput {
  label: string;
  class: string;
  placeholder: string;
  clearable: boolean;
  disabled: boolean;
  inputType:
  | "english"
  | "number"
  | "chinese"
  | "symbol"
  | "positive"
  | "integer"
  | "posInt"
  | "engNumChi"
  | "engNumSym"
  | "engNum"
  | "numSym"
  | "";
  span: number;
  prop: string;
}

const modelValue = defineModel() as any;
const props = withDefaults(defineProps<IInput>(), {
  class: "",
  span: 24,
  prop: "",
  placeholder: "請輸入",
  clearable: true,
  disabled: false,
  inputType: "",
});

// abc123一二三!@#
const regEx = {
  english: /[^a-zA-Z\s]+/g, // 只允許英文
  number: /[^0-9]+/g, // 只允許數字
  chinese: /[^\u4e00-\u9fa5]/g, // 只允許中文
  symbol: /[\w\s\u4e00-\u9fa5]+/g, // 只允許符號

  positive: /[^0-9.]+/g, // 只允許正數
  integer: /[^0-9-]|^0|(?<=^|-)(0)|(?!^)-/g, // 只允許整數
  posInt: /^(0|\D.*)|[^0-9]/g, // 只允許正整數

  engNumChi: /[^\w\u4e00-\u9fa5\s]+/g, // 只允許字母、數字、中文
  engNumSym: /[\u4e00-\u9fa5]+/g, // 只允許英文、數字和符號
  engNum: /[^a-zA-Z0-9]+/g, // 只允許英文和數字
  numSym: /[^\d\W_]|[\u4e00-\u9fa5]/g, // 只允許數字和符號
};

function onInputChange(value: string) {
  const regex = regEx[props.inputType];
  if (!regex) {
    modelValue.value = value; // 不進行過濾
    return;
  }
  const processedValue = value.replace(regex, "");
  modelValue.value = processedValue;
}
</script>

<style lang="scss" scoped>
:deep(.text-align-right) {
  border: 1px solid red;
  INPUT {
    text-align: right;
  }
}
</style>
