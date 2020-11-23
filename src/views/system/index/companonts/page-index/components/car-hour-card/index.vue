<template>
  <custom-card title="分时段过车统计" class="car-hour-card">
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
//              spacing: [0, 0, 0, 0]
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
                '4时','8时','12时','16时','20时','24时'
              ],
              labels: {
                style: {
                  color: 'white',
                  'font-size': '0.0625rem',
                }
              }
            },
            yAxis: {
              gridLineColor:'#045FE0',
              gridLineDashStyle:'dash',
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
              enabled: true,
              labelFormat: "{name}",
              useHTML: true,
              verticalAlign: 'top',
              symbolRadius: 0,
              itemStyle: {
                "color": "white",
                'font-size': '0.0625rem',
              }
            },
            series: [
              {
                name: '昨日',
                color: '#4C49EC',
                borderRadius:'4px',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0]
              },{
                name: '今日',
                color: '#00C087',
                borderRadius:'4px',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5]
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
  .car-hour-card {
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
