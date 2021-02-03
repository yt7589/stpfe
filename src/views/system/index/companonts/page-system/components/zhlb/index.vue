<template>
    <div class="page-system-zhlb"  flex="dir:top">
        <header-crumb :first-item="firstItem" :second-item="secondItem"></header-crumb>
        <div flex-box="1" class="body">
            <div class="column-1">
                <el-form class="search-form">
                    <el-form-item>
                        <el-input placeholder="用户名" v-model="table.filter.user">

                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="姓名" v-model="table.filter.name">

                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="手机号" v-model="table.filter.phone">

                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button class="button-search">
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
                        <el-table class="custom-table wzgl-table" :data="table.data" height="100%">
                            <el-table-column align="center" prop="user" label="用户名" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="name" label="姓名" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="phone" label="手机号" minWidth="60"></el-table-column>
                            <el-table-column align="center" show-overflow-tooltip prop="permission" label="权限" minWidth="80"></el-table-column>
                            <el-table-column align="center" prop="" label="操作" minWidth="40">
                                <template slot-scope="scope">
                                    <el-button type="text" size="mini">修改资料</el-button>
                                    <el-button type="text" size="mini" @click="delConfirm(scope.row.id)">删除</el-button>
                                    <el-button type="text" size="mini">修改密码</el-button>
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
                                :current-page.sync="table.pagination.currentPage"
                                :page-sizes="[20, 50, 100, 200]"
                                :page-size="table.pagination.pageSize"
                                layout="total,prev, pager, next,sizes,jumper"
                                :total="table.pagination.total">
                        </el-pagination>
                    </el-footer>
                </el-container>
            </div>
        </div>
        <el-dialog
                title="添加"
                :visible.sync="dialogVisible"
        >
            <el-form ref="dialogForm" :model="dialogData" >
                <el-form-item label="用户名">
                    <el-input v-model="dialogData.user"name="area" />
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="dialogData.name"name="area" />
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="dialogData.phone"name="area" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="dialogData.password"name="area" />
                </el-form-item>
                <el-form-item label="权限">
                    <el-select v-model="dialogData.permission" placeholder="请选择">
                        <el-option
                                v-for="item in permissionOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
                <el-button type="primary" @click="">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import HeaderCrumb from '@components/custom/header-crumb'
  export default {
    name: 'system-zhlb',
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
        table: {
          data: [
            {id:1,user:"ligong123",name:'李工',phone:"13312341234",permission:"路网实况、违章管理、车辆布控、拍照异常、路网实况、违章管理、车辆布控、拍照异常、"}
          ],
          filter: {
            user: '',
            name: '',
            phone: ''
          },
          pagination: {
            currentPage: 1,
            total: 1000,
            pageSize: 20
          }
        },
        dialogVisible:false,
        dialogData:{
          user:"",
          name:"",
          phone:"",
          password:"",
          permission:""
        },
        dialogVisibleConfirm:false,
        delId:0,
        permissionOptions: [{
          value: '权限1',
          label: '权限1'
        }],
      }
    },
    methods: {
      handleSizeChange(size){
        this.table.pagination.pageSize = size
        this.fetchData()
      },
      handleCurrentChange(page){
        this.table.pagination.page = page
        this.fetchData(page)
      },
      add(){
        this.dialogVisible = true
      },
      delConfirm(id){
        this.delId = id
        this.dialogVisibleConfirm = true
      }
    }
  }
</script>

<style lang="scss">
    .page-system-zhlb {

        .body {
            margin-top: 8px;
            width: 100%;
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
            // color: #ffffff;
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
