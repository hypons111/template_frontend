<template>
  <el-col class="select static" :span="span" :xs="24">
    <el-form-item :prop="prop" :label="labelOptions" :label-position="labelPosition">
      <el-select
        :clearable="clearable"
        :disabled="disabled"
        :multiple="multiple"
        :placeholder="placeholder"
        :class="classList"
        v-model="modelValue"
      >
        <el-option
          v-for="item in valueOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-col>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import selectStaticOptions from "@/static/selectStaticOptions" // options 都放這裡

interface Interface {
  label: string;
  value: string;
  clearable?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  prop?: string;
  labelPosition?: "top" | "left" | "right"
  span?: number;
  placeholder?: string;
  classList?: string;
}

const props = withDefaults(defineProps<Interface>(), {
  labelPosition: "top",
  classList: "",
  clearable: true,
  disabled: false,
  multiple: false,
  prop: "",
  span: 4,
  placeholder: "請選擇",
});

const modelValue = defineModel<string>();

/* <el-select> 名稱 */
const labelOptions = computed(() => {
  const data = selectStaticOptions
  return data.labelOptions[props.label]
})

/* <el-select> 選單 */
const valueOptions = computed(() => {
  const data = selectStaticOptions
  return data[props.value]
})
</script>

<style lang="scss">
@use '@/style/select.scss';
</style>