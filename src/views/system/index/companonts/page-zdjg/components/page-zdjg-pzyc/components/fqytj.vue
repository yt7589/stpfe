<template>
    <div style="width: 100%;height: 100%">
        <div class="title">
            <div class="icon"></div>
            <div class="content">分区域统计</div>
        </div>
        <div :id="id" :class="className" :style="{height:height,width:width}" />
    </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'fqytj',
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
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
    mounted() {
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
            left:'50',
            top:'5',
            bottom:'33'
          },
          xAxis: [{
            type: 'value',
            axisLabel: {
              margin: 5,
              color: '#FFFFFF',
              textStyle: {
                fontSize: '12'
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
            data: ['朝阳区','东城区','房山区','通州区','海淀区','思明区','湖里区','集美区']
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
                  offset: 0,
                  color: '#14C9D5' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#00C087' // 100% 处的颜色
                }], false),
              },
            },
            barWidth: 5,
            data: [78,56,63,123,22,330,11,22]
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
        color: #D1494E;
        height: 25px;
        .icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            background: url('../../../image/fqytj-icon.png') no-repeat;
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
