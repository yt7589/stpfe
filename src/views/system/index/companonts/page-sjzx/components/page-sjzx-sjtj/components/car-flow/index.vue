<template>
  <div class="car-flow">
    <div class="title">
      <el-image fit="contain" :src="require('../../image/image-overflow.png')"></el-image>
      过车统计量
    </div>
    <div class="title-box">
      <span style="background: #06A6FF;">本地</span>
      <span style="background: #E69B03;">本周</span>
      <span style="background: #D1494E;">本月</span>
    </div>
    <div class="value-box">
      <span style="background: #06A6FF;">1234辆</span>
      <span style="background: #E69B03;">1234辆</span>
      <span style="background: #D1494E;">1234辆</span>
    </div>

    <highcharts class="chart" :options="chart.option"></highcharts>
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
              spacing: [20, 20, 20, 20]
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
              categories: ['1月', '2月','3月', '4月','5月', '6月','7月', '8月','9月', '10月', '11月','12月'],
              title: {
                text: null
              },
              lineWidth: 0,
              gridLineWidth: 0,
              minorGridLineWidth: 0,
              labels: {
                style: {
                  color: 'white',
                  fontSize: '0.09375rem',
                }
              }
            },
            yAxis: {
              lineWidth: 0,
              gridLineWidth: 0,
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
                dataLabels: {
                  enabled: true,
                  align: 'left',
                  allowOverlap: true,
                  x: 1000
                }
              }
            },
            series: [{
              name: 'null',
              data: [100, 100, 100, 100, 100,100, 100, 100, 100, 100,100, 100],
              borderWidth: 0,
              stack: 1,
              animation: false,
              dataLabels:{
                enabled:false,
              },
              color: "#1A2C4B"
            }, {
              name: '',
              data: [17, 31, 63, 20, 2, 22, 33, 44, 55, 11,11,33],
              borderWidth: 0,
              colorByPoint: true,
              dataLabels:{
                align:'left',
                style: {
                  color: 'white',
                  fontSize: '0.09375rem',
                }
              },
              colors: ['#D1494EFF', '#E69B03FF', '#8CC246FF', '#16755BFF', '#00C087FF', '#36AFCEFF', '#2A47B2FF', '#22C0C6FF', '#1D6FA9FF', '#00C087FF'],
            }]
          },
          instance: null,
          style: {}
        },
      }
    },
    mounted(){
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .car-flow {
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

    .title-box {
      font-size: 18px;
      color: #001537;
      margin-left: 47px;
      span {
        padding: 2px 10px;
        border-radius: 6px;
      }

      span + span {
        margin-left: 8px;
      }
    }

    .value-box {
      margin-top: 16px;
      font-size: 18px;
      color: #001537;
      margin-left: 47px;

      span {
        padding: 5px 20px;
      }
    }

    .chart {
      height: calc(100% - 130px);
      width: 100%;
    }
  }
</style>
