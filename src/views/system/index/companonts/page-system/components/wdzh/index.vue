<template>
    <div class="page-system-wdzh">
        <header-crumb :first-item="firstItem" :second-item="secondItem"></header-crumb>
        <div flex-box="1" class="body">
            <div class="column-1">
                <div class="custom-card">
                    <div class="title">账号资料</div>
                </div>
                <div class="user-account">
                    <div class="user-info">
                        <div class="info-left">账号：</div>
                        <div class="info-right">{{userInfo.loginName}}</div>
                    </div>
                    <div class="line"></div>
                </div>
                <div class="user-account">
                    <div class="user-info">
                        <div class="info-left">姓名：</div>
                        <div class="info-right">{{userInfo.userName}}</div>
                    </div>
                    <div class="line"></div>
                </div>
                <div class="user-account">
                    <div class="user-info">
                        <div class="info-left">手机号：</div>
                        <div class="info-right">{{userInfo.phone}}</div>
                    </div>
                    <div class="line"></div>
                </div>
                <div class="custom-card up-pass">
                    <div class="title">修改密码</div>
                </div>
                <div class="up-form">
                    <el-form class="search-form"  ref="pwdForm" :model="frm" :rules="rules">
                        <!-- <el-form-item label="原始密码" label-width="90px">
                            <el-input  v-model="frm.pwd" show-password>
                            </el-input>
                        </el-form-item> -->
                        <el-form-item label="新密码" prop="pwd"  label-width="130px">
                            <el-input  v-model="frm.pwd" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="再输一次" prop="pwd2" label-width="130px">
                            <el-input  v-model="frm.pwd2" show-password></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="button-search" @click="updatePwd">确定</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import HeaderCrumb from '@components/custom/header-crumb'
  import API from '@/api'
  import util from '@/libs/util'
  import sha1 from 'js-sha1'
  export default {
    name: 'system-wdzh',
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
            } else if (value !== this.frm.pwd2) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        }
      return {
        userInfo: {},
        userId: util.cookies.get("userId"),
        frm:{
          pwd:'',
          pwd2:''
        },
        rules: {
            pwd: [
                {required: true, message: '请输入新密码', trigger: 'blur'}
            ],
            pwd2: [
                {required: true,validator: validateNewPwd2, trigger: 'blur'}
            ]
        },
      }

    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){
            API.getUserInfo({userId:this.userId}).then(res =>{
                this.userInfo = res.data;
            })
        },
        updatePwd(){
            this.$refs.pwdForm.validate((valid) => {
            if (valid) {
                this.frm.pwd = sha1(this.frm.pwd);
                this.frm.pwd2 = undefined;
                this.frm.userId = this.userId;
                API.uptUserInfo(this.frm).then(res => {
                    if(1 === res.data.affectedRows){
                        this.$message.success("操作成功");
                        this.frm.pwd = null;
                        this.frm.pwd2 = null;
                    }
                })
            }})
        }
    }
  }
</script>

<style lang="scss">
    .page-system-wdzh {
        .body{
            margin-top: 8px;
            width: 100%;
            display: flex;
            height: calc(100% - 72px);
            background: rgba(0, 115, 255, 0.2);
        }
        .column-1 {
            width: 20%;
            height: 100%;

        }
        .custom-card {
            position: relative;

            .title {
                position: absolute;
                top: 32px;
                left: 20px;
                width: 100%;
                height: 30px;


                font-size: 18px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #00F6FF;


                background: url(../../image/bg-card-head.png) no-repeat;
                background-size: 100% 60%;
                -moz-background-size: 100% 60%;
                /*padding-bottom: 3px;*/
                background-position: bottom;
            }

            .body {
                position: absolute;
                width: 100%;
                top: 38px;
                bottom: 0px;
            }
        }
        .up-pass{
            top: 116px;
        }
        .user-account{
            position: relative;
            height: 50px;
            top:75px;
            left: 20px;
        }
        .user-info{
            display: flex;
            flex-direction: row;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 20px;
            .info-left{
                width: 60px;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
            }
            .info-right{

            }
        }
        .up-form{
            position: relative;
            top:166px;
            left: 20px;
        }
        .line {
            border-bottom:1px dashed rgba(4, 95, 224, 1);
        }
        .search-form {
            position: absolute;
            top: 24px;
            left: 0px;
            right: 0px;
            .el-form-item {
                margin-bottom: 18px;
            }
            .el-form-item__label{
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;

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
                width: 260px;
                margin-left: 100px;

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
</style>
