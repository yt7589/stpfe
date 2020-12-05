<template>
  <div class="page-sjzx-sjtj">
    <div class="column-1">
      <system-status style="height:33%;"></system-status>
      <car-flow style="height:67%;"></car-flow>
    </div>

    <div class="column-2">
      <statistic-today class="statistic-today"></statistic-today>
      <car-flow7day class="car-flow7day"></car-flow7day>
    </div>

    <div class="column-3">
      <violation-top style="width:100%;height:32%;"></violation-top>
      <special-car-top style="width:100%;height:32%;margin-top:4%;"></special-car-top>
      <big-car-top style="width:100%;height:32%;margin-top:4%;"></big-car-top>
    </div>
  </div>
</template>

<script>
  import CarFlow7day from './components/car-flow-7day'
  import BigCarTop from './components/big-car-top'
  import CarFlow from './components/car-flow'
  import SpecialCarTop from './components/special-car-top'
  import StatisticToday from './components/statistic-today'
  import SystemStatus from './components/system-status'
  import ViolationTop from './components/violation-top'

  export default {
    components: {
      CarFlow7day, BigCarTop, CarFlow, SpecialCarTop,
      StatisticToday, SystemStatus, ViolationTop
    },
    data(){
      return {}
    },
    mounted(){
    },
    methods: {}
  }
</script>

<style lang="scss">
  .page-sjzx-sjtj {
    display: flex;
    justify-content: space-between;

    .column-1 {
      width: 27%;
      height: 100%;

      background: #001537;
      border-radius: 4px;
    }

    .column-2 {
      width: calc(48% - 48px);
      height: 100%;

      .statistic-today {
        width: 100%;
        height: 55%;
        background: #001537;
        border-radius: 4px;
      }

      .car-flow7day {
        width: 100%;
        height: calc(45% - 16px);
        margin-top: 16px;

        background: #001537;
        border-radius: 4px;
      }
    }

    .column-3 {
      width: 26%;
      height: 100%;

      background: #001537;
      border-radius: 4px;
    }
  }
</style>
