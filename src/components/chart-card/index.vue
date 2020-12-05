<template>
  <div class="chart-card">
    <div class="title">{{title}}</div>
    <div class="body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title'],
    data(){
      return {}
    },
    mounted(){
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .chart-card {
    position: relative;
    .title {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 30px;

      font-size: 18px;
      color: #FFFFFF;

      background: url(./bg-card-head-2.png) no-repeat;
      background-size: 100% 60%;
      -moz-background-size: 100% 60%;
      /*padding-bottom: 3px;*/
      background-position: bottom;
    }


    .body {
      position: absolute;
      width: 100%;
      top: 38px;
      bottom: 0px;
    }
  }
</style>
