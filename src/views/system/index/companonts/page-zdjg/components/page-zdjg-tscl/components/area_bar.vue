<template>
    <div style="width: 100%;height: 100%">
        <div class="title">
            <div class="icon"></div>
            <div class="content">本日重点监控车辆区域分布图</div>
        </div>
        <div :id="id" :class="className" :style="{height:height,width:width}" />

    </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'area_bar',
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'area-bar-chart'
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
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            top: '10%',
            // right: '3%',
            left: '15%',
            // bottom: '12%'
          },
          xAxis: [{
            type: 'category',
            data: ['区域一', '区域二', '区域三', '区域四', '区域五', '区域六','区域七'],
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.12)'
              }
            },
            axisLabel: {
              //margin: 10,
              interval:0,
              color: '#ffffff',
              textStyle: {
                fontSize: 12
              },
            },
          }],
          yAxis: [{
            name: '',
            axisLabel: {

              color: '#ffffff',
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#ffffff'
              }
            },

          }],
          series: [{
            type: 'bar',
            barWidth: 15,
            data: [5000, 2600, 1300, 1300, 1250, 1500,1000],

            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: ' rgba(0, 246, 255, 0.7)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: ' #091221' // 100% 处的颜色
                }], false),
              }
            },

          }]
        })
      }
    }
  }
</script>

<style scoped lang="scss">
    .title {

        font-family: PingFangSC-Medium, PingFang SC;
        color: #D1494E;
        height: 25px;
        .icon {
            width: 20px;
            height: 100%;
            margin-right: 10px;
            background: url('../../../image/tscl-1-2.png') no-repeat;
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

