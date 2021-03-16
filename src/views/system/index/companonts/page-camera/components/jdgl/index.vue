<template>
    <div class="page-sbgl-jdgl"  flex="dir:top">
        <header-crumb :first-item="firstItem" :second-item="secondItem"></header-crumb>
        <div flex-box="1" class="body">
            <div class="column-1">
                <el-form class="search-form">
                    <el-form-item>
                        <el-input placeholder="节点名称" v-model="frm.nodeName">

                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select style="width:100%" v-model="frm.nodeAddr" placeholder="节点位置">
                          <el-option
                                  v-for="item in nodeAddrOptions"
                                  :key="item.siteAddrId"
                                  :label="item.siteAddrName"
                                  :value="item.siteAddrId">
                          </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button class="button-search" @click="getList">
                            搜索
                            <el-image :src="require('../../image/image-search.png')"></el-image>
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="button-export" @click="handleAdd">
                            添加
                            <el-image :src="require('../../image/image-add.png')"></el-image>
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="column-2">
                <el-container class="table-container">
                    <el-main v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
                        <el-table class="custom-table wzgl-table" :data="tableData" height="100%">
                            <el-table-column align="center" prop="cityName" label="城市" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="nodeName" label="节点名称" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="nodeAddr" label="节点位置" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="lng" label="经度" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="lat" label="纬度" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="" label="操作" minWidth="60">
                                <template slot-scope="scope">
                                    <el-button type="text" size="mini" @click="handleEdit(scope.row)">修改</el-button>
                                    <el-button type="text" size="mini" @click="handleDel(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-main>
                    <el-footer>
                        <el-pagination
                                class="custom-pagination zq-pagination"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :page.sync="frm.page"
                                :page-sizes="[20, 50, 100, 200]"
                                :page-size="frm.pageSize"
                                layout="total,prev, pager, next,sizes,jumper"
                                :total="total">
                        </el-pagination>
                    </el-footer>
                </el-container>
            </div>
        </div>
        <el-dialog
                :title="dialogTitle"
                :visible.sync="dialogVisible"
        >
            <el-form ref="dialogForm" :model="dialogData"  :rules="rules">
                <el-form-item label="节点名称" prop="nodeName" label-width="25%">
                    <el-input v-model="dialogData.nodeName" />
                </el-form-item>
                <el-form-item label="节点位置" prop="nodeAddr" label-width="25%">
                    <el-select v-model="dialogData.nodeAddr" placeholder="请选择">
                        <el-option
                                v-for="item in nodeAddrOptions"
                                :key="item.siteAddrId"
                                :label="item.siteAddrName"
                                :value="item.siteAddrId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="经纬度" prop="lng" label-width="25%">
                    <el-input  :disabled="true" value="去选择" @click.native="selectMap"/>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                class="confirm"
                title="提示"
                :visible.sync="dialogVisibleConfirm"

        >
            <div>确定要删除吗？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleConfirm = false">取 消</el-button>
                <el-button type="primary" @click="del">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="dialogTitle" :visible.sync="mapVisible"   id="mapDialog" :close-on-click-modal="false" class="loction-dialog">
            <baidu-map  class="map"  :center="map.center" :zoom="map.zoom"  @ready="handler"
                        :scroll-wheel-zoom="true"
                        @click="clickEvent"
                        ak="33B192o1jPaqOHASGGAIkoMuwi8W76j3">

                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

                <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>

                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"  :showAddressBar="true" :autoLocation="true" @locationSuccess="getLoctionSuccess" ></bm-geolocation>

                <bm-view :style="{width:'100%',height: this.clientHeight+'px',flex: 1,marginBottom:'-30px'}"></bm-view>
            </baidu-map>

            <div slot="footer" class="dialog-footer">
                <el-button   size="small" @click.native="mapVisible = false">取消</el-button>
                <el-button type="primary" size="small" @click.native="mapVisible = false" >保存</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
  import HeaderCrumb from '@components/custom/header-crumb'
  import mapStyle from '@/assets/baiduMapStyle'
  import API from '@/api'

  export default {
    name: 'sbgl-jdgl',
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
      return {
        loading: false,
        frm:{
          pageSize:20,
          page:1,
          nodeName:'',
          nodeAddr:'',
        },
        tableData:[],
        total:0,
        delId:0,
        dialogVisibleConfirm:false,
        dialogTitle:'',
        dialogVisible:false,
        mapVisible:false,
        dialogData:{
          nodeName:"",
          nodeAddr:"",
          lng: '',
          lat: '',
        },
        rules:{
          nodeName: [
              {required: true, message: '请输入节点名称', trigger: 'blur'},
          ],
          nodeAddr: [
              {required: true, message: '请选择节点位置', trigger: 'blur'},
          ],
          lng: [
              {required: true, message: '请选择经纬度', trigger: 'blur'},
          ]
        },
        nodeAddrOptions:[],
        map: {
          instance: null,
          zoom: 12,
          center: {
            lng: 116.404,
            lat: 39.915
          },
        },
        saveType:'',
        locData:{
          longitude:'',
          latitude:'',
          address:'',
        },
        clientHeight:document.documentElement.clientHeight-650, // 屏幕高度
      }
    },
    mounted(){
      this.getList()
      this.querySiteAddr()
    },
    methods: {
      querySiteAddr(){
        API.querySiteAddr().then((res)=>{
          this.nodeAddrOptions = res.data.recs
        })
      },
      handleSizeChange(size){
        this.frm.page = 1
        this.frm.pageSize = size
        this.getList()
      },
      handleCurrentChange(page){
        this.frm.page = page
        this.getList()
      },
      getList(){
        this.loading = true
        API.QueryNode({
          pageSize: this.frm.pageSize,
          page: this.frm.page,
          nodeName: this.frm.nodeName,
          nodeAddr:this.frm.nodeAddr
        }).then((res) => {
          this.tableData = res.data.recs
          this.loading = false
          this.total = res.data.total
        })
      },
      handleDel(val){
        this.delId = val.nodeId
        this.dialogVisibleConfirm = true
      },
      del(){
        if(this.delId===0){
          this.$message.error('请选择');
          return;
        }
        API.DeleteNode({nodeId:this.delId}).then((res)=>{
          this.getList()
          this.dialogVisibleConfirm = false
          this.delId = 0
          this.$message.success('操作成功');
        })
      },
      handleAdd(){
        this.saveType = 'add'
        this.dialogData = {
          nodeName:'',
          nodeAddr:'',
          lng:'',
          lat:'',
        }
        this.dialogTitle = '添加';
        this.dialogVisible = true
      },
      handleEdit(row){
        this.dialogData = JSON.parse(JSON.stringify(row))
        this.map.center.lat = row.lat
        this.map.center.lng = row.lng
        this.locData.longitude= row.lng
        this.locData.latitude= row.lat
        this.dialogData.nodeAddr = row.areaId
        this.dialogTitle = '修改';
        this.saveType = 'update'
        this.dialogVisible = true
      },

      save(){
        if(this.saveType ==='add' ){
          this.$refs.dialogForm.validate((valid) => {
            if (valid) {
              //新增
              API.AddNode(this.dialogData).then((res)=>{
                this.getList()
                this.$message.success('操作成功');
                this.dialogVisible = false
              })
          }})
        }else{
          this.$refs.dialogForm.validate((valid) => {
            if (valid) {
              //修改
              API.UpdateNode(this.dialogData).then((res)=>{
                this.getList()
                this.$message.success('操作成功');
                this.dialogVisible = false
              })
          }})
        }
      },
      selectMap(){
        this.mapVisible = true
      },
      onMapReady ({BMap, map}) {
        this.map.instance = map
        this.initMap()
      },
      initMap () {
        this.map.instance.setMapStyleV2(mapStyle)
        this.$nextTick(() => {

        })
      },
      clickEvent(e){
        map.clearOverlays();
        let Icon_0 = new BMap.Icon(require("../../image/mark_point1.png"),new BMap.Size(64, 64), {anchor: new BMap.Size(18, 32),imageSize: new BMap.Size(30, 43)});
        var myMarker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat),{icon: Icon_0});
        map.addOverlay(myMarker);

        //用所定位的经纬度查找所在地省市街道等信息
        var point = new BMap.Point(e.point.lng, e.point.lat);
        var gc = new BMap.Geocoder();
        let _this = this;
        gc.getLocation(point, function (rs) {
          var addComp = rs.addressComponents;
          console.log(rs.address);//地址信息
        });
        this.dialogData.lng = e.point.lng
        this.dialogData.lat = e.point.lat
      },

      //定位成功回调
      getLoctionSuccess(point, AddressComponent, marker){
        map.clearOverlays();
        let Icon_0 = new BMap.Icon(require("../../image/mark_point1.png"), new BMap.Size(64, 64), {anchor: new BMap.Size(18, 32),imageSize: new BMap.Size(30, 43)});
        var myMarker = new BMap.Marker(new BMap.Point(point.point.lng, point.point.lat),{icon: Icon_0});
        map.addOverlay(myMarker);
        console.log("====getLoctionSuccess")
        this.locData.longitude = point.point.lng;
        this.locData.latitude = point.point.lat;
      },
      findlocation(){
        this.$emit("findlocdata",this.locData)
        this.mapVisible = false
      },
      mapShow(){
        this.mapVisible = true
      },
      handler ({BMap, map}) {
        window.map = map;
        map.setMapStyleV2(mapStyle)
      },

    }
  }
</script>

<style lang="scss">
    .page-sbgl-jdgl {

        .body {
            margin-top: 8px;
            width: 100%;
            height: calc(100% - 72px);
            display: flex;

            .column-1 {
                width: 16%;
                height: 100%;
                display: inline-block;

                background: rgba(0, 115, 255, 0.2);
                border-radius: 4px;

                position: relative;
                .search-form {
                    position: absolute;
                    top: 24px;
                    left: 24px;
                    right: 24px;

                    .el-form-item {
                        margin-bottom: 8px;
                    }

                    .el-input__inner {
                        padding: 15px;
                        background: rgba(4, 95, 224, 0.5);
                        border-radius: 4px;
                        border: 1px solid #045FE0;
                        color: white;
                    }

                    .button-search {
                        width: 100%;

                        background: #045FE0;
                        border-radius: 4px;
                        border: unset;

                        font-size: 14px;
                        color: #FFFFFF;

                        &:active {
                            opacity: 0.8;
                        }

                        .el-image {
                            width: 16px;
                            float: right;
                        }
                    }

                    .button-export {
                        width: 100%;

                        background: #00C087;
                        border-radius: 4px;
                        border: unset;

                        font-size: 14px;
                        color: #FFFFFF;

                        &:active {
                            opacity: 0.8;
                        }

                        .el-image {
                            width: 16px;
                            float: right;
                        }
                    }
                }
            }

            .column-2 {
                width: calc(84% - 8px);
                height: 100%;
                margin-left: 8px;
                display: inline-block;

                background: rgba(0, 115, 255, 0.2);
                border-radius: 4px;

                position: relative;
                .table-container {
                    position: absolute;
                    top: 4px;
                    right: 4px;
                    bottom: 4px;
                    left: 4px;

                    .el-footer {
                        height: 50px !important;
                        text-align: right;
                    }
                }
            }
        }
        .loction-dialog .el-dialog{
          width: 1000px;
        }

        .el-dialog__header{
            background: #00F6FF;
            text-align: center;
            border-radius: 4px;
            border: 1px solid #0073FF;
            padding: 0;
            height: 56px;
        }
        .el-dialog{
            width:400px;

            background: #001537;
            border-radius: 4px;
            border: 1px solid #0073FF;

            .el-form-item__label{
                width: 70px;
            }
        }
        .el-dialog__title {
            width: 108px;
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #001537;
            line-height: 56px;

        }
        .el-dialog__wrapper{
            position: fixed;
            right: 0;
            bottom: 0;
            overflow: auto;
            margin: 0;
        }
        .el-form-item__label{
            font-weight: 400;
            color: #FFFFFF;

        }
        .el-dialog__footer{
            text-align: center;

        }
        .el-dialog__body{
            .el-input__inner {
                background-color: rgba(4, 95, 224, 0.5) !important;
                border-color: rgba(4, 95, 224, 0.5) !important;
                color: #ffffff;
                // width: 206px;

            }
            .el-input{
                width: 250px !important;
            }
        }
        .confirm {
            .el-dialog{
                width: 256px;
            }
            .el-dialog__header{
                padding: 0;
                height: 56px;
            }
            .el-dialog__body{
                text-align: center;
                color: #ffffff;
                font-size: 14px;
            }
            .el-button{

            }
            .el-button--primary{
                background: rgba(4, 95, 224, 1);
                border-color: rgba(4, 95, 224, 1);
            }

        }
        .anchorBL{
            display: none;
        }
    }
</style>
