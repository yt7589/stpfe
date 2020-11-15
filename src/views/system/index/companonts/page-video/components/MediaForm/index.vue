<template>
  <el-form ref="flowForm" :model="form" :rule="rules" labelWidth="0.4rem" label-position="left" class="media-form custom-form">
    <el-form-item label="名称" prop="name">
      <el-input ref="flowInput" class="custom-input" v-model="form.name" placeholder="请输入实时流名称"></el-input>
    </el-form-item>
    <el-form-item label="位置" prop="location">
      <el-input class="custom-input" v-model="form.location" placeholder="请输入实时流位置"></el-input>
    </el-form-item>
    <el-form-item label="视频流" prop="url">
      <el-input class="custom-input" v-model="form.url" placeholder="请输入RTSP流地址"></el-input>
    </el-form-item>
    <el-form-item class="button-box">
      <el-button class="custom-button" @click="submit">确认</el-button>
      <el-button class="custom-button" @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import api from '@/api'
  export default{
    props: ['index'],
    data(){
      return {
        form: {
          name: '',
          location: '',
          url: ''
        },
        rules: {
          name: [{required: true, message: '请输入名称', trigger: 'blur'},],
          location: [{required: true, message: '请输入位置', trigger: 'blur'},],
          url: [{required: true, message: '请输入地址', trigger: 'blur'},],
        }
      }
    },
    mounted(){

    },
    methods: {
      submit(){
        this.$refs.flowForm.validate((valid, error) => {
          if (valid) {
            if (this.form.url.indexOf("rtmp://") !== 0) {
              this.$message.error("请输入正确的RTMP地址")
            } else {
              api.UploadRtmpConfig(this.form.url).then((res) => {
                if (res.data) {
                  let config = {
                    type: 'rtmp/mp4',
                    src: this.form.url,
                    config: res.data,
                    result: []
                  }
                  this.$emit("success", config, this.index)
                }
              }).catch(err => {
                let config = {
                  type: 'rtmp/mp4',
                  src: this.form.url,
                  config: null,
                  result: []
                }
                this.$emit("success", config, this.index)
                console.error("UploadRtmpConfig", err)
              })
            }
          } else {
            let keys = Object.keys(error)
            let message = error[keys[0]][0].message
            this.$message.error(message)
          }
        })
      },
      handleCancel()
      {
        this.$emit("cancel")
      }
    }
  }
</script>

<style lang="scss">
  .media-form {
    padding: 40px 30px;
    .custom-input {
      .el-input__inner {
        padding-left: 20px !important;
      }
    }

    .button-box {
      .el-form-item__content {
        display: flex;
        align-items: initial;
        justify-content: space-evenly;
        width: 100%;
        margin-left: unset;
      }
      .custom-button {
        width: 134px;
        height: 46px;
        border: unset;
      }
    }
  }
</style>
