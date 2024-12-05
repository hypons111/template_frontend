<template>
    <section>
        <Button :buttons="[
            { label: 'primary', type: 'primary', func: () => test('Primary'), show: true, disabled: false },
            { label: 'success', type: 'success', func: () => test('Success'), show: true, disabled: false },
            { label: 'warning', type: 'warning', func: () => test('Warning'), show: true, disabled: false },
            { label: 'danger', type: 'danger', func: () => test('Danger'), show: true, disabled: false },
            { label: 'info', type: 'info', func: () => test('Info'), show: true, disabled: false },
            { label: 'none', type: '', func: () => test('None'), show: true, disabled: false }
        ]" />
    </section>
</template>

<script setup>
function test(string) {
    console.log(`[${string}]`)
}
</script>

<style lang="scss" scoped></style>
