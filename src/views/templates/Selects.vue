<template>
    <section>
        <el-form :model="form" :rules="rules" ref="ruleFormRef" label-position="top">
            <el-row :gutter="20">
                <SelectStatic 
                    :label="'StaticSelect'"
                    :class="'text-align-right'" 
                    :span="6" 
                    :prop="'staticModel'" 
                    :placeholder="'自定義 placeholder'"
                    :clearable="true"
                    :disabled="false" 
                    :multiple="false" 
                    v-model="form.staticModel"
                />

                <SelectPassvie 
                    :label="'Passvie Select (optionFilter)'"
                    :class="'text-align-right'" 
                    :span="6" 
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

                <SelectApi 
                    :label="'API Select (optionFilter)'" 
                    :class="'text-align-right'" 
                    :span="6"
                    :prop="'apiModel'"
                    :placeholder="'請選擇'"
                    :clearable="true" 
                    :disabled="false"
                    :multiple="false"
                    :apiUrl="'/json/countries.json'" 
                    :optionFilter="(item) => item.filter(({ name }) => name.startsWith('B'))"
                    :optionParser="(item) => `[${item.id}]${item.name}`" 
                    v-model="form.apiModel"
                />

                <SelectSearch 
                    :label="'Search Select (optionFilter)'" 
                    :class="'text-align-right'" 
                    :span="6" 
                    :prop="'searchModel'"
                    :placeholder="'請輸入關鍵字'"
                    :clearable="true" 
                    :disabled="false"
                    :apiUrl="'/json/countries.json'"
                    :searchTextField= "'name'"
                    :searchNumberField= "'id'"
                    :optionFilter="(item) => item.filter(({ abbreviation }) => abbreviation.startsWith('C'))"
                    :optionParser="(item) => `[${item.id}]${item.name}`"
                    v-model="form.searchModel"
                />
            </el-row>
        </el-form>

        <el-row :gutter="0">
            <button @click="consoleLog()">Console Log</button>
            <button @click="clear()">Clear Inputs</button>
        </el-row>

    </section>
</template>

<script setup>
import service from "@/api/service.ts";
import { onBeforeMount } from "vue";

const form = reactive({
    staticModel: undefined,
    passvieModel: undefined,
    apiModel: undefined,
    searchModel: undefined,
});

const ruleFormRef = ref();
const rules = reactive({
    staticModel: [{ required: true, message: "請選擇 Static", trigger: "blur" }],
    passvieModel: [{ required: true, message: "請選擇 passvie", trigger: "blur" }],
    apiModel: [{ required: true, message: "請選擇 passvie", trigger: "blur" }],
    searchModel: [{ required: true, message: "請選擇 search", trigger: "blur" }],
});

const options = ref([])
async function fetchOption() {
    const { success, error, data } = await service.getCountries()
    if(success) options.value = data
    else console.log(error)
}

function consoleLog() {
    ruleFormRef.value?.validate((valid, fields) => {
        if (valid) {
            console.log(form.staticModel);
            console.log(form.passvieModel);
            console.log(form.apiModel);
            console.log(form.searchModel);
        }
    });
}

function clear() {
    ruleFormRef.value.resetFields()
}

onBeforeMount(() => {
    fetchOption()
})
</script>

<style lang="scss" scoped>
// SECTION {
//     height: 20%;
// }
</style>



