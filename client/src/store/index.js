import Vue from 'vue'
import Vuex from 'vuex'

import result from './result'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    result,
    auth,
  }
})