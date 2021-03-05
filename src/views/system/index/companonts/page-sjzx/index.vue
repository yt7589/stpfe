<template>
  <div class="page-sjzx">
    <div class="custom-menu-box">
      <span class="menu" v-for="(option,index) in pageOptions" :key="index"
            :class="curPage===option?'is-active':''" @click="curPage=option">{{option.label}}</span>
    </div>
    <page-sjzx-qbsj v-if="curPage.label=='全部数据'" class="custom-main-content"></page-sjzx-qbsj>
    <page-sjzx-sjtj v-if="curPage.label=='数据统计'" class="custom-main-content"></page-sjzx-sjtj>
    <page-sjzx-gjhf v-if="curPage.label=='轨迹回放'" class="custom-main-content"></page-sjzx-gjhf>
    <page-sjzx-ytsc v-if="curPage.label=='以图搜车'" :ytscVeh="ytscVeh" :searchVeh="searchVeh" @leaveSJZX="leaveSJZX" class="custom-main-content"></page-sjzx-ytsc>
    <page-sjzx-sjbg v-if="curPage.label=='数据报告'" class="custom-main-content"></page-sjzx-sjbg>
  </div>
</template>

<script>
  import PageSjzxQbsj from './components/page-sjzx-qbsj'
  import PageSjzxSjtj from './components/page-sjzx-sjtj'
  import PageSjzxGjhf from './components/page-sjzx-gjhf'
  import PageSjzxYtsc from './components/page-sjzx-ytsc'
  import PageSjzxSjbg from './components/page-sjzx-sjbg'
  import util from '@/libs/util'

  export default {
    components: {PageSjzxQbsj, PageSjzxSjtj, PageSjzxGjhf, PageSjzxYtsc, PageSjzxSjbg},
    props:['searchVeh'],
    data(){
      return {
        loading: false,
        curPhoto: {},
        curPage: {},
        ytscVeh: {},
        pageOptions: [
          {label: '全部数据'},
          {label: '数据统计'},
          {label: '轨迹回放'},
          {label: '以图搜车'},
          {label: '数据报告'},
        ],
      }
    },
    created(e){
      util.bus.$on('goSearchVeh_sjzx',this.goSearchVeh_sjzx)
    },
    mounted(){
      if(this.searchVeh != null && this.searchVeh.imgUrl != null){
        this.curPage = this.pageOptions[3]
      }else{
        this.curPage = this.pageOptions[0]
      }
    },
    methods: {
      leaveSJZX(){
        this.$emit('leaveSJZX')
      },
      goSearchVeh_sjzx(veh){
        this.ytscVeh = veh
        this.curPage = this.pageOptions[3]
      }
    }
  }
</script>

<style lang="scss">
  .page-sjzx {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
