<template>
  <div class="page-system-setting" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="title">页面设置</div>
    <el-form class="custom-form" ref="form" :model="form" :rules="rules" label-width="0.725rem"
             style="padding:2%;">
      <el-form-item label="企业信息：" prop="corpName" style="width: 30%">
        <el-input class="custom-input custom-input-mini" v-model="form.corpName"></el-input>
      </el-form-item>
      <el-form-item label="企业LOGO：" prop="corpIcon">
        <div style="color:#FFFFFF">上传图片大小88*64像素、颜色尽量白色、青色、蓝色，png格式</div>
        <el-upload
          class="custom-upload"
          action=""
          accept="image/*"
          :on-preview="handleLogoPreview"
          :show-file-list="false"
          :http-request="handleLogoUpload">
          <el-image v-if="form.corpIcon" :src="form.corpIcon" style="width:100%;height:100%;"></el-image>
          <el-image v-else :src="require('../../image/image-upload.png')" class="avatar-uploader-icon"></el-image>
        </el-upload>
      </el-form-item>
      <el-form-item label="系统名称：" prop="systemName" style="width: 30%">
        <el-input class="custom-input custom-input-mini" :maxlength="50" v-model="form.systemName"></el-input>
      </el-form-item>
      <el-form-item label="ICP备案号：" prop="icpCode" style="width: 30%">
        <el-input class="custom-input custom-input-mini" :maxlength="50" v-model="form.icpCode"></el-input>
      </el-form-item>
      <el-form-item label="所有权：" prop="ownerName" style="width: 30%">
        <el-input class="custom-input custom-input-mini" :maxlength="50" v-model="form.ownerName"></el-input>
      </el-form-item>
      <el-form style="text-align: center;width: 30%;">
        <!--<el-button class="custom-button custom-button-cancel custom-button-mini" style="width:0.8rem">&nbsp;&nbsp;取消&nbsp;&nbsp;</el-button>-->
        <el-button class="custom-button custom-button-confirm custom-button-mini" style="width:0.8rem" @click="handleConfirm">&nbsp;&nbsp;保存&nbsp;&nbsp;</el-button>
      </el-form>
    </el-form>
  </div>
</template>

<script>
  import api from '@/api'
  import util from '@/libs/util'
  import {mapState, mapActions} from 'vuex'

  export default {
    components: {},
    data(){
      return {
        loading: true,
        form: {
          logo: null,
        },
        rules: {
          corpName: [
            {required: true, message: '请输入企业信息', trigger: 'blur'},
          ],
          corpIcon: [
            {required: true, message: '请上传LOGO', trigger: 'blur'},
          ],
          systemName: [
            {required: true, message: '请输入系统名称', trigger: 'blur'},
          ],
        }
      }
    },
    computed: {
      ...mapState('d2admin/user', [
        'info'
      ])
    },
    mounted(){
      console.log('mmmmmmmmmmm')
      // this.queryCompanyInfo()
    },
    methods: {
      ...mapActions('d2admin/user', [
        'set'
      ]),
      queryCompanyInfo(){
        console.log('----------')
        this.loading = true
        api.queryCompanyDetail().then(res => {
          this.form = res.data
        }).finally(() => {
          this.loading = false
        })
      },
      handleConfirm(){
        console.log('----------')
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true
            api.modifyCompany(this.form).then(res => {
              this.$notify({position: 'bottom-right',message: '保存成功', type: 'success'});

              this.info.company = res.data
              this.set(this.info)
            }).finally(() => {
              this.loading = false
            })
          }
        })
      },
      handleLogoPreview(){

      },
      handleLogoUpload(file){
        this.form.corpIcon = util.getObjectURL(file.file)
        this.form.newCorpIcon = file.file
      },
    }
  }
</script>

<style lang="scss">
  .page-system-setting {
    background: rgba(4, 95, 224, 0.3);
    border-radius: 4px;

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
