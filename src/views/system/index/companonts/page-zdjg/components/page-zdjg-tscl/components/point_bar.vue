<template>
    <div style="width: 100%;height: 100%">
        <div class="title">
            <div class="icon"></div>
            <div class="content">本日重点监控车辆点位分布图</div>
        </div>
        <div :id="id" :class="className" :style="{height:height,width:width}" />
    </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'point_bar',
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'point-bar-chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    data(){
      return {

      }
    },
    mounted(){
      this.initChart()
    },
    methods:{
      initChart(){
        this.chart = echarts.init(document.getElementById(this.id))
        this.setOptions()
      },
      setOptions(){
        this.chart.setOption({
          grid: {
            top: '10%',
            // right: '3%',
            left: '20%',
            // bottom: '12%'
          },
          xAxis: [{
            type: 'value',
            axisLabel: {
              show:false
            },

            splitLine: {
              show: true,
              lineStyle: {
                color: '#979797'
              }
            },
            axisLine: {
              show:false,
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
                fontSize: '12'
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
            data: ['点位一','点位二','点位三','点位四','点位五','点位六','点位七']
          }],
          series: [{
            name: '值',
            type: 'bar',
            zlevel: 1,
            xAxisIndex: 0,
            itemStyle: {
              normal: {
                barBorderRadius: [0, 5, 5, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0.2,
                  color: '#091221' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#00C087' // 100% 处的颜色
                }], false),
              },
            },
            label: {
              normal: {
                show: true,
                position: "right",

                textStyle: {
                  color: "#ffffff",
                  fontSize: 12
                }
              }
            },
            barWidth: 5,
            data: [78,56,63,123,22,330,11]
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
        color: #00C087;
        height: 25px;
        .icon {
            width: 25px;
            height: 100%;
            margin-right: 10px;
            background: url('../../../image/tscl-3-2.png') no-repeat;
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

