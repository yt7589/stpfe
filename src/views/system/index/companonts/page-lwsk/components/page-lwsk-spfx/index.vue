<template>
  <div class="page-lwsk-spfx">
    <div class="header-menu-mask"></div>
    <baidu-map ref="map" class="baidu-map" :zoom="map.zoom"
               :center="map.center" :dragging="true"
               @ready="onMapReady" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom"
               :scroll-wheel-zoom="true">
      <bm-marker v-for="(point,index) in siteList" :key="index"
                 :position="{lng: point.lng, lat: point.lat}"
                 v-if="map.instance" @click="onPointClick(point)" :icon="map.marker">
      </bm-marker>
    </baidu-map>
    <div class="camera-info">
      <div class="success-info info-box">
        <el-image :src="require('../../image/image-camera.png')"></el-image>
        共接入摄像头 {{cameraInfo.camera}} 个
      </div>
      <div class="success-info info-box">
        <el-image :src="require('../../image/image-camera.png')"></el-image>
        共接入抓拍机 {{cameraInfo.snapshot}}  个
      </div>
      <br>
      <div class="error-info info-box">
        <el-image :src="require('../../image/image-warning.png')"></el-image>
        异常摄像头 {{cameraInfo.abnormal_camera}}  个
      </div>
      <div class="error-info info-box">
        <el-image :src="require('../../image/image-warning.png')"></el-image>
        异常抓拍机 {{cameraInfo.abnormal_snapshot}}  个
      </div>
    </div>
    <camera-info-window class="camera-info-window" v-if="cameraDialog.visible"
                        :siteId="cameraDialog.data" @close="cameraDialog.visible=false"></camera-info-window>
  </div>
</template>

<script>
  import mapStyle from '@/assets/baiduMapStyle'
  import CameraInfoWindow from './components/camera-info-window/index.vue'
  import util from '@/libs/util'
  import API from '@/api'

  export default {
    components: {
      CameraInfoWindow
    },
    data(){
      let markerIcon = require("../../image/image-map-marker.png")
      return {
        map: {
          instance: null,
          zoom: 6,
          center: {
            lng: 116.48491949999993,
            lat: 39.87675224621402
          },
          marker: {
            url: markerIcon,
            size: {
              width: 33,
              height: 44
            }
          }
        },
        siteList: [],
        cameraInfo: {},
        cameraDialog: {
          visible: false,
          data: []
        }
      }
    },
    mounted(){
      this.getSiteList()
      this.getQueryDeviceSum()
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
      /**
       * 点击点位图标响应函数
       */
      onPointClick(point){
        this.cameraDialog.visible = true
        this.cameraDialog.data = point.siteId
      },
      /**
       * 获取在地图上显示的点位列表信息
       */
      getSiteList(){
        API.GetCameraSiteList().then(res => {
          this.siteList = res.data.recs
          this.map.zoom = util.map.setZoom(this.siteList);
          if(this.siteList.length > 0){
            this.map.center.lat = this.siteList[0].lat;
            this.map.center.lng = this.siteList[0].lng;
          }
        })
      },
      getQueryDeviceSum() {
        API.GetQueryDeviceSum().then(res => {
          this.cameraInfo = res.data
        })
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
      height: 200px;

      z-index: 98;

      background: url(./image/header-mask.png) no-repeat;
      background-size: 100% 85%;
      -moz-background-size: 100% 85%;
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
