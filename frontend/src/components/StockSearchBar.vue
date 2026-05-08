<template>
  <q-card flat bordered class="q-pa-md">
    <div class="row q-col-gutter-md items-center">
      <!-- Symbol -->
      <div class="col-12 col-sm-3">
        <q-input
          v-model="filters.symbol"
          label="Symbol"
          dense
          outlined
          clearable
          @update:model-value="onChange"
        />
      </div>

      <!-- Company Name -->
      <div class="col-12 col-sm-4">
        <q-input
          v-model="filters.companyName"
          label="Company Name"
          dense
          outlined
          clearable
          @update:model-value="onChange"
        />
      </div>

      <!-- Sort -->
      <div class="col-12 col-sm-2">
        <q-select
          v-model="filters.sortBy"
          :options="sortOptions"
          label="Sort By"
          dense
          outlined
          emit-value
          map-options
          @update:model-value="onChange"
        />
      </div>

      <!-- Desc toggle -->
      <div class="col-12 col-sm-2">
        <q-toggle v-model="filters.isDescending" label="Desc" @update:model-value="onChange" />
      </div>

      <!-- Search button (optional for UX) -->
      <div class="col-12 col-sm-1 flex justify-end">
        <q-btn icon="search" color="primary" round dense @click="emitSearch" />
      </div>
    </div>
  </q-card>
</template>

<script>
import { debounce } from 'quasar'

export default {
  name: 'StockSearchBar',

  emits: ['search'],

  data() {
    return {
      filters: {
        symbol: '',
        companyName: '',
        sortBy: null,
        isDescending: false,
        pageNumber: 1,
        pageSize: 20,
      },

      sortOptions: [
        { label: 'Symbol', value: 'Symbol' },
        { label: 'Company Name', value: 'CompanyName' },
      ],
    }
  },

  methods: {
    emitSearch() {
      this.$emit('search', { ...this.filters })
    },

    onChange: debounce(function () {
      // auto-search as user types
      this.emitSearch()
    }, 400),
  },
}
</script>
