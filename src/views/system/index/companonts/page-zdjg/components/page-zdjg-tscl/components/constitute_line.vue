<template>
    <div style="width: 100%;height: 100%">
        <div class="title">
            <div class="icon"></div>
            <div class="content">本日重点监控车辆车型构成</div>
        </div>
        <div class="div-chart">
            <highcharts class="chart" :options="chart.option"></highcharts>
        </div>

    </div>
</template>

<script>
  export default {
    name: 'constitute_pie',
    data(){
      return {
        chart:{
          option:{

          }
        }
      }
    },
    mounted(){
      this.getChartData()
    },
    methods:{
      getChartData(){
        this.chart.option = {}
        this.chart.option = {
          chart: {
            plotBackgroundColor: 'transparent',
            backgroundColor: 'transparent',
            spacing: [0, 0, 0, 0]
          },
          title: {
            text: ''
          },
          tooltip: {
            pointFormat: ' <b>{point.percentage:.1f}%</b>'
          },
          legend: {

            enabled: true,
            labelFormat: "{name}",
            useHTML: true,
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical',
            symbolRadius: 0,
            itemMarginTop: 0,
            itemMarginBottom: 0,
            itemStyle: {
              "color": "white",
              'font-size': '0.0125rem',
            },
            y:-20,
            x:-20
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                distance: 1,
                enabled: true,
                useHTML:true,
                style:{
                  "color": "#ffffff","width":"500px", "display":"inline-block","white-space":"pre-wrap","fontSize": "12px", "fontFamily": "PingFangSC-Regular, PingFang SC"
                }
              },
              showInLegend: true
            }
          },
          series: [{
            type: 'pie',
            innerSize: '65%',
            name: '',
            size: '50%',
            center: [80, 40],
            data: [{
              name: '平板式货车',
              y: 61.41,
              color:'#552873',
            }, {
              name: '仓栅式货车',
              y: 11.84,
              color:'#00C087'
            }, {
              name: '普通货车',
              y: 10.85,
              color:'#D8D8D8'
            }, {
              name: '栏板式货车',
              y: 4.67,
              color:'#D1494E'
            }, {
              name: '罐式货车',
              y: 4.18,
              color:'#045FE0'
            }, {
              name: '厢式货车',
              y: 7.05,
              color:'#E69B03',
            }]
          }]
        }
        // this.chart.option = {
        //   chart: {
        //     plotBackgroundColor: 'transparent',
        //     backgroundColor: 'transparent',
        //     spacing: [0, 0, 0, 0]
        //   },
        //   title: {
        //     text: ''
        //   },
        //   tooltip: {
        //     pointFormat: ' <b>{point.percentage:.1f}%</b>'
        //   },
        //   legend: {
        //     //width:200,
        //
        //     enabled: true,
        //     labelFormat: "{name}",
        //     useHTML: true,
        //     align: 'right',
        //     verticalAlign: 'middle',
        //     layout: 'vertical',
        //     symbolRadius: 0,
        //     itemMarginTop: 0,
        //     itemMarginBottom: 0,
        //     itemStyle: {
        //       "color": "white",
        //       'font-size': '0.0125rem',
        //     },
        //     x:20,
        //     y:-20,
        //   },
        //   plotOptions: {
        //     series: {
        //       showInLegend: true
        //     },
        //     pie: {
        //       allowPointSelect: true,
        //       cursor: 'pointer',
        //       dataLabels: {
        //         distance: 1,
        //         enabled: true,
        //         //useHTML: true, // 一定要加上
        //         // formatter : function() {
        //         //   return "<p style=' color: #ffffff;font-size:3px;'>"+this.point.name+"</p>"; // 重点在white-space:pre-wrap
        //         // }
        //
        //         style:{
        //           "color": "#ffffff","width":"60px","display":"inline-block","white-space":"pre-wrap", "fontSize": "8px", "font-family": "PingFangSC-Regular, PingFang SC"
        //         }
        //       },
        //       showInLegend: true
        //     }
        //   },
        //   series: [{
        //     type: 'pie',
        //     innerSize: '65%',
        //     name: '',
        //     size: '50%',
        //     center: [70, 30],
        //     data: [{
        //       name: '平板式货车',
        //       y: 61.41,
        //       color:'#552873',
        //     }, {
        //       name: '仓栅式货车',
        //       y: 11.84,
        //       color:'#00C087'
        //     }, {
        //       name: '普通货车',
        //       y: 10.85,
        //       color:'#D8D8D8'
        //     }, {
        //       name: '栏板式货车',
        //       y: 4.67,
        //       color:'#D1494E'
        //     }, {
        //       name: '罐式货车',
        //       y: 4.18,
        //       color:'#045FE0'
        //     }, {
        //       name: '厢式货车',
        //       y: 7.05,
        //       color:'#E69B03',
        //     }]
        //   }]
        //
        // }
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
