<template>
  <div class="page-data">
    <div class="header-box">
      <span class="header-item" v-for="(option,index) in pageOptions" :key="index"
            :class="curPage===option?'is-active':''" @click="curPage=option">{{option.label}}</span>
    </div>
    <div class="page-body">
      <page-data-photo v-if="curPage.label==='图片数据中心'"></page-data-photo>
      <page-data-video v-if="curPage.label==='视频数据中心'"></page-data-video>
    </div>
  </div>
</template>

<script>
  import PageDataVideo from './components/page-data-video'
  import PageDataPhoto from './components/page-data-photo'

  export default {
    components: {
      PageDataVideo, PageDataPhoto
    },
    data () {
      return {
        curPage: {},
        pageOptions: [
          {label: '图片数据中心'},
          {label: '视频数据中心'},
        ],
      }
    },
    mounted(){
      this.curPage = this.pageOptions[0]
    },
  }
</script>

<style lang="scss">
  .page-data {
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

    .page-body {
      position: absolute;
      top: 140px;
      left: 57px;
      right: 57px;
      bottom: 55px;
    }
  }
</style>
