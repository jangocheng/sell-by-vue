import Vue from 'vue'
// 首页
import index from './views/index'
//商家详情
import sellerDetail from './views/index/seller-detail'
// 外卖
import sell from './views/sell'
//我的
import my from './views/my'
//充值 
import rechare from './views/rechare'
//饭卡使用
import useCard from './views/card/card-use'
//订单列表
import orderList from './views/order/order-list'
//订单详情
import orderDetail from './views/order/order-detail'
//我的饭卡
import card from './views/card/card'
//反馈
import feedback from './views/my/feedback'
//优惠券
import couponList from './views/coupon/couponList'
//确认订单
import confirmOrder from './views/order/confirm-order'
//支付方式
import payWay from './views/pay/pay-way'
//支付成功
import paySuccess from './views/pay/pay-success'


const routes = [
  
  // 首页
  { path: '/', redirect: '/index' },
  { path: '/index', name: 'index', component: index },
  //商家详情
  { path: '/sellerDetail', name: 'sellerDetail', component: sellerDetail },
  // 外卖
  { path: '/sell', name: 'sell', component: sell },
  //我的
  { path: '/my', name: 'my', component: my },
  //充值
  { path: '/rechare', name: 'rechare', component: rechare },
  //使用饭卡
  { path: '/useCard', name: 'useCard', component: useCard },
  //订单列表
  { path: '/orderList', name: 'orderList', component: orderList },
  //订单详情
  { path: '/orderDetail', name: 'orderDetail', component: orderDetail },
  //我的饭卡
  { path: '/card', name: 'card', component: card },
  //反馈
  { path: '/feedback', name: 'feedback', component: feedback },
  //优惠券
  { path: '/couponList', name: 'couponList', component: couponList },
  //确认订单
  {path:'/confirmOrder',name:'confirmOrder',component:confirmOrder},
  //支付方式
  {path:'/payWay',name:'payWay',component:payWay},
  //支付成功
  {path:'/paySuccess',name:'paySuccess',component:paySuccess}
]


export default (VueRouter) => {
  let router = new VueRouter({
    routes
  })
  return router

};
