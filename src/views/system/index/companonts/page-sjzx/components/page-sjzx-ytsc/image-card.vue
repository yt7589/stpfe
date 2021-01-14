<template>
  <div class="image-card">
    <el-image :src="require('../../image/ytsc_001.jpg')" fit="contain"></el-image>
    <div class="text">{{image.location}}</div>
    <div class="text">{{image.image}}</div>
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
      background: rgba(0, 115, 255, 0.2);
      border-radius: 4px;
      border: solid 4px #808FB7;
    }

    .text {
      margin-top: 5px;
      color: white;
      font-size: 14px;
    }

  }
</style>
