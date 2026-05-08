<template>
  <q-page class="q-pa-lg">
    <!-- Page Header -->
    <div class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold">Stocks</div>
        <div class="text-caption text-grey-6">Manage your stock portfolio</div>
      </div>
      <q-space />
      <q-btn unelevated color="primary" icon="add" label="Add Stock" @click="openCreate" />
    </div>

    <!-- Search Bar -->
    <StockSearchBar class="q-mb-md" @search="onSearch" />

    <!-- Results summary -->
    <div class="row items-center q-mb-sm q-mt-md">
      <span class="text-caption text-grey-6">
        {{ loading ? 'Loading…' : `${stocks.length} stock${stocks.length !== 1 ? 's' : ''} found` }}
      </span>
      <q-space />
      <!-- Pagination -->
      <q-pagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :max="totalPages"
        :max-pages="5"
        boundary-numbers
        direction-links
        @update:model-value="fetchStocks"
      />
    </div>

    <!-- Table -->
    <StockTable :stocks="stocks" :loading="loading" @edit="openEdit" @delete="openDelete" />

    <!-- Pagination (bottom) -->
    <div v-if="totalPages > 1" class="flex justify-center q-mt-md">
      <q-pagination
        v-model="currentPage"
        :max="totalPages"
        :max-pages="5"
        boundary-numbers
        direction-links
        @update:model-value="fetchStocks"
      />
    </div>

    <!-- Create / Edit Dialog -->
    <StockFormDialog
      v-model="formDialog"
      :stock="selectedStock"
      :saving="saving"
      @submit="onFormSubmit"
    />

    <!-- Delete Confirm Dialog -->
    <StockDeleteDialog
      v-model="deleteDialog"
      :stock="selectedStock"
      :deleting="deleting"
      @confirm="onDeleteConfirm"
    />
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import StockSearchBar from 'components/StockSearchBar.vue'
import StockTable from 'components/StockTable.vue'
import StockFormDialog from 'components/StockFormDialog.vue'
import StockDeleteDialog from 'components/StockDeleteDialog.vue'

const BASE_URL = '/api/stock'

export default {
  name: 'StocksPage',

  components: { StockSearchBar, StockTable, StockFormDialog, StockDeleteDialog },

  setup() {
    const $q = useQuasar()
    return { $q }
  },

  data() {
    return {
      stocks: [],
      loading: false,
      saving: false,
      deleting: false,

      formDialog: false,
      deleteDialog: false,
      selectedStock: null,

      // Last used filters (kept so pagination reuses them)
      lastFilters: {
        symbol: '',
        companyName: '',
        sortBy: null,
        isDescending: false,
        pageSize: 20,
      },

      currentPage: 1,
      totalPages: 1,
    }
  },

  mounted() {
    this.fetchStocks()
  },

  methods: {
    // ── Fetch ────────────────────────────────────────────────────────────────
    async fetchStocks() {
      this.loading = true
      try {
        const f = this.lastFilters
        const params = {
          ...(f.symbol && { Symbol: f.symbol }),
          ...(f.companyName && { CompanyName: f.companyName }),
          ...(f.sortBy && { SortBy: f.sortBy }),
          IsDescending: f.isDescending,
          PageNumber: this.currentPage,
          PageSize: f.pageSize ?? 20,
        }

        const { data } = await api.get(BASE_URL, { params })

        // Support both plain array and paginated envelope { items, totalPages }
        if (Array.isArray(data)) {
          this.stocks = data
          this.totalPages = 1
        } else {
          this.stocks = data.items ?? []
          this.totalPages = data.totalPages ?? 1
        }
      } catch (err) {
        this.$q.notify({ type: 'negative', message: `Failed to load stocks: ${err.message}` })
      } finally {
        this.loading = false
      }
    },

    onSearch(filters) {
      this.lastFilters = { ...filters }
      this.currentPage = 1
      this.fetchStocks()
    },

    // ── Create ───────────────────────────────────────────────────────────────
    openCreate() {
      this.selectedStock = null
      this.formDialog = true
    },

    // ── Edit ─────────────────────────────────────────────────────────────────
    openEdit(stock) {
      this.selectedStock = { ...stock }
      this.formDialog = true
    },

    // ── Delete ────────────────────────────────────────────────────────────────
    openDelete(stock) {
      this.selectedStock = stock
      this.deleteDialog = true
    },

    // ── Form submit (create OR edit) ──────────────────────────────────────────
    async onFormSubmit(payload) {
      this.saving = true
      try {
        const isEdit = !!this.selectedStock?.id
        const url = isEdit ? `${BASE_URL}/${this.selectedStock.id}` : BASE_URL
        const body = {
          symbol: payload.symbol,
          companyName: payload.companyName,
          purchase: payload.purchase,
          lastDiv: payload.lastDiv,
          industry: payload.industry,
          marketCap: payload.marketCap,
        }

        await (isEdit ? api.put(url, body) : api.post(url, body))

        this.$q.notify({
          type: 'positive',
          message: isEdit ? 'Stock updated successfully' : 'Stock created successfully',
        })
        this.formDialog = false
        this.fetchStocks()
      } catch (err) {
        this.$q.notify({ type: 'negative', message: `Error: ${err.message}` })
      } finally {
        this.saving = false
      }
    },

    // ── Delete confirm ────────────────────────────────────────────────────────
    async onDeleteConfirm() {
      if (!this.selectedStock) return
      this.deleting = true
      try {
        await api.delete(`${BASE_URL}/${this.selectedStock.id}`)

        this.$q.notify({ type: 'positive', message: 'Stock deleted' })
        this.deleteDialog = false
        this.fetchStocks()
      } catch (err) {
        this.$q.notify({ type: 'negative', message: `Delete failed: ${err.message}` })
      } finally {
        this.deleting = false
      }
    },
  },
}
</script>
