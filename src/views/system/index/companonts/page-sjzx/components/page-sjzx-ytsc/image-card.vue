<template>
  <div class="image-card">
    <el-image :src="image.picUrl" fit="contain"></el-image>
    <div class="text">{{image.picAddr}}</div>
    <div class="text">{{image.picTime}}</div>
  </div>
</template>

<script>
  export default {
    props: ['image'],
    components: {},
    data(){
      return {}
    },
    mounted(){
    },
    methods: {}
  }
</script>

<style lang="scss">
  .image-card {
    text-align: center;

    .el-image {
      width: 162px;
      height: 160px;
      background: rgba(0, 115, 255, 0.2);
      border-radius: 4px;
      border: solid 4px #808FB7;
    }

    .text {
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 5px;
      color: white;
      font-size: 14px;
    }

  }
</style>
