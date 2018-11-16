import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = () => import('@/components/pages/home')
const ClassGoods = () => import('@/components/pages/classgoods')

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/classgoods',
    name: 'ClassGoods',
    component: ClassGoods
  }]
})
