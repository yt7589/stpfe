<template>
    <div style="width: 100%;height: 100%">
        <div class="title">
            <div class="icon"></div>
            <div class="content">本日重点监控车辆车型构成</div>
        </div>
        <div :id="id" :class="className" :style="{height:height,width:width}" />

    </div>
</template>

<script>
  var m2R2Data= [


  ];
  import echarts from 'echarts'
  export default {
    name: 'constitute_pie',
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
            trigger: 'item',

          },
          legend: {
            type:"scroll",
            orient: 'vertical',
            left:'60%',
            align:'left',
            top:'5',
            textStyle: {
              color:'#ffffff',
              fontSize:"12px",
            },

          },
          series: [
            {
              name:'',
              type:'pie',
              center: ['35%', '50%'],
              radius: ['40%', '65%'],
              clockwise: false, //饼图的扇区是否是顺时针排布
              avoidLabelOverlap: false,
              label: {
                normal: {
                  color:'#ffffff',
                  fontSize:"12px",
                  show: true,
                  position: 'outter',
                  formatter:function (parms){
                    return parms.data.legendname
                  }
                }
              },
              labelLine: {
                normal: {
                  length:2,
                  length2:3,
                  smooth:true,
                }
              },
              data:[
                {
                  value:335,
                  legendname:'平板式货车',
                  name:"平板式货车",
                  itemStyle:{
                    color:"#552873",
                  }
                },
                {value:310, legendname:'厢式货车',name:"厢式货车",itemStyle:{color:"#E69B03"}},
                {value:234, legendname:'罐式货车',name:"罐式货车",itemStyle:{color:"#045FE0"}},
                {value:154, legendname:'栏板式货车',name:"栏板式货车",itemStyle:{color:"#D1494E"}},
                {value:335, legendname:'普通货车',name:"普通货车",itemStyle:{color:"#D8D8D8"}},
                {value:335, legendname:'仓栅式货车',name:"仓栅式货车",itemStyle:{color:"#00C087"}},
              ]
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
        height: 20px;
        .icon {
            width: 20px;
            height: 100%;
            margin-right: 10px;
            background: url('../../../image/tscl-1-1.png') no-repeat;
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

    }


</style>
