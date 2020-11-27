<template>
    <div class="page-zdjg-tscl">
        <el-row class="row">
            <baidu-map
                    ref="map-tscl"
                    class="baidu-map-tscl"
                      @ready="onMapReady"
                      :zoom="map.zoom"
                      :center="map.center" >
                <el-col class="col-1">
                    <el-row></el-row>
                    <el-row></el-row>
                    <el-row></el-row>
                </el-col>
                <el-col  class="col-2">
                    <el-row></el-row>
                    <el-row></el-row>
                    <el-row></el-row>
                </el-col>
                <el-col  class="col-3">
                    <el-row></el-row>
                    <el-row></el-row>
                    <el-row></el-row>
                </el-col>
            </baidu-map>

        </el-row>
    </div>
</template>

<script>
  import mapStyle from '@/assets/baiduMapStyle'
  export default {
    name: 'page-zdjg-tscl',
    data(){
      return {
        map: {
          instance: null,
          zoom: 12,
          center: {
            lng: 116.404,
            lat: 39.915
          },
        },
      }
    },
    methods:{
      onMapReady ({BMap, map}) {
        this.map.instance = map
        this.initMap()
      },
      initMap () {
        this.map.instance.setMapStyleV2(mapStyle)
        this.$nextTick(() => {

        })
      },
      syncCenterAndZoom (event) {
        const {lng, lat} = event.target.getCenter()
        this.map.center.lat = lat
        this.map.center.lng = lng
        this.map.zoom = event.target.getZoom()
      },
    }
  }
</script>

<style lang="scss">
    .page-zdjg-tscl {
        height: calc(100% - 170px);
        position: relative;
        overflow-y: hidden;
        .row{
            height: 100%;
            position: relative;
        }
        .baidu-map-tscl{
            height: 100%;
            width: 100%;
        }

    }

</style>
