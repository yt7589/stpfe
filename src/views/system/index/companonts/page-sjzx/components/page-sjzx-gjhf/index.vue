<template>
  <div class="page-sjzx-gjhf" flex="dir:top">
    <div class="header-crumb">
      <span>数据中心>轨迹回放</span>
    </div>
    <div  class="body">
      <div class="column-1">
        <el-form class="search-form">
          <el-form-item label="预测时间">
            <el-date-picker
              v-model="table.filter.time"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="车牌号码">
            <el-input placeholder="" v-model="table.filter.type" class="type-select">

            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="button-search">
              回放
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="column-2">
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

  export default {
    props: ['visible'],
    components: {},
    data(){
      return {
        loading: false,
        table: {
          data: [],
          filter: {
            username: '',
            phone: '',
            company: ''
          },
          pagination: {
            currentPage: 1,
            total: 1000,
            pageSize: 20
          }
        },
        map: {
          instance: null,
          zoom: 12,
          center: {
            lng: 116.495843,
            lat: 39.90421
          }
        },
      }
    },
    mounted(){
    },
    methods: {
      onMapReady ({BMap, map}) {
        this.map.instance = map
        this.initMap()
      },
      initMap () {
        this.map.instance.setMapStyleV2(mapStyle)
//        this.zoomFocus()
        setTimeout(() => {
          //TODO: 立即聚焦会出现白屏
          this.zoomFocus()
        }, 1000)
      },
      zoomFocus(){
        if (this.map.instance) {
//          var points = []
//          this.pointList.forEach((item) => {
//            points.push(new BMap.Point(item.longitude, item.latitude))
//          })
//          this.map.instance.setViewport(points);
        }
      },
    }
  }
</script>

<style lang="scss">
  .page-sjzx-gjhf {
    .body {
      width: 100%;
      height: calc(100% - 72px);
      margin-top: 8px;
      display: flex;
      justify-content: space-between;

      .column-1 {
        width: 23%;
        height: 100%;
        display: inline-block;

        background: rgba(0, 115, 255, 0.2);
        border-radius: 4px;

        position: relative;
        .search-form {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;

          .el-form-item {
            margin-bottom: 8px;
          }

          .el-form-item__label {
            font-size: 14px;
            color: #FFFFFF;
          }

          .el-input__inner {
            padding: 15px;
            background: rgba(4, 95, 224, 0.5);
            border-radius: 4px;
            border: 1px solid #045FE0;
            color: white;
          }

          .el-date-editor {
            width: calc(100% - 110px);
            padding: 9px 12px;
            .el-input__icon {
              padding-bottom: 11px;
            }
            .el-range-input {
              font-size: 14px;
              color: #FFFFFF;
              background: transparent;
            }
            .el-range-separator {
              line-height: 14px;
              color: #FFFFFF;
            }
          }

          .type-select {
            width: calc(100% - 110px);
          }

          .button-search {
            width: calc(100% - 108px);
            margin-left: 66px;
            margin-top: 4px;
            display: inline-block;

            background: #045FE0;
            border-radius: 4px;
            border: unset;

            font-size: 14px;
            color: #FFFFFF;

            &:active {
              opacity: 0.8;
            }

            .el-image {
              width: 16px;
              float: right;
            }
          }
        }

        > .wrapper {
          position: absolute;
          top: 125px;
          left: 20px;
          right: 20px;
          bottom: 20px;
        }
        .area-violation-top10-card {
          height: 50%;
        }
        .camera-violation-top10-card {
          height: 50%;
        }
      }

      .column-2 {
        width: calc(77% - 16px);
        height: 100%;

        background: rgba(4, 95, 224, 0.2);
        border-radius: 4px;

        position: relative;
        .wrapper {
          position: absolute;
          top: 8px;
          bottom: 8px;
          left: 8px;
          right: 8px
        }
        .baidu-map {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
