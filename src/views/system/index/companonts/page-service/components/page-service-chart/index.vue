<template>
  <div class="page-data-video">
    <!--<div class="page-title"></div>-->
    <el-container class="page-body_wrapper">
      <el-header height="0.2rem">
        <el-form labelWidth="auto" :inline="true" class="custom-form custom-form-mini">
          <el-form-item label="应用">
            <el-input class="custom-input" v-model="filter.name"></el-input>
          </el-form-item>
          <el-form-item label="接口">
            <el-input class="custom-input" v-model="filter.api"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-input class="custom-input" v-model="filter.time"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)" class="chart-box">
        <highcharts style="width:100%;height:100%" :options="chart.options"></highcharts>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import api from '@/api'

  export default {
    data () {
      return {
        loading: false,
        filter: {
          name: '',
          api: "",
          time: ""
        },
        chart: {
          options: {
            chart: {
              type: 'area',
              backgroundColor: 'transparent',
              spacing: [45, 40,45, 40]
            },
            title: {
              text: ''
            },
            credits: {
              enabled: false
            },
            legend: {
              enabled: false
            },
            exporting: {
              enabled: false
            },
            xAxis: {
              type: 'datetime',
              title: {
                text: ''
              },
              gridLineWidth: 0,
              tickLength: 0,
              lineWidth: 2,
              lineColor: '#00F6FF',
              labels: {
                style: {
                  color: '#FFFFF0',
                  fontSize: '0.09375rem',
                }
              },
              dateTimeLabelFormats: {},
              crosshair: {
                zIndex: 9
              },
//              plotLines: [{
//                value: 0,
//                width: 1,
//                color: '#00F6FF',
//                zIndex: 9
//              }]
            },
            yAxis: {
              title: {
                text: ''
              },
              gridLineWidth: 0,
              tickLength: 0,
              lineWidth: 1,
              lineColor: '#405290',
              labels: {
                style: {
                  fontSize: '0.09375rem',
                  color: '#FFFFF0'
                }
              }
            },
            plotOptions: {
              area: {
                lineWidth: 2,
                marker: {
                  fillColor: 'white'
                },
              }
            },
            series: [{
              name: '图片接口',
              data: [],
              lineColor: '#8B71D7',
              color: {
                linearGradient: [0, 0, 0, '100%'],
                stops: [
                  [0, '#7365C3'],
//                  [0.5, '#413E9B'],
                  [1, '#282784']
                ]
              },
              marker:{
                enabled: true,
                fillColor:'#8B71D7',
                lineColor:'#9794d7'
              }
            }, {
              name: '视频接口',
              data: [],
              lineColor: '#00F6FF',
              color: {
                linearGradient: [0, 0, 0, '100%'],
                stops: [
                  [0, '#1E7E95'],
//                  [0.5, '#413E9B'],
                  [1, '#0F3C70']
                ]
              },
              marker:{
                enabled: true,
                fillColor:'#00F6FF',
                lineColor:'#48f7ff'
              }
            }],
//            responsive: {
//              rules: [{
//                condition: {
//                  minHeight: 200
//                },
//                chartOptions: {
//                  chart: {
//                    spacing: [40, 10, 10, 10]
//                  },
//                }
//              },
//                {
//                  condition: {
//                    minWidth: 3000
//                  },
//                  chartOptions: {
//                    xAxis: {
//                      tickInterval: 2 * 3600 * 1000
//                    }
//                  }
//                }]
//            }
          }
        }
      }
    },
    mounted(){
      this.fetchData()

      //
      this.chart.options.series[0].data = [
        [1370131200000, 0.7695],
        [1370217600000, 0.7648],
        [1370304000000, 0.7645],
        [1370390400000, 0.7638],
        [1370476800000, 0.7549],
        [1370563200000, 0.7562],
        [1370736000000, 0.7574],
        [1370822400000, 0.7543],
        [1370908800000, 0.751],
        [1370995200000, 0.7498],
        [1371081600000, 0.7477],
        [1371168000000, 0.7492],
        [1371340800000, 0.7487],
        [1371427200000, 0.748],
        [1371513600000, 0.7466],
        [1371600000000, 0.7521],
        [1371686400000, 0.8564],
        [1371772800000, 0.9621],
        [1371945600000, 1.063],
        [1372032000000, 1.2623],
        [1372118400000, 1.3644],
        [1372204800000, 1.4685],
        [1372291200000, 1.7671],
        [1372377600000, 1.8687],
        [1372550400000, 1.9687],
      ]

      this.chart.options.series[1].data = [
        [1370131200000, 1.7695],
        [1370217600000, 1.7648],
        [1370304000000, 1.7645],
        [1370390400000, 1.7638],
        [1370476800000, 1.7549],
        [1370563200000, 1.7562],
        [1370736000000, 1.7574],
        [1370822400000, 1.7543],
        [1370908800000, 1.751],
        [1370995200000, 1.7498],
        [1371081600000, 1.7477],
        [1371168000000, 1.7492],
        [1371340800000, 1.7487],
        [1371427200000, 1.748],
        [1371513600000, 1.7466],
        [1371600000000, 1.7521],
        [1371686400000, 1.7564],
        [1371772800000, 1.5621],
        [1371945600000, 1.463],
        [1372032000000, 1.3623],
        [1372118400000, 1.2644],
        [1372204800000, 1.1685],
        [1372291200000, 0.7671],
        [1372377600000, 0.7687],
        [1372550400000, 0.7687],
      ]
    },
    methods: {
      fetchData(page = 1){
      },
      handleSizeChange(size){
        this.table.pagination.pageSize = size
        this.fetchData()
      },
      handleCurrentChange(page){
        this.table.pagination.page = page
        this.fetchData(page)
      }
    }
  }
</script>


<style lang="scss">
  .page-data-video {
    width: 100%;
    height: 100%;
    position: relative;

    background: url('../../image/background-container.png') no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    .page-body_wrapper {
      position: absolute;
      top: 40px;
      left: 60px;
      right: 60px;
      bottom: 40px;
    }

    .el-main {
      margin: 20px;
      padding: unset;
    }

    .chart-box {
      background: rgba(0, 115, 255, 0.05);
      box-shadow: inset 2px 2px 12px 4px rgba(0, 115, 255, 0.5);
      border-radius: 8px;
      border: 1px solid rgba(0, 115, 255, 0.9);
    }

  }
</style>
