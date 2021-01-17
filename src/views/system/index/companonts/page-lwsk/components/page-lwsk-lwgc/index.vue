<template>
  <div class="page-lwsk-lwgc">
    <div class="header-crumb">
      <span>路网实况>路网过车</span>
    </div>
    <div class="body">
      <div class="column-left" v-if="visible">
        <div class="camera-point-top10">
          <div class="title">
            <el-image :src="require('../../image/image-camera-green.png')"></el-image>
            <span>监控点位过车前10</span>
          </div>
          <div class="unit">单位：万辆</div>
          <highcharts class="camera-chart" :options="cameraChart.option"></highcharts>
        </div>
        <div class="car-flow">
          <div class="title">
            <el-image :src="require('../../image/image-chart.png')"></el-image>
            <span>车辆数量走势图</span>
          </div>
          <highcharts class="car-chart" :options="carChart.option"></highcharts>
        </div>
      </div>
      <div class="column-right">
        <div class="wrapper">
          <baidu-map ref="map" class="baidu-map" :zoom="map.zoom"
                     :center="map.center" :dragging="true"
                     @ready="onMapReady">
            <!--<bm-marker v-for="(point,index) in pointList" :key="index"-->
            <!--:position="{lng: point.longitude, lat: point.latitude}"-->
            <!--v-if="map.instance" @click="onPointClick(point)" :icon="map.marker">-->
            <!--</bm-marker>-->
          </baidu-map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mapStyle from '@/assets/baiduMapStyle'
  import API from '@/api'

  export default {
    props: ['visible'],
    components: {},
    data(){
      return {
        cameraChart: {
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
        carChart: {
          option: {
            chart: {
              type: 'area',
              plotBackgroundColor: 'transparent',
              backgroundColor: 'transparent',
              spacing: [0, 20, 20, 20]
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
              categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
                '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
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
              align: 'right',
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
              name: '昨日',
              data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6, 7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
//              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              lineColor: '#02C6D7',
              color: {
                linearGradient: [0, 0, 0, '100%'],
                stops: [
                  [0, '#00F6FF7F'],
                  [1, '#00000000']
                ]
              },
              marker: {
                enabled: true,
                fillColor: 'white',
                lineColor: '#02C6D7',
                lineWidth: 1,
                radius: 2,
                symbol: 'circle'
              }
            }, {
              name: '今日',
              data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8, 3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
//              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              lineColor: '#E84D07',
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
                lineColor: '#E84D07',
                lineWidth: 1,
                radius: 2,
                symbol: 'circle'
              }
            }]
          },
          instance: null
        },
        map: {
          instance: null,
          zoom: 12,
          center: {
            lng: 116.495843,
            lat: 39.90421
          }
        },
        data: {
          //地图点位
          tvsd: [],
          // 点位过车前10
          tvts: [],
          // 路网过车数量走势
          tvtv: []
        }
      }
    },
    mounted(){
      this.fetchData()
    },
    methods: {
      fetchData(){
        API.queryVehicleStatistics().then(res => {
          this.data = res.data
          this.initData()
        })
      },
      initData(){
        if (this.data.tvts) {
          let array = this.data.tvts.concat([])
          array.sort((t1, t2) => t2.count - t1.count)
          let categories = []
          let data = []
          array.forEach(item => {
            categories.push(item.name)
            data.push(parseInt(item.count / 1000))
          })
          this.cameraChart.option.xAxis.categories = categories
          this.cameraChart.option.series[0].data = data
        }
      },
      onMapReady ({BMap, map}) {
        this.map.instance = map
        this.initMap()
      },
      initMap () {
        this.map.instance.setMapStyleV2(mapStyle)
      }
    }
  }
</script>

<style lang="scss">
  .page-lwsk-lwgc {
    .body {
      width: 100%;
      height: calc(100% - 72px);
      margin-top: 8px;
      display: flex;
      justify-content: space-between;

      .column-left {
        width: 33%;
        height: 100%;

        .camera-point-top10 {
          width: 100%;
          height: calc(55% - 16px);
          margin-bottom: 16px;
        }

        .car-flow {
          width: 100%;
          height: 45%;
        }

        .camera-point-top10, .car-flow {
          background: rgba(4, 95, 224, 0.3);
          border-radius: 4px;
          .title {
            padding: 18px 24px;
            font-size: 18px;
            color: #FFFFFF;

            .el-image {
              width: 24px;
              height: 24px;
              margin-right: 8px;
            }
          }

          .unit {
            padding-right: 18px;
            font-size: 14px;
            color: #FFFFFF;
            line-height: 20px;
            text-align: right;
          }
        }

        .camera-chart {
          width: 100%;
          height: calc(100% - 86px);
        }
        .car-chart {
          width: 100%;
          height: calc(100% - 66px);
        }
      }

      .column-right {
        width: calc(67% - 16px);
        height: 100%;

        background: rgba(0, 115, 255, 0.2);
        border-radius: 4px;

        position: relative;
        .wrapper {
          position: absolute;
          top: 15px;
          bottom: 15px;
          left: 15px;
          right: 15px
        }
        .baidu-map {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
