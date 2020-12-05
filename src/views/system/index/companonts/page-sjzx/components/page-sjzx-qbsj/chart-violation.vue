<template>
  <div class="chart-violation">
    <div class="header">
      <el-image :src="require('../../image/image-chart.png')"></el-image>
      <span>违章量走势图</span>
    </div>
    <div class="chart-box">
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
              type: 'area',
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
            xAxis: {
              lineWidth: 0,
              categories: ['1', '2', '3', '4', '5', '6', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
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
              labelFormat: "{name}",
              useHTML: true,
              verticalAlign: 'top',
              symbolRadius: 0,
              itemStyle: {
                "color": "white",
                'font-size': '0.0625rem',
              }
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
                lineWidth: 2,
                marker: {
                  fillColor: 'white'
                },
              }
            },
            series: [{
              name: '小型车',
              data: [7.0, 11.5, 15.2, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 14.5, 14.5, 18.4, 21.5, 25.2, 18.4, 14.5, 18.4, 21.5, 25.2, 21.5, 25.2, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
              lineColor: '#D1494E',
              color: {
                linearGradient: [0, 0, 0, '100%'],
                stops: [
                  [0, '#D1494E7f'],
                  [1, '#D1494E1f']
                ]
              },
              marker: {
                enabled: true,
                fillColor: 'white',
                lineColor: '#D1494E',
                lineWidth: 2,
                radius: 4,
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
  .chart-violation {
    .header {
      font-size: 18px;
      color: #FFFFFF;
      line-height: 25px;

      margin: 17px 24px;

      .el-image {
        width: 24px;
        height: 24px;
        margin-right: 8px;
        vertical-align: middle;
      }
    }
    .chart-box {
      width: 100%;
      height: calc(100% - 60px);
      position: relative;

      .chart {
        position: absolute;
        width: 100%;
        height: 100%;
        /*padding: 10px;*/
      }

      .unit {
        position: absolute;
        right:40px;
        top: -20px;
        font-size: 12px;
        color: white;
      }
    }
  }
</style>
