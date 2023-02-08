import Vue from 'vue'
import Vuex from 'vuex'
import authTabs from '@/store/modules/authTabs'
import tests from '@/store/modules/tests'
import ballSettings from '@/store/modules/ballSettings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authTabs,
    tests,
    ballSettings
  }
})