<template>
  <custom-card title="路段拥堵过车量" class="car-road-flow-card">
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
              type: 'column',
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
              spacing: [20, 0, 0, 0]
            },
            title: {
              text: '',
            },
            tooltip: {
              enabled: false,
            },
            credits: {
              enabled: false
            },
            exporting: {
              enabled: false
            },
            xAxis: {
              lineWidth:0,
              categories: [
                '路段1','路段2','路段3','路段4','路段5','路段6','路段7','路段8'
              ],
              labels: {
                style: {
                  color: 'white',
                  'font-size': '0.0625rem',
                }
              }
            },
            yAxis: {
              gridLineColor:'#979797',
              gridLineDashStyle:'solid',
              lineWidth:0,
              tickAmount:6,
              min: 0,
              title: {
                text: ''
              },
              labels: {
                style: {
                  color: 'white',
                  'font-size': '0.0625rem',
                }
              }
            },
            plotOptions: {
              column: {
                borderWidth: 0,
                dataLabels: {
                  enabled: false,
                },
                showInLegend: true,
              }
            },
            legend: {
              enabled: false,
            },
            series: [
              {
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0,127.0,64],
                color: {
                  linearGradient: [0, 0, 0, '100%'],
                  stops: [
                    [0, '#6174CF'],
                    [1, '#0C9C97']
                  ]
                },
              }
            ],
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
  .car-road-flow-card {
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
