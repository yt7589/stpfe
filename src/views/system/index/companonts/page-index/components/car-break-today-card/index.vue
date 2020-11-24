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
    components: {CustomCard},
    data(){
      return {
        chart: {
          option: {
            chart: {
              type: 'area',
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
              spacingTop: 40,
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
              gridLineColor: '#045FE0',
              gridLineDashStyle: 'dash',
              tickAmount:6,
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
              enabled: false,
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
              name: '小型车',
              data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
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
    mounted(){
    },
    methods: {}
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
      top: 15px;
      font-size: 12px;
      color: #FFFFFF;
    }
  }
</style>
