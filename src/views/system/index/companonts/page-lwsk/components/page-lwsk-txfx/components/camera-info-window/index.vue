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
              <div :style="scope.row.status=='已接入'?{}:{color:'red'}">{{scope.row.status == '已接入' ? "正常" : "异常"}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="button-box" v-show="!cameraPhotoDialog.visible">
      <el-button type="text" icon="el-icon-arrow-up" :disabled="hasPrevious">上一页</el-button>
      <el-button type="text" icon="el-icon-arrow-down" :disabled="hasNext">下一页</el-button>
    </div>

    <el-dialog :visible.sync="cameraPhotoDialog.visible" custom-class="camera-photo-dialog" :modal="true" :append-to-body="true" style="overflow: hidden;">
      <camera-photo-dialog v-if="cameraPhotoDialog.visible" :data="cameraPhotoDialog.data"></camera-photo-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import CameraPhotoDialog from '../camera-photo-dialog/index.vue'
  import API from '@/api'

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
    computed: {
      hasNext(){
        return false
      },
      hasPrevious(){
        return false
      }
    },
    mounted(){
    },
    methods: {
      onRowClick(row, column, event){
        this.$store.commit("stp/video_analysis/setCameraId", 101)

        API.querySdPic({diId: row.diId}).then(res => {
          this.cameraPhotoDialog.data = res.data
          this.cameraPhotoDialog.visible = true;
          this.visible = false
        })
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
      /*bottom: 14px;*/
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
      position: absolute;
      bottom: 20px;
      left: calc(50% - 88px);
      text-align: center;

      .el-button {
        background: #0073FF;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        color: #000205;

        padding-left: 10px;
        padding-right: 10px;

        &.is-disabled {
          background: #045FE04D;
        }
      }
    }
  }

  .camera-photo-dialog {
    background: transparent;
    .el-dialog {
      background: transparent;
    }
    .el-dialog__header {
      display: none;
    }
  }
</style>
