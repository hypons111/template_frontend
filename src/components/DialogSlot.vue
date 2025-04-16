<template>

  <el-dialog
    id="dialogSlot"
    v-model="modelValue"
    :width="width"
    :close-on-click-modal="false"
  >
    <template #header>
      <slot name="header" id="dialogHeader"/>
    </template>

    <div class="dialog-body">
      <slot name="body" />
    </div>

    <template #footer>
      <div class="dialog-footer">
        <slot name="footer" />
      </div>
    </template>

  </el-dialog>
</template>

<script setup></script>

<style lang="scss">
#dialogSlot {

  .el-dialog__header {
    P {
      font-weight: 900;
      color: white;
    }
  }

  .el-dialog__body {
    .el-form-item {
      margin-left: 0;
    }
  }

  .el-dialog__footer {
    BUTTON {
      margin-bottom: 0;
    }
  }
}
</style>
