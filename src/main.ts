import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

export const $rest = {
  getUser() {
    return 'user name'
  }
}
Vue.prototype.$rest = $rest

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
