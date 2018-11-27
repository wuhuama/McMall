// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'babel-polyfill'
import 'normalize.css/normalize.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'font-awesome/css/font-awesome.css'

import '@/styles/index.scss'

import App from './App'
import store from './store/'
import router from './router'
import http from '@/utils/request.js'

Vue.config.productionTip = false
Vue.use(Element)
Vue.prototype.$http = http
Vue.prototype.$elementMessage = function (msg, t) {
  this.$message({
    message: msg,
    type: t
  })
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
