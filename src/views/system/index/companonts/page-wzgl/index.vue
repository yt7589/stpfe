<template>
  <div class="page-wzgl">
    <div class="custom-menu-box">
      <span class="menu" v-for="(option,index) in pageOptions" :key="index"
            :class="curPage===option?'is-active':''" @click="curPage=option">{{option.label}}</span>
    </div>
    <page-wzgl-wzjg v-show="curPage.label=='违章监管'" class="custom-main-content"></page-wzgl-wzjg>
    <page-wzgl-wzfb v-show="curPage.label=='违章分布'" class="custom-main-content"></page-wzgl-wzfb>
  </div>
</template>

<script>
  import PageWzglWzjg from './components/page-wzgl-wzjg'
  import PageWzglWzfb from './components/page-wzgl-wzfb'

  export default {
    components: {PageWzglWzfb, PageWzglWzjg},
    data(){
      return {
        loading: false,
        curPhoto: {},
        curPage: {},
        pageOptions: [
          {label: '违章监管'},
          {label: '违章分布'},
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
  .page-wzgl {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
