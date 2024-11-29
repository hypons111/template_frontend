<template>
    <section>
        <el-form :model="form" :rules="staticRules" ref="staticRef" label-position="top">
            <el-row :gutter="30">
                <SelectStatic v-model="form.staticModel" :label="'StaticSelect'" :span="5" :clearable="true"
                    :multiple="false" :disabled="false" :placeholder="'請選擇'" prop="staticModel" />
            </el-row>
        </el-form>
        <button @click="testStatic">Console Log</button>
    </section>

    <section>
        <el-form :model="form" :rules="passvieRules" ref="passvieRef" label-position="top">
            <el-row :gutter="30">
                <!-- 注意 optionFilter -->
                <SelectPassvie v-model="form.passvieModel" :label="'Passvie Select'" :options="options" :span="5"
                    :optionFilter="(item) => item.filter(({ name }) => name === 'A')" :optionParser="(item) => `[${item.id}]${item.name}`" 
                    :clearable="true" :multiple="false" :disabled="false" :placeholder="'請選擇'" prop="passvieModel" />
            </el-row>
        </el-form>
        <button @click="testPassvie">Console Log</button>
    </section>

    <section>
        <el-form :model="form" :rules="apiRules" ref="apiRef" label-position="top">
            <el-row :gutter="30">
                <!-- 注意 optionFilter -->
                <SelectApi v-model="form.apiModel" :label="'API Select'" apiUrl="/json/options.json" :span="5"
                    :optionFilter="(item) => item.filter(({ name }) => name === 'A')" :optionParser="(item) => `[${item.id}]${item.name}`" 
                    :clearable="true" :multiple="false" :disabled="false" :placeholder="'請選擇'" prop="apiModel" />
            </el-row>
        </el-form>
        <button @click="testApi">Console Log</button>
    </section>

    <section>
        <el-form :model="form" :rules="searchRules" ref="searchRef" label-position="top">
            <el-row :gutter="30">
                <!-- 注意 optionFilter -->
                <SelectSearch v-model="form.searchModel" :label="'Search Select'" apiUrl="https://api.sampleapis.com/rickandmorty/characters" :span="5"
                    :optionParser="(item) => `[${item.species}] ${item.name}`" 
                    :clearable="true" :disabled="false" :placeholder="'請輸入關鍵字'" prop="searchModel" />
            </el-row>
        </el-form>
        <button @click="testSearch">Console Log</button>
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

/* static */
const staticRef = ref();
const staticRules = reactive({
    staticModel: [{ required: true, message: "請選擇 Static", trigger: "blur" }]
});

/* passvie */
const passvieRef = ref();
const passvieRules = reactive({
    passvieModel: [{ required: true, message: "請選擇 passvie", trigger: "blur" }]
});

/* api */
const apiRef = ref();
const apiRules = reactive({
    apiModel: [{ required: true, message: "請選擇 passvie", trigger: "blur" }]
});

/* search */
const searchRef = ref();
const searchRules = reactive({
    searchModel: [{ required: true, message: "請選擇 search", trigger: "blur" }]
});



const options = ref([])
async function fetchOption() {
    try {
        const responseData = await axios.get("/json/options.json").then(({data}) => data)
        console.log(responseData)
        options.value = await axios.get("/json/options.json").then(({data}) => data)
    } catch(error) { console.log(error) }
}

function testStatic() {
    staticRef.value?.validate((valid, fields) => {
        if (valid) {
            console.log(form.staticModel);
        }
    });
}
function testPassvie() {
    passvieRef.value?.validate((valid, fields) => {
        if (valid) {
            console.log(form.passvieModel);
        }
    });
}
function testApi() {
    apiRef.value?.validate((valid, fields) => {
        if (valid) {
            console.log(form.apiModel);
        }
    });
}
function testSearch() {
    searchRef.value?.validate((valid, fields) => {
        if (valid) {
            console.log(form.searchModel);
        }
    });
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

