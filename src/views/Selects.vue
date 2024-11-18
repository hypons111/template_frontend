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
                <SelectApi v-model="form.apiModel" :label="'API Select'" apiUrl="/json/options.json" :span="5"
                    :optionFilter="(item) => item.filter(({ name }) => name === 'A')" :optionParser="(item) => `[${item.id}]${item.name}`" 
                    :clearable="true" :multiple="false" :disabled="false" :placeholder="'請選擇'" prop="apiModel" />
            </el-row>
        </el-form>
        <button @click="testApi">Console Log</button>
    </section>
</template>

<script setup>
import axios from "axios";
import { onBeforeMount } from "vue";

const form = reactive({
    staticModel: undefined,
    passvieModel: undefined,
    apiModel: undefined,
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

/* passvie */
const apiRef = ref();
const apiRules = reactive({
    apiModel: [{ required: true, message: "請選擇 passvie", trigger: "blur" }]
});



const options = ref([])
async function fetchOption() {
    try {
        const response = await axios.get("/json/options.json")
        options.value = response.data
    } catch(error) { console.log(error)}
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

onBeforeMount(() => {
    fetchOption()
})
</script>

<style lang="scss" scoped></style>

