<template>
  <div class="page-index custom-main-content-full">
    <div class="page-wrapper">
      <div class="column-left">
        <car-type-card class="line-car-type"></car-type-card>
        <car-hour-card :data="statisticData.timeFrameNumberList" class="line"></car-hour-card>
        <car-type-flow-card class="line"></car-type-flow-card>
        <car-road-flow-card class="line"></car-road-flow-card>
      </div>
      <div class="column-middle">
        <car-statics-card :data="statisticData.vehiclePassedNumber" class="car-statics-card"></car-statics-card>
        <car-flow-map class="car-flow-map"></car-flow-map>
        <area-flow-card class="area-flow-card"></area-flow-card>
        <el-image class="image-car-flow" :src="require('./image/image-car-flow.png')"></el-image>
      </div>
      <div class="column-right">
        <car-break-card :data="trafficData.trafficViolationList" class="car-break-card"></car-break-card>
        <car-break-type-card class="car-break-type-card"></car-break-type-card>
        <car-break-today-card :data="trafficData.trafficViolationTimeFrameNumberList" class="car-break-today-card"></car-break-today-card>
      </div>
    </div>
  </div>
</template>

<script>
  import CarHourCard from './components/car-hour-card'
  import CarTypeCard from './components/car-type-card'
  import CarTypeFlowCard from './components/car-type-flow-card'
  import CarRoadFlowCard from './components/car-road-flow-card'
  import CarStaticsCard from './components/car-statics-card'
  import AreaFlowCard from './components/area-flow-card'
  import CarFlowMap from './components/car-flow-map'

  import CarBreakCard from './components/car-break-card'
  import CarBreakTypeCard from './components/car-break-type-card'
  import CarBreakTodayCard from './components/car-break-today-card'

  import API from '@/api'

  export default {
    components: {
      CarHourCard, CarTypeCard, CarTypeFlowCard, CarRoadFlowCard,
      CarStaticsCard, AreaFlowCard, CarFlowMap,
      CarBreakCard, CarBreakTypeCard, CarBreakTodayCard
    },
    data () {
      return {
        statisticData: {},
        trafficData: {}
      }
    },
    mounted(){
      this.fetchData()
    },
    methods: {
      fetchData(){
        API.VehicleStatistic().then((res) => {
          this.statisticData = res.data
        })

        API.TrafficViolation().then((res) => {
          this.trafficData = res.data
        })
      }
    }
  }
</script>

<style lang="scss">
  .page-index {
    display: flex;
    background: #061437;

    position: relative;
    .page-wrapper {
      position: absolute;
      top: 142px;
      left: 57px;
      right: 57px;
      bottom: 55px;
    }

    .column-left {
      width: 25%;
      height: 100%;
      display: inline-block;

      .line-car-type {
        width: 100%;
        height: calc(19% - 10px);
        margin-bottom: 10px;
      }

      .line {
        width: 100%;
        height: calc(27% - 10px);
        margin-bottom: 10px;
      }
    }

    .column-middle {
      width: calc(50% - 14px);
      height: 100%;
      margin: 0px 7px;
      display: inline-block;

      position: relative;
      .car-statics-card {
        position: absolute;
        top: 0px;
        width: 100%;
        height: 142px;
        z-index: 1;
      }

      .car-flow-map {
        position: absolute;
        top: 110px;
        width: 100%;
        bottom: 194px;
        z-index: 0;
      }

      .area-flow-card {
        position: absolute;
        bottom: 0px;
        height: 225px;
        width: 100%;
        z-index: 1;
      }

      .image-car-flow {
        position: absolute;
        bottom: 257px;
        height: 164px;
        width: 20px;
        left: 32px;
        z-index: 1;
      }
    }

    .column-right {
      width: 25%;
      height: 100%;
      display: inline-block;

      .car-break-card {
        width: 100%;
        height: 40%;
      }

      .car-break-type-card {
        width: 100%;
        height: 30%;
      }

      .car-break-today-card {
        width: 100%;
        height: 30%;
      }

    }
  }
</style>
