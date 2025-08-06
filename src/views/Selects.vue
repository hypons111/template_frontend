<template>
    <section>
        <el-form :model="form" :rules="rules" ref="ruleFormRef" label-position="top">
            <el-row :gutter="20">
                <SelectStatic 
                    :label="'dragonball'"
                    :value="'dragonball'"
                    :clearable="true"
                    :disabled="false" 
                    :multiple="false" 
                    :prop="'staticModel'" 
                    :labelPosition="'top'"
                    :span="12" 
                    :placeholder="'請選擇'"
                    :classList="''" 
                    v-model="form.staticModel"
                />

                <SelectPassvie 
                    :label="'Passvie Select'"
                    :clearable="true" 
                    :disabled="false" 
                    :multiple="false"
                    :options="options"
                    :returnLabel="(item:any) => `${item.name} [${item.race}]`" 
                    :returnValue= "'id'"
                    :optionFilter="(item:any) =>  item.filter((item:any) => item)"
                    :prop="'passvieModel'"
                    :labelPosition="'top'"
                    :span="12" 
                    :placeholder="'請選擇'" 
                    :classList="''" 
                    v-model="form.passvieModel" 
                />

                <SelectApi 
                    :label="'API Select'"
                    :clearable="true" 
                    :disabled="false"
                    :multiple="false"
                    :requestMode="'get'" 
                    :apiUrl="'https://dragonball-api.com/api/characters'" 
                    :payload="{}"
                    :returnLabel="(item:any) => `${item.name} [${item.race}]`" 
                    :returnValue= "'id'"
                    :optionFilter="(item:any) =>  item.filter((item:any) => item)"
                    :prop="'apiModel'"
                    :labelPosition="'top'"
                    :span="12"
                    :placeholder="'請選擇'"
                    :classList="''" 
                    v-model="form.apiModel"
                />

                <SelectSearch 
                    :label="'Search Select'"
                    :clearable="true" 
                    :disabled="false"

                    :requestMode="'get'" 
                    :apiUrl="'https://dragonball-api.com/api/characters'" 
                    :payload="{}"
                    :returnLabel="(item:any) => `${item.name} [${item.race}]`" 
                    :returnValue= "'id'"
                    :optionFilter="(item:any) =>  item.filter((item:any) => item)"

                    :prop="'searchModel'"
                    :labelPosition="'top'"
                    :span="12"
                    :placeholder="'請輸入關鍵字'"
                    :classList="''" 

                    v-model="form.searchModel"
                />
            </el-row>
        </el-form>

        <el-row :gutter="35">
            <button @click="consoleLog()">Console Log</button>
            <button @click="clear()">Clear Inputs</button>
        </el-row>

    </section>
</template>

<script setup lang="ts">
import axiosRequest from "@/request/axiosRequest";
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

const options = ref([]) as any;

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

async function getDragonballAPI() {
    try {
        const dragonballAPI = () => axiosRequest.getRequest("https://dragonball-api.com/api/characters", {}).then(({data}) => data)
        const dragonballData = await dragonballAPI()
        options.value = dragonballData.items
    } catch(error) {
        console.log(error)
    }
}

onBeforeMount(async () => {
    getDragonballAPI()
})
</script>

<style lang="scss" scoped></style>



