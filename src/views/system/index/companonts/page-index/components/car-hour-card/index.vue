<template>
  <custom-card title="分时段过车统计" class="car-hour-card">
    <div class="card-body-wrapper" slot="body">
      <highcharts class="chart" :options="chart.option"></highcharts>
      <div class="unit">单位： 万辆</div>
    </div>
  </custom-card>
</template>

<script>
  import dayjs from 'dayjs'
  import CustomCard from '../custom-card'
  export default {
    props: ['data'],
    components: {CustomCard},
    data(){
      return {
        chart: {
          option: {
            chart: {
              type: 'column',
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
              spacing: [0, 0, 0, 0]
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
            xAxis: {
              lineWidth: 0,
              categories: [
                '4时', '8时', '12时', '16时', '20时', '24时'
              ],
              labels: {
                style: {
                  color: 'white',
                  fontSize: '0.0625rem',
                }
              }
            },
            yAxis: {
              gridLineColor: '#045FE03F',
              gridLineDashStyle: 'dash',
              lineWidth: 0,
              tickAmount: 6,
              min: 0,
              title: {
                text: ''
              },
              labels: {
                style: {
                  color: 'white',
                  fontSize: '0.0625rem',
                }
              }
            },
            plotOptions: {
              column: {
                borderWidth: 0,
                dataLabels: {
                  enabled: false,
                },
                showInLegend: true,
              }
            },
            legend: {
              enabled: true,
              labelFormat: "{name}",
              useHTML: true,
              verticalAlign: 'top',
              symbolRadius: 0,
              itemStyle: {
                "color": "white",
                fontSize: '0.0625rem',
              }
            },
            series: [
              {
                name: '昨日',
                color: '#4C49EC',
                borderRadius: 4,
                data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
              }, {
                name: '今日',
                color: '#00C087',
                borderRadius: 4,
                data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
              }
            ],
          },
          instance: null
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
          let today = dayjs().format("YYYYMMDD")
          let yesterday = dayjs().subtract(1, 'day').format("YYYYMMDD")


          let todayChartData = this.chart.option.series[0].data
          let yesterdayChartData = this.chart.option.series[0].data

          this.data.forEach(item => {
            let date = dayjs(item.date)
            let str = date && date.isValid() ? date.format("YYYYMMDD") : ""

            let pData = null
            if (str == today) {
              pData = todayChartData
            } else if (str == yesterday) {
              pData = yesterdayChartData
            } else {
              console.error("时间格式错误", item.date, str, today, yesterday)
            }

            if (pData) {
              let index = parseInt(item.timeFrame / 4) - 1
              if (index < pData.length) {
                this.$set(pData, index, parseFloat(item.vehicleNumber))
              } else {
                console.error("小时错误", item)
              }
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .car-hour-card {
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
