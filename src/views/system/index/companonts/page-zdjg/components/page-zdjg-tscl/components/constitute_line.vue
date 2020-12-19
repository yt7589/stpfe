<template>
    <div style="width: 100%;height: 100%">
        <div class="title">
            <div class="icon"></div>
            <div class="content">本日重点监控车辆小时分布图</div>
        </div>
        <div :id="id" :class="className" :style="{height:height,width:width}" />
    </div>
</template>

<script>
  import echarts from 'echarts'

  let lineData = [100, 160, 110, 200, 200, 220, 190 ];
  let lineData2 = [80, 120, 100, 180, 160, 230, 160 ]
  let xAxisData =  ['1', '2', '3', '4', '5', '6', '7']
  export default {
    name: 'constitute_pie',
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'con-line-chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      xData:{
        type: Array,
        default:()=>{
          return [];
        }
      },
      lineData:{
        type: Object,
        default:()=>{
          return {
            name:'',
            data:[],
          };
        }
      },
      lineData2:{
        type: Object,
        default:()=>{
          return {
            name:'',
            data:[],
          };
        }
      },
    },
    data(){
      return {

      }
    },
    mounted(){
      this.initChart()
    },
    watch: {
      xData: {
        deep: true,
        handler(val) {
          this.setOptions(this.xData,this.lineData,this.lineData2)
        }
      }
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
        this.setOptions(this.xData,this.lineData,this.lineData2)
      },
      setOptions(xData,lineData,lineData2){
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              },
            }
          },
          grid: {
            left: '15%',
            top: '20%',
            // right: '4%',
            // bottom: '3%',
            // containLabel: true
          },
          legend: {
            icon: 'Rect',
            orient: 'horizontal',
            itemWidth:20,
            itemHeight:3,
            textStyle: {
              fontSize: 12, //字体大小
              color: '#ffffff', //字体颜色
            },
            right: '3%' //距离右侧
          },
          xAxis: [{
            type: 'category',

            boundaryGap: false,
            axisTick: {
              show: false,

            },
            axisLine: {
              lineStyle: {
                color: ''

              }
            },
            axisLabel: {
              interval: 0, //设置x轴的标签显示可自适应
              show: true,
              textStyle: {
                color: '#ffffff',
                fontSize: 12,
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#376487'
              }
            },
            data:xData

          }],
          yAxis: [{
            type: 'value',
            name: '数量 / 辆',
            nameGap:10,
            nameTextStyle: { //y轴上方单位的颜色
              color: '#ffffff'
            },
            axisTick: {
              show: false,

            },
            axisLine: {
              show: false, //y轴线
              lineStyle: {
                color: '#376487'
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: 12,
                fontFamily:'',
                color: '#ffffff',
              }
            },
            splitLine: {
              show: false,

            },


          }],
          series: [
            {
              name: lineData.name,
              type: 'line',
              symbol: 'circle',
              symbolSize: 2,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 2,
                  color: '#045FE0',
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(4, 95, 224, 0.49)'
                  },
                    {
                      offset: 1,
                      color: 'rgba(4, 95, 224, 0)'
                    }
                  ], false),
                  // shadowColor: 'rgba(232,246,254,0.2)',
                  shadowBlur: 30
                }
              },
              itemStyle: {
                normal: {
                  color: '#045FE0',
                  borderColor: '#045FE0',
                  borderWidth: 0

                }
              },

              data:lineData.data ,
            },
            {
              name: lineData2.name,
              type: 'line',
              symbol: 'circle',
              symbolSize: 2,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 2,
                  color: '#00F6FFFF',
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 251, 255, 0.5)'
                  },
                    {
                      offset: 1,
                      color: 'rgba(0, 246, 255, 0)'
                    }
                  ], false),

                  shadowBlur: 30
                }
              },
              itemStyle: {
                normal: {
                  color: '#00FBFF',
                  borderColor: '#00FBFF',
                  borderWidth: 0

                }
              },

              data:lineData2.data ,
            },


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
        height: 20px;
        .icon {
            width: 20px;
            height: 100%;
            margin-right: 10px;
            background: url('../../../image/tscl-3-1.png') no-repeat;
            background-size: cover;
        }
        margin-top: 24px;
        margin-left: 23px;
        display: flex;
        .content {
            font-size: 18px;
            line-height: 18px;
        }
    }
    .div-chart{
        height: 100%;

        .chart {
            width: 100%;
            height: 100%;
            margin-top: 24px;
            margin-left: 23px;
            margin-bottom: 24px;
        }
    }


</style>
