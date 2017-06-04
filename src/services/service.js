


/**
 * Created by duoyi on 2017/2/17.
 */
import xhr from "./xhr.js"

export  default {
  /***
  //xhr用法如下
  getData: xhr.get.bind(null,'/api/v1/xxx');

  //在组件中的用法如下
   import server from "services/server.js"

   //query的情况
   const query = {key:"xxxx"}
   server.getData({query})

   //params的情况
   const params = xxx / [xxx]
   server.getData({params})
   **/

 

    //获取用户登录信息
    wechatLogin:xhr.post.bind(null,'/personalCenter/getUserInfo.shtml'),
    //获取商家名字
    getSellerInfo:xhr.get.bind(null, '/index/getMyStore.shtml'), 
    //获取送餐时间
    getStoreDeliveryDate:xhr.get.bind(null, '/index/getStoreDeliveryDate.shtml'),  
    //獲取首页饭卡
    getMyFoodCard:xhr.get.bind(null,'/index/getMyFoodCard.shtml'),  
    //首页优惠信息
    getIndexCoupon:xhr.get.bind(null, '/index/getIndexCoupon.shtml'),  
    // 首页外卖推荐
    getRecommendGoods:xhr.get.bind(null, '/index/getRecommendGoods.shtml'),  
    //外卖分类查询
    gettakeoutList:xhr.get.bind(null, '/takeout/gettakeoutList.shtml'),  
    //查询热销数据
    getHotGoodsList:xhr.get.bind(null, '/takeout/getHotGoodsList.shtml'),  
    //根据分类查询商品
    getByCategoryId:xhr.get.bind(null, '/takeout/getByCategoryId.shtml'),  
    //查询我的地址
    getMyAddress:xhr.get.bind(null, '/personalCenter/getMyAddress.shtml'),  
    //查询我的默认地址
    getMyDefaultAddress:xhr.get.bind(null, '/personalCenter/getMyDefaultAddress.shtml'),  
    //删除收货地址
    delAddress:xhr.post.bind(null, '/personalCenter/delAddress.shtml'),  
    //进入修改页面,获取地址
    getByAddress:xhr.get.bind(null,'/personalCenter/getByAddress.shtml'),  
    //更新地址
    updateAddress:xhr.post.bind(null, '/personalCenter/updateAddress.shtml'),  
    //查询我的信息
    getMyInfo:xhr.get.bind(null, '/personalCenter/getMyInfo.shtml'),  
    //饭卡消费记录
    getFoodCardLog:xhr.get.bind(null, '/personalCenter/getFoodCardLog.shtml'),  
    //意见反馈
    Feedback:xhr.post.bind(null, '/personalCenter/Feedback.shtml'),  

    //外卖列表
    TakeoutList:xhr.get.bind(null,'/takeout/TakeoutList.shtml'),  
    //验证码
    SendSMS:xhr.post.bind(null, '/personalCenter/SendSMS.shtml'),  
    //绑定手机
    bindingPhone:xhr.get.bind(null,'/personalCenter/bindingPhone.shtml'),  
    //我的优惠券
    getMyCoupons:xhr.get.bind(null, '/personalCenter/getMyCoupons.shtml'),  
    //订单列表
    getMyOrderList:xhr.get.bind(null, '/personalCenter/getOrderList.shtml'), 
    //订单详情
    getOrderDetail:xhr.get.bind(null, '/personalCenter/getOrderDetail.shtml'), 
    //获取用户信息
    getUserFullInfo:xhr.get.bind(null, '/personalCenter/getByPhoneUserInfo.shtml'),
    //查询商家满减优惠
    getSellerCouponInfo:xhr.get.bind(null, '/personalCenter/getSellerCouponInfo.shtml'),
    //饭卡的优惠信息
    getRechargeGiftList:xhr.get.bind(null, '/personalCenter/getRechargeGiftList.shtml'),
    //生成订单
    GenerateOrder:xhr.post.bind(null, '/takeout/GenerateOrder.shtml'),
    //取消订单
    CancelOrder:xhr.post.bind(null, '/takeout/CancelOrder.shtml'),
   //饭卡支付
   FoodCardPay:xhr.post.bind(null, '/takeout/FoodCardPay.shtml'),
   //到店支付
    storeCardPay:xhr.post.bind(null, '/takeout/StorePay.shtml'),
    //获取支持配送时间
    getReserve:xhr.get.bind(null, '/takeout/Reserve.shtml')
}
