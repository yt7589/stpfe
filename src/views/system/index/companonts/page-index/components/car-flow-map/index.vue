<template>
  <div class="car-flow-map">
    <div class="mask"></div>
    <baidu-map ref="map" class="baidu-map" :zoom="map.zoom"
               :center="map.center" :dragging="true"
               @ready="onMapReady" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom"
               :scroll-wheel-zoom="true" :double-click-zoom="true">
      <bm-boundary v-for="item in data" :name="city + item.name" :strokeWeight="2" strokeColor="#06A6FF"
                   :fillColor="getColor(item.count)"></bm-boundary>
    </baidu-map>
  </div>

</template>

<script>
  import mapStyle from '@/assets/baiduMapStyleBlueEmpty.js'

  export default {
    props: ['data'],
    components: {},
    data(){
      return {
        city: '北京市',
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
        this.getBoundary()
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
      getBoundary(){
        let map = this.map.instance
        let bdary = new BMap.Boundary();
        bdary.get(this.city, function (rs) {       //获取行政区域
          map.clearOverlays();        //清除地图覆盖物
          var count = rs.boundaries.length; //行政区域的点有多少个
          for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], {
              strokeWeight: 2,
              strokeColor: "#06A6FF",
              fillColor: 'transparent',
              fillOpacity: 100
            }); //建立多边形覆盖物
            map.addOverlay(ply);  //添加覆盖物
            map.setViewport(ply.getPath());    //调整视野
          }
        });
      },
      getColor(number){
        let start = [169, 71, 68]
        let end = [5, 90, 196]
        let percent = number / (1000 * 10000)
        let color = this.pickHex(start, end, percent)
        return 'rgb(' + color.join(', ') + ')';
      },
      pickHex(color1, color2, weight) {
        var w1 = weight;
        var w2 = 1 - w1;
        var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
          Math.round(color1[1] * w1 + color2[1] * w2),
          Math.round(color1[2] * w1 + color2[2] * w2)];
        return rgb;
      }
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
