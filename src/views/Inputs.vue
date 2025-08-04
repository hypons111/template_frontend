<template>
    <section>
        <el-form :model="form" :rules="rules" ref="ruleFormRef" label-position="top">
            <el-row :gutter="35">
                <InputDate 
                    :label= "'日期'"
                    :clearable="true" 
                    :disabled="false" 
                    :disableDate= "'2025-07-10'"
                    :disableOperator= "'<'"
                    :prop= "'date'"
                    :labelPosition= "'top'"
                    :placeholder= "'請選擇'"
                    :classList= "''"
                    v-model="form.date"
                />
            </el-row>

            <el-row :gutter="35">
                <Input
                    :label="'不限輸入'"
                    :clearable="true"
                    :disabled="false"
                    :inputType="''"
                    :inputLimit="null"
                    :prop="'normal'"
                    :labelPosition= "'top'"
                    :placeholder="'請輸入'"
                    :class="''"
                    v-model="form.normal"
                />
            </el-row>

            <el-row :gutter="35">
                <Input :label="'中文'" :inputType="'chinese'" v-model="form.chinese" :prop="'chinese'" :span= "6" />
                <Input :label="'英文'" :inputType="'english'" v-model="form.english" :prop="'english'" :span= "6" />
                <Input :label="'數字'" :inputType="'number'" v-model="form.number" :prop="'number'" :span= "6" />
                <Input :label="'符號'" :inputType="'symbol'" v-model="form.symbol" :prop="'symbol'" :span= "6" />
            </el-row>

            <el-row :gutter="35">
                <Input :label="'正數'" :inputType="'positive'" v-model="form.positive" :prop="'positive'" :span= "6" />
                <Input :label="'整數'" :inputType="'integer'" v-model="form.integer" :prop="'integer'" :span= "6" />
                <Input :label="'正整數'" :inputType="'posInt'" v-model="form.posInt" :prop="'posInt'" :span= "6" />
                <Input :label="'正負整小數'" :inputType="'decimal'" v-model="form.decimal" :prop="'decimal'" :span= "6" />
            </el-row>

            <el-row :gutter="35">
                <Input :label="'英文、數字、中文'" :inputType="'engNumChi'" v-model="form.engNumChi" :prop="'engNumChi'" :span= "6" />
                <Input :label="'英文、數字、符號'" :inputType="'engNumSym'" v-model="form.engNumSym" :prop="'engNumSym'" :span= "6" />
                <Input :label="'英文、數字'" :inputType="'engNum'" v-model="form.engNum" :prop="'engNum'" :span= "6" />
                <Input :label="'數字、符號'" :inputType="'numSym'" v-model="form.numSym" :prop="'numSym'" :span= "6" />
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
    date: ''
});

const ruleFormRef = ref();
const rules = reactive({
    normal: [{ required: true, message: "請輸入", trigger: "change" }],
});

function consoleLog() {
    // ruleFormRef.value?.validate((valid, fields) => {
        // if (valid) {
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
        // }
    // });
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
