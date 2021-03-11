<template>
  <div class="violation-top">
    <div class="title">
      <el-image fit="contain" :src="require('../../image/image-clock.png')"></el-image>
      违法车点位排名TOP7
    </div>
    <div id="chart" class="card-box">
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    props: ['data'],
    components: {},
    data(){
      return {
        chart: null
      }
    },
    watch: {
      data(){
        this.updateChartData()
      }
    },
    mounted(){
      this.initChart()
    },
    methods: {
      initChart(){
        this.chart = echarts.init(document.getElementById("chart"))
        this.updateChartData();
      },
      updateChartData(){
        if (this.data) {
          let siteNames = [];
          let counts = [];
          this.data.forEach(item => {
            siteNames.push(item.siteName)
            counts.push(item.count)
          })
          this.setOptions(siteNames,counts,Math.max(counts))
        }
      },
      setOptions(yData,xData,maxData){
        this.chart.setOption({
          grid: {
            top: 'center',
            height: 200,
            left: 80,
            right: 50
          },
          xAxis: {
            max: maxData,
            splitLine: {show: false},
            axisLine: {
                show:false
            },
            axisTick: {show: false},
            axisLabel: {
              show:false
            }
          },
          yAxis: {
            data: yData,
            inverse: true,
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {
                margin: 20,
                color: '#FFFFFF',
                fontSize: 12
            }
          },
          series: [{
            type: 'pictorialBar',
            symbol:'image://'+require('../../image/image-car-blue.png'),
            symbolRepeat: 'fixed',
            symbolMargin: '10',
            symbolClip: true,
            symbolSize: 20,
            symbolBoundingData: maxData,
            data: xData,
            z: 10
        }, {
            type: 'pictorialBar',
            itemStyle: {
                normal: {
                    opacity: 0.2
                }
            },
            label: {
                show: true,
                position: 'right',
                offset: [10, 0],
                color: '#FFFFFF',
                fontSize: 12
            },
            animationDuration: 0,
            symbolRepeat: 'fixed',
            symbolMargin: '10',
            symbol: 'image://'+require('../../image/image-car-blue.png'),
            symbolSize: 20,
            data: xData,
            z: 5
        }]
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .violation-top {
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
      height: calc(100% - 70px);

      .chart-line {
        display: flex;
        justify-content: space-between;
        height: 13%;
        align-items: center;

        .chart-name {
          width: 30px;
          text-align: right;
          font-size: '0.0625rem';
          color: #FFFFFF;
          line-height: 17px;
        }

        .chart-image {
          width: 20px;
          height: 14px;
          margin-left: 8px;
          vertical-align: middle;
        }

        .chart-value {
          font-size: '0.0625rem';
          color: #FFFFFF;
          line-height: 17px;
        }
      }
    }
  }
</style>
