<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'app',
  watch: {
    '$i18n.locale': 'i18nHandle'
  },
  created () {
    this.i18nHandle(this.$i18n.locale)
    this.localSocket()
  },
  methods: {
    i18nHandle (val, oldVal) {
      util.cookies.set('lang', val)
      document.querySelector('html').setAttribute('lang', val)
    },
    localSocket() {
      let that = this;
      if ("WebSocket" in window) {
        console.log("您的浏览器支持 WebSocket!");
        // 先写死地址，后可加在配置中
        that.ws = new WebSocket('ws://222.128.117.234:9003/stp');
        that.$globalws.setWs(that.ws);
        that.ws.onopen = that.onopen;

        that.ws.onclose = function() {
          // 关闭 websocket
          console.log("连接已关闭...");
          setTimeout(() => {
            that.localSocket();
          }, 2000);
        };
      } else {
        // 浏览器不支持 WebSocket
        console.log("您的浏览器不支持 WebSocket!");
      }
    },
    onopen() {
      console.log("socket连接成功")
    },
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
</style>
<style>
.el-message-box{
  background-color: #002960 !important;
  border-color: #002960 !important;
}

.el-button--primary{
  background-color: #045FE0 !important;
  border-color: #045FE0 !important;
}
</style>

