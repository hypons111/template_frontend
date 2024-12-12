<template>
    <section>
        <el-form :model="form" :rules="rules" ref="ruleFormRef" label-position="top">
            <el-scrollbar>

                <el-row :gutter="30">
                    <Input :label="'正常'" v-model="form.englishModel" prop="englishModel"
                         :span="6" :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />
                </el-row>
                
                <el-row :gutter="30">
                    <Input :label="'只允許英文'" v-model="form.englishModel" prop="englishModel" :inputType="'english'"
                         :span="6" :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />

                     <Input :label="'只允許數字'" v-model="form.numberModel" prop="numberModel" :inputType="'number'"
                         :span="6" :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />

                    <Input :label="'只允許中文'" v-model="form.chineseModel" prop="chineseModel" :inputType="'chinese'"
                         :span="6" :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />

                    <Input :label="'只允許符號'" v-model="form.symbolModel" prop="symbolModel" :inputType="'symbol'" 
                         :span="6" :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />
                </el-row>

                <el-row :gutter="30">
                    <Input :label="'只允許正數'" v-model="form.positiveModel" prop="positiveModel" :inputType="'positive'"
                         :span="6" :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />
    
                    <Input :label="'只允許整數'" v-model="form.integerModel" prop="integerModel" :inputType="'integer'"
                         :span="6" :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />
                   
                    <Input :label="'只允許正整數'" v-model="form.posIntModel" prop="posIntModel" :inputType="'posInt'"
                         :span="6" :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />
                </el-row>

                <el-row :gutter="30">
                    <Input :label="'只允許字母、數字、中文'" v-model="form.engNumChiModel" prop="engNumChiModel" :inputType="'engNumChi'"
                         :span="6" :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />

                    <Input :label="'只允許英文、數字、符號'" v-model="form.engNumSymModel" prop="engNumSymModel" :inputType="'engNumSym'"
                         :span="6" :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />

                    <Input :label="'只允許英文、數字'" v-model="form.engNumModel" prop="engNumModel" :inputType="'engNum'"
                         :span="6" :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />

                    <Input :label="'只允許數字、符號'" v-model="form.numSymModel" prop="numSymModel" :inputType="'numSym'"
                         :span="6" :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />
                </el-row>

            </el-scrollbar>

        </el-form>

        <button @click="consoleLog()">Console Log</button>
        <button @click="clear()">Clear Inputs</button>
    </section>
</template>

<script setup>
const form = reactive({
    englishModel: undefined,
    numberModel: undefined,
    chineseModel: undefined,
    symbolModel: undefined,
    positiveModel: undefined,
    integerModel: undefined,
    posIntModel: undefined,
    engNumChiModel: undefined,
    engNumSymModel: undefined,
    engNumModel: undefined,
    numSymModel: undefined,
});

const ruleFormRef = ref();
const rules = reactive({
    // numberModel: [{ required: true, message: "請輸入", trigger: "blur" }],
    // integerModel: [{ required: true, message: "請輸入", trigger: "blur" }],
    // englishModel: [{ required: true, message: "請輸入", trigger: "blur" }],
    // chineseModel: [{ required: true, message: "請輸入", trigger: "blur" }],
    // symbolModel: [{ required: true, message: "請輸入", trigger: "blur" }],
    // engNumChiModel: [{ required: true, message: "請輸入", trigger: "blur" }],
});

function consoleLog() {
    ruleFormRef.value?.validate((valid, fields) => {
        if (valid) {
            console.log(form.englishModel.trim())
            console.log(form.numberModel.trim())
            console.log(form.chineseModel.trim())
            console.log(form.symbolModel.trim())
            console.log(Number(form.positiveModel))
            console.log(Number(form.integerModel))
            console.log(Number(form.posIntModel))
            console.log(form.engNumChiModel.trim())
            console.log(form.engNumSymModel.trim())
            console.log(form.engNumModel.trim())
            console.log(form.numSymModel.trim())
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
