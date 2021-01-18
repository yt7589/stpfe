<template>
    <div class="page-zdjg-clbk" >
        <header-crumb :first-item="firstItem" :second-item="secondItem"></header-crumb>
        <div  class="body" >
            <el-row class="qy-row" >
                <el-col :span="5" class="col" style="width: 23%;">
                    <div  class="search-form" >
                        <el-input v-model="frm.hphm" placeholder="请输入车辆牌号" class="search-input"></el-input>
                        <button class="search-button" @click="getList"><span>搜索</span></button>
                        <button class="create-button" @click="handleAdd"><span>添加</span></button>
                    </div>
                    <div>
                        <el-main v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
                            <el-table class="custom-table" :data="tableData">
                                <el-table-column align="center" prop="hphm" label="车辆牌号" minWidth="150"></el-table-column>
                                <el-table-column align="center" prop="" label="操作">
                                    <template slot-scope="scope">
                                        <!--<el-button type="text" size="mini"  @click="handleEdit(scope.row)">修改</el-button>-->
                                        <el-button type="text" size="mini" @click="handleDel(scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-main>
                        <div  class="button-page-group">
                            <el-button  @click="getListPrev()" class="button-page" size="mini" ><i class="el-icon-arrow-up" style="float: left"></i>上一页</el-button>
                            <el-button  @click="getListNext()" class="button-page" size="mini" ><i class="el-icon-arrow-down" style="float: right"></i> 下一页</el-button>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12" class="col" style="width: 52%;margin-right: 1%;margin-left: 1%;">
                    <div  style="height: 100%;" class="map">
                        <baidu-map  ref="map-qyjg" class="baidu-map" :zoom="map.zoom"
                                    :center="map.center" :dragging="true"
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
                    </div>
                </el-col >
                <el-col :span="5" class="col" style="width: 23%">
                    <div class="dt-title">
                        <el-row>
                            <el-col :span="3">  <el-avatar  :src="require('../../image/clbkdt@1x.png')"></el-avatar></el-col>
                            <el-col :span="6" class="jgdt-text" >  <span class="jgdt-span">布控动态</span></el-col>
                            <el-col :span="15" class="col-more"><span class="clbk-more">更多>></span></el-col>
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
                                        <div>累计出现{{item.totalTimes}}次</div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>

                    </div>

                    <div class="dt-title">
                        <el-row>
                            <el-col :span="3">  <el-avatar  :src="require('../../image/bjdt@1x.png')"></el-avatar></el-col>
                            <el-col :span="6" class="jgdt-text" >  <span class="jgdt-span">报警动态</span></el-col>
                            <el-col :span="15" class="col-more"><span class="clbk-more">更多>></span></el-col>
                        </el-row>
                    </div>
                    <div class="dt-list">
                        <el-row  v-for="(item,key) in alarmData" :key="key">
                            <el-col class="dt-row" :span="24">
                                <el-card class="card">
                                    <div  class="card-content">
                                        <div>{{item.siteName}}</div>
                                        <div>{{item.occurTime}}</div>
                                    </div>
                                    <div class="card-content">
                                        <div> <span style="color: #00F6FF">{{item.hphm}}</span></div>
                                        <div>累计出现{{item.totalTimes}}次</div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>

                    </div>
                </el-col>
            </el-row>
        </div>

        <el-dialog
                :close-on-click-modal="false"
                title="添加布控车辆"
                :visible.sync="dialogVisible"
                class="clbk-add-cl"

                >
            <el-form ref="dialogForm" :model="dialogData" :inline="true" label-width="70">
                <el-form-item label="车辆牌号">
                    <el-input v-model="dialogData.hphm" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"@click="save">确 定</el-button>
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
    </div>
</template>

<script>
  import mapStyle from '@/assets/baiduMapStyle'
  import HeaderCrumb from '../common/header-crumb'
  import API from '@/api'
  export default {
    name: 'page-zdjg-clbk',
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

        ],
        map: {
          instance: null,
          zoom: 12,
          center: {
            lng: 116.404,
            lat: 39.915
          },
        },

        bmMarkerStyle:{
          url: require('../../image/mark_point2.png'),
          size: {
            width: 39,
            height: 18
          },
        },
        markerPoints:[

        ],
        dialogVisible:false,
        dialogData:{
          hphm:"",
        },
        dtData:[],
        alarmData:[],
        frm:{
          amount:10,
          startIndex:0,
          direction:0,
          hphm:'',
        },
        page:1,
        delId:0,
        dialogVisibleConfirm:false,
      }
    },
    mounted(){
      this.getList()
      this.getMapMarks()
      this.getDtList()
      this.getAlarmList()
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
      handleAdd(){
        this.initDialogData()
        this.dialogVisible = true

      },
      initDialogData(){
        this.dialogData = {
          hphm:'',
        }
      },
      getListPrev(){
        let page = this.page
        if (page > 1){
          this.page = page - 1
          this.frm.startIndex = (this.page - 1) * this.frm.amount
        }else{
          this.frm.startIndex = 0
        }
        this.frm.direction = 0
        this.getList()
      },
      getListNext(){
        let page = this.page
        this.page = page + 1
        this.frm.startIndex = (this.page - 1) * this.frm.amount
        this.frm.direction = 1
        this.getList()
      },
      getList(){
        this.loading = true
        API.QueryVehicle(this.frm).then((res) => {
          this.tableData = res.data.recs
          this.loading = false
        })
      },
      handleEdit(val){
        this.dialogData = '';
        this.dialogData.vcId = [val.vcId]
        this.dialogVisible = true
      },
      handleDel(val){
        this.delId = val.vcId
        this.dialogVisibleConfirm = true
      },
      save(){
        if (this.dialogData.hphm.length === 0){
          this.$message.error('请输入车牌');
          return;
        }
        API.AddVehicle({hphm:this.dialogData.hphm}).then((res)=>{
          this.getList()
          this.$message.success('操作成功');
          this.dialogVisible = false
        })
      },
      del(){
        if(this.delId===0){
          this.$message.error('请选择');
          return;
        }
        API.DeleteVehicle({vcId:this.delId}).then((res)=>{
          this.getList()
          this.dialogVisibleConfirm = false
          this.delId = 0
          this.$message.success('操作成功');
        })
      },
      getMapMarks(){
        API.QueryVcSfvs({}).then((res)=>{
          this.map.center.lat = res.data.recs[0].lat
          this.map.center.lng = res.data.recs[0].lng
          this.markerPoints = res.data.recs
        })
      },
      getDtList(){
        API.QueryVcLsvs().then((res)=>{
          this.dtData = res.data.recs.slice(0,4)
        })
      },
      getAlarmList(){
        API.QueryVcLtvis().then((res)=>{
          this.alarmData = res.data.recs.slice(0,4)
        })
      },
    }
  }
</script>

<style scoped lang="scss">
    .page-zdjg-clbk {
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
        height: 50px;
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
        margin-bottom: 3px;
    }

    .bm-info-content{
        text-align: center;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #091221;
        line-height: 20px;

    }
    .dt-title {
        padding: 8px 0 0 16px;
        position: relative;
    }

    .dt-list{
        position: relative;
        padding: 0px 16px 8px 16px;
    }
    .col-more{
        text-align: end;
    }
    .clbk-more{
        width: 58px;
        height: 25px;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #00F6FF;
        cursor: pointer;
    }
</style>

<style lang="scss">
    .page-zdjg-clbk{
        .el-card__body{
            padding: 4px 16px 4px 16px;
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

            background: #001537;
            border-radius: 4px;
            border: 1px solid #0073FF;
            width: 446px;
        }
        .el-dialog__title {
            width: 108px;
            height: 25px;
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #001537;
            line-height: 56px;

        }
        .el-dialog__wrapper{
            position: fixed;
            top: 7%;
            right: 0;
            bottom: 0;

            overflow: auto;
            margin: 0;

        }
        .el-dialog__body{
            padding: 20px 0 0 20px;
            .el-input__inner {
                background-color: rgba(4, 95, 224, 0.5) !important;
                border-color: rgba(4, 95, 224, 0.5) !important;
                color: #ffffff;
                width: 286px;
            }
        }
        .el-dialog__footer{
            text-align: center;
        }
        .el-form-item__label{
            font-weight: 400;
            color: #FFFFFF;

        }
        .el-main {
            padding: 16px !important;
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
    }

</style>
