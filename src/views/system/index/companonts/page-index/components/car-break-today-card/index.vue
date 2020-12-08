<template>
  <custom-card title="今日违章趋势图" class="car-break-today-card">
    <div class="card-body-wrapper" slot="body">
      <highcharts class="chart" :options="chart.option"></highcharts>
      <div class="unit">单位： 万辆</div>
    </div>
  </custom-card>
</template>

<script>
  import CustomCard from '../custom-card'
  export default {
    props: ['data'],
    components: {CustomCard},
    data(){
      return {
        chart: {
          option: {
            chart: {
              type: 'area',
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
              spacingTop: 20,
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
            xAxis: {
              categories: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24时'],
              labels: {
                style: {
                  color: 'white'
                }
              }
            },
            yAxis: {
              title: {
                text: ''
              },
              gridLineColor: '#045FE03F',
              gridLineDashStyle: 'dash',
              tickAmount: 6,
              labels: {
                style: {
                  color: 'white'
                }
              }
            },
            legend: {
              enabled: false,
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
                return this.y;
              }
            },
            plotOptions: {
              area: {
                lineWidth: 1,
                marker: {
                  fillColor: 'white'
                },
              }
            },
            series: [{
              name: '',
//              data:[12.1,13.4,12.1,13.4,12.1,13.4,12.1,13.4,12.1,13.4],
              data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
              lineColor: '#00F6FF',
              color: {
                linearGradient: [0, 0, 0, '100%'],
                stops: [
                  [0, '#00F6FF7f'],
                  [1, '#00000000']
                ]
              },
              marker: {
                enabled: true,
                fillColor: 'white',
                lineColor: '#00F6FF',
                lineWidth: 1,
                radius: 3,
                symbol: 'circle'
              }
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
          let chartData = this.chart.option.series[0].data
          this.data.forEach(item => {
            let index = parseInt(item.timeFrame / 2) - 1;
            if (index < chartData.length) {
              this.$set(chartData, index, parseFloat(item.trafficViolationNum))
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .car-break-today-card {
    width: 100%;
    height: 100%;
    position: relative;
    .chart {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .unit {
      position: absolute;
      right: 15px;
      top: -5px;
      font-size: 12px;
      color: #FFFFFF;
    }
  }
</style>
