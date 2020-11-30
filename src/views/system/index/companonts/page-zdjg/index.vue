<template>
    <div class="page-zdjg">
        <div class="custom-menu-box">
        <span class="menu" v-for="(option,index) in pageOptions" :key="index"
            :class="curPage===option?'is-active':''"  @click="tsclCli(option)" >{{option.label}}</span>
        </div>
        <page-zdjg-qyjg  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='区域监管'" class="custom-main-content"></page-zdjg-qyjg>
        <page-zdjg-ldjg  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='路段监管'" class="custom-main-content"></page-zdjg-ldjg>
        <page-zdjg-clbk  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='车辆布控'" class="custom-main-content"></page-zdjg-clbk>
        <page-zdjg-pzyc  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='牌照异常'" class="custom-main-content"></page-zdjg-pzyc>
        <page-zdjg-tscl   v-if="curPage.label=='特殊车辆监管'" class="custom-main-content"></page-zdjg-tscl>
    </div>

</template>

<script>
    import './common.scss'
  import PageZdjgQyjg from './components/page-zdjg-qyjg'
  import PageZdjgLdjg from './components/page-zdjg-ldjg'
  import PageZdjgClbk from './components/page-zdjg-clbk'
  import PageZdjgTscl from './components/page-zdjg-tscl'
  import PageZdjgPzyc from './components/page-zdjg-pzyc'
  export default {
    components: {
      PageZdjgQyjg,
      PageZdjgLdjg,
      PageZdjgClbk,
      PageZdjgTscl,
      PageZdjgPzyc
    },
    data(){
      return {
        curPage: {},
        firstItem:"重点监管",
        pageOptions: [
          {label: '区域监管'},
          {label: '路段监管'},
          {label: '车辆布控'},
          {label: '特殊车辆监管'},
          {label: '牌照异常'},
        ],
      }
    },
    mounted(){
      this.curPage = this.pageOptions[0]
    },
    methods: {
      tsclCli(val){
        this.curPage = val


      }
    }
  }
</script>

<style lang="scss">
    .page-zdjg {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>
