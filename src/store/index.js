import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'
import stp from './modules/stp'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    d2admin: d2admin,
    stp: stp
  }
})
