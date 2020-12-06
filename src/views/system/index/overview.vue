<template>
  <div class="page-overview">
    <div class="header">
      <el-image class="image-left" :src="require('./image/image-overview-left.png')" fit="contain"></el-image>
      <div class="title">智慧交通大数据平台</div>
      <el-image class="image-right" :src="require('./image/image-overview-right.png')" fit="contain"></el-image>
    </div>
    <page-index class="page-index"></page-index>
  </div>
</template>

<script>
  import PageIndex from './companonts/page-index'

  export default {
    components: {PageIndex},
    data(){
      return {}
    },
    mounted(){
    },
    methods: {}
  }
</script>

<style lang="scss">
  .page-overview {
    width: 100%;
    height: 100%;

    background: #061437;

    .header {
      width: 100%;
      height: 92px;
      padding-top: 18px;

      display: flex;
      justify-content: center;
      align-items: center;

      .image-left, .image-right {
        width: 26%;
      }

      .title {
        width: 39%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        margin: 0px 20px;

        font-size: 36px;
        font-weight: bold;
        color: #00F6FF;
        /*line-height: 50px;*/
        letter-spacing: 4px;
        /*background: linear-gradient(180deg, #00F6FF 0%, #001537 100%);*/
        /*-webkit-background-clip: text;*/
        /*-webkit-text-fill-color: transparent;*/

        background: url('./image/image-overview-title.png') no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
      }
    }

    .page-index {
      width: 100%;
      height: calc(100% - 100px);

      .page-wrapper {
        top: 35px !important;
      }
    }
  }
</style>
