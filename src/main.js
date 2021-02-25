// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
import {menuHeader, menuAside} from '@/menu'
import {frameInRoutes} from '@/router/routes'

// 响应式布局
import 'amfe-flexible'

// md5
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

// 视频播放
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'
Vue.use(VideoPlayer)

// hightcharts 注册
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import solidGaugeInit from 'highcharts/modules/solid-gauge'
import highchartsMore from 'highcharts/highcharts-more';
import HighchartsVariablePie from 'highcharts/modules/variable-pie';
import Highcharts3d from 'highcharts/highcharts-3d';

highchartsMore(Highcharts)
HighchartsVariablePie(Highcharts)
solidGaugeInit(Highcharts)
Highcharts3d(Highcharts)
Vue.use(HighchartsVue)

// PingFang 字体
import './assets/fonts/font.css'

Vue.prototype.$uploadUrl = process.env.VUE_APP_API + 'sm/uploadImg'

// 百度地图
import BaiduMap from 'vue-baidu-map-v3'
Vue.use(BaiduMap, {
  ak: 'QHkyOt7797WutKSEA9TcmXE97dBMBXkV'
})
// 核心插件
Vue.use(d2Admin)

//ws
import ws from './api/ws'
Vue.prototype.$globalws = ws

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
