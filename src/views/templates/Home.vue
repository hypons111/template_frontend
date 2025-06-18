<template>
  <SelectPassvie 
    :label="'TEST'"
    :labelPosition="'top'"
    :classList="''" 
    :span="12" 
    :prop="'passvieModel'"
    :placeholder="'請選擇'" 
    :clearable="true" 
    :disabled="false" 
    :multiple="false"
    :options="options"
    :optionFilter="(item) => item.filter(({ name }) => name.startsWith('A'))"
    :optionParser="(item) => `[${item.id}]${item.name}`" 
    v-model="form.passvieModel" 
/>
</template>

<script setup>
  import { testAPI } from "@/request/commonAPI"
  const options = ref([])
  const form = ref({
    passvieModel: ""
  })
  onMounted(async () => {
    options.value = await testAPI()
  })
</script>

<style lang="scss" scoped></style>
