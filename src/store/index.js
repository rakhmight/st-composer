import Vue from 'vue'
import Vuex from 'vuex'
import authTabs from './modules/authTabs'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authTabs,
  }
})