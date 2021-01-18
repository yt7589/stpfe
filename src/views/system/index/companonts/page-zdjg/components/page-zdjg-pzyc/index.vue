<template>
    <div class="page-zdjg-pzyc" >
        <header-crumb :first-item="firstItem" :second-item="secondItem"></header-crumb>
        <div  class="body">
            <el-row class="qy-row" >
                <el-col :span="5" class="col col-1">
                    <el-row class="fsdtj">
                        <fsdtj id="fsdtj" :y-data="fsdtjYData" :series-data="fsdtjSeriesData"></fsdtj>
                    </el-row>
                    <el-row class="fqytj">
                        <fqytj id="fqytj" :y-data="fqytjYData" :series-data="fqytjSeriesData"></fqytj>
                    </el-row>
                </el-col>
                <el-col :span="12" class="col bg-color col-2">
                    <div  class="map">
                        <baidu-map  ref="map-qyjg" class="baidu-map" :zoom="map.zoom"
                                    :center="map.center" :dragging="false"
                                    @ready="onMapReady" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom"
                                    :scroll-wheel-zoom="true">
                            <div v-for="(item,index) in markerPoints" :key="index">
                                <bm-marker :icon=bmMarkerStyle  :position="{lat:item.lat,lng:item.lng}" :dragging="true" @click="infoWindowOpen(index)">
                                    <bm-info-window  :show="item.show" @close="infoWindowClose(index)">
                                        <div class="bm-info-content">
                                            <p>{{item.siteName}}</p>
                                            <p>{{item.hphm}}累计出现{{item.totalTimes}}次</p>
                                        </div>

                                    </bm-info-window>
                                </bm-marker>
                            </div>
                        </baidu-map>
                        <el-row  class="col-2-row-1">
                            <el-col :span="6" class="common_stat total_car">
                                <div class="car_num">{{wpCount}}</div>
                                <div class="car_info">今日无牌过车数量</div>
                            </el-col>
                            <el-col :span="6" class="common_stat total_dev">
                                <div class="car_num">{{tpCount}}</div>
                                <div class="car_info">今日套牌车过车数量</div>
                            </el-col>
                            <el-col :span="6" class="common_stat total_warn">
                                <div class="car_num">{{jpCount}}</div>
                                <div class="car_info">今日假牌车过车数量</div>
                            </el-col>
                            <el-col :span="6" class="common_stat area_total_car">
                                <div class="car_num">{{hpzdCount}}</div>
                                <div class="car_info">今日号牌遮挡过车数量</div>
                            </el-col>

                        </el-row>
                    </div>
                </el-col >
                <el-col :span="5" class="col bg-color col-3" >
                    <el-row style="height: 50%">
                        <div style="padding: 16px 16px 0px 16px; position: relative;">
                            <el-row>
                                <div class="head-title">
                                    <div class="icon"></div>
                                    <div class="content">过车记录</div>
                                    <div class="more">更多>></div>
                                </div>
                            </el-row>
                        </div>
                        <div class="dt-list">
                            <el-row  v-for="(item,key) in dtData" :key="key">
                                <el-col class="dt-row" :span="24">
                                    <el-card class="card">
                                        <div  class="card-content">
                                            <div>{{item.siteName}}</div>
                                            <div>{{item.occurTime}}</div>
                                        </div>
                                        <div class="card-content">
                                            <div> <span style="color: #00F6FF">{{item.hphm}}</span></div>

                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>

                        </div>
                    </el-row>
                    <el-row  style="height: 50%;display: flex;justify-content: center">
                        <el-image class="image" :src="src"></el-image>
                    </el-row>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
  import mapStyle from '@/assets/baiduMapStyle'
  import HeaderCrumb from '../common/header-crumb'
  import Fsdtj from './components/fsdtj'
  import Fqytj from './components/fqytj'
  import API from '@/api'
  export default {
    name: 'page-zdjg-pzyc',
    props:{
      firstItem:{
        type:String,
        required:false,
        default:''
      },
      secondItem:{
        type:String,
        required:false,
        default:''
      }
    },
    components:{
      HeaderCrumb,
      Fsdtj,
      Fqytj
    },
    data(){
      return {
        loading:false,

        map: {
          instance: null,
          zoom: 12,
          center: {
            lng: 116.404,
            lat: 39.915
          },
        },
        markerPoints:[

        ],
        wpCount:0,
        tpCount:0,
        jpCount:0,
        hpzdCount:0,
        bmMarkerStyle:{
          url: require('../../image/mark_point2.png'),
          size: {
            width: 39,
            height: 18
          },
        },
        fsdtjYData:[],
        fsdtjSeriesData:[],
        fqytjYData:[],
        fqytjSeriesData:[],
        dtData:[

        ],
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606650551241&di=8378d72dc6414bfa9a243c2e75db511a&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fauto%2Fpics%2Fhv1%2F246%2F190%2F1582%2F102918246.jpg',
      }
    },
    mounted(){
      this.getData()
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
      infoWindowClose (key) {
        this.markerPoints[key].show = false
        this.$forceUpdate()
      },
      infoWindowOpen (key) {
        this.markerPoints[key].show = true
        this.$forceUpdate()
      },
      getData(){
        API.QueryAbnormalLicensePlate().then((res)=>{

          this.wpCount =res.data.wpCount
          this.tpCount =res.data.tpCount
          this.jpCount =res.data.jpCount
          this.hpzdCount =res.data.hpzdCount

          this.map.center.lat = res.data.site[0].lat
          this.map.center.lng = res.data.site[0].lng
          this.markerPoints = res.data.site
          res.data.time.forEach((item)=>{
            this.fsdtjYData.push(item.name)
            this.fsdtjSeriesData.push(item.count)
          })
          res.data.area.forEach((item)=>{
            this.fqytjYData.push(item.name)
            this.fqytjSeriesData.push(item.count)
          })
          this.dtData = res.data.lalp.slice(0,3)
          this.src = res.data.lalp[0].imageUrl

        })
      }


    }
  }
</script>

<style scoped lang="scss">
    .page-zdjg-pzyc {
        height: calc(100% - 170px);
        overflow-y: hidden;
        overflow-x: hidden;
        .body {
            margin-top: 8px;
            width: 100%;
            height: 100%
        }
    }
    .qy-row{
        height:85%;
        position: relative;
        .col-1{
            width: 23%;
            height: 100%;
        }
        .col-2{
            width: 52%;
            margin-right: 1%;
            margin-left: 1%;
        }
        .col-3{
            width: 23%;
            height: 100%
        }
    }
    .col{

        border-radius: 4px;
        min-height: 100px;
        height: 100%;
        position: relative;
        .map{
            height: 100%;
            width:100%;
            position: relative;

        }
        .baidu-map{
            position: absolute;
            width: 98%;
            height:97%;
            padding: 1%;

        }
        .jgdt-text{

        }
        .jgdt-span{
            font-size: 8px;
            color: white;

        }
        .fsdtj{
            background: rgba(0, 115, 255, 0.2);
            height: 63%;
            margin-bottom: 2%;
        }
        .fqytj{
            background: rgba(0, 115, 255, 0.2);
            height: 35%;
        }
    }
    .bg-color{
        background: rgba(0, 115, 255, 0.2);
    }
    .bt {
        width: 64px;
        height: 36px;
        background: #045FE0;
        padding: 0;
        border: 1px solid #045FE0;
        span {
            width: 28px;
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 20px;
        }
    }
    .card {
        background: rgba(4, 95, 224, 0.3);
        border: 1px solid #00F6FF;
        height: 72px;
        .card-content{
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 24px;
        }
    }

    .dt-row {
        margin-bottom: 4px;
    }

    .bm-info-content{
        text-align: center;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #091221;
        line-height: 20px;

    }
    .dt-list{
        position: relative;
        padding: 16px 16px 16px 16px;
    }


    .col-2-row-1 {
        padding-left: 10%;
        padding-right: 10%;
        padding-top: 1%;


        .car_num{
            margin-top: 10%;
            text-align: center;
            color: #ffffff;
            font-size: 24px;
        }
        .car_info {
            text-align: center;
            color: #ffffff;
            font-size: 12px;
        }
    }
    .common_stat{
        height: 100px;
    }
    .total_car{
        background: url("../../image/total_car@1x.png") no-repeat;
        background-size: cover;
    }
    .total_dev {
        background: url("../../image/dev@1x.png") no-repeat;
        background-size: cover;
    }
    .total_warn{
        background: url("../../image/warn@1x.png") no-repeat;
        background-size: cover;
    }
    .area_total_car {
        background: url("../../image/area_total_car@1.png") no-repeat;
        background-size: cover;
    }
    .image{
        width: 80%;
        height: 90%;
    }

    .head-title {
        font-family: PingFangSC-Medium, PingFang SC;
        color: #ffffff;
        height: 25px;
        .icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            background: url('../../image/sfdtj-icon.png') no-repeat;
            background-size: cover;
        }
        display: flex;
        .content {
            line-height: 20px;
            font-size: 18px;
        }
        .more {
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            color: #00F6FF;
            cursor: pointer;
            line-height: 20px;
            margin-left: auto;
        }
    }
</style>

<style lang="scss">
    .page-zdjg-pzyc {
        .el-card__body{
            padding: 12px 16px 12px 16px;
        }

    }

</style>
