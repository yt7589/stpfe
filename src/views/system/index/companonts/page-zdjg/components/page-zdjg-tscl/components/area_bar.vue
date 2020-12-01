<template>
    <div style="width: 100%;height: 100%">
        <div class="title">
            <div class="icon"></div>
            <div class="content">本日重点监控车辆区域分布图</div>
        </div>
        <div class="div-chart">
            <highcharts class="chart" :options="chart.option"></highcharts>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'area_bar',
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
            spacing: [0, 0, 0, 0],
            type: 'column'
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: [
              '区域一','区域二','区域三','区域四','区域五','区域六','区域七'
            ],
            crosshair: true
          },
          tooltip: {
          },
          plotOptions: {
            column: {
              showInLegend: false,
            }
          },
          series: [{
            name: '',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
          }]
        }
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
    .div-chart{
        height: 100%;

        .chart {
            width: 80%;
            height: 80%;
            margin-top: 24px;
            margin-left: 23px;
            margin-bottom: 24px;
        }
    }


</style>

