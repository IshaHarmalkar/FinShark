<template>
  <div>
    <q-table
      :rows="stocks"
      :columns="columns"
      row-key="id"
      flat
      bordered
      :loading="loading"
      :rows-per-page-options="[0]"
      :pagination="{ rowsPerPage: 0 }"
      hide-bottom
      class="stock-table"
    >
      <!-- Market Cap formatting -->
      <template #body-cell-marketCap="props">
        <q-td :props="props">
          {{ formatMarketCap(props.value) }}
        </q-td>
      </template>

      <!-- Purchase price -->
      <template #body-cell-purchase="props">
        <q-td :props="props"> ${{ props.value.toFixed(2) }} </q-td>
      </template>

      <!-- Last Div -->
      <template #body-cell-lastDiv="props">
        <q-td :props="props"> ${{ props.value.toFixed(2) }} </q-td>
      </template>

      <!-- Symbol badge -->
      <template #body-cell-symbol="props">
        <q-td :props="props">
          <q-badge color="primary" :label="props.value" class="text-weight-bold q-px-sm q-py-xs" />
        </q-td>
      </template>

      <!-- Comments count -->
      <template #body-cell-comments="props">
        <q-td :props="props" class="text-center">
          <q-chip
            v-if="props.value.length > 0"
            dense
            color="teal-1"
            text-color="teal-9"
            :label="props.value.length"
            icon="comment"
            size="sm"
          />
          <span v-else class="text-grey-5">—</span>
        </q-td>
      </template>

      <!-- Actions -->
      <template #body-cell-actions="props">
        <q-td :props="props" class="text-right">
          <q-btn
            flat
            round
            dense
            icon="edit"
            color="primary"
            size="sm"
            class="q-mr-xs"
            @click="$emit('edit', props.row)"
          >
            <q-tooltip>Edit</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            dense
            icon="delete"
            color="negative"
            size="sm"
            @click="$emit('delete', props.row)"
          >
            <q-tooltip>Delete</q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <!-- Empty state -->
      <template #no-data>
        <div class="full-width column flex-center q-pa-xl text-grey-5">
          <q-icon name="bar_chart" size="3rem" class="q-mb-sm" />
          <span>No stocks found</span>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'StockTable',

  props: {
    stocks: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['edit', 'delete'],

  data() {
    return {
      columns: [
        { name: 'symbol', label: 'Symbol', field: 'symbol', align: 'left', sortable: false },
        {
          name: 'companyName',
          label: 'Company',
          field: 'companyName',
          align: 'left',
          sortable: false,
        },
        { name: 'industry', label: 'Industry', field: 'industry', align: 'left', sortable: false },
        { name: 'purchase', label: 'Purchase', field: 'purchase', align: 'right', sortable: false },
        { name: 'lastDiv', label: 'Last Div', field: 'lastDiv', align: 'right', sortable: false },
        {
          name: 'marketCap',
          label: 'Market Cap',
          field: 'marketCap',
          align: 'right',
          sortable: false,
        },
        {
          name: 'comments',
          label: 'Comments',
          field: 'comments',
          align: 'center',
          sortable: false,
        },
        { name: 'actions', label: '', field: 'actions', align: 'right', sortable: false },
      ],
    }
  },

  methods: {
    formatMarketCap(value) {
      if (value >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(2)}T`
      if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`
      if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`
      return `$${value.toLocaleString()}`
    },
  },
}
</script>

<style scoped>
.stock-table {
  border-radius: 8px;
}
</style>
