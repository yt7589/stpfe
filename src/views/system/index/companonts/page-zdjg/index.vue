<template>
    <div class="page-zdjg">
        <div class="menu-bg"  :class="[curPage.label=='特殊车辆监管'?'menu-hight':'']"></div>
        <baidu-map
                v-if="curPage.label=='特殊车辆监管'"
                ref="map-tscl"
                class="baidu-map-tscl-home"
                :dragging="false"
                @ready="onMapReady"
                @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom"
                :zoom="map.zoom"
                :center="map.center" >

            <div v-for="(it,idx) in mps" :key="idx">
            <bm-marker  :icon="bmMarkerStyle" class="bm-marker-home" :position="it.markerPoint" :dragging="true" @click="infoWindowOpen(idx)">
                <bm-info-window class="bm-info-window-home" :position="it.markerPoint" :show="it.show" @close="infoWindowClose(idx)" @open="infoWindowOpen(idx)">
                    <div class="bm-info-content-home">
                        <div class="bm-w-image">
                            <el-image class="bm-w-img"  :src="it.imageUrl"></el-image>
                        </div>
                        <div class="bm-w-content">
                           <div class="bm-w-content-title">{{it.violationTypeName}}</div>
                            <div>
                                <div>点位名称：{{it.siteName}}</div>
                                <div>车牌号：{{it.hphm}}</div>
                                <div>车辆品牌：{{it.clpp}}</div>
                                <div>发送时：{{it.occurTime}}</div>
                            </div>
                        </div>

                    </div>

                </bm-info-window>
            </bm-marker>
            </div>
        </baidu-map>
        <div class="custom-menu-box">
        <span class="menu" v-for="(option,index) in pageOptions" :key="index"
            :class="curPage===option?'is-active':''"  @click="tsclCli(option)" >{{option.label}}</span>
        </div>
        <page-zdjg-qyjg  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='区域监管'" class="custom-main-content"></page-zdjg-qyjg>
        <page-zdjg-ldjg  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='路段监管'" class="custom-main-content"></page-zdjg-ldjg>
        <page-zdjg-clbk  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='车辆布控'" class="custom-main-content"></page-zdjg-clbk>
        <page-zdjg-pzyc  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='牌照异常'" class="custom-main-content"></page-zdjg-pzyc>
        <page-zdjg-tscl   v-if="curPage.label=='特殊车辆监管'" class="custom-main-content"></page-zdjg-tscl>
    </div>

</template>

<script>
    import './common.scss'
    import mapStyle from '@/assets/baiduMapStyle'
  import PageZdjgQyjg from './components/page-zdjg-qyjg'
  import PageZdjgLdjg from './components/page-zdjg-ldjg'
  import PageZdjgClbk from './components/page-zdjg-clbk'
  import PageZdjgTscl from './components/page-zdjg-tscl'
  import PageZdjgPzyc from './components/page-zdjg-pzyc'
    import API from '@/api'
  export default {
    components: {
      PageZdjgQyjg,
      PageZdjgLdjg,
      PageZdjgClbk,
      PageZdjgTscl,
      PageZdjgPzyc
    },
    data(){
      return {
        curPage: {},
        firstItem:"重点监管",
        pageOptions: [
          {label: '区域监管'},
          {label: '路段监管'},
          {label: '车辆布控'},
          {label: '特殊车辆监管'},
          {label: '牌照异常'},
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
        mps:[
          {
            markerPoint: {
              lng: 116.404,
              lat: 39.915
            },
            show: true,
            imageUrl:'',
            hphm:'',
            siteName:'',
            violationTypeName:'',
            clpp:'',
            occurTime:'',
          },
        ],

        bmMarkerStyle:{
          url: require('./image/bmifno.png'),
          size: {
            width: 114,
            height: 120
          },
        },
      }
    },
    watch:{
      curPage:{
        deep: true,
        handler(val) {
          if(val.label=='特殊车辆监管'){
            //this.initMap()

          }
        }
      }
    },
    mounted(){
      this.curPage = this.pageOptions[0]
      this.getTsclData()
    },
    methods: {
      onMapReady ({BMap, map}) {
        this.map.instance = map
        this.initMap()
        console.log('init map')
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
      infoWindowClose (idx) {
        console.log("idx")
        console.log(idx)
        this.show = false
        //this.mps[idx].show = false

      },
      infoWindowOpen (idx) {
        this.show = true
        //this.mps[idx].show = true
      },
      tsclCli(val){
        this.curPage = val

      },
      getTsclData(){
        API.GetSpecialVehicleList().then((res) => {
          let ltvi = res.data.ltvi

          this.mps[0].markerPoint.lat = ltvi.lat
          this.mps[0].markerPoint.lng = ltvi.lng
          this.map.center.lat = ltvi.lat
          this.map.center.lng = ltvi.lng
          this.mps[0].show = true
          this.mps[0].clpp = ltvi.clpp
          this.mps[0].imageUrl = ltvi.imageUrl
          this.mps[0].clpp = ltvi.clpp
          this.mps[0].violationTypeName = ltvi.violationTypeName
          this.mps[0].hphm = ltvi.hphm
          this.mps[0].siteName = ltvi.siteName
          this.mps[0].occurTime = ltvi.occurTime

          // res.data.emphasisVehicleViolationList.forEach((item,idx)=>{
          //   let show = false
          //   let lat = 116.404 //item.lat
          //   let lng = 39.915//item.lng
          //   if(idx==0){
          //     show = true
          //   }
          //   this.map.center.lat = lat
          //   this.map.center.lng = lng
          //   let tmp = {
          //     point:{
          //       lat:'',
          //       lng:''
          //     }
          //   }
          //   tmp.point.lat = lat
          //   tmp.point.lng = lng
          //   tmp.trafficViolationTime = item.trafficViolationTime
          //   tmp.vehiclePlate = item.vehiclePlate
          //   tmp.siteName = item.siteName
          //   tmp.imgUrl = item.imgUrl
          //   tmp.vehicleType = item.vehicleType
          //   tmp.violationTypeName = item.violationTypeName
          //   tmp.show = show
          //   this.markerPoints.push(tmp)
          // })
        })
      },

    }
  }
</script>

<style lang="scss">
    .page-zdjg {
        position: relative;
        width: 100%;
        height: 100%;
        .menu-bg {
            width: 100%;
            position: absolute;
            background: url(./image/header-mask.png) no-repeat;
            height: 200px;
            top: 0px;
            z-index: 1;
            background-size: 100% 85%;
            -moz-background-size: 100% 85%;
        }
        .menu-hight {
            // height: 200px;
        }
        .baidu-map-tscl-home{
            height: 100%;
            width: 100%;
            position: absolute;
            //z-index: 2;
            .BMap_bottom {
                display: none;
            }
            .BMap_pop {
                > div,
                > img:nth-child(10) {
                    display: none;
                    overflow: unset;
                }
                > div:nth-child(9) {
                    display: block;
                    overflow: unset;
                    width: 340px !important;
                    left: -178px !important;

                }
                > div:nth-child(8){
                    /*display: block;*/
                }
                .BMap_top {
                    display: none;
                }
                .BMap_center {
                    background: transparent;
                    border: none;
                    position: sticky !important;
                    height: 100%;
                }
            }

            .BMap_bubble_content{
                width: 320px !important;
                height: 143px !important;
                background: rgba(209, 73, 78, 0.2);
                border-radius: 4px;
                .bm-info-content-home{
                    color: #ffffff;
                    margin:0 auto;
                    .bm-w-image {
                        float: left;
                        width: 31%;
                        height: 143px;
                        .bm-w-img {
                            padding: 4%;
                            width: 100%;
                            height: 94%;
                        }
                    }
                    .bm-w-content{
                        float: left;
                        width: 63%;
                        height:94%;
                        padding-top: 4%;
                        padding-left: 6%;
                        font-size: 12px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        line-height: 17px;
                        .bm-w-content-title{
                            font-size: 14px;
                            font-weight: 500;
                            color: #D1494E;
                            margin-bottom: 16px;
                        }
                    }

                }
            }
        }





    }

</style>
