// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Axios from 'axios'
import VueBus from 'vue-bus'
import configRouter from './router-config'
import VueLocalStorage from 'vue-localstorage'
import VueScroller from 'vue-scroller'
import store from './store/index'

// ui组件

import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'font-awesome/css/font-awesome.min.css'
// 
Vue.prototype.$http = Axios;
Axios.defaults.baseURL = 'https://gzdazt.com/takeout/front'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueBus)
Vue.use(VueLocalStorage)
Vue.use(VueScroller)
Vue.use(Element);
Vue.use(MintUI);
/* eslint-disable no-new */
let router = configRouter(VueRouter);
let app = new Vue({
    router,
    store,
    ...App
});
//挂载根实例
app.$mount('#app');
