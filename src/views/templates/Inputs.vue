<template>
    <section>
        <el-form :model="form" :rules="rules" ref="ruleFormRef" label-position="top">
            <el-row :gutter="30">
                <Input
                    :label="'不限輸入 (全屬性)'" 
                    :class="'text-align-right'" 
                    :placeholder="'自定義 placeholder'" 
                    :clearable="true" 
                    :disabled="false" 
                    :inputType="''"
                    :span="6"
                    :prop="'normal'" 
                    v-model="form.normal"
                />
            </el-row>

            <el-row :gutter="30">
                <Input :label="'中文'" :inputType="'chinese'" v-model="form.chinese" :prop="'chinese'" />
                <Input :label="'英文'" :inputType="'english'" v-model="form.english" :prop="'english'" />
                <Input :label="'數字'" :inputType="'number'" v-model="form.number" :prop="'number'" />
                <Input :label="'符號'" :inputType="'symbol'" v-model="form.symbol" :prop="'symbol'" />
            </el-row>

            <el-row :gutter="30">
                <Input :label="'正數'" :inputType="'positive'" v-model="form.positive" :prop="'positive'" />
                <Input :label="'整數'" :inputType="'integer'" v-model="form.integer" :prop="'integer'" />
                <Input :label="'正整數'" :inputType="'posInt'" v-model="form.posInt" :prop="'posInt'" />
                <Input :label="'正負整小數'" :inputType="'decimal'" v-model="form.decimal" :prop="'decimal'" />
            </el-row>

            <el-row :gutter="30">
                <Input :label="'字母、數字、中文'" :inputType="'engNumChi'" v-model="form.engNumChi" :prop="'engNumChi'" />
                <Input :label="'英文、數字、符號'" :inputType="'engNumSym'" v-model="form.engNumSym" :prop="'engNumSym'" />
                <Input :label="'英文、數字'" :inputType="'engNum'" v-model="form.engNum" :prop="'engNum'" />
                <Input :label="'數字、符號'" :inputType="'numSym'" v-model="form.numSym" :prop="'numSym'" />
            </el-row>

        </el-form>

        <button @click="consoleLog()">Console Log</button>
        <button @click="clear()">Clear Inputs</button>
    </section>
</template>

<script setup>
const form = reactive({
    chinese: '',
    english: '',
    number: '',
    symbol: '',
    positive: 0,
    integer: 0,
    posInt: 0,
    decimal: 0,
    engNumChi: '',
    engNumSym: '',
    engNum: '',
    numSym: '',
    normal: '',
});

const ruleFormRef = ref();
const rules = reactive({
    normal: [{ required: true, message: "請輸入", trigger: "change" }],
});

function consoleLog() {
    ruleFormRef.value?.validate((valid, fields) => {
        if (valid) {
            console.log(form.normal.trim())
            console.log(form.english.trim())
            console.log(form.number.trim())
            console.log(form.chinese.trim())
            console.log(form.symbol.trim())
            console.log(Number(form.positive))
            console.log(Number(form.integer))
            console.log(Number(form.posInt))
            console.log(form.engNumChi.trim())
            console.log(form.engNumSym.trim())
            console.log(form.engNum.trim())
            console.log(form.numSym.trim())
        }
    });
}

function clear() {
    ruleFormRef.value.resetFields()
}

</script>

<style lang="scss" scoped>
.el-row {
    width: 100%;
    margin-bottom: 2rem;
}
</style>
