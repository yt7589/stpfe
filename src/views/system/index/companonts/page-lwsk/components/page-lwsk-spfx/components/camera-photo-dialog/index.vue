<template>
  <div class="camera-photo-dialog">
    <div class="wrapper" v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-image v-if="!loading" id="img001" style="width: 100%; height: 80%" fit="contain" :src="originImage" @mouseenter="mouseenter" @mouseleave="mouseleave">
      </el-image>
      <ul class="item-box" id="image-box">
        <div class="left-button" @click="goLeft" v-if="!loading"></div>
        <li
          class="li-image"
          v-for="item in vehs"
          :key="item.wsmVfvvIdx"
          @click="selVeh = item;toIlsDetailPage(item.vehIdx)"
        >
          <el-image :src="item.cutImgUrl" class="bottom-image" :alt="originImage" fit="contain"> </el-image>
          <div>
            <div style="display: flex; justify-content: center">
              <span class="chepai">{{ item.hphm }}</span>   
              <span style="color: #00f6ff">{{ item.crossTime }}</span>
            </div>
            <div style="display: flex; justify-content: center">
              <!-- {{item.trafficViolationName}}:{{item.trackId}}:{{item.cutImgUrl.substring(item.cutImgUrl.length-10)}} -->
              {{ item.trafficViolationName }}
            </div>
          </div>
        </li>
        <div class="right-button" @click="goRight" v-if="!loading"></div>
      </ul>
      <!--<i class="el-icon-close"></i>-->
      <div class="selected-image" v-if="table.current">
        <div class="title">违章详情</div>
        <div class="box">
          <el-image
            :src="require('../../image/lwsk_spfx_2.jpg')"
            style="width: 40%"
          ></el-image>
          <div style="width: 50%">
            <div>{{ table.current.siteName }}</div>
            <div>
              {{ table.current.yModel + (table.current.yModel ? "款" : "") }}
            </div>
            <div>{{ table.current.ilsType }}</div>
            <div>{{ table.current.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api";
import dayjs from "dayjs";
import util from '@/libs/util'
export default {
  //props: ['data'],
  components: {},
  data() {
    return {
      loading:true,
      data: [],
      vehs: [],
      selVeh: null,
      originImage: "http://222.128.117.234:8090/www/images/a.jpg",
      tvisJsonId: '',
      table: {
        data: [],
        pagination: {
          currentPage: 1,
          total: 0,
          pageSize: 20,
        },
        current: null,
      },
    };
  },
  created(){
  },
  mounted() {
    this.initData();
    console.log("########### Yantao 001???: camera-photo-dialog");
    this.initMouseEvent();
    this.getTvisAnalysisResult();
  },
  methods: {
    mouseenter(){
      console.log('mouseenter')
    },
    mouseleave(){
      console.log('mouseleave')
    },
    toIlsDetailPage(vehIdx){
      let params = {
        vehIdx: vehIdx,
        tvisJsonId: this.tvisJsonId
      }
      util.bus.$emit('gowzDetail',params);
    },
    getTvisAnalysisResult() {
      let cameraId = this.$store.state.stp.video_analysis.cameraId;
      console.log("getTvisAnalysisResult ???????    cameraId=" + cameraId + "!");
      let params = {
        p: "pc",
        v: "0.0.1",
        cameraId: cameraId,
        baseTvisJsonId: -1,
        direction: 0,
      };
      let pageObj = this;
      API.getTvisAnalysisResult(params).then((res) => {
        console.log("get the result of getTvisAnalysisResult! res:" + JSON.stringify(res) + "!");
        if (res.data != null) {
          pageObj.loading = false;
          console.log("result: " + JSON.stringify(res.data) + "!");
          pageObj.tvisJsonId = res.data.tvisJsonId;
          pageObj.originImage = res.data.originImage;
          pageObj.vehs = res.data.data;
        }
      });
    },
    initMouseEvent() {
      window.addEventListener("mousewheel", this.handleScroll, false);
    },
    handleScroll(e) {
      let selector = document.querySelector("#image-box");
      if (selector) {
        selector.scrollLeft += e.deltaY > 0 ? 20 : -20;
      }
    },
    goLeft(){
      let selector = document.querySelector("#image-box");
      if (selector) {
        selector.scrollLeft = selector.scrollLeft - 200;
      }
    },
    goRight(){
      let selector = document.querySelector("#image-box");
      if (selector) {
        selector.scrollLeft = selector.scrollLeft + 200;
      }
    },
    initData() {
      // 置空websocket接收功能
      this.$globalws.ws.onmessage = function(data) {
      }
    },
    getTimeOffset(str) {
      let sec = dayjs().diff(dayjs(str), "second");

      if (sec > 3600 * 24 * 30) {
        return dayjs().diff(dayjs(str), "month") + "月以前";
      } else if (sec > 3600 * 24) {
        return parseInt(sec / (3600 * 24)) + "天以前";
      } else if (sec > 3600) {
        return parseInt(sec / 3600) + "小时以前";
      } else if (sec > 60) {
        return parseInt(sec / 60) + "分钟以前";
      } else {
        return parseInt(sec) + "秒以前";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.camera-photo-dialog {
  width: 840px;
  height: 730px;
  background: rgba(4, 95, 224, 0.3);
  border: 2px solid #00f6ff;
  position: relative;
  z-index: 8000;

  .wrapper {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    z-index: 8000;
  }

  .item-box {
    width: calc(100% - 60px);
    height: 20%;
    overflow-x: scroll;
    overflow-y: hidden;
    margin: 0 auto;
    padding: unset;
    display: flex;
    .left-button {
      position: absolute;
      z-index: 8001;
      left: -10px;
      width: 37px;
      height: 45px;
      background: url(../../image/left-button.png) no-repeat;
      top: 88%;
    }
    .right-button {
      z-index: 8001;
      position: absolute;
      right: -15px;
      width: 37px;
      height: 45px;
      background: url(../../image/right-button.png) no-repeat;
      top: 88%;
      
    }
  }

  .li-image {
    width: 140px;
    // min-width: 140px;
    height: 100%;
    font-size: 12px;
    margin-right: 4px;
    color: white;
    display: inline-block;
    // background-color: red;
    cursor: pointer;
    .bottom-image {
      height: calc(100% - 40px);
      width: 140px;
    }
  }

  .selected-image {
    width: 306px;
    height: 180px;
    background: #d1494e;
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

      .el-image {
        width: 123px;
        height: 133px;
      }
    }
  }
  .chepai{
    margin-right: 10px;
  }
}
</style>
