<template>
  <div class="statistic-today">
    <div class="title">
      <el-image fit="contain" :src="require('../../image/image-overflow.png')"></el-image>
      过车统计量
    </div>

    <div class="row-1">
      <div class="value-box">
        <div class="line">
          过车总量 <span class="big-text">1,321,456</span>
        </div>
        <div class="line">
          本市车辆 <span style="color:#00F6FF;">12345</span>
          外埠车辆 <span style="color:#00F6FF;">12345</span>
        </div>
      </div>
      <div class="car-active">
        <div class="pointer"></div>
        <div class="value" style="color:#00F6FF">20%</div>
        <div class="title">本市车辆活跃度</div>
      </div>
      <div class="car-online">
        <div class="pointer"></div>
        <div class="value" style="color:#E69B03">20%</div>
        <div class="title">本市车辆在线率</div>
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
              categories: ['地区1', '地区2', '地区3', '地区4', '地区5'],
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
              categories: ['地区1', '地区2', '地区3', '地区4', '地区5'],
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
              color: "#5CEDCA",
              data: [3, 5, 4, 1, 6],
            }]
          },
          instance: null
        },
      }
    },
    mounted(){
    },
    methods: {}
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

      .car-active {
        position: absolute;
        top: -30px;
        right: 210px;
        width: 120px;
        height: 120px;

        background: url('../../image/image-round-chart-1.png') no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;

        .pointer {
          background: url('../../image/image-round-chart-1-pointer.png') no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
        }
      }

      .car-online {
        position: absolute;
        top: -30px;
        right: 67px;
        width: 120px;
        height: 120px;

        background: url('../../image/image-round-chart-2.png') no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;

        .pointer {
          background: url('../../image/image-round-chart-2-pointer.png') no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
        }
      }

      .car-online, .car-active {
        .pointer {
          position: absolute;
          top: 58px;
          right: 50px;
          width: 62px;
          height: 20px;
        }

        .title {
          position: absolute;
          bottom: -25px;
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
