<template>
  <div class="car-statics-card">
    <card class="card" :image="require('./image/image-car-1.png')"
          :value="(data ? data.todayPassedNumber : 0)+' 辆'"
          title="今日过车数量"
          color="#06A6FF"></card>
    <card class="card" :image="require('./image/image-car-2.png')"
          :value="(data?data.sevenDayPassedNumber:0)+' 辆'"
          title="近七天过车数量"
          color="#00C087"></card>
    <card class="card" :image="require('./image/image-car-3.png')"
          :value="(data?data.currentMonthPassedNumber:0)+' 辆'"
          title="本月过车数量"
          color="#E69B03"></card>
    <card class="card" :image="require('./image/image-car-4.png')"
          :value="(data?data.dailyMean:0)+' 辆'"
          title="日均过车辆"
          color="#D1494E"></card>
  </div>
</template>

<script>
  import card from './card.vue'
  export default {
    props: ['data'],
    components: {card},
    data(){
      return {}
    },
    mounted(){
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .car-statics-card {
    .card {
      height: 100%;
      width: 25%;
      display: inline-block;
    }
  }

</style>
