<template>
    <section>
        <el-form :model="form" :rules="rules" ref="ruleFormRef" label-position="top">
            <el-scrollbar>

                <el-row :gutter="30">
                    <Input 
                        :label="'不限輸入 (全屬性)'" 
                        :class="'text-align-right'" 
                        :span="4"
                        :prop="'normalModel'" 
                        :placeholder="'自定義 placeholder'" 
                        :clearable="true" 
                        :disabled="false" 
                        :inputType="''"
                        v-model="form.normalModel"
                        />
                </el-row>

                <el-row :gutter="30">
                    <Input :label="'只允許英文'" :inputType="'english'" v-model="form.englishModel" />
                    <Input :label="'只允許數字'" :inputType="'number'" v-model="form.numberModel" />
                    <Input :label="'只允許中文'" :inputType="'chinese'" v-model="form.chineseModel" />
                    <Input :label="'只允許符號'" :inputType="'symbol'" v-model="form.symbolModel" />
                </el-row>

                <el-row :gutter="30">
                    <Input :label="'只允許正數'" :inputType="'positive'" v-model="form.positiveModel" />
                    <Input :label="'只允許整數'" :inputType="'integer'" v-model="form.integerModel" />
                    <Input :label="'只允許正整數'" :inputType="'posInt'" v-model="form.posIntModel" />
                </el-row>

                <el-row :gutter="30">
                    <Input :label="'只允許字母、數字、中文'" :inputType="'engNumChi'" v-model="form.engNumChiModel" />
                    <Input :label="'只允許英文、數字、符號'" :inputType="'engNumSym'" v-model="form.engNumSymModel" />
                    <Input :label="'只允許英文、數字'" :inputType="'engNum'" v-model="form.engNumModel" />
                    <Input :label="'只允許數字、符號'" :inputType="'numSym'" v-model="form.numSymModel" />
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
    normalModel: [{ required: true, message: "請輸入", trigger: "change" }],
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
