import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = () => import('@/components/pages/home')
const ClassGoods = () => import('@/components/pages/classgoods')
const Detail = () => import('@/components/pages/detail')
const OrderDetail = () => import('@/components/pages/orderdetail')

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/classgoods',
    name: 'ClassGoods',
    component: ClassGoods
  }, {
    path: '/detail',
    name: 'Detail',
    component: Detail
  }, {
    path: '/orderdetail',
    name: 'OrderDetail',
    component: OrderDetail
  }]
})
