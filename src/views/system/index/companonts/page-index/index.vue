<template>
  <div class="page-index custom-main-content-full">
    <div class="page-wrapper">
      <div class="column-left">
        <car-type-card :typeData="statisticData.dkVtie" :data="statisticData.dkVtps"
                       class="line-car-type"></car-type-card>
        <car-hour-card :data="statisticData.dkTitf" class="line"></car-hour-card>
        <car-type-flow-card :data="statisticData.dkVttf" class="line"></car-type-flow-card>
        <car-road-flow-card class="line" :data="statisticData.dkTjrss"></car-road-flow-card>
      </div>
      <div class="column-middle">
        <car-statics-card :data="statisticData.dkHtfs" class="car-statics-card"></car-statics-card>
        <car-flow-map :data="statisticData.dkDctfs" class="car-flow-map"></car-flow-map>
        <area-flow-card :data="statisticData.dkDctfs" class="area-flow-card"></area-flow-card>
        <el-image class="image-car-flow" :src="require('./image/image-car-flow.png')"></el-image>
        <div class="background-border">
          <div class="border-piece-1"></div>
          <div class="border-piece-2"></div>
          <div class="border-piece-3"></div>
          <div class="border-piece-4"></div>
        </div>
      </div>
      <div class="column-right">
        <car-break-card :data="trafficData.dkRtvrs" class="car-break-card"></car-break-card>
        <car-break-type-card :data="trafficData.dkMvtss"
                             class="car-break-type-card"></car-break-type-card>
        <car-break-today-card :data="trafficData.dkTvts"
                              class="car-break-today-card"></car-break-today-card>
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
        trafficData: {},
        timer: null
      }
    },
    mounted(){
      this.fetchData()
//      this.timer = setInterval(() => {
//        this.fetchData()
//      }, 3000)
    },
    beforeDestroy(){
      clearInterval(this.timer)
    },
    methods: {
      fetchData(){
        API.VehicleStatistic(true).then((res) => {
          this.statisticData = res.data
        })

        API.TrafficViolation(true).then((res) => {
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
        height: calc(25% - 10px);
        margin-bottom: 10px;
      }

      .line {
        width: 100%;
        height: calc(25% - 10px);
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
        height: 13%;
        z-index: 1;
      }

      .car-flow-map {
        position: absolute;
        top: calc(13% + 10px);
        width: 100%;
        bottom: calc(25% + 10px);
        z-index: 0;
      }

      .area-flow-card {
        position: absolute;
        bottom: 0px;
        height: 25%;
        width: 100%;
        z-index: 1;
      }

      .image-car-flow {
        position: absolute;
        bottom: calc(25% + 20px);
        height: 164px;
        width: 72px;
        left: 32px;
        z-index: 1;
        pointer-events: none;
      }

      .background-border {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
        .border-piece-1 {
          position: absolute;

          top: calc(13% + 7px);
          left: -3px;

          width: 42px;
          height: 37px;

          background: url(./image/image-border-piece-1.png) no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
        }

        .border-piece-2 {
          position: absolute;

          bottom: -3px;
          left: -3px;

          width: 42px;
          height: 37px;

          background: url(./image/image-border-piece-2.png) no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
        }

        .border-piece-3 {
          position: absolute;

          bottom: -3px;
          right: -3px;

          width: 42px;
          height: 37px;

          background: url(./image/image-border-piece-3.png) no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
        }

        .border-piece-4 {
          position: absolute;

          top: calc(13% + 7px);
          right: -3px;

          width: 42px;
          height: 37px;

          background: url(./image/image-border-piece-4.png) no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
        }
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
