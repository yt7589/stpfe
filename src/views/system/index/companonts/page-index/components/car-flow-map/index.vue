<template>
  <div class="car-flow-map">
    <div class="mask"></div>
    <baidu-map ref="map" class="baidu-map" :zoom="map.zoom"
               :center="map.center" :dragging="true"
               @ready="onMapReady" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom"
               :scroll-wheel-zoom="true" :double-click-zoom="true">
      <bm-boundary v-for="item in data" :name="item.name" :strokeWeight="2" strokeColor="#06A6FF"
                   :fillColor="item.color"></bm-boundary>
    </baidu-map>
  </div>

</template>

<script>
  import mapStyle from '@/assets/baiduMapStyleBlueEmpty.js'

  export default {
    components: {},
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
        data: [
          {name: "北京市海淀区", 'latitude': 39.963839, 'longitude': 116.300784, color: '#E69B03'},
          {name: "北京市丰台区", 'latitude': 39.866439, 'longitude': 116.289286, color: '#058DC8'},
          {name: "北京市石景山区", 'latitude': 39.910729, 'longitude': 116.216846, color: '#06224F'},
          {name: "北京市门头沟区", 'latitude': 39.939873, 'longitude': 116.112661, color: '#B26727'},
          {name: "北京市大兴区", 'latitude': 39.729773, 'longitude': 116.342628, color: '#B26727'},
        ]
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
          this.data.forEach((item) => {
            if (item.longitude > 0 && item.latitude > 0) {
              points.push({
                lng: item.longitude,
                lat: item.latitude
              })
            }
          })
          if (points.length > 0) {
            let view = this.map.instance.getViewport(eval(points))
            this.map.center = view.center
            this.map.zoom = view.zoom -2
          }
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
    }
  }
</script>

<style lang="scss">
  .car-flow-map {
    position: relative;
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;

      background: url(../../image/bg-map-mask.png) no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      z-index: 1;
      pointer-events: none;
    }
    .baidu-map {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 0;
      .anchorBL {
        display: none;
      }
    }
  }

</style>
