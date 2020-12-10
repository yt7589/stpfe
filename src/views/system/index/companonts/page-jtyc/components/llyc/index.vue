<template>
    <div class="page-jtyc-llyc">
        <header-crumb :first-item="firstItem" :second-item="secondItem"></header-crumb>
        <div class="body">
            <el-row class="row">
                <el-col class="col-1">
                    <el-row class="col-1-row col-1-row-1">
                        <div class="date-time-select">
                            <el-form :model="form" label-width="80px">
                                <el-form-item label="选择日期">
                                    <el-date-picker
                                        align="right"
                                        type="date"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                        v-model="form.date"
                                        :clearable="false"
                                        placeholder="选择日期"
                                        style="width: 100%;">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="选择时间">
                                    <el-time-picker
                                        v-model="form.time"
                                        :clearable="false"
                                        placeholder="选择时间"
                                        format="HH:mm"
                                        value-format="HH:mm"
                                        style="width: 100%;">
                                    </el-time-picker>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-row>
                    <el-row class="col-1-row col-1-row-2">
                        <div class="col-1-row-2-content">
                            <div>预计本时段全市车流量</div>
                            <div>123456</div>
                        </div>
                    </el-row>
                    <el-row class="col-1-row col-1-row-3">
                        <llyc-chart ref="llyc-chart"></llyc-chart>
                    </el-row>
                </el-col>
                <el-col class="col-2">
                    <div class="map">
                        <baidu-map  class="baidu-map" :zoom="map.zoom"
                                    :center="map.center" :dragging="false"
                                    @ready="onMapReady" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom"
                                    :scroll-wheel-zoom="true">
                            <bm-marker  :position="markerPoint" :dragging="true">

                            </bm-marker>
                        </baidu-map>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
  import mapStyle from '@/assets/baiduMapStyle'
  import HeaderCrumb from '@components/custom/header-crumb'
  import LlycChart from './charts'
  export default {
    name: 'jtyc-llyc',
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
      LlycChart
    },
    data(){
      return {
        form:{
          date:'2020-12-10',
          time:'00:00',
        },
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
          //url: require('../../image/mark_point2.png'),
          // size: {
          //   width: 39,
          //   height: 18
          // },
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

<style scoped lang="scss">
    .page-jtyc-llyc{
        height: calc(100% - 170px);
        overflow-y: hidden;
        .body {
            margin-top: 8px;
            width: 100%;
            height: 100%;
            .row{
                height:85%;
                position: relative;
                .col-1{
                    border-radius: 4px;

                    width: 23%;
                    height: 100%;
                    margin-right: 1%;
                    .col-1-row{
                        width: 100%;
                    }
                    .col-1-row-1{
                        width: 100%;
                        background: rgba(0, 115, 255, 0.2);
                        height: 27%;
                        border-radius: 4px;
                        margin-bottom: 2%;
                        .date-time-select {
                            padding-top: 34px;

                        }
                    }
                    .col-1-row-2 {
                        border-radius: 4px;
                        width: 100%;
                        background: rgba(4, 95, 224, 1);
                        height: 15%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-bottom: 2%;
                        .col-1-row-2-content{
                           text-align: center;
                            > div:first-child{
                                font-size: 18px;
                                color: #ffffff;
                            }
                            > div:nth-child(2){
                                font-size: 30px;
                                color: #ffffff;
                            }
                        }
                    }

                    .col-1-row-3{
                        width: 100%;
                        background: rgba(0, 115, 255, 0.2);
                        height: 55.8%;
                        border-radius: 4px;
                    }
                }
                .col-2{
                    border-radius: 4px;
                    background: rgba(0, 115, 255, 0.2);
                    width: 76%;
                    height: 100%;
                    .map{
                        height: 100%;
                        width:100%;
                        position: relative;

                    }
                    .baidu-map{
                        position: absolute;
                        width: 98%;
                        height:96%;
                        padding: 1%;

                    }
                }
            }
        }
    }

</style>
<style lang="scss">
    .page-jtyc-llyc{
        .anchorBL{
            display: none;
        }
        .el-input__prefix{
            right: 10px;
        }
        .el-input__inner {
            padding: 11px;
            background: rgba(4, 95, 224, 0.5);
            border-radius: 4px;
            border: 1px solid #045FE0;
            color: white;
            width: 190px;
        }
        .el-form-item__label{
            font-size: 14px;
            color: #ffffff;
        }
    }

</style>
