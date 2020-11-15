<template>
  <div class="page-data">
    <div class="header-box">
      <span class="header-item" v-for="(option,index) in pageOptions" :key="index"
            :class="curPage===option?'is-active':''" @click="curPage=option">{{option.label}}</span>
    </div>
    <div class="page-body">
      <page-service-chart v-if="curPage.label==='产品概览'"></page-service-chart>
      <page-service-index v-if="curPage.label==='应用列表'"></page-service-index>
      <page-service-doc v-if="curPage.label==='技术文档'"></page-service-doc>

    </div>
  </div>
</template>

<script>
  import PageServiceIndex from './components/page-service-index'
  import PageServiceChart from './components/page-service-chart'
  import PageServiceDoc from './components/page-service-doc'

  export default {
    components: {
      PageServiceIndex, PageServiceChart, PageServiceDoc
    },
    data () {
      return {
        curPage: {},
        pageOptions: [
          {label: '产品概览'},
          {label: '应用列表'},
          {label: '技术文档'},
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
