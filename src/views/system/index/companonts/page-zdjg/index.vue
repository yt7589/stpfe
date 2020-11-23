<template>
    <div class="page-zdjg">
        <div class="custom-menu-box">
        <span class="menu" v-for="(option,index) in pageOptions" :key="index"
            :class="curPage===option?'is-active':''" @click="curPage=option">{{option.label}}</span>
        </div>
        <page-zdjg-qyjg  :first-item="firstItem" :second-item="curPage.label" v-show="curPage.label=='区域监管'" class="custom-main-content"></page-zdjg-qyjg>
    </div>

</template>

<script>
    import './common.scss'
  import PageZdjgQyjg from './components/page-zdjg-qyjg'
  export default {
    components: {
      PageZdjgQyjg,
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
    methods: {}
  }
</script>

<style lang="scss">
    .page-zdjg {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>
