<template>
  <div class="page-setting">
    <div class="header-box">
      <span class="header-item" v-for="(option,index) in pageOptions" :key="index"
            :class="curPage===option?'is-active':''" @click="curPage=option">{{option.label}}</span>
    </div>
    <div class="page-body">
      <page-user v-if="curPage.label==='用户管理'"></page-user>
      <page-vehicle v-if="curPage.label==='车型管理'"></page-vehicle>
      <page-sys v-if="curPage.label==='系统管理'"></page-sys>
    </div>
  </div>
</template>

<script>
  import PageUser from './components/page-user'
  import PageVehicle from './components/page-vehicle'
  import PageSys from './components/page-sys'

  export default {
    components: {
      PageUser, PageVehicle, PageSys
    },
    data () {
      return {
        curPage: {},
        pageOptions: [
          {label: '用户管理'},
          {label: '车型管理'},
          {label: '系统管理'},
        ],
      }
    },
    mounted(){
      this.curPage = this.pageOptions[0]
    },
  }
</script>

<style lang="scss">
  .page-setting {
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
        margin-right: 36px;
        display: inline-block;

        &.is-active {
          color: #00F6FF;
        }
      }
    }

    .page-body {
      position: absolute;
      top: 130px;
      left: 57px;
      right: 57px;
      bottom: 55px;
    }
  }
</style>
