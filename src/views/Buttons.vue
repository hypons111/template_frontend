<template>
    <section>
        <Button :buttons="[
            { label: 'primary', type: 'primary', func: () => test('primary'), show: true, disabled: false },
            { label: 'success', type: 'success', func: () => test('success'), show: true, disabled: false },
            { label: 'warning', type: 'warning', func: () => test('warning'), show: true, disabled: false },
            { label: 'danger', type: 'danger', func: () => test('danger'), show: true, disabled: false },
            { label: 'info', type: 'info', func: () => test('info'), show: true, disabled: false },
            { label: 'none', type: '', func: () => test('none'), show: true, disabled: false }
        ]" />
    </section>
</template>

<script setup>
function test(string) {
    console.log(string)
}
</script>

<style lang="scss" scoped></style>
