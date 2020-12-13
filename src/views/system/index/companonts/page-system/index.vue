<template>
    <div class="page-system">
        <div class="custom-menu-box">
              <span class="menu" v-for="(option,index) in pageOptions" :key="index"
                    :class="curPage===option?'is-active':''"   @click="curPage=option" >{{option.label}}
              </span>
        </div>
        <page-zhlb  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='账号列表'" class="custom-main-content"></page-zhlb>
        <page-wdzh  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='我的账号'" class="custom-main-content"></page-wdzh>
    </div>
</template>

<script>
    import PageZhlb from './components/zhlb'
    import PageWdzh from './components/wdzh'
  export default {
    name: 'page-system',
    components:{
      PageZhlb,
      PageWdzh
    },
    data(){
      return {
        curPage: {},
        firstItem:"系统管理",
        pageOptions: [
          {label: '账号列表'},
          {label: '我的账号'},
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
