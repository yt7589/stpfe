<template>
  <div class="camera-photo-dialog">
    <div class="wrapper">
      <el-image style="width:100%;height:80%" :src="table.current?table.current.picUrl:''">
      </el-image>
      <ul class="item-box" id="image-box">
        <li class="li-image" v-for="(item,index) in table.data" :key="index" @click="table.current=item">
          <el-image :src="item.picUrl">
          </el-image>
          <div>
            <div style="display: flex;justify-content: space-between;">
              <span>{{item.hphm}}</span>
              <span style="color:#00F6FF;">{{getTimeOffset(item.time)}}</span>
            </div>
            <div>
              {{item.ilsType}}
            </div>
          </div>
        </li>
      </ul>
      <!--<i class="el-icon-close"></i>-->
      <div class="selected-image" v-if="table.current">
        <div class="title">违章详情</div>
        <div class="box">
          <el-image :src="table.current.picUrl" style="width:40%"></el-image>
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
    props: ['data'],
    components: {},
    data(){
      return {
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
      console.log('camera-photo-diag page cameraId=' + this.$store.state.stp.video_analysis.cameraId + '!!!!!!!!!!!!!!!!!!!')
      console.log('ws:' + this.$globalws.ws + '; v=' + JSON.stringify(this.$globalws) + '!')
      let msg = {
        'userId': '' + 1018,
        'type': 'wmtRrSpfx',
        'topic': 'ksRrSpfx',
        'cameraId': this.$store.state.stp.video_analysis.cameraId,
        'streamId': 0
      }
      console.log('send websocket message...')
      this.$globalws.ws.send(JSON.stringify(msg))
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
        if (this.data) {
          this.table.data = this.data.recs
          this.table.pagination.total = this.data.total
          if (this.table.data.length > 0) {
            this.table.current = this.table.data[0]
          }
        }
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
