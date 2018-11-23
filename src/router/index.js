import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = () => import('@/pages/home')
const ClassGoods = () => import('@/pages/classgoods')
const Detail = () => import('@/pages/detail')
const OrderDetail = () => import('@/pages/orderdetail')
const ScanCode = () => import('@/pages/scancode')
const PaySuccess = () => import('@/pages/paysuccess')
const OrderList = () => import('@/pages/orderlist')

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
  }, {
    path: '/scancode',
    name: 'ScanCode',
    component: ScanCode
  }, {
    path: '/paysuccess',
    name: 'PaySuccess',
    component: PaySuccess
  }, {
    path: '/orderlist',
    name: 'OrderList',
    component: OrderList
  }]
})
