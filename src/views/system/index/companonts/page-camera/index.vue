<template>
    <div class="page-sbgl">
        <div class="custom-menu-box">
              <span class="menu" v-for="(option,index) in pageOptions" :key="index"
                    :class="curPage===option?'is-active':''"   @click="curPage=option" >{{option.label}}
              </span>
        </div>
        <page-sblb  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='设备列表'" class="custom-main-content"></page-sblb>
        <page-kjgl  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='空间管理'" class="custom-main-content"></page-kjgl>
        <page-jdgl  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='节点管理'" class="custom-main-content"></page-jdgl>

    </div>
</template>

<script>
    import PageSblb from './components/sblb'
    import PageJdgl from './components/jdgl'
    import PageKjgl from './components/kjgl'
  export default {
    name: 'page-sbgl',
    components:{
      PageSblb,
      PageJdgl,
      PageKjgl
    },
    data(){
      return {
        curPage: {},
        firstItem:"设备管理",
        pageOptions: [
          {label: '设备列表'},
          {label: '空间管理'},
          {label: '节点管理'},

        ],
      }
    },
    mounted(){
      this.curPage = this.pageOptions[0]
    },
    methods: {}
  }
</script>

<style scoped>

</style>
