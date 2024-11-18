<template>
    <section>
        <el-form :model="form" :rules="rules" ref="ruleFormRef" label-position="top">
            <el-scrollbar height="100vh">
                <el-row :gutter="30">
                    <Input v-model="form.integerModel" :label="'限整數（正數或負數）'" :span="8" :inputType="'integer'"
                        :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />
                </el-row>

                <el-row :gutter="30">
                    <Input v-model="form.decimalModel" :label="'限小數（正數或負數，允許小數點）'" :span="8" :inputType="'decimal'"
                        :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />
                </el-row>

                <el-row :gutter="30">
                    <Input v-model="form.posIntegerModel" :label="'只允許正整數'" :span="8" :inputType="'posInteger'"
                        :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />
                </el-row>

                <el-row :gutter="30">
                    <Input v-model="form.posDecimalModel" :label="'只允許正整數或正小數'" :span="8" :inputType="'posDecimal'"
                        :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />
                </el-row>

                <el-row :gutter="30">
                    <Input v-model="form.englishModel" :label="'只允許英文字母'" :span="8" :inputType="'english'"
                        :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />
                </el-row>

                <el-row :gutter="30">
                    <Input v-model="form.chineseModel" :label="'只允許中文字符'" :span="8" :inputType="'chinese'"
                        :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />
                </el-row>

                <el-row :gutter="30">
                    <Input v-model="form.symbolModel" :label="'只允許符號'" :span="8" :inputType="'symbol'" :clearable="true"
                        :multiple="false" :disabled="false" :placeholder="'請輸入'" />
                </el-row>

                <el-row :gutter="30">
                    <Input v-model="form.nonSymbolModel" :label="'只允許字母、數字、中文'" :span="8" :inputType="'nonSymbol'"
                        :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />
                </el-row>

                <el-row :gutter="30">
                    <Input v-model="form.engNumSymModel" :label="'只允許英文、數字和符號'" :span="8" :inputType="'engNumSymbol'"
                        :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />
                </el-row>

                <el-row :gutter="30">
                    <Input v-model="form.engNumModel" :label="'只允許英文和數字'" :span="8" :inputType="'engNum'"
                        :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />
                </el-row>

                <el-row :gutter="30">
                    <Input v-model="form.numSymModel" :label="'只允許數字和符號'" :span="8" :inputType="'numSymbol'"
                        :clearable="true" :multiple="false" :disabled="false" :placeholder="'請輸入'" />
                </el-row>

            </el-scrollbar>
        </el-form>
        <button @click="test">Console Log</button>
    </section>
</template>

<script setup>
const form = reactive({
    integerModel: undefined,
    decimalModel: undefined,
    posIntegerModel: undefined,
    posDecimalModel: undefined,
    englishModel: undefined,
    chineseModel: undefined,
    symbolModel: undefined,
    nonSymbolModel: undefined,
    engNumSymModel: undefined,
    engNumModel: undefined,
    numSymModel: undefined,
});

const ruleFormRef = ref();
const rules = reactive({
    numberModel: [{ required: true, message: "請輸入", trigger: "blur" }],
    integerModel: [{ required: true, message: "請輸入", trigger: "blur" }],
    englishModel: [{ required: true, message: "請輸入", trigger: "blur" }],
    chineseModel: [{ required: true, message: "請輸入", trigger: "blur" }],
    symbolModel: [{ required: true, message: "請輸入", trigger: "blur" }],
    nonSymbolModel: [{ required: true, message: "請輸入", trigger: "blur" }],
});


function test() {
    ruleFormRef.value?.validate((valid, fields) => {
        if (valid) {
            console.log(form.integerModel)
            console.log(form.decimalModel)
            console.log(form.posIntegerModel)
            console.log(form.posDecimalModel)
            console.log(form.englishModel)
            console.log(form.chineseModel)
            console.log(form.symbolModel)
            console.log(form.nonSymbolModel)
            console.log(form.engNumSymModel)
            console.log(form.engNumModel)
            console.log(form.numSymModel)
        }
    });
}

</script>

<style lang="scss" scoped>
.el-scrollbar {
    // border: 1px solid red;
}

.el-row {
    width: 100%;
    // border: 1px solid blue;
}
</style>

