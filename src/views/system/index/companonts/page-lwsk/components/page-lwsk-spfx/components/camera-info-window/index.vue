<template>
  <div class="camera-info-window">
    <div class="window-wrapper" flex="dir:top">
      <div class="header">
        <span>
          <div>该点位共有： </div>
          1个摄像头、2个抓拍机
        </span>
        <i class="el-icon-close icon-close" @click="close"></i>
      </div>
      <el-table :data="data" v-if="data" class="custom-table camera-table" flex-box="1">
        <el-table-column prop="location" label="设备位置" minWidth="80"></el-table-column>
        <el-table-column prop="to" label="朝向" minWidth="40"></el-table-column>
        <el-table-column prop="type" label="类别" minWidth="80"></el-table-column>
        <el-table-column prop="status" label="状态" minWidth="40"></el-table-column>
      </el-table>
      <div class="button-box">
        <el-button type="text" icon="el-icon-arrow-up">上一页</el-button>
        <el-button type="text" icon="el-icon-arrow-down">下一页</el-button>
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
    methods: {
      close(){
        this.$emit("close")
      }
    }
  }
</script>

<style lang="scss">
  .camera-info-window {
    width: 400px;
    height: 618px;
    background: #001537;
    border-radius: 4px;
    border: 1px solid #0073FF;

    position: relative;
    .window-wrapper {
      position: absolute;
      top: 22px;
      bottom: 14px;
      left: 20px;
      right: 20px;
    }

    .header {
      color: #FFFFF0;
      font-size: 18px;
      display: flex;
      justify-content: space-between;

      .icon-close {
        font-size: 35px;
      }
    }

    .camera-table {
      margin-top: 10px;
      background: transparent !important;

      .el-table__row {
        cursor: pointer;
      }
    }

    .button-box {
      margin-top: 14px;
      text-align: center;

      .el-button {
        background: #0073FF;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        color: #000205;

        padding-left: 10px;
        padding-right: 10px;
      }
    }
  }
</style>
