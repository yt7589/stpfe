<template>
  <div class="page-home">
    <div class="layout-background">
      <div class="piece-1"></div>
      <div class="piece-2"></div>
      <div class="piece-3"></div>
      <!--<div class="piece-4"></div>-->
      <div class="piece-5"></div>
      <div class="piece-6"></div>
      <div class="piece-7"></div>
    </div>
    <div class="layout-header">
      <el-image class="logo" :src="require('./image/image-logo.png')"></el-image>
      <div class="title">AI交通大数据平台</div>
      <div class="sub-title"><span style="color:#FFFFFF">城市:</span> <span>{{city}}</span></div>
      <div class="header-box">
        <span class="header-title" :class="page=='index'?'is-active':''" @click="page='index'">首页</span>
        <span class="header-title" :class="page=='lwsk'?'is-active':''" @click="page='lwsk'">路网实况</span>
        <span class="header-title" :class="page=='wzgl'?'is-active':''" @click="page='wzgl'">违章管理</span>
        <span class="header-title" :class="page=='zdjg'?'is-active':''" @click="page='zdjg'">重点监管</span>
        <span class="header-title" :class="page=='jtyc'?'is-active':''" @click="page='jtyc'">交通预测</span>
        <span class="header-title" :class="page=='sjzx'?'is-active':''" @click="page='sjzx'">数据中心</span>
        <span class="header-title" :class="page=='camera'?'is-active':''" @click="page='camera'">设备管理</span>
        <span class="header-title" :class="page=='system'?'is-active':''" @click="page='system'">系统管理</span>
      </div>
      <div class="header-user">
        <el-image :src="require('./image/image-user.png')"></el-image>
        <div>{{username}}</div>
      </div>
      <div class="header-logout" @click="logout">
        <el-image :src="require('./image/image-logout.png')"></el-image>
        <div>退出</div>
      </div>
    </div>

    <div class="main-content-box">
      <page-index v-show="page=='index'" @open="openPage"></page-index>
      <page-lwsk v-show="page=='lwsk'"></page-lwsk>
      <page-wzgl v-show="page=='wzgl'"></page-wzgl>
      <page-zdjg v-show="page=='zdjg'"></page-zdjg>
      <page-jtyc v-show="page=='jtyc'"></page-jtyc>
      <page-sjzx v-show="page=='sjzx'"></page-sjzx>
      <page-camera v-show="page=='camera'"></page-camera>
    </div>
  </div>
</template>


<script>
  import PageIndex from './companonts/page-index'
  import PageLwsk from './companonts/page-lwsk'
  import PageWzgl from './companonts/page-wzgl'
  import PageZdjg from './companonts/page-zdjg'
  import PageJtyc from './companonts/page-jtyc'
  import PageSjzx from './companonts/page-sjzx'
  import PageCamera from './companonts/page-camera'
  import PageSystem from './companonts/page-system'

  import dayjs from 'dayjs'
  import {mapActions} from 'vuex'
  export default {
    components: {
      PageIndex, PageLwsk, PageWzgl, PageZdjg, PageJtyc, PageSjzx, PageCamera, PageSystem
    },
    data(){
      return {
        page: 'index',
        isAdmin: false,
        city: "北京",
        username: "用户名"
      }
    },
    mounted(){
    },
    methods: {
      ...mapActions('d2admin/account', [
        'logout'
      ]),
      openPage(page){
        this.page = page
      }
    }
  }
</script>

<style lang="scss">
  .page-home {
    width: 100%;
    height: 100%;

    background: url(./image/background.png) no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;

    position: relative;

    > .layout-background {
      position: absolute;
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      z-index: 99;
      pointer-events: none;

      > .piece-1 {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 1731px;
        height: 374px;

        background: url(./image/background-piece_1.png) no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
      }

      > .piece-2 {
        position: absolute;
        top: 72px;
        left: 142px;
        width: 1125px;
        height: 43px;

        background: url(./image/background-piece_2.png) no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
      }

      > .piece-3 {
        position: absolute;
        top: 73px;
        right: 0px;
        width: 149px;
        height: 120px;

        background: url(./image/background-piece_3.png) no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
      }

      > .piece-4 {
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 1266px;
        height: 55px;

        background: url(./image/background-piece_4.png) no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
      }

      > .piece-5 {
        position: absolute;
        bottom: 0px;
        right: 0px;
        top: 217px;
        width: 1270px;

        background: url(./image/background-piece_5.png) no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
      }

      > .piece-6 {
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 643px;
        height: 79px;

        background: url(./image/background-piece_6.png) no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
      }

      > .piece-7 {
        position: absolute;
        bottom: 79px;
        left: 0px;
        top: 359px;
        width: 24px;

        background: url(./image/background-piece_7.png) no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
      }

      > .menu-mask {
        position: absolute;
        left: 0px;
        top: 0px;
        right: 0px;
        height: 100px;

        background: url(./image/background-menu-mask.png) no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
      }
    }

    > .layout-header {
      position: absolute;
      top: 0px;
      width: 100%;
      height: 100px;
      z-index: 100;

      > .logo {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 101px;
        height: 66px;

        /*background: #0073FF;*/
        /*border-radius: 9px;;*/
      }

      > .title {
        position: absolute;
        top: 15px;
        left: 150px;

        font-size: 28px;
        color: rgba(0, 246, 255, 1);
        line-height: 40px;
      }

      > .sub-title {
        position: absolute;
        top: 62px;
        left: 150px;

        font-size: 25px;
        color: rgba(63, 181, 228, 1);
      }

      > .header-box {
        position: absolute;
        top: 0px;
        left: 430px;

        .header-title {
          font-size: 24px;
          color: rgba(0, 246, 255, 1);
          display: inline-block;
          padding: 16px 35px;
          cursor: pointer;

          &.is-active {
            background: url('./image/background-title-active.png') no-repeat;
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
          }
        }
      }

      > .header-user {
        position: absolute;
        width: 80px;
        height: 60px;
        right: 96px;
        top: 3px;

        background: url('./image/background-user.png') no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;

        font-size: 18px;
        color: #00F6FF;
        text-align: center;

        cursor: pointer;
        &:active {
          opacity: 0.8;
        }

        .el-image {
          width: 25px;
        }
      }

      > .header-logout {
        position: absolute;
        width: 80px;
        height: 60px;
        right: 7px;
        top: 3px;

        font-size: 18px;
        color: #00F6FF;
        text-align: center;

        background: url('./image/background-logout.png') no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;

        cursor: pointer;
        &:active {
          opacity: 0.8;
        }

        .el-image {
          width: 25px;
        }
      }
    }

    > .main-content-box {
      position: absolute;
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      /*TODO: 确认底色*/
      background: #061437;

      .custom-menu-box {
        position: absolute;
        top: 90px;
        left: 430px;
        z-index: 100;
        .menu {
          font-size: 18px;
          color: #34a8b0;
          line-height: 25px;
          margin-right: 4px;
          display: inline-block;
          cursor: pointer;

          background: url(./image/background-menu.png) no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
          padding: 8px 20px;

          &.is-active {
            color: #00F6FF;
            background: url(./image/background-menu-select.png) no-repeat;
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
          }
        }
      }
      .custom-main-content {
        position: absolute;
        top: 142px;
        left: 57px;
        right: 57px;
        bottom: 55px;
      }
      .custom-main-content-full {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
      }
    }
  }
</style>
