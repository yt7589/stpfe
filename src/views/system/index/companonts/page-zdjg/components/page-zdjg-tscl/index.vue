<template>
    <div class="page-zdjg-tscl">
        <el-row class="row">
            <!--<baidu-map-->
                    <!--ref="map-tscl"-->
                    <!--class="baidu-map"-->
                    <!--:dragging="false"-->
                      <!--@ready="onMapReady"-->
                      <!--:zoom="map.zoom"-->
                      <!--:center="map.center" >-->
                <!--<bm-marker class="bm-marker" :position="markerPoint" :dragging="true" @click="infoWindowOpen">-->
                    <!--<bm-info-window class="bm-info-window" :show="show" @close="infoWindowClose" @open="infoWindowOpen">-->
                        <!--<div class="bm-info-content">-->
                            <!--<p>{{markerData.desc}}</p>-->
                            <!--<p>{{markerData.card}}</p>-->
                        <!--</div>-->

                    <!--</bm-info-window>-->
                <!--</bm-marker>-->
            <!--</baidu-map>-->
                <el-col class="col-1">
                    <el-row class="col-common-left col-1-1">
                        <constitute-pie ref="pie" :s-data="cPieData"></constitute-pie>
                    </el-row>
                    <el-row class="col-common-left col-1-2">
                        <area-bar ref="bar" :x-data="cBarXData" :series-data="cBarSData"></area-bar>
                    </el-row>
                    <el-row class="col-common-left col-1-3">
                        <monitor-realtime-image :images="images"></monitor-realtime-image>
                    </el-row>
                </el-col>
                <el-col  class="col-2">
                    <el-row  class="col-2-row-1">
                        <el-col :span="6" class="common_stat total_car">
                            <div class="car_num">{{todaySvNum}}</div>
                            <div class="car_info">本日重点车辆总数</div>
                        </el-col>
                        <el-col :span="6" class="common_stat total_dev">
                            <div class="car_num">{{todayDevNum}}</div>
                            <div class="car_info">本日在线设备总数</div>
                        </el-col>
                        <el-col :span="6" class="common_stat total_warn">
                            <div class="car_num">{{todayWarnNum}}</div>
                            <div class="car_info">本日报警总数</div>
                        </el-col>
                        <el-col :span="6" class="common_stat area_total_car">
                            <div class="car_num">{{todayKakvNum}}</div>
                            <div class="car_info">重点区域重点车辆总数</div>
                        </el-col>

                    </el-row>
                    <el-row class="col-2-row-2" @click.stop.prevent>

                    </el-row>
                    <el-row class="col-2-row-3">
                      <el-table class="col-2-row-3-table" :data="tableData" v-loading="loading" :header-row-style="{padding:'0px'}" :cell-style="{padding:'0px'}">
                          <el-table-column type="index" :index="indexMethod"  align="center" label="序号" width="90"></el-table-column>
                          <el-table-column prop="hphm"  align="center" label="车牌号"></el-table-column>
                          <el-table-column prop="ppcx"  align="center" label="车辆品牌" ></el-table-column>
                          <el-table-column prop="trafficViolationTypeName"  align="center" label="违法预警" ></el-table-column>
                          <el-table-column prop="siteName"  align="center" label="点位" ></el-table-column>
                          <el-table-column prop="shotTime"  align="center" label="拍摄时间" ></el-table-column>
                      </el-table>
                    </el-row>
                </el-col>
                <el-col  class="col-3">
                    <el-row class="col-common-right col-3-1">
                        <constitute-line ref="line" :x-data="LxData" :line-data="LineData" :line-data2="Line2Data" ></constitute-line>
                    </el-row>
                    <el-row class="col-common-right col-3-2">
                        <point-bar :x-data="pBarXData" :series-data="pBarSData"></point-bar>
                    </el-row>
                    <el-row class="col-common-right col-3-3">
                        <violation-realtime-image :images="images2"></violation-realtime-image>
                    </el-row>
                </el-col>
        </el-row>
    </div>
</template>

<script>
  import mapStyle from '@/assets/baiduMapStyle'
  import ConstitutePie from './components/constitute_pie'
  import ConstituteLine from './components/constitute_line'
  import AreaBar from './components/area_bar'
  import PointBar from './components/point_bar'
  import MonitorRealtimeImage from './components/monitor_realtime_image'
  import ViolationRealtimeImage from './components/violation_realtime_image'
  import API from '@/api'
  export default {
    name: 'page-zdjg-tscl',
    components:{
      ConstitutePie,
      ConstituteLine,
      AreaBar,
      PointBar,
      MonitorRealtimeImage,
      ViolationRealtimeImage
    },
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
        loading:false,
        tableData: [],
        markerPoint: {
          lng: 116.404,
          lat: 39.915
        },
        show: true,
        markerData:{
          desc:"海淀区上地8街12号",
          card:"京A12345累计"
        },
        //重点监控车辆车型构成
        cPieData:[],
        //本日重点监控车辆区域分布图
        cBarXData:[],
        cBarSData:[],
        //本日重点监控车辆实时图片
        images:[],
        //各个车辆总数
        todaySvNum:0,
        todayDevNum:0,
        todayWarnNum:0,
        todayKakvNum:0,

        //本日重点监控车辆小时分布图
        LxData:[],
        LineData:{},
        Line2Data:{},

        //本日重点监控车辆点位分布图
        pBarXData:[],
        pBarSData:[],

        //本日重点监控车辆违法实时图片
        images2:[],
      }
    },
    mounted(){
      this.infoWindowOpen()
      this.getData()
    },
    methods:{
      onMapReady ({BMap, map}) {
        this.map.instance = map
        this.initMap()
        this.infoWindowOpen()

      },

      initMap () {
        this.map.instance.setMapStyleV2(mapStyle)
        this.$nextTick(() => {
            this.infoWindowOpen()
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
        console.log("open")
        this.show = true
      },

      getData(){
        API.GetSpecialVehicleList().then((res) => {
          res.data.ksvmcs.forEach((item,idx)=>{
            let tmp =  {}
            tmp.value = item.count
            tmp.name = item.name
            this.cPieData.push(tmp)
          })

          res.data.ksvads.forEach((item)=>{
            this.cBarXData.push(item.name)
            this.cBarSData.push(item.count)
          })

          res.data.ksvrps.forEach((item)=>{
            this.images.push(item.imgUrl)
          })

          this.todaySvNum = res.data.htfs.todaySvNum
          this.todayDevNum = res.data.htfs.todayDevNum
          this.todayWarnNum = res.data.htfs.todayWarnNum
          this.todayKakvNum = res.data.htfs.todayKakvNum

          this.tableData = res.data.svtvs.slice(0,5)

          res.data.ksvsss.forEach((item)=>{
            this.pBarXData.push(item.siteName)
            this.pBarSData.push(item.count)
          })

          res.data.ksvtvrps.forEach((item)=>{
            this.images2.push(item.imageUrl)
          })

          let line1 = res.data.ksvtitfs[0]
          let line2 = res.data.ksvtitfs[1]
          let line1Name = line1.vtName
          let line2Name = line2.vtName
          this.LineData.name = line1Name
          this.LineData.data = []
          this.Line2Data.name = line2Name
          this.Line2Data.data = []
          line1.titfs.forEach((item)=>{
            this.LineData.data.push(item.count)
            this.LxData.push(item.name)
          })
          line2.titfs.forEach((item)=>{
            this.Line2Data.data.push(item.count)
          })


        })
      },
      indexMethod(index) {
        return index + 1;
      }

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
            //margin-top: 1%;
        }
        .baidu-map{
            height: 100%;
            width: 100%;
            position: absolute;
        }

        .col-1{
            width: 27%;
            height: 100%;
            .col-1-1, .col-1-2, .col-1-3{
                margin-bottom: 1%;
            }

        }
        .col-2{
            width: 46%;
            height: 100%;
            position: relative;
            .col-2-row-1 {
                margin-left: 3.33%;
                margin-right: 3.33%;
                margin-top: 1.39%;

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
            .col-2-row-3 {
                position: absolute;
                width: 100%;
                bottom: 3%;
                height: 180px;
            }

        }
        .col-common-left {
            width: 100%;
            height: 32%;
            background: url("../../image/col-1-1.png") no-repeat;
            background-size: 100% 98%;
        }
        .col-common-right {
            width: 100%;
            height: 32%;
            background: url("../../image/col-2-1.png") no-repeat;
            background-size: 100% 98%;
        }
        .col-3 {
            width: 27%;
            height: 100%;
            .col-3-1, .col-3-2, .col-3-3{
                margin-bottom: 1%;
            }
        }

        .col-2-row-3-table{
            width: 100%;
            background: url("../../image/tscl_table@1x.png") no-repeat;
            background-size: 100% 100%;
            min-height: 180px;
        }
        .col-2-row-3-table  .el-table__header th,.el-table__header tr,.el-table__row{
            background-color:transparent !important;
            border-color:transparent !important;
            border-bottom: none !important;
            color: #ffffff;
            font-size: 12px;
        }
        .col-2-row-3-table  tr:hover>td {
            background-color:transparent !important;
        }
        .col-2-row-3-table tr{
            border-bottom: none !important;
        }
        .el-table--border:after,.el-table--group:after,.el-table:before {
            background-color: transparent;
        }
        .el-table td,.el-table th.is-leaf {

            border-bottom: none !important;

        }
    }

</style>
