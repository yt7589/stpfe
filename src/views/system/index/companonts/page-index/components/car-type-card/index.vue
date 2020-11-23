<template>
  <div class="car-type-card">
    <el-row class="card-wrapper">
      <el-col :span="6" class="column-title">
        <div class="title">车辆类型分布</div>
        <div class="outland-value">外地 30%</div>
        <div class="local-value">本地车辆 <br> 70%</div>
      </el-col>
      <el-col :span="18" class="column-chart">
        <highcharts class="chart" :options="chart.option"></highcharts>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  export default {
    components: {},
    data(){
      return {
        chart: {
          option: {
            chart: {
              type: 'variablepie',
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
              spacing: [0, 0, 0, 0]
            },
            title: {
              text: '',
            },
            tooltip: {
              enabled: false,
            },
            credits: {
              enabled: false
            },
            exporting: {
              enabled: false
            },
            plotOptions: {
              variablepie: {
                borderWidth: 0,
                dataLabels: {
                  enabled: false,
                },
                showInLegend: true,
                colors: ['#00F6FF', '#E69B03', '#4C49EC', '#00C087', '#06A6FF']
              }
            },
            legend: {
              enabled: true,
              labelFormat: "{name}",
              useHTML: true,
              align: 'right',
              verticalAlign: 'middle',
              layout: 'vertical',
              symbolRadius: 0,
              itemMarginTop: 5,
              itemMarginBottom: 5,
              itemStyle: {
                "color": "white",
                'font-size': '0.0625rem',
              }
            },
            series: [{
              minPointSize: 40,
              data: [{
                name: '小汽车',
                y: 25,
                z: 6
              }, {
                name: 'SUV',
                y: 20,
                z: 3
              }, {
                name: 'MPV',
                y: 30,
                z: 7
              }, {
                name: '面包车',
                y: 40,
                z: 4
              }, {
                name: '普通货车',
                y: 20,
                z: 5
              }]
            }],
            responsive: {
              rules: [{
                condition: {
                  maxHeight: 150
                },
                chartOptions: {
                  series: [{
                    minPointSize: 15,
                  }],
                  legend: {
                    enabled: true,
                    itemMarginTop: 0,
                    itemMarginBottom: 0,
                    itemStyle: {
                      "color": "white",
                      'font-size': '0.0528rem',
                    }
                  },
                }
              }]
            }
          },
          instance: null
        },
      }
    },
    mounted(){
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .car-type-card {
    background: rgba(0, 115, 255, 0.2);
    border-radius: 4px;

    width: 100%;
    height: 100%;
    position: relative;
    .card-wrapper {
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      bottom: 8px;
    }

    .column-title {
      height: 100%;
      .title {
        font-size: 18px;
        color: white;
        margin-bottom: 9px;
      }

      .outland-value {
        width: 100%;
        height: calc(40% - 17px);

        background: #00F6FF;
        font-size: 12px;
        color: #001537;

        display: flex;
        align-items: center;
        justify-content: center;
      }

      .local-value {
        width: 100%;
        height: calc(60% - 17px);

        color: white;
        background: #045FE0;
        font-size: 12px;

        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
    }

    .column-chart {
      height: 100%;
      .chart {
        width: 100%;
        height: 100%;
      }
    }

  }

</style>
