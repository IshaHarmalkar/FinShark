<template>
  <q-page class="flex flex-center">
    <StockCard :stock="sampleStock" />
  </q-page>
</template>

<script>
import StockCard from 'src/components/StockCard.vue'

export default {
  components: {
    StockCard,
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
