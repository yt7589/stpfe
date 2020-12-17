<template>
  <custom-card title="本月违章类型统计" class="car-break-type-card">
    <div class="card-body-wrapper" slot="body">
      <highcharts class="chart" :options="chart.option"></highcharts>
      <div class="unit">单位： 辆</div>
    </div>
  </custom-card>
</template>

<script>
  import CustomCard from '../custom-card'
  export default {
    props: ['data'],
    components: {CustomCard},
    data(){
      return {
        chart: {
          option: {
            chart: {
              polar: true,
              type: 'line',
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
            },
            title: {
              text: '',
            },
            tooltip: {
              backgroundColor: 'transparent',
              borderWidth: 0,
              shadow: false,
              padding: -5,
              style: {
                color: '#00F6FFFF',
                fontSize: '0.0625rem',
              },
              formatter: function () {
                return this.y;
              }
            },
            credits: {
              enabled: false
            },
            exporting: {
              enabled: false
            },
            legend: {
              enabled: false,
            },
            pane: {
              startAngle: 0,
              endAngle: 360,
              size: '80%',
              // TODO: 数据刷新时 背景也会刷新
//              background: [
//                {
//                  backgroundColor: '#0A367F',
//                  borderWidth: 0,
//                  innerRadius: '80%',
//                  outerRadius: '100%',
//                },
//                {
//                  backgroundColor: '#0A367F',
//                  borderWidth: 0,
//                  innerRadius: '40%',
//                  outerRadius: '60%',
//                }]
            },
            xAxis: {
              tickInterval: 36,
              min: 0,
              max: 360,
//              categories: ['遮挡车牌', '主驾驶抽烟', '副驾驶未系安全带', '主驾驶看手机', '遮挡车牌2',
//                '主驾驶未系安全带', '摩托车载人', '主驾驶打电话', '主驾驶抽烟', '摩托车嘉诚人员未带头盔'],
              categories: [],
              lineWidth: 1,
              gridLineColor: '#0445A6',
              gridLineWidth: 1,
              lineColor: '#04327B',
              labels: {
                distance: 18,
                formatter: function () {
                  let index = this.pos / this.axis.tickInterval
                  let options = this.axis.categories
                  let name = index < options.length ? options[index] : ''
                  let colors = ['#E69B03', '#D1494E', '#42FF00', '#00F6FF', '#00C087', '#06A6FF', '#FF5200', '#4C49EC', '#045FE0', '#041FE0']
                  let color = index < colors.length ? colors[index] : '#06A6FF'
                  return '<span style="color:' + color + '">' + name + '</span>'
                },
                style: {
                  color: 'white',
                  fontSize: '0.0625rem',
                }
              }
            },
            yAxis: {
              //              gridLineInterpolation: 'polygon',
              //              lineWidth: 0,
              min: 0,
              tickAmount: 6,
              labels: {
                enabled: false
              },
              gridLineDashStyle: 'dash',
              minorGridLineDashStyle: 'dash',
              lineWidth: 0,
              gridLineColor: '#0445A6',
              lineColor: '#04327B',
            },
            plotOptions: {
              series: {
                pointStart: 0,
                pointInterval: 36
              },
              column: {
                pointPadding: 0,
                groupPadding: 0
              }
            },
            series: [{
              name: '',
              type: 'area',
              color: '#00F6FF80',
              //data: [43000, 19000, 60000, 35000, 17000, 10000,20001,2312,44412,123345],
//              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              data:[]
            }]
          },
          instance: null,
        },
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
          let categories = this.chart.option.xAxis.categories
          let data = this.chart.option.series[0].data
          // 合并类型
          this.data.forEach(item => {
            let found = categories.find(name => name == item.name)
            if (!found) {
              categories.push(item.name)
              data.push(0)
            }
          })
          this.chart.option.plotOptions.series.pointInterval = this.chart.option.xAxis.tickInterval = 360.0 / categories.length

          //  合并数据

          categories.forEach((name, index) => {
            let found = this.data.find((item) => item.name == name)
            if (found) {
              let value = parseInt(found.count)
              this.$set(data, index, value)
            } else {
              data[index] = 0;
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .car-break-type-card {
    width: 100%;
    height: 100%;
    position: relative;
    .chart {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .unit {
      position: absolute;
      right: 15px;
      top: -5px;
      font-size: 12px;
      color: #FFFFFF;
    }
  }
</style>
