<template>
  <div class="big-car-top">
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
            xAxis: [{
              categories: ['点位1', '点位2','点位3', '点位4','点位5', '点位6','点位7'],
              title: {
                text: null
              },
              lineWidth: 0,
              gridLineWidth: 0,
              minorGridLineWidth: 0,
              labels: {
                style: {
                  color: 'white',
                  //fontSize: '0.09375rem',
                }
              }
            }],
            yAxis: {
              lineWidth: 0,
              gridLineWidth: 1,
              gridLineColor:'#9797973F',
              minorGridLineWidth: 0,
              min: 0,
              max: 100,
              title: {
                text: '',
              },
              labels: {
                enabled:false
              }
            },
            plotOptions: {
              bar: {
                grouping: false,
                pointPadding: 0.3,
                dataLabels: {
                  enabled: true,
                  align: 'right',
                  allowOverlap: true,
                  x: 1000
                }
              }
            },
            series: [{
              name: '',
              data: [56, 99, 99, 70, 2, 22, 33],
              borderWidth: 0,
              dataLabels:{
                align:'left',
                style: {
                  color: 'white',
                  //fontSize: '0.09375rem',
                }
              },
              color: {
                linearGradient: [0, 0, 0, '100%'],
                stops: [
                  [0, '#0C9C97FF'],
                  [1, '#0C9C9760'],
                ]
              },
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
  .big-car-top {
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
      height: calc(100% - 90px);

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
