import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

export default {
    //购物车列表
    cartList: localStorage.getItem('vuex_cart') ? JSON.parse(localStorage.getItem('vuex_cart')) :{},
    //当前购物车信息
    cartInfo: {
        total_price: 0,
        total_nums: 0
    },
    //当前菜品是否在购物车中，在就是对应的菜品id,否就是-1
    curIndex: -1
}