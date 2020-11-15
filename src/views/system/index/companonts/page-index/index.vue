<template>
  <div class="page-index">
    <div class="page-index_wrapper">
      <span class="button-box">
        <el-button class="photo-button custom-primary-button" @click="openPage('photo')">开启图片体验</el-button>
        <el-button class="video-button custom-primary-button" @click="openPage('video')">开启视频体验</el-button>
      </span>

      <!--<div class="line-1">-->
      <!--<div class="number-box">-->
      <!--<div class="number-box_wrapper">-->
      <!--<div>-->
      <!--<el-image class="title-image" :src="require('./image/image-exp-title.png')"></el-image>-->
      <!--<span class="title-text">&nbsp;体验数据</span>-->
      <!--</div>-->
      <!--<div class="number-card card-photo">-->
      <!--<el-image class="card-image" :src="require('./image/image-photo.png')"></el-image>-->
      <!--<div class="card-value">-->
      <!--<div class="value">123456</div>-->
      <!--<div class="title">图片体验</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="line-2"></div>-->
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {}
    },
    methods: {
      openPage(page){
        this.$emit("open", page)
      }
    }
  }
</script>

<style lang="scss">
  .page-index {
    position: relative;
    width: 100%;
    height: 100%;

    .page-index_wrapper {
      position: absolute;
      top: 147px;
      left: 45px;
      right: 45px;
      bottom: 65px;

      background: url('./image/bg-index.png');
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;

      .button-box {
        position: absolute;
        left: 120px;
        top: 63%;
      }
      .photo-button {
        display: inline-block;
      }

      .video-button {
        display: inline-block;
        margin-left: 40px;
      }
    }

    /*.line-1 {*/
    /*height: calc(50% - 13px);*/
    /*width: 100%;*/
    /*}*/

    /*.line-2 {*/
    /*height: calc(50% - 13px);*/
    /*width: 100%;*/
    /*margin-top: 26px;*/
    /*}*/

    /*.number-box {*/
    /*width: 380px;*/
    /*height: 100%;*/
    /*position: relative;*/
    /*border-radius: 8px;*/
    /*background: linear-gradient(#03173A, #101B57);*/

    /*.number-box_wrapper {*/
    /*position: absolute;*/
    /*top: 14px;*/
    /*left: 23px;*/
    /*right: 25px;*/
    /*bottom: 21px;*/
    /*}*/

    /*.title-image {*/
    /*width: 28px;*/
    /*height: 28px;*/
    /*}*/

    /*.title-text {*/
    /*font-size: 24px;*/
    /*color: #FFFFF0;*/
    /*line-height: 28px;*/
    /*}*/

    /*.number-card {*/
    /*width: 100%;*/
    /*height: calc(50% - 6px);*/
    /*border-radius: 8px;*/
    /*&.card-photo {*/
    /*margin-top: 20px;*/
    /*background: linear-gradient(90deg, #7CF7E9 0%, #F0917D 0%, #E38080 100%);*/
    /*}*/
    /*}*/
    /*}*/

  }
</style>
