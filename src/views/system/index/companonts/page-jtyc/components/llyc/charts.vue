<template>
    <div style="width: 100%;height: 100%">
        <div class="title">
            <div class="icon"></div>
            <div class="content">本时段路网车辆点位流量预测</div>
        </div>
        <div :id="id" :class="className" :style="{height:height,width:width}" />
    </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'llyc-charts',
    props: {
      className: {
        type: String,
        default: 'llyc-charts'
      },
      id: {
        type: String,
        default: 'llyc-charts'
      },
      width: {
        type: String,
        default: '100%'
      },
      yData:{
        type: Array,
        default:()=>{
          return [];
        }
      },
      yData2:{
        type: Array,
        default:()=>{
          return [];
        }
      },
      seriesData:{
        type: Array,
        default:()=>{
          return [];
        }
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    watch: {
      seriesData: {
        deep: true,
        handler(val) {
          this.setOptions(this.yData,this.yData2,this.seriesData)
        }
      }
    },
    mounted() {
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods:{
      initChart(){
        this.chart = echarts.init(document.getElementById(this.id))
        this.setOptions(this.yData,this.yData2,this.seriesData)
      },
      setOptions(yData,yData2,seriesData){
        this.chart.setOption({
          grid: {
            left:'100',
            top:'20',
            right: '80',
            bottom:'100',

          },
          xAxis: [{
            type: 'value',
            axisLabel: {
              margin: 5,
              color: '#FFFFFF',
              textStyle: {
                fontSize: '14'
              },
            },

            splitLine: {
              show: true,
              lineStyle: {
                color: '#979797'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#333333'
              }
            },
            axisTick: {
              show: false
            },
          }],
          yAxis: [{
            type: 'category',
            inverse: true,
            axisLabel: {
              interval:0,
              textStyle: {
                color: '#FFFFFF',
                fontSize: '14'
              },
            },
            splitNumber:0,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#979797'
              }
            },
            axisLabel: {
              fontSize: 12,
              color: '#FFFFFF',
              width: 100,
              // rotate:20,
              // margin: 18,
              overflow: 'break'
            },
            data: yData
          },
            {
              type: 'category',
              inverse: true,
              axisTick: 'none',
              axisLine: 'none',
              show: true,
              axisLabel: {
                textStyle: {
                  color: '#00C087',
                  fontSize: '18'
                },
              },
              data:yData2
            }
          ],
          series: [{
            name: '值',
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
            itemStyle: {
              normal: {
                color: '#00C087',
              },
            },
            barWidth: 20,
            data: seriesData
          }
          ]
        })
      }
    }
  }
</script>

<style scoped lang="scss">

    .title {

        font-family: PingFangSC-Medium, PingFang SC;
        color: #FFFFFF;
        height: 25px;
        .icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            background: url('../../image/zst.png') no-repeat;
            background-size: cover;
        }
        margin-top: 24px;
        margin-left: 23px;
        display: flex;
        .content {
            line-height: 18px;
            font-size: 18px;
        }
    }

</style>
