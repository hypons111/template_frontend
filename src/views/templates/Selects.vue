<template>
    <section>
        <el-form :model="form" :rules="rules" ref="ruleFormRef" label-position="top">
            <el-row :gutter="30">
                <SelectStatic :label="'StaticSelect'" v-model="form.staticModel" prop="staticModel" :clearable="true"
                    :multiple="false" :disabled="false" :span="6" :placeholder="'請選擇'" />

                <!-- 注意 optionFilter -->
                <SelectPassvie :label="'Passvie Select (filtered: name === A)'" v-model="form.passvieModel" :options="options"
                    prop="passvieModel" :optionFilter="(item) => item.filter(({ name }) => name === 'A')"
                    :optionParser="(item) => `[${item.id}]${item.name}`" :clearable="true" :multiple="false"
                    :disabled="false" :span="6" :placeholder="'請選擇'" />

                <!-- 注意 optionFilter -->
                <SelectApi :label="'API Select (filtered: name === A)'" v-model="form.apiModel" apiUrl="/json/options.json" prop="apiModel"
                    :optionFilter="(item) => item.filter(({ name }) => name === 'A')"
                    :optionParser="(item) => `[${item.id}]${item.name}`" :clearable="true" :multiple="false"
                    :disabled="false" :span="6" :placeholder="'請選擇'" />

                <!-- 注意 optionFilter -->
                <SelectSearch :label="'Search Select (filtered: name === Rick Sanchez)'" v-model="form.searchModel"
                    apiUrl="https://api.sampleapis.com/rickandmorty/characters" prop="searchModel"
                    :optionFilter="(item) => item.filter(({ name }) => name === 'Rick Sanchez')"
                    :optionParser="(item) => `[${item.species}] ${item.name}`" :clearable="true" :disabled="false"
                    :span="6" :placeholder="'請輸入關鍵字'" />
            </el-row>
        </el-form>

        <button @click="consoleLog()">Console Log</button>
        <button @click="clear()">Clear Inputs</button>

    </section>
</template>

<script setup>
import axios from "axios";
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
    staticModel: [{ required: true, message: "請選擇 Static", trigger: "blur" }],
    passvieModel: [{ required: true, message: "請選擇 passvie", trigger: "blur" }],
    apiModel: [{ required: true, message: "請選擇 passvie", trigger: "blur" }],
    searchModel: [{ required: true, message: "請選擇 search", trigger: "blur" }],
});

const options = ref([])
async function fetchOption() {
    try {
        options.value = await axios.get("/json/options.json").then(({ data }) => data)
    } catch (error) { console.log(error) }
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
SECTION {
    height: 20%;
}
</style>



