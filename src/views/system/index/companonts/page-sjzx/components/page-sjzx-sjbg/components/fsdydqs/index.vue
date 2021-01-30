<template>
    <div class="sjbg-rtj">
        <div class="title">
            <div class="icon">
              <img :src="iconUrl"/>
            </div>
            <div class="content">{{title}}</div>
        </div>
        <div :id="id" class="chart" :style="{height:height,width:width}" />
    </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: '',
    props: {
      chartItem:{
        type: Object,
        default:  {}
      },
      icon:{
        type: String,
        default:  ''
      },
      title: {
        type: String,
        default: ''
      },
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
        type: Array,
        default:()=>{
          return [];
        }
      },
    },
    data(){
      return {
        iconStyle:'',
        iconUrl: ''
      }
    },
    mounted(){
      this.initChart()
      this.iconUrl = require('../../image/'+this.icon);
    },
    watch: {
      xData: {
        deep: true,
        handler(val) {
          this.setOptions(this.xData,this.lineData)
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
        this.setOptions(this.xData,this.lineData)
      },
      setOptions(xData,lineData){
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#00F6FF'
              },
            }
          },
          grid: {
            show: true,
            borderColor : '#979797',
            left: '5%',
            top: '20%',
            bottom: '75',
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
            name: this.chartItem.xAxisName,
            nameTextStyle: { //x轴上方单位的颜色
              color: '#ffffff'
            },
            boundaryGap: false,
            axisPointer: {
                snap: true,
                lineStyle: {
                    color: '#D1494E',
                },
            },
            axisTick: {
              show: false,
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
              show: true,
              lineStyle: {
                color: '#979797'
              }
            },
            data:xData
          }],
          yAxis: [{
            type: 'value',
            name: this.chartItem.yAxisName,
            nameGap:10,
            nameTextStyle: { //y轴上方单位的颜色
              color: '#ffffff'
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true, //y轴线
              lineStyle: {
                color: '#979797'
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
              show: true,
              lineStyle: {
                color: '#979797'
              }
            },
          }],
          series: [
            {
              type: 'line',
              symbol: 'circle',
              symbolSize: 2,
              showSymbol: false,
              lineStyle: {
                  width: 2,
                  color: this.chartItem.lineColor,
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: this.chartItem.areaColor1
                }, {
                    offset: 1,
                    color: this.chartItem.areaColor2
                }])
              },
              itemStyle: {
                color: '#D1494E'
              },
              data:lineData ,
            }
          ]
        })
      }
    }
  }
</script>

<style scoped lang="scss">
    .sjbg-rtj{
      height: inherit;
      background: #001537;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-top: 10px;
        padding-left: 25px;
        display: flex;
        font-family: PingFangSC-Medium, PingFang SC;
        height: 25px;
        .icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              width:20px;
              height: 20px;
            }
        }
        .content {
            font-size: 18px;
            line-height: 18px;
        }
      }
      .chart {
        // width: 100%;
        // height: 100%;
        // margin-top: 24px;
        // margin-left: 23px;
        // margin-bottom: 24px;
    }
    }
 
    


</style>
