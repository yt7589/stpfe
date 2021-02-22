<template>
    <div class="page-sbgl-sblb"  flex="dir:top">
        <header-crumb :first-item="firstItem" :second-item="secondItem"></header-crumb>
        <div class="body">
            <div class="column-1">
                <el-form class="search-form">
                    <el-form-item>
                        <el-select
                         style="width:100%" placeholder="设备类型"
                         v-model="frm.type">
                          <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="设备编号" v-model="frm.code">

                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button class="button-search" @click="getList">
                            搜索
                            <el-image :src="require('../../image/image-search.png')"></el-image>
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="button-export" @click="add">
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
                            <el-table-column align="center" prop="deviceNo" label="设备编号" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="deviceType" label="设备类型" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="deviceNode" label="所属节点" minWidth="80"></el-table-column>
                            <el-table-column align="center" prop="deviceDirection" label="朝向" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="vehicleDirection" label="车辆方向" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="videoUrl" label="视频流地址" minWidth="100"></el-table-column>
                            <el-table-column align="center" prop="" label="操作" minWidth="40">
                                <template slot-scope="scope">
                                    <el-button type="text" size="mini" @click="handleEdit(scope.row)">修改</el-button>
                                    <el-button type="text" size="mini" @click="delConfirm(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-main>
                    <el-footer>
                        <el-pagination
                                background
                                class="custom-pagination zq-pagination"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                layout="total,prev, pager, next,sizes,jumper"
                                :page.sync="frm.startIndex + 1"
                                :page-sizes="[20, 50, 100, 200]"
                                :page-size="frm.amount"
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
            <el-form ref="dialogForm" :model="dialogData" >
                <el-form-item label="设备编号">
                    <el-input v-model="dialogData.deviceNo"name="area" />
                </el-form-item>
                <el-form-item label="设备类型">
                    <el-select v-model="dialogData.deviceType" placeholder="请选择">
                        <el-option
                                v-for="item in deviceTypeOptions"
                                :key="item.dtId"
                                :label="item.dtName"
                                :value="item.dtId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备节点">
                    <el-select v-model="dialogData.deviceNode" placeholder="请选择">
                        <el-option
                                v-for="item in deviceNodeOptions"
                                :key="item.deviceNodeId"
                                :label="item.deviceNodeName"
                                :value="item.deviceNodeId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备朝向">
                    <el-select v-model="dialogData.deviceDirection" placeholder="请选择">
                        <el-option
                                v-for="item in deviceDirectionOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车辆方向">
                    <el-select v-model="dialogData.vehicleDirection" placeholder="请选择">
                        <el-option
                                v-for="item in vehicleDirectionOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据地址">
                    <el-input v-model="dialogData.dtUrl"  />
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
            width="256px"
            height = "200px"
        >
            <div>确定要删除吗？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleConfirm = false">取 消</el-button>
                <el-button type="primary"  @click="del">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import HeaderCrumb from '@components/custom/header-crumb'
  import API from '@/api'
  export default {
    name: 'sbgl-sblb',
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
          code: '',
          type: '',
          amount:20,
          startIndex:0,
        },
        types:[{
          value: 1,
          label: '抓拍机'
        },{
          value: 2,
          label: '视频监控'
        }],
        tableData:[],
        total:0,
        dialogVisible:false,
        dialogData:{
          deviceNo:"",
          deviceType:"",
          deviceNode:"",
          deviceDirection:"",
          vehicleDirection:"",
          dtUrl:"",
        },
        saveType:'',
        dialogVisibleConfirm:false,
        delId:0,
        deviceTypeOptions:[

        ],
        deviceNodeOptions:[],
        vehicleDirectionOptions:[
          {
            value: '车头',
            label: '车头'
          },
          {
            value: '车尾',
            label: '车尾'
          },
        ],
        deviceDirectionOptions: [
          {
              value: '东',
              label: '东'
          },
          {
            value: '西',
            label: '西'
          },
          {
            value: '南',
            label: '南'
          },
          {
            value: '北',
            label: '北'
          },
          {
            value: '东南',
            label: '东南'
          },
          {
            value: '西南',
            label: '西南'
          },
          {
            value: '东北',
            label: '东北'
          },
          {
            value: '西北',
            label: '西北'
          },
        ],
        dialogTitle:'添加',
      }
    },
    mounted(){
      this.getList()
      this.getDeviceType()
      this.getDeviceNode()
    },
    methods: {
      handleSizeChange(size){
        this.frm.startIndex = 0
        this.frm.amount = size
        this.getList()
      },
      handleCurrentChange(page){
        this.frm.startIndex = page - 1
        this.getList()
      },
      add(){
        this.initDialog()
        this.saveType = 'add'
        this.dialogVisible = true
      },
      initDialog(){
        this.dialogTitle = '添加';
        this.saveType = ''
        this.dialogData = {
          deviceNo:"",
          deviceType:"",
          deviceNode:"",
          deviceDirection:"",
          vehicleDirection:"",
          dtUrl:"",

        }
      },
      handleEdit(row){
        this.dialogData = row
        this.dialogTitle = '修改';
        this.dialogVisible = true
      },
      delConfirm(val){
        this.delId = val.deviceNo
        this.dialogVisibleConfirm = true
      },
      del(){
        if(this.delId===0){
          this.$message.error('请选择');
          return;
        }
        API.DeleteDevice({deviceNo:this.delId}).then((res)=>{
          this.getList()
          this.dialogVisibleConfirm = false
          this.delId = 0
          this.$message.success('操作成功');
        })
      },
      getList(){
        this.loading = true
        API.QueryDevice(this.frm).then((res) => {
          this.tableData = res.data.recs
          this.loading = false
          this.total = res.data.total
        })
      },
      getDeviceType(){
        API.QueryDeviceType().then((res)=>{
            this.deviceTypeOptions = res.data.recs
        })
      },
      getDeviceNode(){
        API.QueryDeviceNode().then((res)=>{
          this.deviceNodeOptions = res.data.recs
        })
      },
      save(){
        if(this.saveType ==='add' ){
          //新增
          API.AddDevice(this.dialogData).then((res)=>{
            this.getList()
            this.$message.success('操作成功');
            this.dialogVisible = false
          })
        }else{
          //修改
          API.updateDeviceInfo(this.dialogData).then((res)=>{
            this.getList()
            this.$message.success('操作成功');
            this.dialogVisible = false
          })
        }

      },
    }
  }
</script>

<style lang="scss">
    .page-sbgl-sblb {

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
                        text-align: center;
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

        .el-button--text {
            color: rgba(0, 246, 255, 1);
        }
        .el-table .cell {
            font-size: 14px;
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
            width:366px;

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
    }
</style>
