<template>
<<<<<<< HEAD
  <div class="camera-photo-dialog">
=======
  <div class="camera-photo-dialog" style="background-color: blue;">
>>>>>>> 7b6f0d3c80e8dbd817dbc8988f28aa5e8c8d0f4a
    <div class="wrapper">
      <el-image id="img001" style="width:100%;height:80%" :src="originImage">
      </el-image>
      <ul class="item-box" id="image-box">
        <li class="li-image" v-for="item in vehs" :key="item.wsmVfvvIdx" @click="selVeh=item">
          <el-image :src="item.cutImgUrl" :alt="originImage">
          </el-image>
          <div>
            <div style="display: flex;justify-content: space-between;">
              <span>{{item.hphm}}</span>
              <span style="color:#00F6FF;">{{item.crossTime}}</span>
            </div>
            <div>
              <!-- {{item.trafficViolationName}}:{{item.trackId}}:{{item.cutImgUrl.substring(item.cutImgUrl.length-10)}} -->
              trackId: {{item.trackId}};
            </div>
          </div>
        </li>
      </ul>
      <!--<i class="el-icon-close"></i>-->
      <div class="selected-image" v-if="table.current">
        <div class="title">违章详情</div>
        <div class="box">
          <el-image :src="require('../../image/lwsk_spfx_2.jpg')" style="width:40%"></el-image>
          <div style="width:50%;">
            <div>{{table.current.siteName}}</div>
            <div>{{table.current.yModel + (table.current.yModel ? "款" : "") }}</div>
            <div>{{table.current.ilsType}}</div>
            <div>{{table.current.time}}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  export default {
    //props: ['data'],
    components: {},
    data(){
      return {
        data: [],
        vehs: [],
        selVeh: null,
        originImage: 'http://222.128.117.234:8090/www/images/a.jpg',
        table: {
          data: [],
          pagination: {
            currentPage: 1,
            total: 0,
            pageSize: 20
          },
          current: null
        },
      }
    },
    mounted(){
      this.initData()
<<<<<<< HEAD
      console.log('############ yantao: camera-video-dialog')
=======
>>>>>>> 7b6f0d3c80e8dbd817dbc8988f28aa5e8c8d0f4a
      console.log('camera-photo-diag page cameraId=' + this.$store.state.stp.video_analysis.cameraId + '!!!!!!!!!!!!!!!!!!!')
      console.log('ws:' + this.$globalws.ws + '; v=' + JSON.stringify(this.$globalws) + '!')
      let msg = {
        'userId': '' + 1018,
        'type': 'wmtRrSpfx',
        'topic': 'ksRrSpfx',
        'cameraId': this.$store.state.stp.video_analysis.cameraId,
        'streamId': 0
      }
      this.$globalws.ws.pageObj = this
      this.$globalws.ws.send(JSON.stringify(msg))
      this.$globalws.ws.onmessage = function(data) {
        console.log('websocket on message......:' + data.data + '!')
        let rst = JSON.parse(data.data)
        let img001 = document.getElementById("img001")
        img001.src = rst.originImage
        console.log('img001.src: ' + img001.src + '; this.pageObj.vehs.length=' + this.pageObj.vehs.length + '!')
        // 车图片数组
        let recs = rst.data
        let hasVeh = false
        let vehLen = 0
        recs.forEach(element => {
          hasVeh = false
          this.pageObj.vehs.forEach(item => {
            if (element.trackId!=-1 && item.trackId == element.trackId) {
              // 更新现有元素信息
              item.wsmVfvvIdx = element.wsmVfvvIdx
              item.vehIdx = element.vehIdx
              item.ppcxnk = element.ppcxnk
              item.hphm = element.hphm
              item.cutImgUrl = element.cutImgUrl
              item.crossTime = element.crossTime
              item.trafficViolationName = element.trafficViolationName
              hasVeh = true
            }
          })
          // 替换元素后 hashVeh为true，进入不到if  会进else？
          if (!hasVeh) {
            if (this.pageObj.vehs.length > 0) {
              this.pageObj.vehs.splice(0, 0, element) // 将没有的元素加在最前面
              vehLen = this.pageObj.vehs.length
              // console.log('-++++-图片显示数组添加新数据：',this.pageObj.vehs,vehLen)
              if (vehLen > 10) { // 只跟踪100辆车，老的车辆信息将丢弃
                this.pageObj.vehs.pop()
              }
            } else {
              this.pageObj.vehs.push(element)
            }
          }
          /*
          if (!hasVeh && this.pageObj.vehs.length > 0) {
            // console.log('-++++-图片显示数组添加新数据：',this.pageObj.vehs,vehLen)
            this.pageObj.vehs.splice(0, 0, element) // 将没有的元素加在最前面
            vehLen = this.pageObj.vehs.length
            // console.log('-++++-图片显示数组添加新数据：',this.pageObj.vehs,vehLen)
            if (vehLen > 10) { // 只跟踪100辆车，老的车辆信息将丢弃
              this.pageObj.vehs.pop()
            }
          } else if (!hasVeh) {
            this.pageObj.vehs.push(element)
          }*/
        })
      }
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
      },
      initData(){
      },
      getTimeOffset(str){
        let sec = dayjs().diff(dayjs(str), 'second')

        if (sec > 3600 * 24 * 30) {
          return dayjs().diff(dayjs(str), 'month') + "月以前"
        } else if (sec > 3600 * 24) {
          return parseInt(sec / (3600 * 24)) + "天以前"
        } else if (sec > 3600) {
          return parseInt(sec / 3600) + "小时以前"
        } else if (sec > 60) {
          return parseInt(sec / 60) + "分钟以前"
        } else {
          return parseInt(sec) + "秒以前"
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
      cursor: pointer;

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

        .el-image {
          width: 123px;
          height: 133px;
        }
      }
    }
  }
</style>
