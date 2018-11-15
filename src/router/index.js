import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = () => import('@/components/pages/home')

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }]
})
