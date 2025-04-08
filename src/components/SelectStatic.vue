<template>
  <el-col class="selectSeries" :span="span" :xs="24">
    <el-form-item :prop="prop" :label="labelOptions">
      <el-select
        :class="classList"
        :placeholder="placeholder"
        :clearable="clearable"
        :disabled="disabled"
        :multiple="multiple"
        v-model="modelValue"
        :teleported="false"
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
import { useQuery } from "@tanstack/vue-query";
import { getStaticData } from "@/utils/useQuery";
import { computed } from "vue";

interface Interface {
  label: string;
  classList: string;
  span: number;
  prop: string;
  placeholder: string;
  clearable: boolean;
  disabled: boolean;
  multiple: boolean;
}

const props = withDefaults(defineProps<Interface>(), {
  classList: "",
  span: 4,
  prop: "",
  placeholder: "請選擇",
  clearable: true,
  disabled: false,
  multiple: false,
});

const modelValue = defineModel<string>();

/* useQuery 從 staticData.json 取得資料 */
const staticData = useQuery(getStaticData) as any;

/* <el-select> 名稱 */
const labelOptions = computed(() => {
  const data = staticData.data.value
  return data ? data.labelOptions[props.label] : {} // 防止 fetchStaticMapsData 請求未返回時報錯
})

/* <el-select> 選單 */
  const valueOptions = computed(() => {
    const data = staticData.data.value
    return data ? data[props.label] : [] // 防止 fetchStaticMapsData 請求未返回時報錯
  })
</script>

<style lang="scss" scoped>
@import '@/style/selectStyle.scss';
</style>