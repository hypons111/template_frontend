<template>
  <el-col :span="span" :xs="24">
    <el-form-item :label="label" :label-position="labelPosition" :prop="prop">
      <el-date-picker
        type="date" 
        size="default" 
        :clearable="clearable" 
        :disabled="disabled"
        :disabledDate="disabledDate"
        :placeholder="placeholder" 
        :class="classList"
        v-model="modelValue" 
      />
    </el-form-item>
  </el-col>
</template>

<script lang="ts" setup>
interface Interface {
  label: string;
  clearable?: boolean 
  disabled?: boolean; 
  disableDate?: string | null; // 禁止選擇的日期分界 // 例:"2025-07-10"
  disableOperator?: "<" | ">" | null // 在日期分界的 前/後 禁止選擇 
  prop?: string; 
  labelPosition?: "top" | "left" | "right"
  span?: number;
  placeholder?: string;
  classList?: string;
}

const modelValue = defineModel() as any;
const props = withDefaults(defineProps<Interface>(), {
  clearable: true,
  disabled: false,
  disableDate: null,
  disableOperator: null,
  prop: "",
  labelPosition: "top",
  span: 4,
  placeholder: "請選擇",
  classList: "",
})

// 禁止選擇的日期
function disabledDate(date: Date) {
  if(!props.disableDate) return
  const disableDate = new Date(props.disableDate);
  disableDate.setHours(0, 0, 0, 0);
  switch(props.disableOperator) {
    case ">" :
      return date > disableDate;
    case "<" :
      return date < disableDate;
  }
}
</script>
