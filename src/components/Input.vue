<template>
    <el-col :span="span" :xs="24">
        <el-form-item :prop="prop" :label="label">
            <el-input v-model="modelValue" :placeholder="placeholder" :clearable="clearable" :disabled="disabled" @input="onInputChange"/>
        </el-form-item>
    </el-col>
</template>

<script lang="ts" setup>
import { Ref, watch } from 'vue';

const modelValue = defineModel() as Ref<string>;

interface IInput {
    label: string,
    span: number,
    placeholder?: string,
    clearable?: boolean,
    disabled?: boolean,
    prop?: string,
    inputType: "integer" | "decimal" | "posInteger" | "posDecimal" | "english" | "chinese" | "symbol" | "nonSymbol" | "engNumSym" | "engNum" | "numSym" | ""
}

const props = withDefaults(defineProps<IInput>(), {
    placeholder: "請輸入",
    clearable: true,
    disabled: false,
    inputType: ''
})

const regEx = {
    integer: /^-?\d+$/,                     // 限整數（正數或負數）
    decimal: /^-?\d+(\.\d+)?$/,             // 限小數（正數或負數，允許小數點）
    posInteger: /^\d+$/,                    // 只允許正整數
    posDecimal: /^\d+(\.\d+)?$/,            // 只允許正整數或正小數
    english: /[^a-zA-Z\s]+/g,               // 只允許英文字母
    chinese: /[^\u4e00-\u9fa5]/g,           // 只允許中文字符
    symbol: /[\w\u4e00-\u9fa5\s]+/g,        // 只允許符號
    nonSymbol: /[^\w\u4e00-\u9fa5\s]+/g,    // 只允許字母、數字、中文
    engNumSymbol: /[^a-zA-Z0-9\W_]+/g,      // 只允許英文、數字和符號
    engNum: /[^a-zA-Z0-9]+/g,               // 只允許英文和數字
    numSymbol: /[^0-9\W_]+/g                // 只允許數字和符號
};

function onInputChange(value: string) {
    const regex = regEx[props.inputType];
    if (!regex) {
        modelValue.value = value; // 不進行過濾
        return;
    }
    const processedValue = value.replace(regex, '');
    modelValue.value = processedValue;
}

</script>