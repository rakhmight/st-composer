import Vue from 'vue'
import Vuex from 'vuex'
import authTabs from '@/store/modules/authTabs'
import sign from '@/store/modules/sign'
import envTests from '@/store/modules/envTests'
import saving from '@/store/modules/saving'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authTabs,
    sign,
    envTests,
    saving
  }
})