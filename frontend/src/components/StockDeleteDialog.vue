<template>
  <q-dialog
    :model-value="modelValue"
    persistent
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-card style="min-width: 360px">
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="negative" text-color="white" />
        <div class="q-ml-md">
          <div class="text-h6">Delete Stock</div>
          <div v-if="stock" class="text-body2 text-grey-7 q-mt-xs">
            Are you sure you want to delete
            <strong>{{ stock.symbol }} — {{ stock.companyName }}</strong
            >? This action cannot be undone.
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md q-pt-none">
        <q-btn flat label="Cancel" color="grey-7" @click="$emit('update:modelValue', false)" />
        <q-btn
          unelevated
          label="Delete"
          color="negative"
          :loading="deleting"
          @click="$emit('confirm')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'StockDeleteDialog',

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Object,
      default: null,
    },
    deleting: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue', 'confirm'],
}
</script>
