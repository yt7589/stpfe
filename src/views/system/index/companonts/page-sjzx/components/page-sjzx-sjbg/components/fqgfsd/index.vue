<template>
    <div class="sjbg-rtj">
        <div class="title">
            <div class="icon">
              <img :src="iconUrl"/>
            </div>
            <div class="content">{{title}}</div>
        </div>
        <div class="body">
          <div class="left"> 
            <div class="map">
                <baidu-map  class="baidu-map" :zoom="map.zoom"
                            :center="map.center"
                            @ready="onMapReady" 
                            @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom" :double-click-zoom="false">
                    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                    <div v-for="(item,index) in markerPoints" :key="index">
                      <bm-marker :icon="item"  :position="{lat:item.lat,lng:item.lng}"
                      :label="item.name">
                      </bm-marker>
                    </div>
                </baidu-map>
            </div>
          </div>
          <div class="right">
            <el-table :data="data" v-if="data" class="sjbg-custom-table">
              <el-table-column type="index" align="center" label="排名" width="90"></el-table-column>
              <el-table-column prop="areaName" align="center" label="区县">
                <template slot-scope="scope">
                  <div>{{scope.row.areaName ? scope.row.areaName : scope.row.rdName}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="count" align="center" label="平均拥堵指数"></el-table-column>
              <el-table-column prop="rg" align="center" label="环比">
                <template slot-scope="scope">
                  <div :style="scope.row.status=='已接入'?{}:{color:'red'}">{{scope.row.rg}}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
    </div>
</template>

<script>
  import mapStyle from '@/assets/baiduMapStyle'
  import API from '@/api'
  export default {
    props: {
      icon: {
        type: String,
        default: ''
      },
      title:{
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      data:{
        type: Array,
        default:()=>{
          return [];
        }
      },
    },
    data(){
      return {
        iconUrl:'',
        map: {
          instance: null,
          zoom: 12,
          center: {
            lng: 116.404,
            lat: 39.915
          },
        },
        markerPoints:[],
        tVehicle:'',
        bmMarkerStyle:{
          url: require('../../image/circle.png'),
          size: {
            width: 44,
            height: 44
          },
        },
      }
    },
    mounted(){
      this.iconUrl = require('../../image/'+this.icon);
    },
    watch: {
      data: {
        deep: true,
        handler(val) {
          this.map.center.lng = val[0].lng;
          this.map.center.lat = val[0].lat;
          val.forEach((item,index) => {
            this.markerPoints.push({
              lat : item.lat,
              lng : item.lng,
              url: require('../../image/circle' + (index+1) + '.png'),
              size: {
                width: 48-(index * 4),
                height: 48-(index * 4)
              },
            })
          });
        }
      },
    },
    beforeDestroy() {
     
    },
    methods:{
      draw ({el, BMap, map}) {
        const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915))
        el.style.left = pixel.x - 60 + 'px'
        el.style.top = pixel.y - 20 + 'px'
      },
      onMapReady ({BMap, map}) {
        this.map.instance = map
        this.initMap()
      },
      initMap () {
        // this.map.instance.setMapStyle({styleJson: mapStyle });
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
      getData(){
        API.sjzxQueryDataReport().then(res => {
          // 解析分时段拥堵趋势数据
          this.data = res.data.raj;
          this.data.forEach(item => {
            this.markerPoints.push({
              lat : item.lat,
              lng : item.lng
            })
          });
        })
      },
    }
  }
</script>

<style scoped lang="scss">
    .bg-table{
    }
    .sjbg-rtj{
      height: inherit;
      background: #001537;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-top: 10px;
        padding-left: 25px;
        display: flex;
        font-family: PingFangSC-Medium, PingFang SC;
        height: 25px;
        .icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              width:20px;
              height: 20px;
            }
        }
        .content {
            font-size: 18px;
            line-height: 18px;
        }
      }
      .body {
        display: flex;
        flex-direction: row;
        width: inherit;
        height: 100%;
        padding-left: 25px;
        padding-right: 25px;
        padding-bottom: 20px;
        .left{
          width: 100%;
          height: inherit;
          .map{
            width:100%;
            height: 100%;
            position: relative;
            .baidu-map{
              position: absolute;
              width: 100%;
              height:100%;
            }
          }
        }
        .right{
          width: 50%;
          margin-left: 20px;
        }
      }
    }
 
    


</style>
