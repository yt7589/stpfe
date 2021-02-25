<template>
  <div class="page-system-setting" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="title">页面设置</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="0.825rem"
             style="padding:2%;">
      <el-form-item label="企业信息：" prop="qyName" style="width: 30%">
        <el-input class="custom-input custom-input-mini" v-model="form.qyName"></el-input>
      </el-form-item>
      <el-form-item label="企业LOGO：" prop="qyImgUrl">
        <div style="color:#FFFFFF">上传图片大小88*64像素、颜色尽量白色、青色、蓝色，png格式</div>
        <el-upload
          class="custom-upload"
          action="http://192.168.2.68:9003/sm/uploadImg"
          accept="image/*"
          :on-preview="handleLogoPreview"
          :show-file-list="false"
          :on-success="handleSuccess"
          :on-error="handleError">
          <el-image v-if="form.qyImgUrl" :src="form.qyImgUrl" style="width:100%;height:100%;"></el-image>
          <el-image v-else :src="require('../../image/image-upload.png')" class="avatar-uploader-icon"></el-image>
        </el-upload>
      </el-form-item>
      <el-form-item label="系统名称：" prop="sysName" style="width: 30%">
        <el-input class="custom-input custom-input-mini" :maxlength="50" v-model="form.sysName"></el-input>
      </el-form-item>
      <el-form-item label="ICP备案号：" prop="qyIcp" style="width: 30%">
        <el-input class="custom-input custom-input-mini" :maxlength="50" v-model="form.qyIcp"></el-input>
      </el-form-item>
      <el-form-item label="所有权：" prop="ownership" style="width: 30%">
        <el-input class="custom-input custom-input-mini" :maxlength="50" v-model="form.ownership"></el-input>
      </el-form-item>
      <el-form style="text-align: center;width: 30%;">
        <!--<el-button class="custom-button custom-button-cancel custom-button-mini" style="width:0.8rem">&nbsp;&nbsp;取消&nbsp;&nbsp;</el-button>-->
        <el-button class="custom-button custom-button-confirm custom-button-mini" style="width:0.8rem" @click="handleConfirm">&nbsp;&nbsp;保存&nbsp;&nbsp;</el-button>
      </el-form>
    </el-form>
  </div>
</template>

<script>
  import API from '@/api'
  import util from '@/libs/util'
  import {mapState, mapActions} from 'vuex'

  export default {
    components: {},
    data(){
      return {
        loading: false,
        form: {
          qyImgUrl:'',
          // 企业名称
          qyName:'',
          // 系统名称
          sysName:'',
          // icp备案号
          qyIcp: '',
          // 系统所有权
          ownership: '',
        },
        rules: {
          qyName: [
            {required: true, message: '请输入企业信息', trigger: 'blur'},
          ],
          qyImgUrl: [
            {required: true, message: '请上传LOGO', trigger: 'blur'},
          ],
          sysName: [
            {required: true, message: '请输入系统名称', trigger: 'blur'},
          ],
        }
      }
    },
    computed: {
      ...mapState('d2admin/system', [
        'info'
      ])
    },
    mounted(){
      // 浅拷贝
      this.form.qyImgUrl = this.info.qyImgUrl;
      this.form.qyName = this.info.qyName;
      this.form.sysName = this.info.sysName;
      this.form.qyIcp = this.info.qyIcp;
      this.form.ownership = this.info.ownership;
    },
    methods: {
      // 文件上传失败时的钩子
      handleError(err, file, fileList) {
        this.$message.warning('上传失败');
      },
      handleSuccess(res, file) {
        this.form.qyImgUrl = res.data
      },
      ...mapActions('d2admin/system', [
        'set'
      ]),
      handleConfirm(){
        API.uptSysInfo(this.form).then(res => {
          if(1 === res.data.affectedRows){
            this.$message.success('操作成功');
            this.set(this.form)
          }else{
            this.$message.warning('操作失败');
          }
        })
      },
      handleLogoPreview(){

      }
    }
  }
</script>

<style lang="scss">
  .page-system-setting {
    background: rgba(4, 95, 224, 0.3);
    border-radius: 4px;
    .el-form-item__label{
        font-weight: 400;
        color: #FFFFFF;
    }

    .title {
      font-size: 18px;
      font-weight: 500;
      color: #00F6FF;
      line-height: 25px;
      padding: 14px 25px;
      border-bottom: solid 1px #045FE0;
    }

    .custom-upload {
      width: 160px;
      height: 140px;

      background: rgba(4, 95, 224, 0.3);
      border-radius: 4px;

      .el-upload {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .image-preview {
          width: 100%;
          height: 100%;
        }
      }

      .avatar-uploader-icon {
        width: 24px;
        height: 24px;
      }
    }
  }
</style>
