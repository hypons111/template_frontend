<template>
    <section>
        <ButtonGroup :buttons="[
            { label: 'primary', type: 'primary', show: true, disabled: false, func: () => example('Primary') },
            { label: 'success', type: 'success', show: true, disabled: false, func: () => example('Success') },
            { label: 'warning', type: 'warning', show: true, disabled: false, func: () => example('Warning') },
            { label: 'danger', type: 'danger', show: true, disabled: false, func: () => example('Danger') },
            { label: 'info', type: 'info', show: true, disabled: false, func: () => example('Info') },
            { label: 'none', type: '', show: true, disabled: false, func: () => example('None') }
        ]" />
    </section>
</template>

<script setup>
function example(string) {
    console.log(`[${string}]`)
}
</script>

<style lang="scss" scoped></style>
