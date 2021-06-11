import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mixin/',
    name: 'Mixin',
    component: () => import(/* webpackChunkName: "mixin" */ '../views/Mixin.vue')
  },
  {
    path: '/router/:id',
    name: 'Router',
    component: () => import(/* webpackChunkName: "router" */ '../views/Router.vue')
  },
  {
    path: '/vuexPage',
    name: 'VuexPage',
    component: () => import(/* webpackChunkName: "vuexPage" */ '../views/VuexPage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
