<template>
  <q-dialog
    :model-value="modelValue"
    persistent
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-card style="min-width: 480px; max-width: 560px; width: 100%">
      <!-- Header -->
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ isEdit ? 'Edit Stock' : 'Add Stock' }}</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="close" />
      </q-card-section>

      <!-- Form -->
      <q-card-section>
        <q-form ref="formRef" class="q-gutter-sm" @submit.prevent="submit">
          <div class="row q-col-gutter-md">
            <!-- Symbol -->
            <div class="col-6">
              <q-input
                v-model="form.symbol"
                label="Symbol *"
                dense
                outlined
                :rules="[(val) => !!val || 'Symbol is required']"
              />
            </div>

            <!-- Company Name -->
            <div class="col-6">
              <q-input
                v-model="form.companyName"
                label="Company Name *"
                dense
                outlined
                :rules="[(val) => !!val || 'Company name is required']"
              />
            </div>

            <!-- Industry -->
            <div class="col-12">
              <q-input
                v-model="form.industry"
                label="Industry *"
                dense
                outlined
                :rules="[(val) => !!val || 'Industry is required']"
              />
            </div>

            <!-- Purchase Price -->
            <div class="col-6">
              <q-input
                v-model.number="form.purchase"
                label="Purchase Price *"
                type="number"
                dense
                outlined
                prefix="$"
                :rules="[
                  (val) => (val !== null && val !== '') || 'Required',
                  (val) => val >= 0 || 'Must be >= 0',
                ]"
              />
            </div>

            <!-- Last Dividend -->
            <div class="col-6">
              <q-input
                v-model.number="form.lastDiv"
                label="Last Dividend *"
                type="number"
                dense
                outlined
                prefix="$"
                :rules="[
                  (val) => (val !== null && val !== '') || 'Required',
                  (val) => val >= 0 || 'Must be >= 0',
                ]"
              />
            </div>

            <!-- Market Cap -->
            <div class="col-12">
              <q-input
                v-model.number="form.marketCap"
                label="Market Cap *"
                type="number"
                dense
                outlined
                prefix="$"
                :rules="[
                  (val) => (val !== null && val !== '') || 'Required',
                  (val) => val >= 0 || 'Must be >= 0',
                ]"
                :hint="marketCapHint"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>

      <!-- Actions -->
      <q-card-actions align="right" class="q-pa-md q-pt-none">
        <q-btn flat label="Cancel" color="grey-7" @click="close" />
        <q-btn
          unelevated
          :label="isEdit ? 'Save Changes' : 'Create Stock'"
          color="primary"
          :loading="saving"
          @click="submit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'StockFormDialog',

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Object,
      default: null,
    },
    saving: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue', 'submit'],

  data() {
    return {
      form: this.emptyForm(),
    }
  },

  computed: {
    isEdit() {
      return !!this.stock
    },

    marketCapHint() {
      if (!this.form.marketCap) return ''
      const v = this.form.marketCap
      if (v >= 1_000_000_000_000) return `${(v / 1_000_000_000_000).toFixed(2)}T`
      if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(2)}B`
      if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(2)}M`
      return ''
    },
  },

  watch: {
    modelValue(val) {
      if (val) {
        this.form = this.stock ? { ...this.stock } : this.emptyForm()
      }
    },
  },

  methods: {
    emptyForm() {
      return {
        symbol: '',
        companyName: '',
        purchase: null,
        lastDiv: null,
        industry: '',
        marketCap: null,
      }
    },

    async submit() {
      const valid = await this.$refs.formRef.validate()
      if (!valid) return
      this.$emit('submit', { ...this.form })
    },

    close() {
      this.$refs.formRef?.resetValidation()
      this.$emit('update:modelValue', false)
    },
  },
}
</script>
