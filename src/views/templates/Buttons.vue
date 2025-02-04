<template>
    <section>
        <el-row :gutter="30">
            <ButtonGroup :buttons="[
                { label: 'primary', type: 'primary', plain: false, round: false, show: true, disabled: false, func: () => example('Primary') },
                { label: 'success', type: 'success', plain: false, round: false, show: true, disabled: false, func: () => example('Success') },
                { label: 'warning', type: 'warning', plain: false, round: false, show: true, disabled: false, func: () => example('Warning') },
                { label: 'danger', type: 'danger', plain: false, round: false, show: true, disabled: false, func: () => example('Danger') },
                { label: 'info', type: 'info', plain: false, round: false, show: true, disabled: false, func: () => example('Info') },
                { label: 'none', type: '', plain: false, round: false, show: true, disabled: false, func: () => example('None') }
            ]" />
        </el-row>
        <el-row :gutter="30">
            <ButtonGroup :buttons="[
                { label: 'primary', type: 'primary', plain: true, round: false, show: true, disabled: false, func: () => example('Plain Primary') },
                { label: 'success', type: 'success', plain: true, round: false, show: true, disabled: false, func: () => example('Plain Success') },
                { label: 'warning', type: 'warning', plain: true, round: false, show: true, disabled: false, func: () => example('Plain Warning') },
                { label: 'danger', type: 'danger', plain: true, round: false, show: true, disabled: false, func: () => example('Plain Danger') },
                { label: 'info', type: 'info', plain: true, round: false, show: true, disabled: false, func: () => example('Plain Info') },
                { label: 'none', type: '', plain: true, round: false, show: true, disabled: false, func: () => example('Plain None') }
            ]" />
        </el-row>
        <el-row :gutter="30">
            <ButtonGroup :buttons="[
                { label: 'primary', type: 'primary', plain: false, round: true, show: true, disabled: false, func: () => example('Round Primary') },
                { label: 'success', type: 'success', plain: false, round: true, show: true, disabled: false, func: () => example('Round Success') },
                { label: 'warning', type: 'warning', plain: false, round: true, show: true, disabled: false, func: () => example('Round Warning') },
                { label: 'danger', type: 'danger', plain: false, round: true, show: true, disabled: false, func: () => example('Round Danger') },
                { label: 'info', type: 'info', plain: false, round: true, show: true, disabled: false, func: () => example('Round Info') },
                { label: 'none', type: '', plain: false, round: true, show: true, disabled: false, func: () => example('Round None') }
            ]" />
        </el-row>
        <el-row :gutter="30">
            <ButtonGroup :buttons="[
                { label: 'primary', type: 'primary', plain: true, round: true, show: true, disabled: false, func: () => example('Plain Round Primary') },
                { label: 'success', type: 'success', plain: true, round: true, show: true, disabled: false, func: () => example('Plain Round Success') },
                { label: 'warning', type: 'warning', plain: true, round: true, show: true, disabled: false, func: () => example('Plain Round Warning') },
                { label: 'danger', type: 'danger', plain: true, round: true, show: true, disabled: false, func: () => example('Plain Round Danger') },
                { label: 'info', type: 'info', plain: true, round: true, show: true, disabled: false, func: () => example('Plain Round Info') },
                { label: 'none', type: '', plain: true, round: true, show: true, disabled: false, func: () => example('Plain Round None') }
            ]" />
        </el-row>
        <el-row :gutter="30">
            <ButtonCircleGroup :buttons="[
                { icon: Check, type: 'primary', plain: false, show: true, disabled: false, func: () => example('Icon Check') },
                { icon: Delete, type: 'success', plain: false, show: true, disabled: false, func: () => example('Icon Delete') },
                { icon: Edit, type: 'warning', plain: false, show: true, disabled: false, func: () => example('Icon Edit') },
                { icon: Message, type: 'danger', plain: false, show: true, disabled: false, func: () => example('Icon Message') },
                { icon: Search, type: 'info', plain: false, show: true, disabled: false, func: () => example('Icon Search') },
                { icon: Star, type: '', plain: false, show: true, disabled: false, func: () => example('Icon Star') }
            ]" />
        </el-row>
        <el-row :gutter="30">
            <ButtonCircleGroup :buttons="[
                { icon: Check, type: 'primary', plain: true, show: true, disabled: false, func: () => example('Plain Icon Check') },
                { icon: Delete, type: 'success', plain: true, show: true, disabled: false, func: () => example('Plain Icon Delete') },
                { icon: Edit, type: 'warning', plain: true, show: true, disabled: false, func: () => example('Plain Icon Edit') },
                { icon: Message, type: 'danger', plain: true, show: true, disabled: false, func: () => example('Plain Icon Message') },
                { icon: Search, type: 'info', plain: true, show: true, disabled: false, func: () => example('Plain Icon Search') },
                { icon: Star, type: '', plain: true, show: true, disabled: false, func: () => example('Plain Icon Star') }
            ]" />
        </el-row>
    </section>
</template>

<script setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
function example(string) {
    console.log(`[${string}]`)
}
</script>

<style lang="scss" scoped></style>
