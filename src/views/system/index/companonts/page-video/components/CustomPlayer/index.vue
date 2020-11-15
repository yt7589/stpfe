<template>
  <div class="custom-player" v-loading="loading" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.8)" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <video-player v-if="playerOptions.sources.length > 0" class="video-player "
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
                  @playerStateChanged="handlePlayerStateChanged"
                  @play="onPlayerPlay($event)"
                  @pause="onPlayerPause($event)"
                  @ended="onPlayerEnded($event)"
                  @waiting="onPlayerWaiting($event)"
                  @playing="onPlayerPlaying($event)"
                  @loadeddata="onPlayerLoadeddata($event)"
                  @canplay="onPlayerCanplay($event)"
                  @canplaythrough="onPlayerCanplaythrough($event)"
                  @ready="handlePlayerReady"></video-player>
    <div class="video-mask">
      <template v-if="mask">
        <el-button class="mask-button" @click="openFlowDialog" :style="{transform:'scale('+scale+')'}">实时流设置</el-button>
        <el-upload
          class="video-upload"
          action=""
          accept="video/*"
          :on-preview="handlePreview"
          :show-file-list="false"
          :http-request="uploadVideo">
          <el-button class="mask-button" :style="{transform:'scale('+scale+')'}">上传视频</el-button>
        </el-upload>
      </template>
      <template v-else="state.loading">
        <div class="loading">{{state.message}}</div>
      </template>
    </div>
    <el-dialog :visible.sync="dialog.visible" :modal="false" class="flow-dialog" ref="flowDialog">
      <media-form @success="handleMediaAdd" @cancel="dialog.visible=false"></media-form>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api'
  import MediaForm from '../MediaForm'

  export default {
    components: {MediaForm},
    props: ['index', 'data', 'scale', 'result'],
    data () {
      let baseUrl = this.$baseUrl
      return {
        loading: false,
        loadingText: "",
        playerOptions: {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: true, //如果true,浏览器准备好时开始回放。
          muted: true, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          fluid: true,
          controls: true,
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          techOrder: ['flash', 'html5'],      // 兼容顺序
          flash: {
            hls: {withCredentials: false},
            swf: baseUrl + 'video-js.swf' // 引入静态文件swf
          },
          html5: {hls: {withCredentials: false}},
          sources: [],
          poster: "", //你的封面地址
//          width: "250px",
//          height: "230px",
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        },
        mask: false,
        state: {
          loading: false,
          message: ''
        },
        dialog: {
          visible: false
        },
        player: null
      }
    },
    watch: {
      data(){
        if (this.data.src) {
          this.$set(this.playerOptions.sources, 1, {
            type: 'rtmp/mp4',
            src: this.data.src,
          })
          console.log("player updated", this.index, this.data)
          this.state.loading = true
          if (this.player) {
            this.state.message = "视频加载中"
          } else {
            this.state.message = "初始化"
          }
        }
      }
    },
    mounted(){
      console.log("player mounted", this.index, this.data)
      if (this.data.src) {
        this.playerOptions.sources = [{
          type: 'rtmp/mp4',
          src: this.data.src,
        }]
        this.state.loading = true
        if (this.player) {
          this.state.message = "视频加载中"
        } else {
          this.state.message = "初始化"
        }
      }
    },
    beforeDestroy(){
      console.log("player destroy", this.index, this.player)
      if (this.player) {
        this.player.dispose()
      }
    },
    methods: {
      openFlowDialog(){
        this.dialog.visible = true
      },
      handlePlayerStateChanged(a, b, c){
        console.log("handlePlayerStateChanged", a, b, c)
      },
      handlePlayerReady(player){
        this.player = player
        this.state.loading = true
        this.state.message = "初始化播放器"
//        console.log("Player ready:", player)
        this.initPlayer()
      },
      onPlayerWaiting($event){
        this.state.loading = false
        this.state.message = "缓存中"
//        console.log("onPlayerWaiting", $event)
      },
      onPlayerPlay($event){
        this.state.loading = true
        this.state.message = "开始播放"
//        console.log("onPlayerPlay", $event)
      },
      onPlayerCanplay($event){
        this.state.loading = true
        this.state.message = "缓存中"
//        console.log("onPlayerCanplay", $event)
      },
      onPlayerCanplaythrough($event){
        this.state.loading = true
        this.state.message = "缓存中"
//        console.log("onPlayerCanplaythrough", $event)
      },
      onPlayerLoadeddata($event){
        this.state.loading = true
        this.state.message = "缓存成功"
//        console.log("onPlayerLoadeddata", $event)
      },
      onPlayerPause($event){
        this.state.loading = true
        this.state.message = "暂停播放"
//        console.log("onPlayerPause", $event)
      },
      onPlayerEnded($event){
        this.state.loading = true
        this.state.message = "结束播放"
//        console.log("onPlayerEnded", $event)
      },
      onPlayerPlaying($event){
        this.state.loading = false
        this.state.message = ""
//        console.log("onPlayerPlaying", $event)
      },
      handleMouseEnter(){
        this.mask = true
      },
      handleMouseLeave(){
        this.mask = false
      },
      initPlayer(){
      },
      handleMediaAdd(config){
        this.$set(this.playerOptions.sources, 1, {
          type: 'rtmp/mp4',
          src: config.src,
        })
        this.dialog.visible = false
        this.$emit('update', this.index, config)

        this.state.loading = true
        if (this.player) {
          this.state.message = "视频加载中"
        } else {
          this.state.message = "初始化"
        }
      },
      handlePreview(a, b, c){
        console.log("handlePreview", a, b, c)
      },
      uploadVideo(file){
        this.loading = true
        let onUploadProgress = function (vm, event) {
          let progress = parseInt(event.loaded * 100 / event.total)
          vm.loadingText = progress + "%"
        }
        api.UploadVideo(file.file, this, onUploadProgress).then(res => {
          let config = {
            type: 'rtmp/mp4',
            src: res.data.rtmpUrl,
            config: res.data,
            result: []
          }
          config.config.rstpId = res.data.streamId
          this.handleMediaAdd(config)
        }).finally(() => {
          this.loading = false
        })
      },
    }
  }
</script>

<style lang="scss">
  .custom-player {
    /*width: 100%;*/
    /*height: 100%;*/
    position: relative;
    .video-player {
      position: absolute;
      width: 100%;
      height: 100%;

      .vjs-tech {
        z-index: 999;
      }

      .video-js {
        height: 100% !important;
        padding-top: unset;

        .vjs-control-bar {
          z-index: 999;

          /*visibility: hidden;*/
          height: 36px;
          &:hover {
            visibility: visible;
          }

          .vjs-button > .vjs-icon-placeholder:before {
            line-height: 36px;
          }
        }

        .vjs-big-play-button {
          display: none;
          /*left: 50%; top: 50%;*/
          //transform: translate(-50%, -50%);
        }
      }
    }
    .video-mask {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;

      .loading {
        color: #284aff;
        font-size: 8px;
      }

      .mask-button {
        background: rgba(0, 115, 255, 1);
        border-radius: 9px;
        opacity: 0.6259;
        border: 2px solid rgba(0, 246, 255, 1);

        font-size: 14px;
        color: rgba(0, 246, 255, 1);
      }

      .mask-button + .video-upload {
        margin-left: 5px;
        font-size: 14px;
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

        background: url('../../image/background-dialog.png') no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
      }
    }
  }
</style>
