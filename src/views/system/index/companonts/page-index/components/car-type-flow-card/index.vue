<template>
  <custom-card title="车辆类型流量" class="car-type-flow-card">
    <div class="card-body-wrapper" slot="body">
      <highcharts class="chart" :options="chart.option"></highcharts>
      <div class="unit">单位： 万辆</div>
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
              type: 'areaspline',
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
              spacing: [0, 0, 0, 0]
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
            xAxis: {
              categories: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24时'],
              labels: {
                style: {
                  color: 'white'
                }
              }
            },
            yAxis: {
              title: {
                text: ''
              },
              gridLineColor: '#045FE03F',
              gridLineDashStyle: 'dash',
              tickAmount: 6,
              labels: {
                style: {
                  color: 'white'
                }
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
            plotOptions: {
              area: {
                lineWidth: 1,
                marker: {
                  fillColor: 'white'
                },
              }
            },
            series: [{
              name: '小型车',
              //data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              lineColor: '#045FE0',
              color: {
                linearGradient: [0, 0, 0, '100%'],
                stops: [
                  [0, '#045fe07f'],
                  [1, '#00000000']
                ]
              },
              marker: {
                enabled: true,
                fillColor: 'white',
                lineColor: '#045FE0',
                lineWidth: 1,
                radius: 3,
                symbol: 'circle'
              }
            }, {
              name: '中型车',
              // data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              lineColor: '#D1494E',
              color: {
                linearGradient: [0, 0, 0, '100%'],
                stops: [
                  [0, '#EA80867f'],
                  [1, '#00000000']
                ]
              },
              marker: {
                enabled: true,
                fillColor: 'white',
                lineColor: '#D1494E',
                lineWidth: 1,
                radius: 3,
                symbol: 'circle'
              }
            }, {
              name: '大型车',
//              data: [1.9, 3.2, 4.7, 8.5, 11.9, 15.2, 13.0, 12, 11.2, 10.3, 6.6, 4.8],
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              lineColor: '#E69B03',
              color: {
                linearGradient: [0, 0, 0, '100%'],
                stops: [
                  [0, '#F4CB077f'],
                  [1, '#00000000']
                ]
              },
              marker: {
                enabled: true,
                fillColor: 'white',
                lineColor: '#E69B03',
                lineWidth: 1,
                radius: 3,
                symbol: 'circle'
              }
            }]
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
          this.data.forEach(item => {
            let charData = null
            if (item.seriesName == '小型车') {
              charData = this.chart.option.series[0].data
            } else if (item.seriesName == '中型车') {
              charData = this.chart.option.series[1].data
            } else if (item.seriesName == '大型车') {
              charData = this.chart.option.series[2].data
            }

            if (charData && item.datas) {
              item.datas.forEach(subItem => {
                let index = parseInt(subItem.timeInterval / 2) - 1
                if (index < charData.length) {
                  this.$set(charData, index, parseFloat(subItem.count))
                } else {
                  console.error("小时错误", item)
                }
              })
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .car-type-flow-card {
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
