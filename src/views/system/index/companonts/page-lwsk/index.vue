<template>
  <div class="page-lwsk">
    <div class="custom-menu-box">
      <span class="menu" v-for="(option,index) in pageOptions" :key="index"
            :class="curPage===option?'is-active':''" @click="curPage=option">{{option.label}}</span>
    </div>
    <page-lwsk-spfx v-show="curPage.label=='视频分析'" class="page-lwsk-spfx custom-main-content-full"></page-lwsk-spfx>
    <page-lwsk-lwgc v-show="curPage.label=='路网过车'" class="page-lwsk-spfx custom-main-content-full"></page-lwsk-lwgc>
  </div>
</template>

<script>
  import PageLwskSpfx from './components/page-lwsk-spfx'
  import PageLwskLwgc from './components/page-lwsk-lwgc'

  export default {
    components: {PageLwskSpfx, PageLwskLwgc},
    data(){
      return {
        loading: false,
        curPhoto: {},
        curPage: {},
        pageOptions: [
          {label: '视频分析'},
          {label: '路网过车'},
        ],
      }
    },
    mounted(){
      this.curPage = this.pageOptions[0]
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  .page-lwsk {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
