<template>
  <div class="card" :style="style">
    <div class="card-wrapper">
      <div class="title">{{title}}</div>
      <div class="value">{{value}}</div>
      <el-image :src="image" class="image"></el-image>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['image', 'value', 'title', 'color'],
    data(){
      let that = this
      return {
        style: {
          color: that.color,
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .card {
    background: url(./image/bg-card.png) no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;

    .card-wrapper {
      width: 100%;
      height: 100%;
      text-align: center;
      position: relative;

      .title {
        position: absolute;
        top: 31px;
        width: 100%;

        font-size: 18px;
      }
      .value {
        position: absolute;
        top: 71px;
        left: 107px;

        font-size: 24px;
        font-weight: bold;
      }
      .image {
        position: absolute;
        top: 59px;
        left: 4px;
        width: 95px;
        height: 79px;
      }
    }
  }
</style>
