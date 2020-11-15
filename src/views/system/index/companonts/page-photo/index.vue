<template>
  <div class="page-photo">
    <div class="header-box">
      <span class="header-item" v-for="(option,index) in pageOptions" :key="index"
            :class="curPage===option?'is-active':''" @click="curPage=option">{{option.label}}</span>
    </div>
    <div class="photo-view" flex="dir:top" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <div class="photo-view-big" flex-box="1">
        <div class="photo-image_wrapper">
          <custom-image class="photo-image" :src="curPhoto.url" :result="curPhoto.result" :name="curPage.label" flex-box="1">
            <div slot="error"></div>
          </custom-image>
          <div class="photo-list" flex-box="0">
            <el-image class="arrow-image"
                      :src="preview.index > 0?require('./image/image-arrow-up.png'):require('./image/image-arrow-up-inactive.png')"
                      @click="showPreviousPhoto"></el-image>
            <el-image class="photo-item" :src="preview.first.url" @click="showPhoto(preview.first)"
                      :class="[(preview.first.url?'is-active':'' ),(curPhoto===preview.first?'is-current':'')]">
              <div slot="error"></div>
            </el-image>
            <el-image class="photo-item" :src="preview.second.url" @click="showPhoto(preview.second)"
                      :class="[(preview.second.url?'is-active':'' ),(curPhoto===preview.second?'is-current':'')]">
              <div slot="error"></div>
            </el-image>
            <el-image class="photo-item" :src="preview.third.url" @click="showPhoto(preview.third)"
                      :class="[(preview.third.url?'is-active':'' ),(curPhoto===preview.third?'is-current':'')]">
              <div slot="error"></div>
            </el-image>
            <el-image class="arrow-image"
                      :src="preview.index < preview.list.length - 3?require('./image/image-arrow-down.png'):require('./image/image-arrow-down-inactive.png')"
                      @click="showNextPhoto"></el-image>
          </div>
        </div>
      </div>
      <div class="button-box" flex-box="0">
        <div class="note">可支持图片PNG、JPG、JPEG， 图片大小不超过3M， 长边不大于3027像素,请保证上传资料的车牌人眼可分辨；</div>
        <el-upload
          class="upload-demo"
          action=""
          accept="image/*"
          :on-preview="handlePreview"
          :show-file-list="false"
          :http-request="uploadPhoto">
          <el-button class="button-upload">
            <el-image :src="require('./image/image-upload.png')"></el-image>
            上传图片
          </el-button>
        </el-upload>
        <el-upload
          class="upload-demo"
          action=""
          accept="image/*"
          multiple
          :on-preview="handlePreview"
          :show-file-list="false"
          :http-request="uploadPhoto">
          <el-button class="button-upload">
            <el-image :src="require('./image/image-upload.png')"></el-image>
            批量上传图片
          </el-button>
        </el-upload>
      </div>
    </div>
    <div class="result-view" flex="dir:top">
      <div class="result-box" flex="1">
        <div class="title-result result-item"
             :class="resultPage=='FORM'?'is-active':''"
             @click="resultPage='FORM'">
          <div class="result-text-wrapper">
            <div>测试结果</div>
            <div class="result-bottom"></div>
          </div>
        </div>
        <div class="title-json result-item"
             :class="resultPage=='JSON'?'is-active':''"
             @click="resultPage='JSON'">
          <div class="result-text-wrapper">
            <div>JSON</div>
            <div class="result-bottom"></div>
          </div>
        </div>
        <div class="result-body">
          <result-form class="result-form" v-if="resultPage=='FORM'&&curPhoto.result" :result="curPhoto.result"
                       :name="curPage.key" :label="curPage.label" :filter="curPage.filter"></result-form>
          <div class="result-json" v-if="resultPage=='JSON' &&curPhoto.result">
            <pre>{{jsonResult}}</pre>
          </div>
        </div>
      </div>
      <div class="button-box">
        <el-button class="button-fix" @click="uploadError">纠错上传</el-button>
        <div class="text-fix">如您发现检测结果错误，请点击纠错按钮进行纠正，谢谢。</div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import CustomImage from './components/CustomImage'
  import ResultForm from './components/ResultForm'

  export default {
    components: {
      CustomImage, ResultForm
    },
    data () {
      return {
        loading: false,
        curPhoto: {},
        curPage: {},
        pageOptions: [
          {label: '车辆检测', key: 'WZTZ'},
          {label: '车牌号码', key: 'HPTZ'},
          {label: '车辆品牌', key: 'CXTZ', filter: ['PPXHMS', 'CLPP', 'PPCX', 'CXNK', 'PPXHKXD']},
          {label: '车身颜色', key: 'CXTZ', filter: ['CSYS']},
          {label: '车辆类别', key: 'CXTZ', filter: ['CLLXFL', 'CLLXZFL']},
          {label: '驾驶行为', key: 'JSXWTZ'},
          {label: '车辆个性化特征', key: 'GXHTZ'},
        ],
        resultPage: 'FORM',
        preview: {
          index: 0,
          list: [],
          first: {},
          second: {},
          third: {}
        }

      }
    },
    computed: {
      jsonResult()
      {
        if (this.curPhoto.result && this.curPage) {
          let newJson = []
          let key = this.curPage.key
          let filter = this.curPage.filter
          this.curPhoto.result.forEach(item => {
            if (item && item[key]) {
              if (filter instanceof Array) {
                let newItem = {}
                Object.keys(item[key]).forEach((v1) => {
                  let found = filter.findIndex((v2) => v2 === v1)
                  if (found >= 0) {
                    newItem[v1] = item[key][v1]
                  }
                })
                newJson.push(newItem)
              } else {
                newJson.push(item[key])
              }
            }
          })
          return JSON.stringify(newJson, null, 2)
        } else {
          return JSON.stringify(this.curPhoto.result, null, 2)
        }
      }
    },
    mounted(){
      this.curPage = this.pageOptions[0]
    },
    methods: {
      uploadPhoto(file){
        this.loading = true
        api.VehicleRecognition(file.file).then(res => {
          let photo = {
            index: this.preview.list.length,
            url: this.getObjectURL(file.file),
            result: res.data.VEH,
            imageId: res.data.imageId
          }
          this.preview.list.push(photo)
          this.showPhoto(photo)
          this.preview.index = (this.preview.list.length <= 3 ? 0 : this.preview.list.length - 3)
          this.updatePhotoIndex()
        }).finally(() => {
          this.loading = false
        })
      },
      handlePreview(a, b, c){
        console.log("handlePreview", a, b, c)
      },
      generateUUID() {
        let d = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          let r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
      },
      showPhoto(photo){
        this.curPhoto = photo
      },
      updatePhotoIndex(){
        let index = this.preview.index
        this.preview.first = (this.preview.list.length > index ? this.preview.list[index] : {})
        this.preview.second = (this.preview.list.length > index + 1 ? this.preview.list[index + 1] : {})
        this.preview.third = (this.preview.list.length > index + 2 ? this.preview.list[index + 2] : {})
      },
      showPreviousPhoto(){
        if (this.preview.index > 0) {
          this.preview.index--
          this.updatePhotoIndex()
        }
      },
      showNextPhoto(){
        if (this.preview.index < this.preview.list.length - 3) {
          this.preview.index++
          this.updatePhotoIndex()
        }
      },
      getObjectURL(file) {
        let url = null;
        if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      uploadError(){
        api.UploadRecognitionError({
          imageId: this.curPhoto.imageId,
          userJson: "",
          userNotes: ""
        }).then(res => {
          this.$message.success("上传成功")
        })
      }
    }
  }
</script>

<style lang="scss">
  .page-photo {
    position: relative;
    width: 100%;
    height: 100%;

    .header-box {
      position: absolute;
      top: 90px;
      left: 430px;

      .header-item {
        font-size: 18px;
        color: #34a8b0;
        line-height: 25px;
        margin-right: 4px;
        display: inline-block;

        background: url(../../image/background-menu.png) no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        padding: 8px 20px;

        &.is-active {
          color: #00F6FF;
          background: url(../../image/background-menu-select.png) no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
        }
      }
    }

    .photo-view {
      position: absolute;
      top: 130px;
      left: 57px;
      right: 586px;
      bottom: 55px;

      display: flex;
      .photo-view-big {
        width: 100%;
        height: 100%;

        background: url(./image/background-photo-inner.png) no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;

        position: relative;
        .photo-image_wrapper {
          position: absolute;
          top: 71px;
          left: 54px;
          right: 54px;
          bottom: 71px;
          display: flex;

          > .photo-image {
            width: calc(100% - 15px - 234px);
            height: 100%;
          }

          .photo-list {
            margin-left: 15px;
            height: 100%;
            width: 234px;
            text-align: center;

            /*display: flex;*/
            /*justify-content: space-around;*/
            .photo-item {
              width: 100%;
              height: calc(33.33% - 56px);
              background: rgba(63, 181, 228, 1);
              border-radius: 9px;
              opacity: 0.38;
              border: 2px solid #036276;

              display: block;

              &.is-active {
                opacity: 1;
              }

              &.is-current {
                border: 2px solid rgba(0, 246, 255, 1);
              }
            }

            .photo-item + .photo-item {
              margin-top: 14px;
            }
            .photo-item + .arrow-image {
              margin-top: 24px;
            }

            .arrow-image + .photo-item {
              margin-top: 24px;
            }

            .arrow-image {
              img {
                width: 36px;
                height: 36px;
                margin: auto 0;
              }
            }
          }
        }
      }

      .button-box {
        margin-top: 22px;
        display: flex;
        justify-content: space-evenly;
        > .note {
          width: 384px;
          font-size: 14px;
          color: rgba(135, 208, 255, 1);
          line-height: 20px;
        }
        .button-upload {
          display: inline-block;
          width: 256px;
          height: 59px;

          box-shadow: 0px 2px 4px 0px rgba(0, 246, 255, 1);
          border-radius: 9px;
          border: 2px solid rgba(0, 246, 255, 1);
          background: rgba(0, 115, 255, 1);
          font-size: 20px;
          color: #00F6FF;

          .el-image {
            width: 32px;
            height: 25px;
            padding-right: 20px;
            vertical-align: bottom;
          }
        }
      }
    }

    .result-view {
      position: absolute;
      top: 162px;
      right: 43px;
      bottom: 97px;
      width: 518px;

      .result-box {
        width: 100%;
        height: 100%;

        background: url(./image/background-result.png) no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;

        position: relative;

        .result-item {
          font-size: 18px;
          color: #0073FF;
          width: 192px;
          height: 42px;

          &.is-active {
            color: #00F6FF;

            .result-text-wrapper {
              .result-bottom {
                background: url(./image/image-result-active.png) no-repeat;
                background-size: 100% 100%;
                -moz-background-size: 100% 100%;
              }
            }

          }

          &.title-result {
            position: absolute;
            top: 39px;
            left: 44px;
          }
          &.title-json {
            position: absolute;
            top: 39px;
            right: 51px;
          }

          .result-text-wrapper {
            position: relative;
            text-align: center;
            .result-bottom {
              position: absolute;
              top: 12px;
              width: 193px;
              height: 29px;
              background: url(./image/image-result-inactive.png) no-repeat;
              background-size: 100% 100%;
              -moz-background-size: 100% 100%;
            }
          }
        }
        .result-body {
          position: absolute;
          top: 98px;
          right: 60px;
          bottom: 49px;
          left: 60px;
          overflow-y: scroll;

          .result-json {
            color: #00F6FF;
            font-size: 20px;
          }
        }
      }

      .button-box {
        text-align: center;
        .button-fix {
          width: 256px;
          height: 59px;
          box-shadow: 0px 2px 4px 0px rgba(0, 246, 255, 1);
          border-radius: 9px;
          border: 2px solid rgba(0, 246, 255, 1);
          background: rgba(0, 115, 255, 1);

          font-size: 18px;
          color: rgba(0, 246, 255, 1);

          margin-top: 14px;
        }
        .text-fix {
          font-size: 14px;
          color: rgba(135, 208, 255, 1);

          margin-top: 19px;
        }
      }

    }
  }
</style>
