<template>
  <el-col :span="span" :xs="24">
    <el-form-item :prop="prop" :label="label" :label-position="labelPosition">
      <el-date-picker
        type="date" 
        size="default" 
        :class="classList"
        :placeholder="placeholder" 
        :clearable="clearable" 
        :disabled="disabled"
        v-model="modelValue" 
      />
    </el-form-item>
  </el-col>
</template>

<script lang="ts" setup>
interface Interface {
  label: string;
  labelPosition: "top" | "left" | "right"
  classList: string;
  placeholder: string;
  clearable: boolean 
  disabled: boolean; 
  span: number;
  prop: string; 
}

const modelValue = defineModel() as any;
withDefaults(defineProps<Interface>(), {
  labelPosition: "top",
  classList: "",
  span: 4,
  prop: "",
  placeholder: "請選擇",
  clearable: true,
  disabled: false,
  inputType: "",
})
</script>
