<template>
    <div class="page-system-zhlb"  flex="dir:top">
        <header-crumb :first-item="firstItem" :second-item="secondItem"></header-crumb>
        <div flex-box="1" class="body">
            <div class="column-1">
                <el-form class="search-form">
                    <el-form-item>
                        <el-input placeholder="用户名" v-model="param.loginName">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="姓名" v-model="param.userName">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="手机号" v-model="param.phone">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="button-search" @click="fetchData">
                            搜索
                            <el-image :src="require('../../image/image-search.png')"></el-image>
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="button-export" @click="addForm.addVisible = true">
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
                            <el-table-column align="center" prop="loginName" label="用户名" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="userName" label="姓名" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="phone" label="手机号" minWidth="60"></el-table-column>
                            <el-table-column align="center" show-overflow-tooltip prop="tright" label="权限" minWidth="80"></el-table-column>
                            <el-table-column align="center" prop="" label="操作" minWidth="40">
                                <template slot-scope="scope">
                                    <el-button type="text" size="mini" @click="handleUpdateInfo(scope.row)">修改资料</el-button>
                                    <el-button type="text" size="mini" @click="handleDel(scope.row.userId)">删除</el-button>
                                    <el-button type="text" size="mini" @click="pwdForm.updatePwdVisible=true;pwdForm.form=scope.row">修改密码</el-button>
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
                :title="addForm.addVisible?'添加':addForm.updateVisible?'修改':''"
                :visible.sync="addForm.addVisible || addForm.updateVisible"
                :before-close="handleClose"
        >
            <el-form ref="addForm" :model="addForm.form" :rules="addForm.rules">
                <el-form-item label="用户名" prop="loginName">
                    <el-input v-model="addForm.form.loginName"/>
                </el-form-item>
                <el-form-item label="姓名" prop="userName">
                    <el-input v-model="addForm.form.userName"/>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="addForm.form.phone" type="number"/>
                </el-form-item>
                <el-form-item v-if="addForm.addVisible" label="密码" prop="pwd">
                    <el-input v-model="addForm.form.pwd" show-password/>
                </el-form-item>
                <el-form-item label="角色" prop="roleId">
                    <el-select v-model="addForm.form.roleId" placeholder="请选择">
                        <el-option
                                v-for="item in roles"
                                :key="item.roleId"
                                :label="item.roleName"
                                :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="addHandleConfirm">确 定</el-button>
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
                <el-button type="primary" @click="delConfirm">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog 
                title="修改密码"
                :visible.sync="pwdForm.updatePwdVisible"
                :before-close="handlePwdClose">
            <el-form  ref="pwdForm" :model="pwdForm.form" :rules="pwdForm.rules">
                <el-form-item label="输入新密码" prop="newPwd" label-width="130px">
                    <el-input style="width:90% !important" show-password v-model="pwdForm.form.newPwd"/>
                </el-form-item>
                <el-form-item label="再输一次" prop="newPwd2" label-width="130px">
                    <el-input style="width:90% !important" show-password v-model="pwdForm.form.newPwd2"/>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handlePwdClose">取 消</el-button>
                <el-button type="primary" @click="updatePwd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import HeaderCrumb from '@components/custom/header-crumb'
  import API from '@/api'
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
        const validateNewPwd2 = (rule, value, callback) => {
            if (value == undefined || value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.pwdForm.form.newPwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        }
        return {
            loading: false,
            param:{
                startIndex: 0,
                amount: 20,
                direction: 1,
                loginName: '',
                userName: '',
                phone: ''
            },
            table: {
                data: [],
                pagination: {
                currentPage: 1,
                total: 1000,
                pageSize: 20
                }
            },
            addForm: {
                addVisible:false,
                updateVisible: false,
                form: {
                    loginName:"",
                    userName:"",
                    phone:"",
                    pwd:"",
                    roleId:""
                },
                rules: {
                    loginName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    userName: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                    ],
                    pwd: [
                        {required: true, message: '请输入您的手机号', trigger: 'blur'},
                    ],
                    roleId: [
                        {required: true, message: '请选择角色', trigger: 'blur'},
                    ]
                },
            },
            delId: '',
            dialogVisibleConfirm:false,
            roles:[],
            pwdForm: {
                updatePwdVisible:false,
                form: {
                    loginName:"",
                    userName:"",
                    phone:"",
                    pwd:"",
                    roleId:"",
                    userId: '',
                    newPwd:"",
                    newPwd2:""
                },
                rules: {
                newPwd: [
                    {required: true, message: '请输入新密码', trigger: 'blur'},
                ],
                newPwd2: [
                    {required: true,validator: validateNewPwd2, trigger: 'blur'},
                ]
                },
            }
        }
    },
    mounted(){
        this.fetchData();
        this.getRoles();
    },
    methods: {
        handleClose(){
            this.addForm.addVisible = false;
            this.addForm.updateVisible = false;
            this.$refs.addForm.resetFields();  
        },
        fetchData(){
            API.getUsers(this.param).then(res => {
                this.table.data = res.data.recs
                this.table.pagination.total = res.data.total
            })
        },
        handleSizeChange(size){
            this.table.pagination.pageSize = size
            this.param.amount = size
            this.fetchData()
        },
        handleCurrentChange(page){
            this.table.pagination.page = page
            this.param.startIndex = this.param.amount * (page -1)
            this.fetchData()
        },
        addHandleConfirm(){
            if(this.addForm.addVisible){
                this.addUser();
            }else{
                this.uptUserInfo();
            }
        },
        addUser(){
            this.$refs.addForm.validate((valid) => {
            if (valid) {
                API.addUser(this.addForm.form).then(res => {
                    if(1 === res.data.affectedRows){
                        this.addForm.form = {};
                        this.addForm.addVisible = false
                        this.$message.success("操作成功");
                        this.fetchData();
                    }
                })
            }})
        },
        handleUpdateInfo(data){
            this.addForm.updateVisible=true;
            this.addForm.form=data;
        },
        uptUserInfo(){
            this.$refs.addForm.validate((valid) => {
            if (valid) {
                API.uptUserInfo(this.addForm.form).then(res => {
                    if(1 === res.data.affectedRows){
                        this.addForm.form = {};
                        this.addForm.updateVisible = false
                        this.$message.success("操作成功");
                        this.fetchData();
                    }
                })
            }})
        },
        handleDel(val){
            this.delId = val
            this.dialogVisibleConfirm = true
        },
        delConfirm(){
            API.delUser({userId:this.delId}).then(res => {
                if(1 === res.data.affectedRows){
                    this.dialogVisibleConfirm = false
                    this.$message.success("操作成功");
                    this.fetchData();
                }
            })
        },
        getRoles(){
            API.getRoles({startIndex:0,amount:99999,direction:1}).then(res => {
                this.roles = res.data.recs;
            })
        },
        updatePwd(){
            this.$refs.pwdForm.validate((valid) => {
            if (valid) {
                this.pwdForm.form.pwd = this.pwdForm.form.newPwd;
                API.uptUserInfo(this.pwdForm.form).then(res => {
                    if(1 === res.data.affectedRows){
                        this.pwdForm.updatePwdVisible = false
                        this.$message.success("操作成功");
                        this.fetchData();
                    }
                })
            }})
        },
        handlePwdClose(){
            this.pwdForm.updatePwdVisible = false;
            this.$refs.pwdForm.resetFields();
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
