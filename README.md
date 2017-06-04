安装 npm install
运行 npm run dev

该项目是基于公司项目 抵奥云智慧餐厅，用vue重写的，接口也是使用这个小程序。由于没有注入微信sdk,所以登录，微信支付等都是没有做的。
openid是使用本人的 涉及支付的环节都假设支付成功

技术栈
1.vue-router
2.vue-bus 主要是用于组件间通信
3.axios
4.vuex 用于购物车
5.vue-scroller 由于使用scroll-y:true 做成的滚动效果和 微信小程序的scroll-view相比太差，尝试了好多款插件后选择了这一个 推荐
ui库使用了 element-ui和mint-ui

待完善：购物车这里一开始我用的是全局缓存，做完后决定上手vuex重做购物车，这里产生了一个问题，比如初次添加一个A商品进购物车时，
getter没有及时响应state的变化，而第二次或之后都没有问题。同时我发现初次添加A商品进购物车，如果刷新页面，getter就能拿到值，
所以我这样处理(详见components/sell-components/food-item.vue,getter的值是在同目录shop-cart.vue)

 this.$store.dispatch('create_db', foodItem).then(() => {
                this.$router.go(0)
              })

当然这样处理是不符合ajax的，也不好。等以后我发现解决方法后会及时更新，我猜测是生命周期的问题。当然如果是全局缓存来做是不会有这个问题的，如果项目不大，上vuex的确是没必要。


附外卖小程序二维码：![image](https://github.com/foolsogood/sell-by-vue/tree/master/static/images/diao-sell.jpg)