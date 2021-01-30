<template>
    <div class="page-jtyc-xcyc">
        <header-crumb :first-item="firstItem" :second-item="secondItem"></header-crumb>
        <div class="body">
            <el-row class="row">
                <el-col class="col-1">
                    <el-row class="col-1-row col-1-row-1">
                        <div class="date-time-select">
                            <el-form :model="form" label-position="right" label-width="20%">
                                <el-form-item label="预测时间">
                                    <el-date-picker
                                            align="right"
                                            type="daterange"
                                            format="yyyy-MM-dd"
                                            value-format="yyyy-MM-dd"
                                            v-model="form.date"
                                            :clearable="false"
                                            range-separator="-"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            style="width: 100%;">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="车牌号码">
                                    <el-input v-model="form.hphm"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button class="btn"  @click="getData">回收</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-row>
                </el-col>
                <el-col class="col-2">
                    <div class="map">
                        <baidu-map  class="baidu-map" :zoom="map.zoom"
                                    :center="map.center" :dragging="true"
                                    @ready="onMapReady" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom"
                                    :scroll-wheel-zoom="true">
                            <div v-for="(item,index) in markerPoints" :key="index">
                                <bm-marker v-if="index===0" :icon="bmMarkerStyleStart"  :position="{lat:item.lat,lng:item.lng}" :dragging="true" >

                                </bm-marker>
                                <bm-marker v-else-if="index===markerPointsCount" :icon="bmMarkerStyleEnd"  :position="{lat:item.lat,lng:item.lng}" :dragging="true" >
                                </bm-marker>
                                <bm-marker v-else :icon="bmMarkerStyleIng"  :position="{lat:item.lat,lng:item.lng}" :dragging="true" >
                                </bm-marker>
                            </div>
                        </baidu-map>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
  import HeaderCrumb from '@components/custom/header-crumb'
  import mapStyle from '@/assets/baiduMapStyle'
  import API from '@/api'
  export default {
    name: 'jtyc-xcyc',
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
    },
    data(){
      let st = new Date().toLocaleDateString().split('/').join('-')
      let et = st
      return {
        form:{
          date:[st,et],
          hphm:'',
        },
        map: {
          instance: null,
          zoom: 10,
          center: {
            lng: 116.404,
            lat: 39.915
          },
        },
        markerPoints:[

        ],
        markerPointsCount:0,
        bmMarkerStyleStart:{
          url: require('../../image/xcyc-mark-start.png'),
          size: {
            width: 39,
            height: 42
          },
        },
        bmMarkerStyleIng:{
          url: require('../../image/xcyc-mark-ing.png'),
          size: {
            width: 39,
            height: 42
          },
        },
        bmMarkerStyleEnd:{
          url: require('../../image/xcyc-mark-end.png'),
          size: {
            width: 39,
            height: 42
          },
        },
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
      getData(){
        let frm = {
          hphm:this.form.hphm,
          startTime:this.form.date[0],
          endTime:this.form.date[1],
        }

        API.QueryTrafficPrognosis(frm).then((res) => {
          this.map.center.lat = res.data.tfps[0].lat
          this.map.center.lng = res.data.tfps[0].lng
          this.markerPoints = res.data.tfps
            this.markerPointsCount = res.data.tfps.length - 1

        })
      },



    }


  }
</script>

<style scoped lang="scss">
    .page-jtyc-xcyc{
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
                        height: 35%;
                        border-radius: 4px;
                        margin-bottom: 2%;
                        .date-time-select {
                            padding-top: 34px;
                        }
                    }
                    .btn{
                        color: #ffffff;
                        width: 85%;
                        height: 36px;
                        background: #045FE0;
                        border-radius: 4px;
                        border:none;
                        font-size: 14px;
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
    .page-jtyc-xcyc{
        .anchorBL{
            display: none;
        }
        .el-date-editor .el-range__icon{
            position: absolute;
            right: 16px;
        }
        .el-input__inner {
            padding: 11px;
            background: rgba(4, 95, 224, 0.5);
            border-radius: 4px;
            border: 1px solid #045FE0;
            color: white;
            width: 85% !important;
            position: relative !important;
        }
        .el-range-input{
            background: none;
            color: white;
        }
        .el-range-separator{
            color: white;
            line-height: 14px;
        }
        .el-form-item__label{
            font-size: 14px;
            color: #ffffff;
        }
    }

</style>
