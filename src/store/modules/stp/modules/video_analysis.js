import { cloneDeep, uniq, get } from 'lodash'
import router from '@/router'
import setting from '@/setting.js'

// 判定是否需要缓存
const isKeepAlive = data => get(data, 'meta.cache', false)

export default {
  namespaced: true,
  state: {
      cameraId: 0,
      name: 'stp'
  },
  actions: {},
  mutations: {
      setCameraId(state, cameraId) {
          state.cameraId = cameraId
      }
  }
}