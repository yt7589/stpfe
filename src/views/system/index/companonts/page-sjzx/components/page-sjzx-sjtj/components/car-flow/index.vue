<template>
  <div class="car-flow">
    <div class="title">
      <el-image fit="contain" :src="require('../../image/image-overflow.png')"></el-image>
      过车统计量
    </div>
    <div class="title-box">
      <span style="background: #06A6FF;">本日</span>
      <span style="background: #E69B03;">本周</span>
      <span style="background: #D1494E;">本月</span>
    </div>
    <div class="value-box">
      <span style="background: #06A6FF;">{{data.today_st}}辆</span>
      <span style="background: #E69B03;">{{data.week_st}}辆</span>
      <span style="background: #D1494E;">{{data.month_st}}辆</span>
    </div>

    <highcharts class="chart" :options="chart.option"></highcharts>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  export default {
    props: ['data'],
    components: {},
    data(){
      return {
        chart: {
          option: {
            chart: {
              type: 'bar',
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
              spacing: [20, 20, 20, 20]
            },
            title: {
              text: ''
            },
            credits: {
              enabled: false
            },
            exporting: {
              enabled: false
            },
            tooltip: {
              enabled: false,
            },
            legend: {
              enabled: false,
            },
            xAxis: {
              categories: [],
              title: {
                text: null
              },
              lineWidth: 0,
              gridLineWidth: 0,
              minorGridLineWidth: 0,
              labels: {
                style: {
                  color: 'white',
                  // fontSize: '0.19375rem',
                }
              }
            },
            yAxis: {
              lineWidth: 0,
              gridLineWidth: 0,
              minorGridLineWidth: 0,
              min: 0,
              max: 100,
              title: {
                text: '',
              },
              labels: {
                enabled: false
              }
            },
            plotOptions: {
              bar: {
                grouping: false,
                dataLabels: {
                  enabled: true,
                  align: 'left',
                  allowOverlap: true,
                  x: 1000
                }
              }
            },
            series: [{
              name: 'null',
              data: [],
              borderWidth: 0,
              stack: 1,
              animation: false,
              dataLabels: {
                enabled: false,
              },
              color: "#1A2C4B"
            }, {
              name: '',
              data: [],
              borderWidth: 0,
              colorByPoint: true,
              dataLabels: {
                align: 'left',
                style: {
                  color: 'white',
                  fontWeight: 'lighter',
                  textOutline: "0px 0px contrast"
                  // fontSize: '0.09375rem',
                }
              },
              colors: ['#D1494EFF', '#E69B03FF', '#8CC246FF', '#16755BFF', '#00C087FF', '#36AFCEFF', '#2A47B2FF', '#22C0C6FF', '#1D6FA9FF', '#00C087FF'],
            }]
          },
          instance: null,
          style: {}
        }
      }
    },
    watch: {
      data(){
        this.updateChartData()
      }
    },
    mounted(){
      this.updateChartData()
    },
    methods: {
      updateChartData(){
        if (this.data) {
          let categories = []
          let data = []
          let max = 100;
          if(!this.data.dcstVmDTO){
            return;
          }
          this.data.dcstVmDTO.forEach(item => {
            data.push(item.count)
            categories.push(item.name)

            // 更新最大值
            if (item.count > max) {
              max = item.count
            }
          })

          let bgData = []
          for (let i = 0; i < categories.length; i++) {
            bgData.push(max)
          }

          this.chart.option.xAxis.categories = categories
          this.chart.option.yAxis.max = max
          this.chart.option.series[0].data = bgData
          this.chart.option.series[1].data = data
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .car-flow {
    .title {
      font-size: 18px;
      color: #FFFFFF;

      .el-image {
        width: 20px;
        height: 20px;

        margin: 20px 8px 20px 20px;
        vertical-align: middle;
      }
    }

    .title-box {
      font-size: 18px;
      color: #001537;
      margin-left: 47px;
      span {
        padding: 2px 10px;
        border-radius: 6px;
      }

      span + span {
        margin-left: 8px;
      }
    }

    .value-box {
      margin-top: 16px;
      font-size: 18px;
      color: #001537;
      margin-left: 47px;

      span {
        padding: 5px 20px;
      }
    }

    .chart {
      height: calc(100% - 130px);
      width: 100%;
    }
  }
</style>
