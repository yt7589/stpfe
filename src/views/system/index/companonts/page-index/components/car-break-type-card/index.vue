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
              text: ''
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
                return this.y+'--'+this.x;
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
              size: '80%'
            },
            xAxis: {
              categories: [],
              lineWidth: 1,
              gridLineColor: '#0445A6',
              gridLineWidth: 1,
              lineColor: '#04327B',
              labels: {
                distance: 18,
                formatter: function () {
                  let colors = ['#E69B03', '#D1494E', '#42FF00', '#00F6FF', '#00C087', '#06A6FF', '#FF5200', '#4C49EC', '#045FE0', '#041FE0']
                  let color = colors[parseInt(this.pos%10)]
                  return '<span style="color:' + color + '">' + this.value + '</span>'
                },
                style: {
                  color: 'white',
                }
              }
            },
            yAxis: {
              gridLineInterpolation: 'polygon',
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
            series: [{
              type: 'area',
              name: '柱形',
              data: [],
              color: '#00F6FF80',
              pointPlacement: 'between'
            }]
          }
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
          let categories =[];
          let xData = [];
          this.data.forEach(item => {
            categories.push(item.name);
            xData.push(item.count);
          });
          this.chart.option.xAxis.categories = categories;
          this.chart.option.series[0].data = xData;
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
      font-size: '0.0625rem';
      color: #FFFFFF;
    }
  }
</style>
