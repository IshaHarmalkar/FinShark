<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ stock.symbol }}</div>
        <div class="text-subtitle">{{ stock.companyName }}</div>
      </q-card-section>

      <q-card-section>
        <div>Price: {{ stock.purchase }}</div>
        <div>Industry: {{ stock.industry }}</div>
        <div>Market Cap: {{ stock.marketCap }}</div>
      </q-card-section>

      <q-card-section>
        <div>Comments: {{ stock.comments.length }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'StockCards',
  props: {
    stock: Object,
  },

  methods: {},
}
</script>

<style lang="scss" scoped></style>
