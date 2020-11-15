<template>
  <div class="page-video">
    <div class="header-box">
      <el-image class="header-item" v-for="(option,index) in pageOptions" :key="index"
                :class="curPage===option.number?'is-active':''" @click="handlePageChanged(option)"
                :src="require('./image/image-' + option.number+(curPage===option.number?'-active':'')+'.png')"></el-image>
    </div>
    <div class="photo-view" flex="dir:top">
      <div class="photo-view-big" flex-box="1">
        <div class="video-container">
          <div class="video-box">
            <template v-if="curPage===1">
              <custom-player class="video-player" style="width: 100%;height: 100%;"
                             :index="0" :scale="1" :data="flowList[0]" @update="handlePlayerUpdate">
              </custom-player>
            </template>
            <template v-if="curPage===2">
              <div style="width: 100%;height:100%;display: flex;">
                <custom-player class="video-player" style="width: 50%;height: 100%;"
                               :index="0" :scale="1" :data="flowList[0]" @update="handlePlayerUpdate"></custom-player>
                <custom-player class="video-player" style="width: 50%;height: 100%;"
                               :index="1" :scale="1" :data="flowList[1]" @update="handlePlayerUpdate"></custom-player>
              </div>
            </template>
            <template v-if="curPage===3">
              <custom-player class="video-player" style="width: 50%;height: 100%;"
                             :index="0" :scale="1" :data="flowList[0]" @update="handlePlayerUpdate"></custom-player>
              <div style="width: 50%;height: 100%; display: inline-block;">
                <custom-player class="video-player" style="width: 100%;height: 50%;"
                               :index="1" :scale="1" :data="flowList[1]" @update="handlePlayerUpdate"></custom-player>
                <custom-player class="video-player" style="width: 100%;height: 50%;"
                               :index="2" :scale="1" :data="flowList[2]" @update="handlePlayerUpdate"></custom-player>
              </div>
            </template>
            <template v-if="curPage===4">
              <div style="width: 50%;height: 100%; display: inline-block;">
                <custom-player class="video-player" style="width: 100%;height: 50%;"
                               :index="0" :scale="1" :data="flowList[0]" @update="handlePlayerUpdate"></custom-player>
                <custom-player class="video-player" style="width: 100%;height: 50%;"
                               :index="1" :scale="1" :data="flowList[1]" @update="handlePlayerUpdate"></custom-player>
              </div>
              <div style="width: 50%;height: 100%; display: inline-block;">
                <custom-player class="video-player" style="width: 100%;height: 50%;"
                               :index="2" :scale="1" :data="flowList[2]" @update="handlePlayerUpdate"></custom-player>
                <custom-player class="video-player" style="width: 100%;height: 50%;"
                               :index="3" :scale="1" :data="flowList[3]" @update="handlePlayerUpdate"></custom-player>
              </div>
            </template>
            <template v-if="curPage===5">
              <div style="width: 100%;height:100%;display: flex;">
                <custom-player class="video-player" style="width: 75%;height: 100%;"
                               :index="0" :scale="1" :data="flowList[0]" @update="handlePlayerUpdate"></custom-player>
                <div style="width:25%;height: 100%; display: inline-block;">
                  <custom-player class="video-player" style="width: 100%;height: 25%;"
                                 :index="1" :scale="0.8" :data="flowList[1]" @update="handlePlayerUpdate"></custom-player>
                  <custom-player class="video-player" style="width: 100%;height: 25%;"
                                 :index="2" :scale="0.8" :data="flowList[2]" @update="handlePlayerUpdate"></custom-player>
                  <custom-player class="video-player" style="width: 100%;height: 25%;"
                                 :index="3" :scale="0.8" :data="flowList[3]" @update="handlePlayerUpdate"></custom-player>
                  <custom-player class="video-player" style="width: 100%;height: 25%;"
                                 :index="4" :scale="0.8" :data="flowList[4]" @update="handlePlayerUpdate"></custom-player>
                </div>
              </div>
            </template>
            <template v-if="curPage===6">
              <div style="width: 33.33%;height: 100%; display: inline-block;">
                <custom-player class="video-player" style="width: 100%;height: 50%;"
                               :index="0" :scale="0.8" :data="flowList[0]" @update="handlePlayerUpdate"></custom-player>
                <custom-player class="video-player" style="width: 100%;height: 50%;"
                               :index="1" :scale="0.8" :data="flowList[1]" @update="handlePlayerUpdate"></custom-player>
              </div>
              <div style="width:33.33%;height: 100%; display: inline-block;">
                <custom-player class="video-player" style="width: 100%;height: 50%;"
                               :index="2" :scale="0.8" :data="flowList[2]" @update="handlePlayerUpdate"></custom-player>
                <custom-player class="video-player" style="width: 100%;height: 50%;"
                               :index="3" :scale="0.8" :data="flowList[3]" @update="handlePlayerUpdate"></custom-player>
              </div>
              <div style="width: 33.33%;height: 100%; display: inline-block;">
                <custom-player class="video-player" style="width: 100%;height: 50%;"
                               :index="4" :scale="0.8" :data="flowList[4]" @update="handlePlayerUpdate"></custom-player>
                <custom-player class="video-player" style="width: 100%;height: 50%;"
                               :index="5" :scale="0.8" :data="flowList[5]" @update="handlePlayerUpdate"></custom-player>
              </div>
            </template>
            <template v-if="curPage===7">
              <div style="width:66.66%;height:100%;">
                <div style="width: 50%;height: 100%; display: inline-block;">
                  <custom-player class="video-player" style="width: 100%;height: 50%;"
                                 :index="0" :scale="0.8" :data="flowList[0]" @update="handlePlayerUpdate"></custom-player>
                  <custom-player class="video-player" style="width: 100%;height: 50%;"
                                 :index="1" :scale="0.8" :data="flowList[1]" @update="handlePlayerUpdate"></custom-player>
                </div>
                <div style="width: 50%;height: 100%; display: inline-block;">
                  <custom-player class="video-player" style="width: 100%;height: 50%;"
                                 :index="2" :scale="0.8" :data="flowList[2]" @update="handlePlayerUpdate"></custom-player>
                  <custom-player class="video-player" style="width: 100%;height: 50%;"
                                 :index="3" :scale="0.8" :data="flowList[3]" @update="handlePlayerUpdate"></custom-player>
                </div>
              </div>
              <div style="width: 33.33%;height: 100%; display: inline-block;">
                <custom-player class="video-player" style="width: 100%;height: 33.33%;"
                               :index="4" :scale="0.8" :data="flowList[4]" @update="handlePlayerUpdate"></custom-player>
                <custom-player class="video-player" style="width: 100%;height: 33.33%;"
                               :index="5" :scale="0.8" :data="flowList[5]" @update="handlePlayerUpdate"></custom-player>
                <custom-player class="video-player" style="width: 100%;height: 33.33%;"
                               :index="6" :scale="0.8" :data="flowList[6]" @update="handlePlayerUpdate"></custom-player>
              </div>
            </template>
            <template v-if="curPage===8">
              <div style="width:100%;height:100%;">
                <div style="width: 100%;height: 75%;display: flex;">
                  <custom-player class="video-player" style="width: 75%;height: 100%;"
                                 :index="0" :scale="1" :data="flowList[0]" @update="handlePlayerUpdate"></custom-player>
                  <div style="width: 25%;height: 100%; display: inline-block;">
                    <custom-player class="video-player" style="width: 100%;height: 33.33%;"
                                   :index="1" :scale="0.8" :data="flowList[1]" @update="handlePlayerUpdate"></custom-player>
                    <custom-player class="video-player" style="width: 100%;height: 33.33%;"
                                   :index="2" :scale="0.8" :data="flowList[2]" @update="handlePlayerUpdate"></custom-player>
                    <custom-player class="video-player" style="width: 100%;height: 33.33%;"
                                   :index="3" :scale="0.8" :data="flowList[3]" @update="handlePlayerUpdate"></custom-player>
                  </div>
                </div>
                <div style="width:100%;height: 25%; display: flex;">
                  <custom-player class="video-player" style="width: 25%;height: 100%;"
                                 :index="4" :scale="0.8" :data="flowList[4]" @update="handlePlayerUpdate"></custom-player>
                  <custom-player class="video-player" style="width: 25%;height: 100%;"
                                 :index="5" :scale="0.8" :data="flowList[5]" @update="handlePlayerUpdate"></custom-player>
                  <custom-player class="video-player" style="width: 25%;height: 100%;"
                                 :index="6" :scale="0.8" :data="flowList[6]" @update="handlePlayerUpdate"></custom-player>
                  <custom-player class="video-player" style="width: 25%;height: 100%;"
                                 :index="7" :scale="0.8" :data="flowList[7]" @update="handlePlayerUpdate"></custom-player>
                </div>
              </div>
            </template>
            <template v-if="curPage===9">
              <div style="width: 33.33%;height: 100%; display: inline-block;">
                <custom-player class="video-player" style="width: 100%;height: 33.33%;"
                               :index="0" :scale="0.8" :data="flowList[0]" @update="handlePlayerUpdate"></custom-player>
                <custom-player class="video-player" style="width: 100%;height: 33.33%;"
                               :index="1" :scale="0.8" :data="flowList[1]" @update="handlePlayerUpdate"></custom-player>
                <custom-player class="video-player" style="width: 100%;height: 33.33%;"
                               :index="2" :scale="0.8" :data="flowList[2]" @update="handlePlayerUpdate"></custom-player>
              </div>
              <div style="width:33.33%;height: 100%; display: inline-block;">
                <custom-player class="video-player" style="width: 100%;height: 33.33%;"
                               :index="3" :scale="0.8" :data="flowList[3]" @update="handlePlayerUpdate"></custom-player>
                <custom-player class="video-player" style="width: 100%;height: 33.33%;"
                               :index="4" :scale="0.8" :data="flowList[4]" @update="handlePlayerUpdate"></custom-player>
                <custom-player class="video-player" style="width: 100%;height: 33.33%;"
                               :index="5" :scale="0.8" :data="flowList[5]" @update="handlePlayerUpdate"></custom-player>
              </div>
              <div style="width: 33.33%;height: 100%; display: inline-block;">
                <custom-player class="video-player" style="width: 100%;height: 33.33%;"
                               :index="6" :scale="0.8" :data="flowList[6]" @update="handlePlayerUpdate"></custom-player>
                <custom-player class="video-player" style="width: 100%;height: 33.33%;"
                               :index="7" :scale="0.8" :data="flowList[7]" @update="handlePlayerUpdate"></custom-player>
                <custom-player class="video-player" style="width: 100%;height: 33.33%;"
                               :index="8" :scale="0.8" :data="flowList[8]" @update="handlePlayerUpdate"></custom-player>
              </div>
            </template>
            <template v-if="curPage===16">
              <div style="width:100%;height:100%;">
                <div style="width: 100%;height: 50%;display: flex;">
                  <custom-player class="video-player" style="width: 33.33%;height: 100%;"
                                 :index="0" :scale="0.8" :data="flowList[0]" @update="handlePlayerUpdate"></custom-player>
                  <custom-player class="video-player" style="width: 33.33%;height: 100%;"
                                 :index="1" :scale="0.8" :data="flowList[1]" @update="handlePlayerUpdate"></custom-player>
                  <div style="width: 33.33%;height: 100%; display: inline-block;">
                    <div style="width: 100%;height: 33.33%;display: flex;">
                      <custom-player class="video-player" style="width: 50%;height: 100%;"
                                     :index="2" :scale="0.5" :data="flowList[2]" @update="handlePlayerUpdate"></custom-player>
                      <custom-player class="video-player" style="width: 50%;height: 100%;"
                                     :index="3" :scale="0.5" :data="flowList[3]" @update="handlePlayerUpdate"></custom-player>
                    </div>
                    <div style="width: 100%;height: 33.33%;display: flex;">
                      <custom-player class="video-player" style="width: 50%;height: 100%;"
                                     :index="4" :scale="0.5" :data="flowList[4]" @update="handlePlayerUpdate"></custom-player>
                      <custom-player class="video-player" style="width: 50%;height: 100%;"
                                     :index="5" :scale="0.5" :data="flowList[5]" @update="handlePlayerUpdate"></custom-player>
                    </div>
                    <div style="width: 100%;height: 33.33%;display: flex;">
                      <custom-player class="video-player" style="width: 50%;height: 100%;"
                                     :index="6" :scale="0.5" :data="flowList[6]" @update="handlePlayerUpdate"></custom-player>
                      <custom-player class="video-player" style="width: 50%;height: 100%;"
                                     :index="7" :scale="0.5" :data="flowList[7]" @update="handlePlayerUpdate"></custom-player>
                    </div>
                  </div>
                </div>
                <div style="width: 100%;height: 50%;display: flex;">
                  <custom-player class="video-player" style="width: 33.33%;height: 100%;"
                                 :index="8" :scale="0.8" :data="flowList[8]" @update="handlePlayerUpdate"></custom-player>
                  <custom-player class="video-player" style="width: 33.33%;height: 100%;"
                                 :index="9" :scale="0.8" :data="flowList[9]" @update="handlePlayerUpdate"></custom-player>
                  <div style="width: 33.33%;height: 100%; display: inline-block;">
                    <div style="width: 100%;height: 33.33%;display: flex;">
                      <custom-player class="video-player" style="width: 50%;height: 100%;"
                                     :index="10" :scale="0.5" :data="flowList[10]" @update="handlePlayerUpdate"></custom-player>
                      <custom-player class="video-player" style="width: 50%;height: 100%;"
                                     :index="11" :scale="0.5" :data="flowList[11]" @update="handlePlayerUpdate"></custom-player>
                    </div>
                    <div style="width: 100%;height: 33.33%;display: flex;">
                      <custom-player class="video-player" style="width: 50%;height: 100%;"
                                     :index="12" :scale="0.5" :data="flowList[12]" @update="handlePlayerUpdate"></custom-player>
                      <custom-player class="video-player" style="width: 50%;height: 100%;"
                                     :index="13" :scale="0.5" :data="flowList[13]" @update="handlePlayerUpdate"></custom-player>
                    </div>
                    <div style="width: 100%;height: 33.33%;display: flex;">
                      <custom-player class="video-player" style="width: 50%;height: 100%;"
                                     :index="14" :scale="0.5" :data="flowList[14]" @update="handlePlayerUpdate"></custom-player>
                      <custom-player class="video-player" style="width: 50%;height: 100%;"
                                     :index="15" :scale="0.5" :data="flowList[15]" @update="handlePlayerUpdate"></custom-player>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="button-box" flex-box="0">
        <div class="note">提示：可支持mp4视频格式，请保证上传资料的车牌人眼可分辨</div>
        <el-button class="button-upload" @click="handleMediaSetting">
          实时流设置
        </el-button>
        <el-button class="button-upload">
          <el-image :src="require('..//page-photo/image/image-upload.png')"></el-image>
          上传视频
        </el-button>
      </div>
    </div>
    <div class="result-view" flex="dir:top">
      <div class="result-box" flex="1">
        <div class="title-result"
             :class="resultPage=='测试结果'?'is-active':''"
             @click="resultPage='测试结果'">测试结果
        </div>
        <div class="title-json"
             :class="resultPage=='JSON'?'is-active':''"
             @click="resultPage='JSON'">JSON
        </div>
        <div class="result-body">
          <template v-if="resultPage=='测试结果'">
            <result-image v-for="(result,index) in resultList" :key="index" :result="result"></result-image>
          </template>
          <template v-if="resultPage=='JSON'">

          </template>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialog.visible" :modal="false" class="flow-dialog" ref="flowDialog">
      <media-form v-if="dialog.visible" :index="dialog.index" @success="handleMediaAdd" @cancel="dialog.visible=false"></media-form>
    </el-dialog>
  </div>
</template>

<script>
  import CustomPlayer from './components/CustomPlayer'
  import ResultImage from './components/ResultImage'
  import MediaForm from './components/MediaForm'

  import api from '@/api'
  import stomp from '@/api/stomp';

  export default {
    components: {CustomPlayer, ResultImage, MediaForm},
    data () {

      return {
        curImage: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597432200707&di=0d2ec57a471850b1e29e43ff971813cf&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F8%2F58578347a6924.jpg',
        curPage: 1,
        dialog: {
          visible: false,
          index: 0
        },
        pageOptions: [
          {number: 1},
          {number: 2},
          {number: 3},
          {number: 4},
          {number: 5},
          {number: 6},
          {number: 7},
          {number: 8},
          {number: 9},
          {number: 16},
        ],
        flowList: [
          {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
        ],
        resultList: [],
        resultTimer: null,
        resultPage: '测试结果',
        stomp: stomp,
        stompTimer: null
      }
    },
    mounted(){
      this.connectStomp()
    },
    beforeDestroy(){
      this.stomp.disconnect()
      clearInterval(this.stompTimer)
    },
    methods: {
      connectStomp(){
        let that = this
        this.stomp.connect(function () {
          console.log("stomp 连接成功")
          that.flowList.forEach(item => {
            if (item && item.config) {
              let id = item.config.rstpId
              that.stomp.subscribeVideoStream(id)
              console.log("subscribe stream: " + id)
            }
          })
        }, function (err) {
          console.error("stomp 连接失败", err)
          that.stompTimer = setTimeout(() => {
            that.connectStomp()
          }, 5000)
        })
      },
      handlePlayerUpdate(index, config){
        let oldConfig = this.flowList[index]
        this.$set(this.flowList, index, config)

        console.log("player updated:", index, config)

        if (oldConfig && oldConfig.config && oldConfig.config.rstpId !== undefined) {
          let id = oldConfig.config.rstpId
          let exist = this.flowList.find((item) => item && item.config && item.config.rstpId === id)
          if (!exist) {
            console.log("unsubscribe stream: " + id)
            this.stomp.unsubscribeVideoStream(id)
          }
        }

        if (config && config.config && config.config.rstpId !== undefined) {
          let id = config.config.rstpId
          let exist = this.flowList.find((item) => config !== item && item && item.config && item.config.rstpId === id)
          if (!exist) {
            console.log("subscribe stream " + id)
            this.stomp.subscribeVideoStream(id, this.onStreamResult)
          }
        }
      },
      handlePageChanged(option){
        this.curPage = 0
        this.$nextTick(() => {
          this.curPage = option.number
        })
      },
      getResult(){
        this.flowList.forEach((flow, index) => {
          if (index + 1 > this.curPage) {
            return;
          }

          if (flow && flow.config && flow.config.rstpId !== undefined) {
            api.GetRtmpResult(flow.config.rstpId, true).then(res => {
              if (res.data) {
                if (flow.result.length > 0) {
                  let last = flow.result[flow.result.length - 1]
                  if (last.imageId == res.data.imageId) {
                    return;
                  }
                }
                flow.result.push(res.data)
                if (flow.result.length > 3) {
                  flow.result.shift()
                }
                if (res.data && res.data.VEH) {
//                  console.log("new image", res.data)
                  res.data.VEH.forEach(item => {
                    if (item.thumbImage) {
                      if (item.thumbImage.substr(0, 5) !== 'data:') {
                        item.thumbImage = "data:image/png;base64," + item.thumbImage
                      }
                      this.resultList.unshift(item)

                      if (this.resultList.length > 100) {
                        this.resultList.pop()
                      }
                    }
                  })
                }
              }
            }).catch(err => {
              console.error(err)
            })
          }
        })
      },
      handleMediaSetting(){
        let index = undefined
        for (let i = 0; i < this.flowList.length && i < this.curPage; i++) {
          if (this.flowList[i] && this.flowList[i].src == undefined) {
            index = i;
            break;
          }
        }
        if (index !== undefined) {
          this.dialog.index = index
          this.dialog.visible = true
        }
      },
      handleMediaAdd(config, index){
        this.dialog.visible = false
        this.handlePlayerUpdate(index, config)
      },
      onStreamResult(res){
        console.log(res)

        if (res && res.VEH) {
          console.log("new image", res)
          res.VEH.forEach(item => {
            if (item.thumbImage) {
              if (item.thumbImage.substr(0, 5) !== 'data:') {
                item.thumbImage = "data:image/png;base64," + item.thumbImage
              }
              this.resultList.unshift(item)

              if (this.resultList.length > 100) {
                this.resultList.pop()
              }
            }
          })
        }
      }
    },
  }
</script>

<style lang="scss">
  .page-video {
    position: relative;
    width: 100%;
    height: 100%;

    .header-box {
      position: absolute;
      top: 90px;
      left: 430px;

      .header-item {
        width: 32px;
        height: 32px;
        margin-right: 36px;

        &.is-active {
          color: #00F6FF;
        }
      }
    }

    .photo-view {
      position: absolute;
      top: 130px;
      left: 57px;
      right: 586px;
      bottom: 55px;

      display: flex;
      .photo-view-big {
        background: url(../page-photo/image/background-photo-inner.png) no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;

        position: relative;
        > .video-container {
          position: absolute;
          top: 57px;
          left: 46px;
          right: 46px;
          bottom: 57px;

          .video-player {
            /*background: red;*/
            outline: solid 1px rgba(2, 175, 197, 1);
          }

          .video-box {
            width: 100%;
            height: 100%;
            display: flex;
          }
        }
      }

      .button-box {
        margin-top: 22px;
        display: flex;
        justify-content: space-evenly;
        > .note {
          width: 384px;
          font-size: 14px;
          color: rgba(135, 208, 255, 1);
          line-height: 20px;
        }
        .button-upload {
          display: inline-block;
          width: 256px;
          height: 59px;

          box-shadow: 0px 2px 4px 0px rgba(0, 246, 255, 1);
          border-radius: 9px;
          border: 2px solid rgba(0, 246, 255, 1);
          background: rgba(0, 115, 255, 1);
          font-size: 20px;
          color: #00D3ED;

          .el-image {
            width: 32px;
            height: 25px;
            padding-right: 20px;
            vertical-align: bottom;
          }
        }
      }
    }

    .result-view {
      position: absolute;
      top: 162px;
      right: 43px;
      bottom: 97px;
      width: 518px;

      .result-box {
        width: 100%;
        height: 100%;

        background: url(../page-photo/image/background-result.png) no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;

        position: relative;
        .title-result {
          position: absolute;
          top: 39px;
          left: 110px;
          height: 25px;
          font-size: 18px;
          color: #34a8b0;

          &.is-active {
            color: #00F6FF;
          }
        }
        .title-json {
          position: absolute;
          top: 39px;
          right: 119px;
          height: 25px;
          font-size: 18px;
          color: #34a8b0;
          &.is-active {
            color: #00F6FF;
          }
        }
        .result-body {
          position: absolute;
          top: 98px;
          right: 60px;
          bottom: 49px;
          left: 60px;

          overflow: scroll;
        }
      }
    }

    .flow-dialog {
      .el-dialog {
        background: transparent;
        margin-top: 30vh !important;
        margin-left: 400px !important;
      }

      .el-dialog__header {
        display: none;
      }

      .el-dialog__body {
        width: 502px;
        height: 359px;

        background: url('./image/background-dialog.png') no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
      }
    }
  }
</style>
