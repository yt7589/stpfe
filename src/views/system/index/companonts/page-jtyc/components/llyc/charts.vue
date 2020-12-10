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
      height: {
        type: String,
        default: '100%'
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
        this.setOptions()
      },
      setOptions(){
        this.chart.setOption({
          grid: {
            left:'55',
            top:'5',
            bottom:'68'
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
          },
            {
              type: 'category',
              inverse: true,
              axisTick: 'none',
              axisLine: 'none',
              show: true,
              axisLabel: {
                textStyle: {
                  color: '#ffffff',
                  fontSize: '12'
                },
              },
              data:[11,12,12,34,12,12,12,11]
            }

          ],
          series: [{
            name: '值',
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: '#000000',
            },
            itemStyle: {
              normal: {
                color: '#00C087',
              },
            },
            barWidth: 20,
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
