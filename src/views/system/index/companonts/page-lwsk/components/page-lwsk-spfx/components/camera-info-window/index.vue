<template>
  <div class="camera-info-window">
    <div class="main-content" v-show="(!cameraVideoDialog.visible && !cameraPhotoDialog.visible)">
      <div class="window-wrapper">
        <div class="header">
          <span>
            <div>该点位共有： </div>
            {{data.camera}}个摄像头、{{data.snapshot}}个抓拍机
          </span>
          <i class="el-icon-close icon-close" @click="close"></i>
        </div>
        <el-table :data="itemData" v-if="data.recs" class="custom-table camera-table"
                  @row-click="onRowClick">
          <el-table-column prop="diAddr" align="center" label="设备位置" minWidth="80"></el-table-column>
          <el-table-column prop="direction" align="center" label="朝向" minWidth="40"></el-table-column>
          <el-table-column prop="category" align="center" label="类别" minWidth="70"></el-table-column>
          <el-table-column prop="status" align="center" label="状态" minWidth="40"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="button-box" v-show="(!cameraVideoDialog.visible && !cameraPhotoDialog.visible)">
      <el-button type="text" icon="el-icon-arrow-up" :disabled="hasPrevious" @click="goPrevious">上一页</el-button>
      <el-button type="text" icon="el-icon-arrow-down" :disabled="hasNext" @click="goNext">下一页</el-button>
    </div>

    <el-dialog :visible.sync="cameraVideoDialog.visible" custom-class="camera-photo-dialog" :modal="true" :append-to-body="true" style="overflow: hidden;">
      <camera-video-dialog v-if="cameraVideoDialog.visible" :data="cameraVideoDialog.data"></camera-video-dialog>
    </el-dialog>
    <el-dialog :visible.sync="cameraPhotoDialog.visible" custom-class="camera-photo-dialog" :modal="true" :append-to-body="true" style="overflow: hidden;">
      <camera-photo-dialog v-if="cameraPhotoDialog.visible" :data="cameraPhotoDialog.data"></camera-photo-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import CameraVideoDialog from '../camera-video-dialog/index.vue'
  import CameraPhotoDialog from '../camera-photo-dialog/index.vue'
  import API from '@/api'

  export default {
    props: ['data'],
    components: {CameraVideoDialog, CameraPhotoDialog},
    data(){
      return {
        index: 0,
        listData:[],
        itemData:[],
        visible: true,
        cameraVideoDialog: {
          visible: false,
          data: {}
        },
        cameraPhotoDialog: {
          visible: false,
          data: {}
        },
        hasNext:true,
        hasPrevious:true,
        pageCount:0
      }
    },
    watch: {
      data: {
        immediate: true, // 初次监听即执行  
        deep: true,
        handler(val) {
          this.initData(val);
        }
      }
    },
    mounted(){
      // this.initData();
    },
    methods: {
      goPrevious(){
        this.index = this.index-1;
        this.itemData = this.listData[this.index]
        if(this.index === 0){
          this.hasPrevious = true;
        }
        if(this.index < (this.pageCount-1)){
            this.hasNext = false;
          }
      },
      goNext(){
        this.index = this.index+1;
        this.itemData = this.listData[this.index]
        if(this.index === (this.pageCount-1)){
          this.hasNext = true;
        }
        if(this.index < (this.pageCount-1)){
          this.hasPrevious = false;
        }
      },
      initData(){
        let length = this.data.recs.length;
        this.pageCount = Math.ceil(length/10) ;
        this.listData = [];
        for(let i=0;i<this.pageCount;i++){
          var dataArray = [].concat(this.data.recs);
          let array = [];
          array = dataArray.splice(0,10);
          this.listData.push(array);
        }
        if(this.pageCount > 1){
          this.hasNext = false;
        }
        this.itemData = this.listData[this.index];
      },
      onRowClick(row, column, event){
        this.$store.commit("stp/video_analysis/setCameraId", row.diId)
        if ('抓拍机' == row.category) {
          this.cameraPhotoDialog.data = row
          this.cameraPhotoDialog.visible = true
          this.visible = false
        } else {
          this.$store.commit("stp/video_analysis/setStreamId", row.streamId)
          this.cameraVideoDialog.data = row
          this.cameraVideoDialog.visible = true
          this.visible = false
        }
      },
      close(){
        this.$emit("close")
      },
    }
  }
</script>

<style lang="scss">
  .camera-info-window {
    width: 500px;
    display: flex;
    justify-content: center;
    align-self: center;
    margin-top: 50px;
    flex-direction: column;

    .main-content {
      width: 100%;
      min-height: 618px;
      position: relative;
      background: #001537;
      border-radius: 4px;
      border: 1px solid #0073FF;
    }

    .window-wrapper {
      margin-left: 20px;
      margin-right: 20px;
      margin-bottom: 70px;
      .header {
        color: #FFFFF0;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        .icon-close {
          font-size: 35px;
        }
      }

      .camera-table {
        height: calc(100% - 60px);
        margin-top: 10px;
        background: transparent !important;
        .el-table__header-wrapper{
          height: 60px;
          margin-bottom: -10px;
          color: #001537 !important;
        }

        .el-table__row {
          cursor: pointer;
        }
      }
    }

    .button-box {
      display: flex;
      position: relative;
      text-align: center;
      margin: 0 auto;
      top: -55px;
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
