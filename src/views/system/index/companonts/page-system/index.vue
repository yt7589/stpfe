<template>
    <div class="page-system">
        <div class="custom-menu-box">
              <span class="menu" v-for="(option,index) in pageOptions" :key="index"
                    :class="curPage===option?'is-active':''"   @click="curPage=option" >{{option.label}}
              </span>
        </div>
        <page-zhlb  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='账号列表'" class="custom-main-content"></page-zhlb>
        <page-wdzh  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='我的账号'" class="custom-main-content"></page-wdzh>
        <page-setting  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='页面设置'" class="custom-main-content"></page-setting>
    </div>
</template>

<script>
    import PageZhlb from './components/zhlb'
    import PageWdzh from './components/wdzh'
    import PageSetting from './components/setting'
  export default {
    name: 'page-system',
    components:{
      PageZhlb,
      PageWdzh,
      PageSetting
    },
    data(){
      return {
        curPage: {},
        firstItem:"系统管理",
        pageOptions: [
          {label: '账号列表'},
          {label: '我的账号'},
          {label: '页面设置'}
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
