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
                <baidu-map class="baidu-map" :zoom="map.zoom"
                          :center="map.center"
                          @ready="onMapReady" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom" :double-click-zoom="false">
                  <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                  <bm-boundary v-for="item in data" :name="city + item.areaName" :strokeWeight="2" strokeColor="#06A6FF"
                              :fillColor="getColor(item.count)"></bm-boundary>
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
                  <div>{{scope.row.rg}}
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
        city: '北京市',
        map: {
          instance: null,
          zoom: 12,
          center: {
            lng: 116.495843,
            lat: 39.90421
          },
        },
        markerPoints:[],
        tVehicle:'',
        bmMarkerStyle:{
          url: require('../../image/icon-1.png'),
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
          console.log('地图子组件数据:',val)
          this.map.center.lng = val[0].lng;
          this.map.center.lat = val[0].lat;
          val.forEach(item => {
            this.markerPoints.push({
              lat : item.lat,
              lng : item.lng
            })
          });
        }
      },
    },
    beforeDestroy() {
     
    },
    methods:{
      onMapReady ({BMap, map}) {
        this.map.instance = map
        this.initMap()
        this.getBoundary()
      },
      initMap () {
        // this.map.instance.setMapStyle({styleJson: mapStyle });
        this.map.instance.setMapStyleV2(mapStyle)
      },
      syncCenterAndZoom (event) {
        const {lng, lat} = event.target.getCenter()
        this.map.center.lat = lat
        this.map.center.lng = lng
        this.map.zoom = event.target.getZoom()
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
