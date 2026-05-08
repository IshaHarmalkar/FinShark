<template>
  <q-page class="flex flex-center">
    <StockSearchBar />
  </q-page>
</template>

<script>
import StockSearchBar from 'src/components/StockSearchBar.vue'

export default {
  components: {
    StockSearchBar,
  },
  data() {
    return {
      sampleStock: {
        symbol: 'TSLA',
        companyName: 'Tesla, Inc.',
        purchase: '240.50',
        industry: 'Automotive',
        marketCap: '750 Billion',
        comments: ['Bullish', 'Volatile', 'Innovation leader'],
      },
    }
  },
}
</script>

<style lang="scss" scoped></style>
