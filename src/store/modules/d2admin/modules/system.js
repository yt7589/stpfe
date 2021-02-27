import api from '@/api'

export default {
  namespaced: true,
  state: {
    // 系统信息
    info: {}
  },
  actions: {
    /**
     * @description 设置系统数据
     * @param {Object} context
     * @param {*} info info
     */
    async set ({state, dispatch}, info) {
      // store 赋值
      state.info = info
    },

    // 获取系统信息
    async load ({state, dispatch}) {
      const res = await api.getSysInfo()
      const info = res.data
      state.info = info;
      return info;
    }
  }
}
