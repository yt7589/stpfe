<template>
  <div class="special-car-top">
    <div class="title">
      <el-image fit="contain" :src="require('../../image/image-shape-red.png')"></el-image>
      重点车辆点位排名TOP7
    </div>

    <div class="card-box">
      <highcharts class="chart" :options="chart.option"></highcharts>
      <div class="unit">单位： 辆</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['data'],
    components: {},
    data(){
      return {
        chart: {
          option: {
            chart: {
              type: 'bar',
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
              spacing: [0, 0, 0, 0]
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
            tooltip: {
              enabled: false,
            },
            legend: {
              enabled: false,
            },
            xAxis: {
              categories: ['点位1', '点位2', '点位3', '点位4', '点位5', '点位6', '点位7'],
              title: {
                text: null
              },
              lineWidth: 0,
              gridLineWidth: 0,
              minorGridLineWidth: 0,
              labels: {
                style: {
                  color: 'white',
                  // fontSize: '0.0625rem',
                }
              }
            },
            yAxis: {
              lineWidth: 0,
              gridLineWidth: 1,
              gridLineColor: '#9797973F',
              minorGridLineWidth: 0,
              min: 0,
              max: 100,
              title: {
                text: '',
              },
              labels: {
                enabled: false
              }
            },
            plotOptions: {
              bar: {
                grouping: false,
                pointPadding: 0.4,
                dataLabels: {
                  enabled: true,
                  align: 'right',
                  allowOverlap: true,
                  x: 1000
                }
              }
            },
            series: [{
              name: 'null',
              data: [100, 100, 100, 100, 100, 100, 100],
              borderWidth: 0,
              stack: 1,
              animation: false,
              dataLabels: {
                enabled: false,
              },
              color: "#D1494E33"
            }, {
              name: '',
              data: [23, 31, 63, 20, 2, 22, 33],
              borderWidth: 0,
              dataLabels: {
                align: 'left',
                style: {
                  color: 'white',
                  fontWeight: 'lighter',
                  textOutline: "0px 0px contrast"
                  // fontSize: '0.09375rem',
                }
              },
              color: {
                linearGradient: [0, 0, 0, '100%'],
                stops: [
                  [0, '#D1494E'],
                  [1, '#7B0A32']
                ]
              },
            }]
          },
          instance: null
        },
      }
    },
    watch: {
      data(){
        this.updateChartData()
      }
    },
    mounted(){
      this.updateChartData()
    },
    methods: {
      updateChartData(){
        if (this.data) {
          let array = this.data.concat([])
          array.sort((t1, t2) => t1.count > t2.count)
          let categories = []
          let data = []
          let max = 100;

          array.forEach(item => {
            let value = parseInt(item.count)
            data.push(value)
            categories.push(item.siteName)

            // 更新最大值
            if (value > max) {
              max = value
            }
          })

          let bgData = []
          for (let i = 0; i < categories.length; i++) {
            bgData.push(max)
          }

          this.chart.option.xAxis.categories = categories
          this.chart.option.yAxis.max = max
          this.chart.option.series[0].data = bgData
          this.chart.option.series[1].data = data
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .special-car-top {
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

    .card-box {
      width: calc(100% - 68px);
      margin-left: 34px;
      margin-top: 10px;
      height: calc(100% - 70px);

      position: relative;
      .chart {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .unit {
        position: absolute;
        right: 5px;
        top: -24px;
        font-size: 12px;
        color: #FFFFFF;
      }
    }
  }
</style>
