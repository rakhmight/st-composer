import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard', //dashboard
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/', //
    name: 'auth',
    component: () => import('../views/AuthView.vue')
  },
  {
    path: '/workspace', //workspace
    name: 'workspace',
    component: () => import('../views/WorkspaceView.vue')
  },
  {
    path: '/instruction', //instruction
    name: 'instruction',
    component: () => import('../views/InstructionView.vue')
  },
  {
    path: '/saved', //saving
    name: 'saved',
    component: () => import('../views/SavedTestView.vue')
  }
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

export default router