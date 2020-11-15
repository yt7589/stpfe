<template>
  <div class="result-image">
    <div class="image_wrapper">
      <el-image class="image" :src="result.thumbImage">
        <div slot="error"></div>
        <div slot="placeholder"></div>
      </el-image>
    </div>
    <div class="result-text">
      <div>车型: {{result.CXTZ.PPXHMS}}</div>
      <div>车牌: {{result.HPTZ.HPHM}}</div>
      <div>类别: {{result.CXTZ.CLLXFL}}</div>
      <div>方位: {{result.WZTZ.PSFX}}</div>
      <div>颜色: {{result.CXTZ.CSYS}}</div>
    </div>
  </div>
</template>

<script>
  export default{
    props: ['result'],
    data(){
      return {}
    },
    mounted(){
//      console.log("mounted", this.result)
    },
    methods: {}
  }
</script>

<style lang="scss">
  .result-image {
    display: flex;
    align-items: center;

    margin-bottom: 15px;

    .image_wrapper {
      width: 210px;
      height: 160px;
      background: #194D70;
      border-radius: 4px;
      border: 2px solid #006473;

      position: relative;
      > .image {
        position: absolute;
        top: 6px;
        left: 6px;
        right: 6px;
        bottom: 6px;
      }
    }
    .result-text {
      width: 160px;
      margin-left: 10px;

      font-size: 14px;
      color: rgba(0, 246, 255, 1);

      > div {
        line-height: 28px;
      }
    }
  }
</style>
