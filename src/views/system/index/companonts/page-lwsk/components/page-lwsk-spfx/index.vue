<template>
  <div class="page-lwsk-spfx">
    <div class="header-menu-mask"></div>
    <baidu-map ref="map" class="baidu-map" :zoom="map.zoom"
               :center="map.center" :dragging="true"
               @ready="onMapReady" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom"
               :scroll-wheel-zoom="true">
      <bm-marker v-for="(point,index) in pointList" :key="index"
                 :position="{lng: point.longitude, lat: point.latitude}"
                 v-if="map.instance" @click="onPointClick(point)" :icon="map.marker">
      </bm-marker>
    </baidu-map>
    <div class="camera-info">
      <div class="success-info info-box" @click="zoomFocus">
        <el-image :src="require('../../image/image-camera.png')"></el-image>
        共接入摄像头 0 个
      </div>
      <div class="success-info info-box">
        <el-image :src="require('../../image/image-camera.png')"></el-image>
        共接入抓拍机 0  个
      </div>
      <br>
      <div class="error-info info-box">
        <el-image :src="require('../../image/image-warning.png')"></el-image>
        异常摄像头 0  个
      </div>
      <div class="error-info info-box">
        <el-image :src="require('../../image/image-warning.png')"></el-image>
        异常抓拍机 0  个
      </div>
    </div>
    <camera-info-window class="camera-info-window" v-if="cameraDialog.visible"
                        :data="cameraDialog.data" @close="cameraDialog.visible=false"></camera-info-window>
  </div>
</template>

<script>
  import mapStyle from '@/assets/baiduMapStyle'
  import CameraInfoWindow from './components/camera-info-window'

  import API from '@/api'

  export default {
    components: {
      CameraInfoWindow
    },
    data(){
      let markerIcon = require("./image/image-map-marker.png")
      return {
        map: {
          instance: null,
          zoom: 12,
          center: {
            lng: 116.495843,
            lat: 39.90421
          },
          marker: {
            url: markerIcon,
            size: {
              width: 300,
              height: 157
            }
          }
        },
        pointList: [
          {
            longitude: 116.479745,
            latitude: 39.895797,
            cameraList: [
              {
                location: '海淀区>上地',
                to: '向北',
                type: "普通摄像头"
              },
              {
                location: '海淀区>上地',
                to: '向北',
                type: "抓拍机"
              }, {
                location: '海淀区>上地',
                to: '向北',
                type: "抓拍机"
              }
            ]
          },
          {
            longitude: 116.490094,
            latitude: 39.857702
          }
        ],
        cameraDialog: {
          visible: false,
          data: []
        }
      }
    },
    mounted(){
    },
    methods: {
      onMapReady ({BMap, map}) {
        this.map.instance = map
        this.initMap()
      },
      syncCenterAndZoom (event) {
        const {lng, lat} = event.target.getCenter()
        this.map.center.lat = lat
        this.map.center.lng = lng
        this.map.zoom = event.target.getZoom()
      },
      initMap () {
        this.map.instance.setMapStyleV2(mapStyle)
//        this.zoomFocus()
        setTimeout(() => {
          //TODO: 立即聚焦会出现白屏
          this.zoomFocus()
        }, 3000)
      },
      zoomFocus(){
        if (this.map.instance) {
          var points = []
          this.pointList.forEach((item) => {
            points.push(new BMap.Point(item.longitude, item.latitude))
          })
          this.map.instance.setViewport(points);
        }
      },
      zoomIn(){
        if (this.map.zoom < 18) {
          this.map.zoom++
        }
      },
      zoomOut(){
        if (this.map.zoom > 0) {
          this.map.zoom--
        }
      },
      onPointClick(point){
        this.cameraDialog.visible = true
        this.cameraDialog.data = point.cameraList
      }
    }
  }
</script>

<style lang="scss">
  .page-lwsk-spfx {
    z-index: 0;
    .header-menu-mask {
      position: absolute;
      top: 0px;
      width: 100%;
      height: 163px;

      z-index: 98;

      background: url(../../image/background-menu-mask.png) no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
    }
    .baidu-map {
      position: absolute;
      width: 100%;
      height: 100%;

      .anchorBL {
        display: none;
      }
    }

    .camera-info {
      position: absolute;
      top: 164px;
      right: 70px;

      .info-box {
        display: flex;
        font-size: 14px;
        width: 214px;
        padding: 8px 18px;
        margin-top: 6px;

        .el-image {
          width: 20px;
          margin-right: 11px;
        }
      }

      .success-info {
        color: #FFFFFF;
        background: #045FE0;
        border-radius: 18px;
      }

      .error-info {
        color: #FFFFFF;
        background: #D1494E;
        border-radius: 18px;
      }
    }

    .camera-info-window {
      position: absolute;
      top: 163px;
      left: 70px;
    }
  }
</style>
