<template>
  <custom-card title="实时违章记录" class="car-break-card">
    <div class="card-body-wrapper" slot="body">
      <div v-for="(item,index) in data" :key="index" v-if="index<2" style="height:50%; width:100%;display: flex;">
        <el-image :src="item.imgUrl" fit="contain"></el-image>
        <div :span="12" class="result-box">
          <div>位置： {{item.location}}</div>
          <div>车型： {{item.clpp}}</div>
          <div>车款： {{item.ppcx}}</div>
          <div>号牌： {{item.hphm}}</div>
          <div style="color:#00F6FF">违章类型： {{item.violationTypeName}}</div>
          <div>拍摄时间： {{item.time}}</div>
        </div>
      </div>

    </div>
  </custom-card>
</template>

<script>
  import CustomCard from '../custom-card'
  export default {
    props: ['data'],
    components: {
      CustomCard
    },
  }
</script>

<style lang="scss" scoped>
  .car-break-card {
    .card-body-wrapper {
      width: 100%;
      height: calc(100% - 34px);
      margin-top: 17px;
      margin-bottom: 17px
    }

    .line {
      height: 50%;
    }

    .el-image {
      width: 50%;
      vertical-align: middle;
      height: calc(100% - 10px);
      margin: 5px;
    }
    .result-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 17px;

      font-size: 12px;
      color: #FFFFFF;
      /*line-height: 20px;*/
    }
  }

</style>
