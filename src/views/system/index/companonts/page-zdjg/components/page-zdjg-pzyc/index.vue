<template>
    <div class="page-zdjg-pzyc" >
        <header-crumb :first-item="firstItem" :second-item="secondItem"></header-crumb>
        <div  class="body">
            <el-row class="qy-row" >
                <el-col :span="5" class="col col-1">
                    <el-row class="fsdtj" >
                        <fsdtj id="fsdtj"></fsdtj>
                    </el-row>
                    <el-row class="fqytj">
                        <fqytj id="fqytj"></fqytj>
                    </el-row>
                </el-col>
                <el-col :span="12" class="col bg-color col-2">
                    <div  class="map">
                        <baidu-map  ref="map-qyjg" class="baidu-map" :zoom="map.zoom"
                                    :center="map.center" :dragging="false"
                                    @ready="onMapReady" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom"
                                    :scroll-wheel-zoom="true">
                            <bm-marker :icon="bmMarkerStyle" :position="markerPoint" :dragging="true" @click="infoWindowOpen">
                                <bm-info-window  :show="show" @close="infoWindowClose" @open="infoWindowOpen">
                                    <div class="bm-info-content">
                                        <p>{{markerData.desc}}</p>
                                        <p>{{markerData.card}}</p>
                                    </div>

                                </bm-info-window>
                            </bm-marker>
                        </baidu-map>
                        <el-row  class="col-2-row-1">
                            <el-col :span="6" class="common_stat total_car">
                                <div class="car_num">12345</div>
                                <div class="car_info">今日无牌过车数量</div>
                            </el-col>
                            <el-col :span="6" class="common_stat total_dev">
                                <div class="car_num">12345</div>
                                <div class="car_info">今日套牌车过车数量</div>
                            </el-col>
                            <el-col :span="6" class="common_stat total_warn">
                                <div class="car_num">12345</div>
                                <div class="car_info">今日假牌车过车数量</div>
                            </el-col>
                            <el-col :span="6" class="common_stat area_total_car">
                                <div class="car_num">12345</div>
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
                                            <div>{{item.area}}</div>
                                            <div>{{item.time}}</div>
                                        </div>
                                        <div class="card-content">
                                            <div> <span style="color: #00F6FF">{{item.card}}</span></div>

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
        tableData:[
          {
            area_name:"海淀区上地8街12号"
          }
        ],
        map: {
          instance: null,
          zoom: 12,
          center: {
            lng: 116.404,
            lat: 39.915
          },
        },
        markerPoint: {
          lng: 116.404,
          lat: 39.915
        },
        markerData:{
          desc:"海淀区上地8街12号",
          card:"京A12345累计"
        },
        bmMarkerStyle:{
          url: require('../../image/mark_point2.png'),
          size: {
            width: 39,
            height: 18
          },
        },
        show: true,
        dialogVisible:false,
        dialogData:{
          area:"",
        },
        dtData:[
          {
            area:"海淀区12号",
            time:'11:11:11',
            card:"京A11111",
            num:"累计出现11次",
          }, {
            area:"海淀区12号",
            time:'11:11:11',
            card:"京A11111",
            num:"累计出现11次",
          },
        ],
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606650551241&di=8378d72dc6414bfa9a243c2e75db511a&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fauto%2Fpics%2Fhv1%2F246%2F190%2F1582%2F102918246.jpg',
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
      infoWindowClose () {
        this.show = false
      },
      infoWindowOpen () {

      },
      addArea(){
        this.dialogVisible = true
      }


    }
  }
</script>

<style scoped lang="scss">
    .page-zdjg-pzyc {
        height: calc(100% - 170px);
        overflow-y: hidden;
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
