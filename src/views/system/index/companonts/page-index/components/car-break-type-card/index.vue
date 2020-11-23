<template>
  <custom-card title="本月违章类型统计" class="car-break-type-card">
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
              polar: true,
              type: 'line',
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
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
            legend: {
              enabled:false,
            },
            pane: {
              size: '80%'
            },
            xAxis: {
              categories: ['遮挡车牌', '主驾驶抽烟', '副驾驶未系安全带', '主驾驶看手机',
                '主驾驶未系安全带', '摩托车载人'],
              tickmarkPlacement: '0',
              lineWidth: 0,
              labels: {
                style: {
                  color: 'white',
                }
              }
            },
            yAxis: {
              gridLineInterpolation: 'polygon',
              lineWidth: 0,
              min: 0,
              labels: {
                style: {
                  color: 'white',
                }
              }
            },
            series: [{
              name: '',
              data: [43000, 19000, 60000, 35000, 17000, 10000],
              pointPlacement: 'on'
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
  .car-break-type-card {
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
