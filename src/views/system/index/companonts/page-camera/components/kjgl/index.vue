<template>
    <div class="page-sbgl-kjgl" flex="dir:top">
        <header-crumb :first-item="firstItem" :second-item="secondItem"></header-crumb>
        <div flex-box="1" class="body">
            <div class="column-2">
                <el-container class="table-container">
                    <el-main v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
                        <el-table class="custom-table wzgl-table" :data="tableData" height="100%">
                            <el-table-column align="center" prop="areaName" label="地区名称" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="parentName" label="上一级" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="" label="操作" minWidth="40">
                                <template slot-scope="scope">
                                    <el-button type="text" size="mini" @click="handleEdit(scope.row)">修改</el-button>
                                    <el-button type="text" size="mini" @click="handleAdd(scope.row)">添加下级</el-button>
                                    <el-button type="text" size="mini" @click="handleDel(scope.row.areaId)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-main>
                    <el-footer>
                        <el-pagination
                                class="custom-pagination"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :page.sync="frm.startIndex + 1"
                                :page-sizes="[20, 50, 100, 200]"
                                :page-size="frm.amount"
                                layout="prev, pager,sizes, next,total"
                                :total="total">
                        </el-pagination>
                    </el-footer>
                </el-container>
            </div>
        </div>
        <el-dialog
                :close-on-click-modal="false"
                :title="dialogTitle"
                :visible.sync="dialogVisible"
        >
            <el-form ref="dialogForm" :model="dialogData" :inline="true" label-width="70">
                <el-form-item label="上一级">
                    <span class="parent_name">{{dialogData.parentName}}</span>
                </el-form-item>
                <el-form-item label="空间名称">
                    <el-input v-model="dialogData.areaName" />
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
  import HeaderCrumb from '@components/custom/header-crumb'
  import API from '@/api'
  export default {
    name: 'sbgl-kjgl',
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
          amount:20,
          startIndex:0,
        },
        tableData:[],
        total:0,
        delId:0,
        dialogVisibleConfirm:false,
        dialogTitle:'',
        dialogVisible:false,
        dialogData:{
          areaName:"",
          parentName:"",
        },
      }
    },
    mounted(){
      this.getList()
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
      getList(){
        this.loading = true
        API.QueryArea(this.frm).then((res) => {
          this.tableData = res.data.recs
          this.loading = false
          this.total = res.data.total
        })
      },
      handleDel(val){
        this.delId = val
        this.dialogVisibleConfirm = true
      },
      del(){
        if(this.delId===0){
          this.$message.error('请选择');
          return;
        }
        API.DeleteAreaFromSpace({areaId:this.delId}).then((res)=>{
          this.getList()
          this.dialogVisibleConfirm = false
          this.delId = 0
          this.$message.success('操作成功');
        })
      },
      handleAdd(row){
        this.dialogData = {
          areaName:'',
          parentCode:row.parentCode,
          parentName:row.parentName,
        }
        this.dialogTitle = '添加空间';
        this.dialogVisible = true
      },
      handleEdit(row){
        this.dialogData = {
          areaName:row.areaName,
          areaId:row.areaId,
          parentName:row.parentName,
        }
        this.dialogTitle = '修改空间';
        this.dialogVisible = true
      },
      initDialogData(){
        this.dialogData = {
          areaName:'',
          parentName:'',
        }
      },
      save(){
        if (this.dialogData.areaName.length === 0){
          this.$message.error('请输入空间名称');
          return;
        }
        if(this.dialogData.areaId > 0 ){
          //修改
          API.UpdateArea(this.dialogData).then((res)=>{
            this.getList()
            this.$message.success('操作成功');
            this.dialogVisible = false
          })
        }else{
          //新增
          API.AddArea(this.dialogData).then((res)=>{
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
    .page-sbgl-kjgl {
        .body {
            margin-top: 8px;
            width: 100%;
            display: flex;


            .column-2 {
                width: 100%;
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
        .parent_name{
            color: #fff;
            padding-left: 12px;
        }
    }
</style>
