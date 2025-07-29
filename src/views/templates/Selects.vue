<template>
    <section>
        <el-form :model="form" :rules="rules" ref="ruleFormRef" label-position="top">
            <el-row :gutter="20">
                <SelectStatic 
                    :label="'example'"
                    :value="'example'"
                    :labelPosition="'top'"
                    :classList="'text-align-right'" 
                    :clearable="true"
                    :disabled="false" 
                    :multiple="false" 
                    :prop="'staticModel'" 
                    :span="12" 
                    :placeholder="'請選擇'"
                    v-model="form.staticModel"
                />

                <SelectPassvie 
                    :label="'Passvie Select'"
                    :labelPosition="'top'"
                    :classList="''" 
                    :span="12" 
                    :prop="'passvieModel'"
                    :placeholder="'請選擇'" 
                    :clearable="true" 
                    :disabled="false" 
                    :multiple="false"
                    :options="options"
                    :optionFilter="(item:any) =>  item.filter(({ species }:any) => species === 'Human')"
                    :optionParser="(item:any) => `[${item.id}]${item.name}`" 
                    v-model="form.passvieModel" 
                />

                <SelectApi 
                    :label="'API Select'"
                    :labelPosition="'top'"
                    :classList="''" 
                    :span="12"
                    :prop="'apiModel'"
                    :placeholder="'請選擇'"
                    :clearable="true" 
                    :disabled="false"
                    :multiple="false"
                    :requestMode="'get'" 
                    :apiUrl="'https://api.sampleapis.com/rickandmorty/characters'" 
                    :payload="{}"
                    :returnValue="'id'"
                    :optionParser="(item:any) => `[${item.id}]${item.name}`" 
                    :optionFilter="(item:any) => item.filter(({ species }:any) => species !== 'Human')"
                    v-model="form.apiModel"
                />

                <SelectSearch 
                    :label="'Search Select'"
                    :labelPosition="'top'"
                    :classList="''" 
                    :span="12" 
                    :prop="'searchModel'"
                    :placeholder="'請輸入關鍵字'"
                    :clearable="true" 
                    :disabled="false"
                    :apiUrl="'https://api.sampleapis.com/rickandmorty/characters'"
                    :searchTextField= "'name'"
                    :searchNumberField= "'id'"
                    :optionFilter="(item:any) => item.filter(({ species }:any) => species === 'Human')"
                    :optionParser="(item:any) => `[${item.id}]${item.name}`"
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

<script setup lang="ts">
import { testAPI } from "@/request/commonAPI"
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

function consoleLog() {
    ruleFormRef.value?.validate((valid:any, fields:any) => {
        console.log(form.staticModel);
        console.log(form.passvieModel);
        console.log(form.apiModel);
        console.log(form.searchModel);
        if (valid) {
        }
    });
}

function clear() {
    ruleFormRef.value.resetFields()
}

onBeforeMount(async () => {
//    options.value = await testAPI()
})
</script>

<style lang="scss" scoped></style>



