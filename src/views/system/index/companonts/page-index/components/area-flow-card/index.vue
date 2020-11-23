<template>
  <div class="area-flow-card">
    <div class="title">区县过车数量</div>
    <div class="card-body-wrapper">
      <highcharts class="chart" :options="chart.option"></highcharts>
      <div class="unit">单位： 万辆</div>
    </div>
  </div>
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
              spacingTop: 40
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
              lineWidth: 0,
              categories: [
                '丰台区', '西城区', '顺义区', '大兴区', '房山区', '门头沟', '昌平区', '平谷区'
              ],
              labels: {
                style: {
                  color: 'white',
                  'font-size': '0.0625rem',
                }
              }
            },
            yAxis: {
              gridLineColor: '#979797',
              gridLineDashStyle: 'solid',
              lineWidth: 0,
              tickAmount: 6,
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
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 127.0, 64],
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
  .area-flow-card {
    width: 100%;
    height: 100%;

    background: rgba(0, 115, 255, 0.2);
    border-radius: 4px;

    .title {
      font-size: 18px;
      color: #FFFFFF;
      line-height: 40px;
      padding-left: 13px;
    }
    .card-body-wrapper {
      position: relative;
      width: 100%;
      height: calc(100% - 40px);
    }
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
