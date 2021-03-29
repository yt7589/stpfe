<template>
  <div class="chart-recognize">
    <div class="header">
      <el-image :src="require('../../image/image-chart-2.png')"></el-image>
      <span>识别量走势图</span>
    </div>
    <div class="chart-box">
      <highcharts class="chart" :options="chart.option"></highcharts>
      <div class="unit">单位： 万辆</div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['data'],
    components: {},
    data(){
      return {
        chart: {
          option: {
            chart: {
              type: 'column',
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
              spacing: [20, 20, 20, 20]
            },
            title: {
              text: '',
            },
            tooltip: {
              backgroundColor:'transparent',
              borderWidth:0,
              shadow:false,
              padding:-5,
              style:{
                color:'#00F6FFFF',
                fontSize: '0.0625rem',
              },
              formatter: function () {
                return this.y;
              }
            },
            credits: {
              enabled: false
            },
            exporting: {
              enabled: false
            },
            xAxis: {
              lineWidth: 0,
              categories: [],  //['1', '2', '3', '4', '5', '6', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
              labels: {
                style: {
                  color: 'white',
                  fontSize: '0.0625rem',
                }
              }
            },
            yAxis: {
              gridLineColor: '#045FE03F',
              gridLineDashStyle: 'dash',
              lineWidth: 0,
              tickAmount: 6,
              min: 0,
              title: {
                text: ''
              },
              labels: {
                style: {
                  color: 'white',
                  fontSize: '0.0625rem',
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
                name: '',
                color: {
                  linearGradient: [0, 0, 0, '100%'],
                  stops: [
                    [0, '#27FFFC'],
                    [1, '#FCEC0E']
                  ]
                },
                borderRadius: '4px',
                data: [],  //[252,221,313,556,777,123,223,221,123,456,252,221,313,556,777,123,223,221,123,456,252,221,313,556,777,123,223,221,123,456]
              }
            ],
          },
          instance: null
        },
      }
    },
    watch: {
      data: {
        immediate: true, // 初次监听即执行  
        deep: true,
        handler(val) {
          if(val){
            this.initData()
          }
        }
      }
    },
    methods: {
      initData(){
        let arr_categories = []
        let arr_data = []
        let tdrt = this.data
        let vtLen= tdrt.length
        for (let i=0; i<vtLen; i++) {
          arr_categories.push(tdrt[i]['name'])
          arr_data.push(tdrt[i]['count']/10000)
        }
        this.chart.option.xAxis.categories = arr_categories
        this.chart.option.series[0].data = arr_data
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chart-recognize {
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
