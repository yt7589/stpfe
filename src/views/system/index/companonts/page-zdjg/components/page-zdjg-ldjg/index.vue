<template>
    <div class="page-zdjg-ldgj" >
        <header-crumb :first-item="firstItem" :second-item="secondItem"></header-crumb>
        <div style="margin-top: 4px; width: 100%;height: 100%">
            <el-row class="qy-row" >
                <el-col :span="5" class="col" style="width: 23%;">
                    <div style="padding: 16px; position: relative;display: flex;">
                        <el-input placeholder="路段名称" class="search-input"></el-input>
                        <button class="search-button"><span>搜索</span></button>
                        <button class="create-button" @click="addArea"><span>添加</span></button>
                    </div>
                    <div>
                        <el-main v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
                            <el-table class="custom-table" :data="tableData">
                                <el-table-column align="center" prop="area_name" label="路段名称" minWidth="150"></el-table-column>
                                <el-table-column align="center" prop="" label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="mini">修改</el-button>
                                        <el-button type="text" size="mini">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-main>
                        <div  class="button-page-group">
                            <el-button class="button-page" size="mini" ><i class="el-icon-arrow-up" style="float: left"></i>上一页</el-button>
                            <el-button class="button-page" size="mini" ><i class="el-icon-arrow-down" style="float: right"></i> 下一页</el-button>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12" class="col" style="width: 52%;margin-right: 1%;margin-left: 1%;">
                    <div  style="bottom: 10px;height: 100%;" class="map">
                        <baidu-map  ref="map-qyjg" class="baidu-map-qyjg" :zoom="map.zoom"
                                    :center="map.center" :dragging="true"
                                    @ready="onMapReady" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom"
                                    :scroll-wheel-zoom="true">
                            <bm-marker :position="markerPoint" :dragging="true" @click="infoWindowOpen">
                                <bm-info-window  :show="show" @close="infoWindowClose" @open="infoWindowOpen">
                                    <div class="bm-info-content">
                                        <p>{{markerData.desc}}</p>
                                        <p>{{markerData.card}}</p>
                                    </div>

                                </bm-info-window>
                            </bm-marker>
                        </baidu-map>
                    </div>
                </el-col >
                <el-col :span="5" class="col" style="width: 23%">
                    <div style="padding: 16px; position: relative;">
                        <el-row>
                            <el-col :span="3">  <el-avatar  :src="require('../../image/dt@1x.png')"></el-avatar></el-col>
                            <el-col :span="6" class="jgdt-text">  <span class="jgdt-span">监管动态</span></el-col>
                        </el-row>
                    </div>
                    <div class="dt-list" style="position: relative;padding: 0 16px 0 16px;">
                        <el-row :gutter="2">
                            <el-col :span="12">
                                <el-input placeholder="请输入地区名称" class="search-input"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-button class="bt"><span>搜索</span></el-button>
                            </el-col>
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
                                        <div>{{item.num}}</div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>

                    </div>
                </el-col>
            </el-row>
        </div>

        <el-dialog
                title="添加路段"
                :visible.sync="dialogVisible"
                width="366px"
                height = "200px"
                >
            <el-form ref="dialogForm" :model="dialogData" label-width="56px">
                <el-form-item label="路段名称">
                    <el-input v-model="dialogData.area"name="area" width="266" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import mapStyle from '@/assets/baiduMapStyle'
  import HeaderCrumb from '../common/header-crumb'
  export default {
    name: 'page-zdjg-ldgj',
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
      HeaderCrumb
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
          }, {
            area:"海淀区12号",
            time:'11:11:11',
            card:"京A11111",
            num:"累计出现11次",
          }
        ],
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
        this.show = true
      },
      addArea(){
        this.dialogVisible = true
      }


    }
  }
</script>

<style scoped lang="scss">
    .page-zdjg-ldgj {
        height: calc(100% - 170px);
        overflow-y: hidden;

    }
    .qy-row{
        height:85%;
        position: relative;
    }
    .col{
        background: rgba(0, 115, 255, 0.2);
        border-radius: 4px;
        min-height: 100px;
        height: 100%;
        position: relative;
        .map{
            position: relative;
            height:100%;
        }
        .baidu-map-qyjg{
            position: absolute;
            width: 100%;
            height:100%;
            margin-top: 16px;
            //min-height: 100px;

        }
        .jgdt-text{

        }
        .jgdt-span{
            font-size: 8px;
            color: white;

        }
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
        padding: 16px 16px 0 16px;
    }
</style>

<style lang="scss">
    .page-zdjg-ldgj{
        .el-card__body{
            padding: 12px 16px 12px 16px;
        }
        .el-dialog__header{
            background: #00F6FF;
            text-align: center;
            border-radius: 4px;
            border: 1px solid #0073FF;
        }
        .el-dialog{

            background: #001537;
            border-radius: 4px;
            border: 1px solid #0073FF;
        }
        .el-dialog__title {
            width: 108px;
            height: 25px;
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #001537;
            line-height: 25px;

        }
        .el-dialog__wrapper{
            position: fixed;
            top: 7%;
            right: 0;
            bottom: 0;
            left: -22%;
            overflow: auto;
            margin: 0;
        }
        .el-dialog__body{

        }
        .el-dialog__footer{

        }
        .el-form-item__label{
            font-weight: 400;
            color: #FFFFFF;

        }
    }

</style>
