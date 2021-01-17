<template>
  <div class="page-sjzx-sjtj">
    <div class="column-1">
      <system-status :data="data.dcSys ?data.dcSys:{}" style="height:33%;"></system-status>
      <car-flow :data="data.dcVSt?data.dcVSt:[]" style="height:67%;"></car-flow>
      <!--<div class="decoration-left"></div>-->
    </div>

    <div class="column-2">
      <statistic-today :todayData="data.dcToday ?data.dcToday:{}" :outlandData="data.dcVArea?data.dcVArea:[]" :locationData="data.dcVSite?data.dcVSite:[]" class="statistic-today"></statistic-today>
      <car-flow7day :data="data.dcVTrend?data.dcVTrend:[]" class="car-flow7day"></car-flow7day>
    </div>

    <div class="column-3">
      <violation-top :data="data.dcIlSite?data.dcIlSite:[]" style="width:100%;height:32%;"></violation-top>
      <special-car-top :data="data.dcKvSite?data.dcKvSite:[]" style="width:100%;height:32%;margin-top:4%;"></special-car-top>
      <big-car-top :data="data.dcTsSite?data.dcTsSite:[]" style="width:100%;height:32%;margin-top:4%;"></big-car-top>
    </div>
  </div>
</template>

<script>
  import CarFlow7day from './components/car-flow-7day/index.vue'
  import BigCarTop from './components/big-car-top/index.vue'
  import CarFlow from './components/car-flow/index.vue'
  import SpecialCarTop from './components/special-car-top/index.vue'
  import StatisticToday from './components/statistic-today/index.vue'
  import SystemStatus from './components/system-status/index.vue'
  import ViolationTop from './components/violation-top/index.vue'

  import API from '@/api'

  export default {
    components: {
      CarFlow7day, BigCarTop, CarFlow, SpecialCarTop,
      StatisticToday, SystemStatus, ViolationTop
    },
    data(){
      return {
        data: {}
      }
    },
    mounted(){
      this.fetchData()
    },
    methods: {
      fetchData(){
        API.sjzxQueryDataStatistics().then(res => {
          this.data = res.data
        })
      }
    }
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

      .decoration-left {
        position: absolute;
        top: 0px;
        left: 0px;

        /*background: url(../page-photo/image/background-result.png) no-repeat;*/
        /*background-size: 100% 100%;*/
        /*-moz-background-size: 100% 100%;*/
      }
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
