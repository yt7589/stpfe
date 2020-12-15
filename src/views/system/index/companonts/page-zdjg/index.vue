<template>
    <div class="page-zdjg">
        <div class="menu-bg"></div>
        <baidu-map
                v-if="curPage.label=='特殊车辆监管'"
                ref="map-tscl"
                class="baidu-map"
                :dragging="false"
                @ready="onMapReady"
                :zoom="map.zoom"
                :center="map.center" >
            <bm-marker :icon="bmMarkerStyle" class="bm-marker" :position="markerPoint" :dragging="true" @click="infoWindowOpen">
                <bm-info-window class="bm-info-window" :show="show" @close="infoWindowClose" @open="infoWindowOpen">
                    <div class="bm-info-content">
                        <p>{{markerData.desc}}</p>
                        <p>{{markerData.card}}</p>
                    </div>

                </bm-info-window>
            </bm-marker>
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
        show: true,
        markerData:{
          desc:"海淀区上地8街12号",
          card:"京A12345累计"
        },
        bmMarkerStyle:{
          url: require('./image/mark_point3.png'),
          size: {
            width: 65,
            height: 66
          },
        },
      }
    },
    mounted(){
      this.curPage = this.pageOptions[0]
    },
    methods: {
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
        this.show = true
      },
      tsclCli(val){
        this.curPage = val


      }
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
            height: 163px;
            position: absolute;

            z-index: 1;
            background: url("./image/menu-bg.png") no-repeat;
        }
        .baidu-map{
            height: 100%;
            width: 100%;
            position: absolute;
        }
    }

</style>
