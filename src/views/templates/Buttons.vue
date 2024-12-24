<template>
    <section>
        <Button :buttons="[
            { label: 'primary', type: 'primary', func: () => example('Primary'), show: true, disabled: false },
            { label: 'success', type: 'success', func: () => example('Success'), show: true, disabled: false },
            { label: 'warning', type: 'warning', func: () => example('Warning'), show: true, disabled: false },
            { label: 'danger', type: 'danger', func: () => example('Danger'), show: true, disabled: false },
            { label: 'info', type: 'info', func: () => example('Info'), show: true, disabled: false },
            { label: 'none', type: '', func: () => example('None'), show: true, disabled: false }
        ]" />
    </section>
</template>

<script setup>
function example(string) {
    console.log(`[${string}]`)
}
</script>

<style lang="scss" scoped></style>
