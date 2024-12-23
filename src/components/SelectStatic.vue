<template>
  <el-col :span="span" :xs="24">
    <el-form-item :prop="prop" :label="labelObj[label]">
      
      <el-select 
        :class="class"
        :placeholder="placeholder"
        :clearable="clearable" 
        :disabled="disabled"
        :multiple="multiple" 
        v-model="modelValue"
      >
        <el-option v-for="item in options[label]" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

    </el-form-item>
  </el-col>
</template>

<script lang="ts" setup>
const modelValue = defineModel<string>();

interface IProps {
  label: string,
  class: string,
  span: number
  prop?: string,
  placeholder?: string,
  clearable?: boolean,
  multiple?: boolean;
  disabled?: boolean,
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: "請選擇",
  clearable: true,
  multiple: false,
  disabled: false
})

const labelObj = {
  StaticSelect: "Static Select",
  staticModel2: "Multiple",
  staticModel3: "validator",
}

const options = {
  StaticSelect: [
    {
      "id": "001",
      "name": "A",
      "value": "ONE"
    },
    {
      "id": "002",
      "name": "B",
      "value": "TWO"
    }, {
      "id": "003",
      "name": "C",
      "value": "THREE"
    }, {
      "id": "004",
      "name": "D",
      "value": "FOUR"
    }, {
      "id": "005",
      "name": "E",
      "value": "FIVE"
    }
  ],
  staticModel2: [
    { label: "選項 1", value: "A" },
    { label: "選項 2", value: "B" },
    { label: "選項 3", value: "C" }
  ],
  staticModel3: [
    { label: "選項 1", value: "A" },
    { label: "選項 2", value: "B" },
    { label: "選項 3", value: "C" }
  ]
}

</script>

<style lang="scss" scoped>
:deep(.hahaha) {
  border: 1px solid red;
}
</style>