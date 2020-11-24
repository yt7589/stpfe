<template>
  <baidu-map ref="map" class="baidu-map" :zoom="map.zoom"
             :center="map.center" :dragging="true"
             @ready="onMapReady" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom"
             :scroll-wheel-zoom="true">
    <bm-boundary name="北京市海淀区" :strokeWeight="2" strokeColor="#06A6FF" fillColor="#E69B03"></bm-boundary>
    <bm-boundary name="北京市丰台区" :strokeWeight="2" strokeColor="#06A6FF" fillColor="transparent"></bm-boundary>
    <bm-boundary name="北京市石景山区" :strokeWeight="2" strokeColor="#06A6FF" fillColor="transparent"></bm-boundary>
    <bm-boundary name="北京市东城区" :strokeWeight="2" strokeColor="#06A6FF" fillColor="transparent"></bm-boundary>
    <bm-boundary name="北京市西城区" :strokeWeight="2" strokeColor="#06A6FF" fillColor="transparent"></bm-boundary>
    <bm-boundary name="北京市朝阳区" :strokeWeight="2" strokeColor="#06A6FF" fillColor="transparent"></bm-boundary>
  </baidu-map>
</template>

<script>
  import mapStyle from '@/assets/baiduMapStyle'

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
      },
      zoomFocus(){
        if (this.map.instance) {
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
