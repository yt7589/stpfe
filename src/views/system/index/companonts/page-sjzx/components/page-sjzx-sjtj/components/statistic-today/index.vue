<template>
  <div class="statistic-today">
    <div class="title">
      <el-image fit="contain" :src="require('../../image/image-overflow.png')"></el-image>
      过车统计量
    </div>

    <div class="row-1">
      <div class="value-box">
        <div class="line">
          过车总量 <span class="big-text">{{getReadableNumber(todayData.vehicle)}}</span>
        </div>
        <div class="line">
          本市车辆 <span style="color:#00F6FF;">{{todayData.vehicle_city}}</span>
          外埠车辆 <span style="color:#00F6FF;">{{todayData.vehicle_town}}</span>
        </div>
      </div>
      <div class="left-car">
        <div class="car-active">
        <div class="pointer" :style="carActiveStyle"></div>
        <div class="value" style="color:#00F6FF">{{todayData.vehicle_city_act}}%</div>
        <div class="title">本市车辆活跃度</div>
      </div>
      </div>
      <div class="right-car">
        <div class="car-online">
        <div class="pointer" :style="deviceActiveStyle"></div>
        <div class="value" style="color:#E69B03">{{todayData.device_online}}%</div>
        <div class="title">本市设备在线率</div>
      </div>
      </div>
      
    </div>

    <div class="row-2">
      <chart-card class="chart-card" title="外埠过车量TOP5">
        <highcharts style="width:100%;height:100%;" :options="outlandChart.option" slot="body"></highcharts>
      </chart-card>
      <chart-card class="chart-card" title="点位过车量TOP5">
        <highcharts style="width:100%;height:100%;" :options="locationChart.option" slot="body"></highcharts>
      </chart-card>
    </div>
  </div>
</template>

<script>
  import ChartCard from '@/components/chart-card'
  export default {
    props: ['todayData', 'outlandData', 'locationData'],
    components: {ChartCard},
    data(){
      return {
        outlandChart: {
          option: {
            chart: {
              type: 'column',
              options3d: {
                enabled: true,
                alpha: 0,
                beta: 30,
                viewDistance: 45,
                depth: 100,
                frame: {
                  bottom: {
                    color: '#D8D8D880',
                    size: 2,
                  }
                }
              },
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
//              spacing: [0, 0, 0, 0]
            },
            title: {
              text: ''
            },
            credits: {
              enabled: false
            },
            exporting: {
              enabled: false
            },
            legend: {
              enabled: false,
            },
            xAxis: {
              gridLineWidth: 0,
              lineWidth: 0,
              lineColor: 'red',
              categories: [],
              labels: {
                style: {
                  color: 'white',
                  fontSize: '0.0625rem',
                }
              }
            },
            yAxis: {
              gridLineWidth: 0,
              lineWidth: 0,
              showLastLabel: false,
              title: {
                text: ''
              },
              labels: {
                style: {
                  color: 'white',
                  fontSize: '0.0625rem',
                }
              }
            },
            tooltip: {
              headerFormat: '<b>{point.key}</b><br>',
              pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} '
            },
            plotOptions: {
              column: {
                stacking: 'normal',
                depth: 40,
                pointPadding: 0.3,
              }
            },
            series: [{
              name: '',
              color: '#A6A6A8',
              data: [5, 3, 4, 7, 2],
            }, {
              name: '',
              color: "#6089F7",
              data: [3, 5, 4, 1, 6],
            }]
          },
          instance: null
        },
        locationChart: {
          option: {
            chart: {
              type: 'column',
              options3d: {
                enabled: true,
                alpha: 0,
                beta: 30,
                viewDistance: 45,
                depth: 100,
                frame: {
                  bottom: {
                    color: '#D8D8D880',
                    size: 2,
                  }
                }
              },
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
//              spacing: [0, 0, 0, 0]
            },
            title: {
              text: ''
            },
            credits: {
              enabled: false
            },
            exporting: {
              enabled: false
            },
            legend: {
              enabled: false,
            },
            xAxis: {
              gridLineWidth: 0,
              lineWidth: 0,
              lineColor: 'red',
              categories: [],
              labels: {
                style: {
                  color: 'white',
                  fontSize: '0.0625rem',
                }
              }
            },
            yAxis: {
              gridLineWidth: 0,
              lineWidth: 0,
              showLastLabel: false,
              title: {
                text: ''
              },
              labels: {
                style: {
                  color: 'white',
                  fontSize: '0.0625rem',
                }
              }
            },
            tooltip: {
              headerFormat: '<b>{point.key}</b><br>',
              pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} '
            },
            plotOptions: {
              column: {
                stacking: 'normal',
                depth: 40,
                pointPadding: 0.3,
              }
            },
            series: [{
              name: '',
              color: '#A6A6A8',
              data: [],
            }, {
              name: '',
              color: "#5CEDCA",
              data: [],
            }]
          },
          instance: null
        },
      }
    },
    computed: {
      carActiveStyle(){
        let rotate = -45
        if (this.todayData.vehicle_city_act > 0) {
          rotate = (2.7 * this.todayData.vehicle_city_act) - 45
        }
        return {
          transform: 'rotate(' + rotate + 'deg)'
        }
      },
      deviceActiveStyle(){
        let rotate = -45
        if (this.todayData.device_online > 0) {
          rotate = (2.7 * this.todayData.device_online) - 45
        }
        return {
          transform: 'rotate(' + rotate + 'deg)'
        }
      }
    },
    watch: {
      outlandData(){
        this.updateOutlandChartData()
      },
      locationData(){
        this.updateLocationChartData()
      }
    },
    mounted(){
      this.updateOutlandChartData()
      this.updateLocationChartData()
    },
    methods: {
      getReadableNumber(num){
        let p1 = parseInt(num / 1000000)
        let p2 = parseInt(num / 1000)
        let p3 = parseInt(num % 1000)

        let str = ""
        if (p1 > 0) {
          str += p1 + ","
        }
        if (p2 > 0) {
          str += p2 + ","
        }
        str += p3
        return str
      },
      updateOutlandChartData(){
        if (this.outlandData) {
          let array = this.outlandData.concat([])
          array.sort((t1, t2) => t2.count - t1.count)

          let categories = []
          let data = []
          let max = 10;
          array.forEach(item => {
            let value = parseInt(item.count)
            categories.push(item.areaName)
            data.push(value)

            if (value > max) {
              max = value
            }
          })

          let bgData = []
          data.forEach(i => {
            bgData.push(max - i)
          })

          this.outlandChart.option.xAxis.categories = categories
          this.outlandChart.option.series[0].data = bgData
          this.outlandChart.option.series[1].data = data
        }
      },
      updateLocationChartData(){
        if (this.locationData) {
          let array = this.locationData.concat([])
          array.sort((t1, t2) => t2.count - t1.count)

          let categories = []
          let data = []
          let max = 10;
          array.forEach(item => {
            let value = parseInt(item.count)
            categories.push(item.siteName)
            data.push(value)

            if (value > max) {
              max = value
            }
          })

          let bgData = []
          data.forEach(i => {
            bgData.push(max - i)
          })

          this.locationChart.option.xAxis.categories = categories
          this.locationChart.option.series[0].data = bgData
          this.locationChart.option.series[1].data = data
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .statistic-today {
    .title {
      font-size: 18px;
      color: #FFFFFF;

      .el-image {
        width: 20px;
        height: 20px;

        margin: 20px 8px 20px 20px;
        vertical-align: middle;
      }
    }

    .row-1 {
      width: 100%;
      height: 30%;
      position: relative;

      .value-box {
        position: absolute;
        bottom: 16%;
        left: 5%;

        .line {
          font-size: 14px;
          color: #FFFFFF;
          line-height: 35px;

          .big-text {
            font-size: 32px;
          }
        }
      }
      .left-car{
          position: absolute;
          right: 250px;
          width: 120px;
          height: 120px;
        .car-active {
          // top: -30px;
          width: 120px;
          height: 98px;

          background: url('../../image/image-round-chart-2.png') no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
          background-size: cover;

          .pointer {
            background: url('../../image/image-round-chart-2-pointer.png') no-repeat;
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
            background-size: cover;
          }
        }
      }
      .right-car{
          position: absolute;
          right: 57px;
          width: 120px;
          height: 120px;
        .car-online {
          // top: -30px;
          width: 120px;
          height: 98px;

          background: url('../../image/image-round-chart-1.png') no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
          background-size: cover;

          .pointer {
            background: url('../../image/image-round-chart-1-pointer.png') no-repeat;
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
            background-size: cover;
          }
        }
      }
      .car-online, .car-active {
        .pointer {
          position: relative;
          top: 55px;
          left: 7px;
          width: 108px;
          height: 8px;
        }

        .title {
          position: absolute;
          bottom: -10px;
          font-size: 12px;
          left: 0px;
          right: 0px;
          text-align: center;
        }

        .value {
          position: absolute;
          font-size: 20px;
          top: 80px;
          left: 0px;
          right: 0px;
          text-align: center;
        }
      }
    }

    .row-2 {
      width: 100%;
      height: calc(70% - 60px);

      display: flex;
      justify-content: space-evenly;
      .chart-card {
        width: 45%;
        height: 100%;
      }
    }
  }
</style>
