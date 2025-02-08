<template>
  <el-col class="selectSeries" :span="span" :xs="24">
    <el-form-item :prop="prop" :label="labelObj[label]">
      <el-select
        :class="class"
        :placeholder="placeholder"
        :clearable="clearable"
        :disabled="disabled"
        :multiple="multiple"
        v-model="modelValue"
        :teleported="false"
      >
        <el-option
          v-for="item in options[label]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-col>
</template>

<script lang="ts" setup>
const modelValue = defineModel<string>();

interface IProps {
  label: string;
  class: string;
  span: number;
  prop: string;
  placeholder: string;
  clearable: boolean;
  disabled: boolean;
  multiple: boolean;
}

withDefaults(defineProps<IProps>(), {
  class: "",
  span: 4,
  prop: "",
  placeholder: "請選擇",
  clearable: true,
  disabled: false,
  multiple: false,
});

const labelObj = {
  StaticSelect: "Static Select",
  staticModel2: "Multiple",
};

const options = {
  StaticSelect: [
    {
      id: 1,
      label: "Rick Sanchez",
      value: {"id":1,"name":"Rick Sanchez","status":"Alive","species":"Human","type":"Human","gender":"Male","origin":"Earth (C-137)","image":"https://rickandmortyapi.com/api/character/avatar/1.jpeg"},
    },
    {
      id: 2,
      label: "Morty Smith",
      value: {"id":2,"name":"Morty Smith","status":"Alive","species":"Human","type":"Human","gender":"Male","origin":"Earth (C-137)","image":"https://rickandmortyapi.com/api/character/avatar/2.jpeg"},
    },
    {
      id: 3,
      label: "Summer Smith",
      value: {"id":3,"name":"Summer Smith","status":"Alive","species":"Human","type":"Human","gender":"Female","origin":"Earth (Replacement Dimension)","image":"https://rickandmortyapi.com/api/character/avatar/3.jpeg"},
    },
    {
      id: 4,
      label: "Beth Smith",
      value: {"id":4,"name":"Beth Smith","status":"Alive","species":"Human","type":"Human","gender":"Female","origin":"Earth (Replacement Dimension)","image":"https://rickandmortyapi.com/api/character/avatar/4.jpeg"},
    },
    {
      id: 5,
      label: "Jerry Smith",
      value: {"id":5,"name":"Jerry Smith","status":"Alive","species":"Human","type":"Human","gender":"Male","origin":"Earth (Replacement Dimension)","image":"https://rickandmortyapi.com/api/character/avatar/5.jpeg"},
    },
  ],
  StaticSelect1: [
    {
      id: "001",
      label: "A",
      value: "ONE",
    },
    {
      id: "002",
      label: "B",
      value: "TWO",
    },
    {
      id: "003",
      label: "C",
      value: "THREE",
    },
    {
      id: "004",
      label: "D",
      value: "FOUR",
    },
    {
      id: "005",
      label: "E",
      value: "FIVE",
    },
  ],
};
</script>

<style lang="scss" scoped>
@import '@/style/select_style.scss';
</style>