<template>
  <div class="page-lwsk-spfx">
    <div class="header-menu-mask"></div>
    <baidu-map ref="map" class="baidu-map" :zoom="map.zoom"
               :center="map.center" :dragging="true"
               @ready="onMapReady" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom"
               :scroll-wheel-zoom="true">
      <!--比例尺控件-->
      <!--<bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>-->
      <!--缩放控件-->
      <!--<bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>-->
      <bm-marker v-for="(point,index) in pointList" :key="index"
                 :position="{lng: point.longitude, lat: point.latitude}"
                 v-if="map.instance" @click="onPointClick(point)">
      </bm-marker>
      <!--<camera-marker v-for="(camera,index) in cameraList" :key="index" :camera="camera"  v-if="map.instance" @click="onCameraClick(camera)"></camera-marker>-->
      <!--<bm-control>-->
      <!--<i class="fa fa-globe" @click="initMap" style="font-size:20px;margin:10px;"></i>-->
      <!--</bm-control>-->
      <!--<bm-control anchor="BMAP_ANCHOR_BOTTOM_RIGHT" class="map-zoom" v-if="map.instance">-->
      <!--<img :src="img.zoom.in" @click="zoomIn">-->
      <!--<img :src="img.zoom.out" @click="zoomOut">-->
      <!--<img :src="img.zoom.focus" @click="zoomFocus">-->
      <!--</bm-control>-->
      <!--<bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" class="drawer" v-if="map.instance">-->
      <!--<img :src="drawer.visible?img.drawer.open:img.drawer.close" @click="drawer.visible=!drawer.visible">-->
      <!--<div class="content" v-if="drawer.visible">-->
      <!--<div class="title">机器人列表</div>-->
      <!--<div>-->
      <!--<div v-for="robot in robots" :key="robot.id" class="content-item" @click="focusRobot(robot)">-->
      <!--<div class="name">-->
      <!--<span>{{robot.name}}</span>-->
      <!--<el-tag v-if="robot.tag" size="mini" :class="robot.tag.class" class="robot-tag">{{robot.tag.text}}</el-tag>-->
      <!--</div>-->
      <!--<el-link class="link" @click.stop="viewRobot(robot)">详情</el-link>-->
      <!--<div class="location">-->
      <!--<i class="fa fa-map-marker"></i>&nbsp;&nbsp;{{robot.location}}-->
      <!--</div>-->
      <!--<div class="event" v-if="robot.event">-->
      <!--{{robot.event}}-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</bm-control>-->
    </baidu-map>
    <div class="camera-info">
      <div class="success-info" @click="zoomFocus">
        <el-image :src="require('../../image/image-camera.png')"></el-image>
        共接入摄像头 0 个
      </div>
      <div class="success-info">
        <el-image :src="require('../../image/image-camera.png')"></el-image>
        共接入抓拍机 0  个
      </div>
      <br>
      <div class="error-info">
        <el-image :src="require('../../image/image-warning.png')"></el-image>
        异常摄像头 0  个
      </div>
      <div class="error-info">
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

  export default {
    components: {
      CameraInfoWindow
    },
    data(){
      return {
        map: {
          instance: null,
          zoom: 12,
          center: {
            lng: 116.495843,
            lat: 39.90421
          },
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
        setTimeout(() => {
            // 立即聚焦会出现白屏
          this.zoomFocus()
        }, 1000)
      },
      zoomFocus(){
        if (this.map.instance) {
          var points = []
          this.pointList.forEach((camera) => {
            if (camera.longitude > 0 && camera.latitude > 0) {
              points.push({
                lng: camera.longitude,
                lat: camera.latitude
              })
            }
          })
          if (points.length > 0) {
            let view = this.map.instance.getViewport(eval(points))
            this.map.center = view.center
            this.map.zoom = view.zoom
          }
          console.log("zoomFocus", points, this.map.center)
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

      .success-info {
        width: 214px;
        padding: 8px 15px;
        margin-top: 6px;

        color: #FFFFFF;
        background: #045FE0;
        border-radius: 18px;

        .el-image {
          width: 20px;
          margin-right: 1px;
        }
      }

      .error-info {
        width: 214px;
        padding: 8px 15px;
        margin-top: 6px;

        color: #FFFFFF;
        background: #D1494E;
        border-radius: 18px;

        .el-image {
          width: 20px;
          margin-right: 1px;
        }
      }
    }

    .camera-info-window {
      position: absolute;
      top: 163px;
      left: 70px;
    }
  }
</style>
