import Vue from 'vue'
import Vuex from 'vuex'
import authTabs from '@/store/modules/authTabs'
import ballSettings from '@/store/modules/ballSettings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authTabs,
    ballSettings
  }
})