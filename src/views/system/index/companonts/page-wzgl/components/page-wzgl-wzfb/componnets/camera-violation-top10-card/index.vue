<template>
  <custom-card title="点位违章数前10" class="camera-violation-top10-card">
    <div class="card-body-wrapper" slot="body">
      <highcharts class="chart" :options="chart.option"></highcharts>
      <div class="unit">单位： 辆</div>
    </div>
  </custom-card>
</template>

<script>
  import CustomCard from '@/components/chart-card'
  export default {
    props: ['data'],
    components: {CustomCard},
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
              labels: {
                style: {
                  color: 'white',
                }
              }
            },
            yAxis: {
              gridLineColor: '#9797977F',
              min: 0,
              title: {
                text: '',
              },
              labels: {
                overflow: 'justify',
                style: {
                  color: 'white',
                }
              }
            },
            plotOptions: {
              bar: {
                dataLabels: {
                  enabled: true,
                  align: 'left',
                  allowOverlap: true,
                  style: {
                    "color": 'white',
                    fontSize: '0.0625rem',
                  }
                }
              }
            },
            series: [{
              name: '',
              data: [],
              borderWidth: 0,
              colorByPoint: true,
              colors: ['#D1494EFF', '#E69B03FF', '#8CC246FF', '#16755BFF', '#00C087FF', '#36AFCEFF', '#2A47B2FF', '#22C0C6FF', '#1D6FA9FF', '#00C087FF'],
            }]
          },
          instance: null,
          style: {}
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
          if (this.data) {
            let array = this.data.concat([])
            array.sort((i1, i2) => i2.count - i1.count)
            let categories = []
            let data = []
            array.forEach(item => {
              categories.push(item.siteName)
              data.push(item.count)
            })
            this.chart.option.xAxis.categories = categories
            this.chart.option.series[0].data = data
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .camera-violation-top10-card {
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
      top: 0px;
      font-size: 12px;
      color: #FFFFFF;
    }
  }

</style>
