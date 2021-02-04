<template>
  <div class="area-flow-card">
    <div class="title">区县过车数量</div>
    <div class="card-body-wrapper">
      <highcharts class="chart" :options="chart.option"></highcharts>
      <div class="unit">单位： 万辆</div>
    </div>
  </div>
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
              type: 'column',
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
              spacingTop: 40
//              spacing: [0, 0, 0, 0]
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
              categories: [''],
              labels: {
                style: {
                  color: 'white',
                  // fontSize: '0.0625rem',
                }
              }
            },
            yAxis: {
              gridLineColor: '#9797973F',
              gridLineDashStyle: 'solid',
              lineWidth: 0,
              tickAmount: 6,
              min: 0,
              title: {
                text: ''
              },
              labels: {
                style: {
                  color: 'white',
                  // fontSize: '0.0625rem',
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
              enabled: false,
            },
            series: [
              {
                data: [0],
                color: {
                  linearGradient: [0, 0, 0, '100%'],
                  stops: [
                    [0, 'rgba(0, 246, 255, 0.7)'],
                    [1, 'rgba(6, 166, 255, 1)']
                    
                  ]
                },
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
          let categories = []
          let data = []
          this.data.forEach(item => {
            categories.push(item.name)
            data.push(parseFloat(item.count))
          })

          this.chart.option.series[0].data = data
          this.chart.option.xAxis.categories = categories
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .area-flow-card {
    width: 100%;
    height: 100%;

    background: rgba(0, 115, 255, 0.2);
    border-radius: 4px;

    .title {
      font-size: 18px;
      color: #FFFFFF;
      line-height: 40px;
      padding-left: 13px;
    }
    .card-body-wrapper {
      position: relative;
      width: 100%;
      height: calc(100% - 40px);
    }
    .chart {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .unit {
      position: absolute;
      right: 15px;
      top: -10px;
      font-size: '0.0625rem';
      color: #FFFFFF;
    }
  }
</style>
