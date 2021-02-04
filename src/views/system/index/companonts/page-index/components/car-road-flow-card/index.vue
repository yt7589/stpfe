<template>
  <custom-card title="拥堵路段过车量" class="car-road-flow-card">
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
              type: 'column',
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
              spacing: [20, 0, 0, 0]
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
              categories: [],
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
                //data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0,127.0,64],
                data: [],
                color: {
                  linearGradient: [0, 0, 0, '100%'],
                  stops: [
                    [0, '#6174CF'],
                    [1, '#0C9C97']
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
  .car-road-flow-card {
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
      font-size: '0.0625rem';
      color: #FFFFFF;
    }
  }
</style>
