<template>
  <div class="car-flow-7day">
    <chart-card title="七日过车走势图" class="chart-card">
      <div class="card-body-wrapper" slot="body">
        <highcharts class="chart" :options="chart.option"></highcharts>
        <div class="unit">单位： 万辆</div>
      </div>
    </chart-card>
  </div>
</template>

<script>
  import ChartCard from '@/components/chart-card'
  export default {
    props: ['data'],
    components: {ChartCard},
    data(){
      return {
        chart: {
          option: {
            chart: {
              type: 'areaspline',
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
            xAxis: {
              lineWidth: 0,
              categories: [],
              labels: {
                style: {
                  color: 'white',
                  // fontSize: '0.0625rem'
                }
              }
            },
            yAxis: {
              title: {
                text: ''
              },
              gridLineColor: '#045FE03F',
              gridLineDashStyle: 'dash',
              lineWidth: 0,
              tickAmount: 6,
              labels: {
                style: {
                  color: 'white',
                  // fontSize: '0.0625rem'
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
                // fontSize: '0.0625rem',
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
              data: [],
              //data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              lineColor: '#00E7EC',
              color: {
                linearGradient: [0, 0, 0, '100%'],
                stops: [
                  [0, '#00E7EC7f'],
                  [1, '#00E7EC00']
                ]
              },
              marker: {
                enabled: false,
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
          let categories = []
          let data = []
          this.data.forEach(item => {
            categories.push(item.name)
            data.push(parseInt(item.count/10000))
          })
          this.chart.option.xAxis.categories = categories
          this.chart.option.series[0].data = data
        }
      }
    }
  }
</script>

<style lang="scss">
  .car-flow-7day {
    width: 100%;
    height: 100%;
    position: relative;
    .chart-card {
      position: absolute;
      left: 20px;
      top: 20px;
      right: 20px;
      bottom: 20px;
    }

    .chart {
      position: absolute;
      width: 97%;
      height: 100%;
      margin-top: 3%;
    }
    .unit {
      position: absolute;
      right: 15px;
      top: 15px;
      font-size: '0.0625rem';
      color: #FFFFFF;
    }
  }
</style>
