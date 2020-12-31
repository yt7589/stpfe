<template>
  <div class="camera-info-window">
    <div class="main-content" v-show="!cameraPhotoDialog.visible">
      <div class="window-wrapper">
        <div class="header">
        <span>
          <div>该点位共有： </div>
          {{data.camera}}个摄像头、{{data.snapshot}}个抓拍机
        </span>
          <i class="el-icon-close icon-close" @click="close"></i>
        </div>
        <el-table :data="data.recs" v-if="data.recs" class="custom-table camera-table"
                  @row-click="onRowClick">
          <el-table-column prop="diAddr" align="center" label="设备位置" minWidth="80"></el-table-column>
          <el-table-column prop="direction" align="center" label="朝向" minWidth="40"></el-table-column>
          <el-table-column prop="category" align="center" label="类别" minWidth="80"></el-table-column>
          <el-table-column prop="status" align="center" label="状态" minWidth="40">
            <template slot-scope="scope">
              <div :style="scope.row.status=='已接入'?{}:{color:'red'}">{{scope.row.status=='已接入' ? "正常" : "异常"}}</div>
            </template>
          </el-table-column>
        </el-table>
        <!--<div class="button-box">-->
        <!--<el-button type="text" icon="el-icon-arrow-up">上一页</el-button>-->
        <!--<el-button type="text" icon="el-icon-arrow-down">下一页</el-button>-->
        <!--</div>-->
      </div>
    </div>

    <div class="small-image-box">

    </div>

    <el-dialog :visible.sync="cameraPhotoDialog.visible" class="camera-photo-dialog" :modal="false" style="overflow: hidden;">
      <camera-photo-dialog v-if="cameraPhotoDialog.visible" :data="cameraPhotoDialog.data"></camera-photo-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import CameraPhotoDialog from '../camera-photo-dialog'
  export default {
    props: ['data'],
    components: {CameraPhotoDialog},
    data(){
      return {
        visible: true,
        cameraPhotoDialog: {
          visible: false,
          data: {}
        }
      }
    },
    mounted(){
    },
    methods: {
      onRowClick(row, column, event){
        console.log('cameraId=' + row.diId + '!!!!!!!!!!!! store:' + JSON.stringify(this.$store.state.stp.video_analysis) + '!')
        this.$store.stp.video_analysis.commit("setCameraId", 101)
        console.log('??????????????????????????? OK ??????????????????????????')
        console.log('##### cameraId=' + this.$store.state.stp.video_analysis.cameraId + '!!!!!!!!!!!!!!!!!!!!!!!!')
        this.cameraPhotoDialog.data = row
        this.cameraPhotoDialog.visible = true;
        this.visible = false
      },
      close(){
        this.$emit("close")
      },

    }
  }
</script>

<style lang="scss">
  .camera-info-window {
    width: 400px;
    height: 618px;

    .main-content {
      width: 100%;
      height: 100%;
      position: relative;

      background: #001537;
      border-radius: 4px;
      border: 1px solid #0073FF;
    }

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
      height: calc(100% - 60px);
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

    .camera-photo-dialog {
      .el-dialog {
        background: transparent;
      }
      .el-dialog__header {
        display: none;
      }
    }
  }
</style>
