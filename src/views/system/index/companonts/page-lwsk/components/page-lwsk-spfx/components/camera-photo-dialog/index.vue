<template>
  <div class="camera-photo-dialog">
    <div class="wrapper">
      <el-image style="width:100%;height:80%" :src="require('../../image/image-photo-example.jpg')"></el-image>
      <ul class="item-box" id="image-box">
        <li class="li-image" v-for="i in 10">
          <el-image :src="require('../../image/image-photo-example.jpg')"></el-image>
          <div>
            <div style="display: flex;justify-content: space-between;">
              <span>京A12082</span>
              <span style="color:#00F6FF;">12ms以前</span>
            </div>
            <div>
              无违规
            </div>
          </div>
        </li>
      </ul>
      <!--<i class="el-icon-close"></i>-->
      <div class="selected-image">
        <div class="title">违章详情</div>
        <div class="box">
          <el-image :src="require('../../image/image-photo-example.jpg')" style="width:40%"></el-image>
          <div style="width:50%;">
            <div>中山路</div>
            <div>2012款奔驰</div>
            <div>超速</div>
            <div>2020-11-11 10:00:00</div>
          </div>
        </div>

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
      console.log('camera-photo-diag page cameraId=' + this.$store.state.stp.video_analysis.cameraId + '!!!!!!!!!!!!!!!!!!!')
      this.initMouseEvent()
    },
    methods: {
      initMouseEvent(){
        window.addEventListener('mousewheel', this.handleScroll, false)
      },
      handleScroll (e) {
        let selector = document.querySelector("#image-box")
        if (selector) {
          selector.scrollLeft += (e.deltaY > 0 ? 20 : -20);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .camera-photo-dialog {
    width: 840px;
    height: 730px;

    background: #045FE04D;
    border: 2px solid #00F6FF;

    position: relative;

    .wrapper {
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 20px;
    }

    .item-box {
      width: 100%;
      height: 20%;
      overflow-x: scroll;
      overflow-y: hidden;
      margin: unset;
      padding: unset;
      display: flex;
    }

    .li-image {
      /*width: 140px;*/
      min-width: 140px;
      height: 100%;
      font-size: 14px;
      margin-right: 4px;
      color: white;
      display: inline-block;

      .el-image {
        height: calc(100% - 40px);
        width: 100%;
      }
    }

    .selected-image {
      width: 306px;
      height: 180px;
      background: #D1494E;
      top: -22px;
      left: -347px;
      position: absolute;

      font-size: 14px;
      color: white;

      > .title {
        width: 100%;
        text-align: center;
        line-height: 30px;
      }

      > .box {
        display: flex;
        justify-content: space-around;
        width: calc(100% - 10px);
        height: calc(100% - 40px);
      }
    }

  }
</style>
