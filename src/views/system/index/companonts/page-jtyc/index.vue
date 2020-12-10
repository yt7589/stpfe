<template>
    <div class="page-jtyc">
        <div class="custom-menu-box">
              <span class="menu" v-for="(option,index) in pageOptions" :key="index"
                    :class="curPage===option?'is-active':''"   @click="curPage=option" >{{option.label}}
              </span>
        </div>
        <page-llyc  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='流量预测'" class="custom-main-content"></page-llyc>
        <page-xcyc  :first-item="firstItem" :second-item="curPage.label" v-if="curPage.label=='行车预测'" class="custom-main-content"></page-xcyc>

    </div>
</template>

<script>
    import PageLlyc from './components/llyc'
    import PageXcyc from './components/xcyc'
  export default {
    components: {
      PageLlyc,
      PageXcyc
    },

    data(){
      return {
        curPage: {},
        firstItem:"交通预测",
        pageOptions: [
          {label: '流量预测'},
          {label: '行车预测'},

        ],
      }
    },
    mounted(){
      this.curPage = this.pageOptions[0]
    },
    methods: {}
  }
</script>
