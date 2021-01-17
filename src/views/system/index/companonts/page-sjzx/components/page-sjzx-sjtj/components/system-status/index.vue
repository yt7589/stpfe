<template>
  <div class="system-status">
    <div class="title">
      <el-image fit="contain" :src="require('../../image/image-overflow.png')"></el-image>
      系统概况
    </div>

    <div class="card-box">
      <div class="card">
        <el-image fit="contain" :src="require('../../image/image-camera.png')"></el-image>
        <div>
          <div class="text-value">{{data.device}}</div>
          <div class="text-title">设备总数</div>
        </div>
      </div>
      <div class="card">
        <el-image fit="contain" :src="require('../../image/image-focus.png')"></el-image>
        <div>
          <div class="text-value">{{data.control}}</div>
          <div class="text-title">布控数量</div>
        </div>
      </div>
      <div class="card">
        <el-image fit="contain" :src="require('../../image/image-warn.png')"></el-image>
        <div>
          <div class="text-value">{{data.alerts}}</div>
          <div class="text-title">报警数量</div>
        </div>
      </div>
    </div>

    <div class="card-box">
      <div class="card">
        <el-image fit="contain" :src="require('../../image/image-car-special.png')"></el-image>
        <div>
          <div class="text-value">{{data.keyVehicle}}</div>
          <div class="text-title">重点车辆</div>
        </div>
      </div>
      <div class="card">
        <el-image fit="contain" :src="require('../../image/image-car-violation.png')"></el-image>
        <div>
          <div class="text-value">{{data.ils}}</div>
          <div class="text-title">违章总数</div>
        </div>
      </div>
      <div class="card">
        <el-image fit="contain" :src="require('../../image/image-car.png')"></el-image>
        <div>
          <div class="text-value">{{data.truck}}</div>
          <div class="text-title">大货车总数</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['data'],
    components: {},
    data(){
      return {}
    },
    mounted(){
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .system-status {
    .title {
      font-size: 18px;
      color: #FFFFFF;
      margin-bottom: 10px;

      .el-image {
        width: 20px;
        height: 20px;

        margin: 20px 8px 20px 20px;
        vertical-align: middle;
      }
    }

    .card-box + .card-box {
      margin-top: 18px;
    }

    .card-box {
      width: calc(100% - 68px);
      margin-left: 34px;
      height: calc(50% - 60px);

      display: flex;
      justify-content: space-between;
      .card {
        width: calc(33% - 5px);
        height: 100%;

        background: url('../../image/background-card.png') no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        .el-image {
          width: 24px;
          height: 24px;
          margin-right: 14px;
        }

        .text-title {
          font-size: 12px;
          color: #FFFFFF;
          line-height: 17px;

          margin-bottom: 12px;
        }

        .text-value {
          font-size: 22px;
          color: #FFFFFF;
          line-height: 28px;
        }
      }
    }
  }
</style>
