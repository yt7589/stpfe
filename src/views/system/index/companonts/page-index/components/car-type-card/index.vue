<template>
  <custom-card title="全市车辆类型分布" class="car-type-card">
    <div class="card-body-wrapper" slot="body">
      <el-row class="card-wrapper">
        <el-col :span="6" class="column-title">
          <div class="local-car">
            <div class="image-box">
              <div class="vline"></div>
              <div class="point" :style="car.localStyle"><span>{{car.local}}%</span></div>
            </div>
            本地
          </div>
          <div class="outland-car">
            <div class="image-box">
              <div class="vline"></div>
              <div class="point" :style="car.outlandStyle"><span>{{car.outland}}%</span></div>
            </div>
            外埠
          </div>
        </el-col>
        <el-col :span="18" class="column-chart">
          <highcharts class="chart" :options="chart.option"></highcharts>
        </el-col>
      </el-row>
    </div>
  </custom-card>
</template>

<script>
  import CustomCard from '../custom-card'

  export default {
    props: ['typeData', 'data'],
    components: {CustomCard},
    data(){
      return {
        chart: {
          option: {
            chart: {
              type: 'variablepie',
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
              spacing: [0, 0, 0, 0]
            },
            title: {
              text: '',
            },
            tooltip: {
              backgroundColor: 'transparent',
              borderWidth: 0,
              shadow: false,
              padding: -5,
              style: {
                color: '#00F6FFFF',
                fontSize: '0.0625rem',
              },
              formatter: function () {
                return this.y + '%';
              }
            },
            credits: {
              enabled: false
            },
            exporting: {
              enabled: false
            },
            plotOptions: {
              variablepie: {
                borderWidth: 0,
                dataLabels: {
                  enabled: true,
                  formatter: function () {
                    return this.y + '%'
                  },
                  style: {
                    "color": 'white',
                    fontSize: '0.0425rem',
                  }
                },
                showInLegend: true,
                colors: ['#00F6FF', '#E69B03', '#4C49EC', '#00C087', '#06A6FF','#045FE0','#FFFFFF']
              }
            },
            legend: {
              enabled: true,
              labelFormat: "{name}",
              useHTML: true,
              align: 'right',
              verticalAlign: 'middle',
              layout: 'vertical',
              symbolRadius: 0,
              itemStyle: {
                color: "white",
                fontSize: '0.0625rem',
              }
            },
            series: [{
              minPointSize: 1,
              data: [
//                {
//                  name: '',
//                  y: 0,
//                  z: 0
//                }
              ]
            }],
            responsive: {
              rules: [{
                condition: {
                  maxHeight: 120
                },
                chartOptions: {
                  series: [{
                    minPointSize: 15,
                  }],
                }
              }]
            }
          },
          instance: null
        },
        car: {
          local: 0,
          localStyle: {},
          outland: 0,
          outlandStyle: {}
        }
      }
    },
    watch: {
      data(){
        this.updateChartData()
      },
      typeData(){
        this.updateCarTypeData()
      }
    },
    mounted(){
      this.updateCarTypeData()
      this.updateChartData()
    },
    methods: {
      updateChartData(){
        if (this.data) {
          let chartSeries = this.chart.option.series[0]
          let data = []
          this.data.forEach(item => {
            let value = parseFloat(item.vehicleTypePercentage)
            data.push({
              name: item.vehicleTypeName,
              y: parseInt(value * 100),
              z: value
            })
          })
          chartSeries.data = data
        }
      },
      updateCarTypeData(){
        // 0 - 80 %
        if (this.typeData) {
          this.typeData.forEach(item => {
            let percent = parseInt(parseFloat(item.vehicleDistributionPercntage) * 100)
            let style = {
              top: percent * 80 / 100.0 + '%'
            }

            if (item.vehicleDistributionName == '本市车辆') {
              this.car.localStyle = style
              this.car.local = percent
            } else if (item.vehicleDistributionName == '外埠') {
              this.car.outlandStyle = style
              this.car.outland = percent
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .car-type-card {
    width: 100%;
    height: 100%;
    position: relative;
    .card-wrapper {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
    }

    .column-title {
      height: 100%;

      display: flex;
      font-size: 12px;
      .local-car {
        color: #06A6FFFF;
        .vline {
          background: #06A6FF;
          border: solid 2px #048DDA;
        }
        .point {
          background: url(../../image/image-point-blue.png) no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;

          span {
            margin-bottom: 3px;
            font-size: 12px;
            color: #06A6FFFF;
            transform: scale(0.8);
            margin-right: 3px;
          }
        }
      }

      .outland-car {
        color: #00C087FF;
        .vline {
          background: #06B699;
          border: solid 2px #01AE71;
        }
        .point {
          background: url(../../image/image-point-green.png) no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
          span {
            margin-bottom: 3px;
            font-size: 12px;
            color: #00C087FF;
            transform: scale(0.8);
            margin-right: 3px;
          }
        }
      }

      .local-car, .outland-car {
        display: inline-block;
        width: 50%;
        height: 100%;
        text-align: center;
        .image-box {
          height: calc(100% - 20px);
          margin-bottom: 5px;
          position: relative;
          .vline {
            position: absolute;
            width: 20px;
            height: 100%;
            border-radius: 10px;
            left: calc(50% - 10px);
          }
          .point {
            position: absolute;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            left: calc(50% - 20px);
          }
        }
      }
    }

    .column-chart {
      height: 100%;
      .chart {
        width: 100%;
        height: 100%;
      }
    }

  }

</style>
