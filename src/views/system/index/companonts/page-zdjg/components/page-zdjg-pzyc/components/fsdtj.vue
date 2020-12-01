<template>
    <div style="width: 100%;height: 100%">
        <div class="title">
            <div class="icon"></div>
            <div class="content">分时段统计</div>
        </div>
        <div :id="id" :class="className" :style="{height:height,width:width}" />
    </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'fsdtj',
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
            data: ['23:00','22:00','21:00','20:00','19:00','18:00','17:00','16:00','15:00','14:00','13:00','12:00','11:00','10:00','09:00', '08:00', '07:00', '06:00', '04:00', '03:00', '02:00', '01:00', '00:00', '09:00']
          }],
          series: [{
            name: '值',
            type: 'bar',
            zlevel: 1,
            xAxisIndex: 0,
            itemStyle: {
              normal: {
                color:"#06A6FF",
                barBorderRadius: [0, 5, 5, 0],
              },
            },
            barWidth: 5,
            data: [88,12,23,45,33,23,56,12,55,67,23,11,78,23,86, 90, 77, 63, 55, 25, 98, 65, 55, 66]
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
            background: url('../../../image/sfdtj-icon.png') no-repeat;
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
