<template>
  <div class="page-lwsk-lwgc" flex="dir:top">
    <div class="header-crumb">
      <span>路网实况>路网过车</span>
    </div>
    <div flex-box="1" class="body">
      <div class="column-left">
        <div class="camera-point-top10" flex="dir:top">
          <div class="title">
            <el-image :src="require('../../image/image-camera-green.png')"></el-image>
            <span>监控点位过车前10</span>
          </div>
          <div class="unit">单位：万</div>
          <div flex-box="1">
            chart
          </div>
        </div>
        <div class="car-flow">
          <div class="title">
            <el-image :src="require('../../image/image-chart.png')"></el-image>
            <span>车辆数量走势图</span>
          </div>
        </div>
      </div>
      <div class="column-right">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
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
  .page-lwsk-lwgc {
    .header-crumb {
      width: 100%;
      height: 64px;

      background: rgba(0, 115, 255, 0.2);
      border-radius: 4px;

      font-size: 18px;
      color: #00F6FF;

      span {
        margin-left: 23px;
        line-height: 64px;
      }
    }

    .body {
      margin-top: 8px;
      width: 100%;
      display: flex;

      .column-left {
        width: 33%;

        .camera-point-top10 {
          width: 100%;
          height: calc(55% - 16px);
          margin-bottom: 16px;
        }

        .car-flow {
          width: 100%;
          height: 45%;
        }

        .camera-point-top10, .car-flow {

          background: rgba(4, 95, 224, 0.3);
          border-radius: 4px;

          .title {
            padding: 18px 24px;

            font-size: 18px;
            color: #FFFFFF;

            .el-image {
              width: 24px;
              height: 24px;
              margin-right: 8px;
            }
          }

          .unit {
            padding-right: 18px;
            font-size: 14px;
            color: #FFFFFF;
            line-height: 20px;
            text-align: right;
          }
        }
      }

      .column-right {
        width: calc(67% - 16px);
        margin-left: 16px;
      }
    }
  }
</style>
