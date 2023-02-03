import Vue from 'vue'
import Vuex from 'vuex'
import authTabs from '@/store/modules/authTabs'
import tests from '@/store/modules/tests'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authTabs,
    tests
  }
})