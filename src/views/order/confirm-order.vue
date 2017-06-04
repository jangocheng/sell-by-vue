<template>
    <div>
        <headerBar :titleText="titleText" :isBack="isBack"></headerBar>
        <notice></notice>
        <div class="wrapper">
            <div class="item">
                <span>您还没有填写地址</span>
                <span><i class="fa fa-angle-right"></i></span>
            </div>
            <div class="item">
                <span>送出时间</span>
                <span @click="showTimeBar"><span class="rg-text">{{timeTxt}}</span><i class="fa fa-angle-right"></i></span>
            </div>
            <div class="item note">
                <el-row>
                    <el-col :span="5">备注</el-col>
                    <el-col :span="19">
                        <input class="note-input" placeholder="请输入备注" v-model="noteText" />

                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="wrapper">
            <div v-for="item in cartList">
                <div class="item">
                    <span>{{item.goodName}}</span>
                    <span>￥{{item.goodPrice*item.num}}</span>
                </div>
            </div>

            <div class="item">
                <span>运费</span>
                <span>￥{{Freight}}</span>
            </div>
            <div class="item">
                <span>小计</span>
                <span>￥{{should_pay}}</span>
            </div>


        </div>
        <div class="wrapper" style="padding-bottom:1rem">
            <div class="item2" v-if="hasActivity">
                <el-row>
                    <el-col :span="6">店铺活动</el-col>
                    <el-col :span="18" class="item2-rg">
                        <span>
                            <el-row>
                                <el-col :span="4"><img class="icon-coupon" src="/static/images/decrease.png" alt=""></el-col>
                                <el-col :span="20"> {{ activityCouponText}}</el-col>
                            </el-row>
                            </span>
                        <span>-￥{{activityCouponMoney}}</span>
                    </el-col>
                </el-row>
            </div>
            <div class="item2" @click="toCouponCardPage">
                <el-row>
                    <el-col :span="6"> 优惠券</el-col>
                    <el-col :span="18" class="item2-rg">
                        <span v-if="Object.keys(selectCouponInfo).length==0">您还可以使用优惠券</span>
                        <span v-else>{{selectCouponInfo.Coupon_Name}}</span>
                        <span class="card-reduce-money">{{cardCouponMoneyText}}</span>
                        <span class="coupon-arrow"><i class="fa fa-angle-right"></i></span>
                    </el-col>
                </el-row>
            </div>

        </div>
        <div class="footer">
            <el-row>
                <el-col :span="7" class="footer-lf">待付款￥{{ finalPay}}</el-col>
                <el-col :span="10">已优惠 ￥{{finalCouponTotal}}</el-col>
                <el-col :span="7">
                    <div class="footer-rg" @click="toChoosePayWay">提交订单</div>
                </el-col>
            </el-row>
        </div>
        <div v-if="ifTimeBarShow">
            <dispatchTime @sure="sure" @cancel="cancel" @select-time="selectTime"></dispatchTime>
        </div>
    </div>
</template>
<script>
    import xhr from 'services/service'
    import { sellerId, userId } from 'store/storage'
    import tool from 'utils/tool'
    import { MessageBox } from 'mint-ui'
    import headerBar from 'components/common-components/header-bar'
    import notice from 'components/common-components/notice'
    import dispatchTime from 'components/order-components/dispatch-time'
    export default {
        data() {
            return {
                titleText: '确认订单',
                isBack: true,
                ifTimeBarShow: false,
                userId: userId,
                sellerId: sellerId,
                timeTxt: '立即送出',
                selectFullTime: '',
                sellerId: sellerId,
                Freight: 0,
                hasActivity: false,
                couponInfo: {},
                nodesArr: [],
                noteText: '',
                selectCouponInfo: {},
                activityCouponText: '',
                activityCouponMoney: 0,
                goodIdArr: [],
                goodNameArr: [],
                goodPriceArr: [],
                goodNumArr: [],
                goodImgArr: []
            }
        },
        components: {
            headerBar,
            notice,
            dispatchTime
        },
        computed: {
            cartList() {
                return this.$store.getters.getCartList
            },
            total_price() {
                return this.$store.getters.getInfo.total_price
            },

            should_pay() {
                let should_pay = tool.accAdd(this.total_price, this.Freight)
                return should_pay
            },
            //优惠券优惠
            cardCouponMoneyText() {
                if (Object.keys(this.selectCouponInfo).length == 0) {
                    return ''
                } else {
                    if (this.selectCouponInfo.Coupon_Type == 2) {//满减
                        return '-￥' + this.Freight
                    } else {
                        return '-￥' + this.selectCouponInfo.Coupon_Money
                    }
                }
            },
            //优惠券优惠钱数
            cardCouponMoneyNumber() {
                if (Object.keys(this.selectCouponInfo).length == 0) {
                    return 0
                } else {
                    if (this.selectCouponInfo.Coupon_Type == 2) {//满减
                        return this.Freight - 0
                    } else {
                        return this.selectCouponInfo.Coupon_Money - 0
                    }
                }
            },
            finalPay() {
                let finalPay = 0,
                    couPonTotal = tool.accAdd(this.cardCouponMoneyNumber, this.activityCouponMoney);//满减活动和优惠券的总优惠数
                finalPay = tool.accAdd(this.should_pay, -couPonTotal)//减去优惠的金额
                return finalPay
            },
            finalCouponTotal() {
                return tool.accAdd(this.should_pay, -this.finalPay)
            }
        },

        mounted() {
            this.getSellerInfo()
            this.getSellerCouponInfo()
            this.getSelectCouponInfo()
            this.convert2Arr()
        },
        methods: {
            //将购物车中的商品id,商品名,价格,数量,图片提取成数组
            convert2Arr() {
                let cartList = this.cartList,
                    idArr = [],
                    nameArr = [],
                    priceArr = [],
                    numArr = [],
                    imgArr = [];
                for (let i in cartList) {
                    idArr.push(cartList[i].goodId)
                    nameArr.push(cartList[i].goodName)
                    priceArr.push(cartList[i].goodPrice)
                    numArr.push(cartList[i].num)
                    imgArr.push(cartList[i].coverPath)
                }
                this.goodIdArr = idArr
                this.goodNameArr = nameArr
                this.goodPriceArr = priceArr
                this.goodNumArr = numArr
                this.goodImgArr = imgArr
            },

            //获取选择的优惠券缓存
            getSelectCouponInfo() {
                let selectCouponInfo = JSON.parse(sessionStorage.getItem('selectCouponInfo'))
                if (selectCouponInfo == null) {
                    return
                } else {
                    this.selectCouponInfo = selectCouponInfo
                }
            },
            //商家信息
            getSellerInfo() {
                let query = { storeId: this.sellerId }
                xhr.getSellerInfo({ query }).then(res => {
                    this.Freight = res.Freight//运费
                    this.delivery = res.Send_Price
                }).catch((err) => { console.log(err) })
            },
            //获取商家优惠信息
            getSellerCouponInfo() {
                let query = { storeId: this.sellerId }
                xhr.getSellerCouponInfo({ query }).then((res) => {
                    let couponInfo = res,
                        obj = {},
                        nodesArr = [];
                    if (couponInfo.length > 0) {
                        couponInfo.map((item) => {
                            obj[item.Meet_Money - 0] = item
                            nodesArr.push(item.Meet_Money)
                        })
                        this.hasActivity = true
                        this.couponInfo = obj
                        this.nodesArr = nodesArr.sort((a, b) => { return a - b })
                        this.judgeCouponType()
                    } else {
                        this.hasActivity = false
                    }
                }).catch((err) => { })
            },
            //判断达到何种优惠条件
            judgeCouponType() {
                let total_price = this.$store.getters.getInfo.total_price,
                    couponObj = this.couponInfo,
                    LENGTH = this.nodesArr.length;
                for (let i in this.nodesArr) {
                    if (total_price - 0 < this.nodesArr[0]) {//总价达不到优惠的条件
                        this.activityCouponText = couponObj[this.nodesArr[0]].Coupon_Name
                        this.activityCouponMoney = 0
                    } else if (total_price - 0 >= this.nodesArr[i] && total_price - 0 < this.nodesArr[i - 0 + 1]) {
                        this.activityCouponText = couponObj[this.nodesArr[i]].Coupon_Name
                        this.activityCouponMoney = couponObj[this.nodesArr[i]].Coupon_Money
                    } else if (total_price - 0 >= this.nodesArr[LENGTH - 1]) {
                        this.activityCouponText = couponObj[this.nodesArr[LENGTH - 1]].Coupon_Name
                        this.activityCouponMoney = couponObj[this.nodesArr[LENGTH - 1]].Coupon_Money
                    }
                }
            },
            toCouponCardPage() {
                this.$router.push({
                    name: 'couponList',
                    query: {
                        fromConfirmOrder: true,
                        totalPrice:this.total_price
                    }
                })
            },

            showTimeBar() {
                this.ifTimeBarShow = true
            },
            sure() {
                this.ifTimeBarShow = false
            },
            cancel() {
                this.ifTimeBarShow = false
                this.timeTxt = '立即送出'
            },
            selectTime(timeTxt) {
                this.timeTxt = timeTxt
            },
            toChoosePayWay() {
                //模拟
               
                this.$router.push({
                    name: 'payWay',
                    query: {
                        orderNo: 'DD05135525235',
                        finalPay: this.finalPay,

                    }
                })
                return
                //以下为正式流程(有些参数用的测试数据)
                //生成订单
                let query = {
                    storeId: this.sellerId,
                    openid: this.userId,
                    Consignee: '张三先生',
                    Phone: '13560246962',
                    Address: '广东省天河区五山路483号',
                    Gender: '男',
                    descrption: this.noteText,
                    Delivery_Time: this.selectFullTime,
                    Freight: this.Freight,
                    Total_money: this.should_pay,
                    Coupon: this.cardCouponMoneyNumber,
                    Actual_Money: this.finalPay,
                    Activity: this.activityCouponMoney,
                    Good_Money: this.total_price,
                    Coupon_Id: this.selectCouponInfo.CouponId,
                    Good_Id: this.goodIdArr,
                    Good_Name: this.goodNameArr,
                    Good_Price: this.goodPriceArr,
                    Good_Num: this.goodNumArr,
                    Cover_path: this.goodImgArr,
                    Activity_TypeText: this.activityCouponText || '',
                    Coupon_TypeText: this.selectCouponInfo.Coupon_Name,
                    receiver_lng: '31.23415',
                    receiver_lat: '121.662709',
                    city_code: '440300'
                }
                xhr.GenerateOrder({ query }).then((res) => {
                    console.log('res', res)
                    if (res == 'err') {
                        Message('提示', '生存订单异常')
                    } else {
                       
                        this.$router.push({
                            name: 'payWay',
                            query: {
                                orderNo: res.orderNo,
                                finalPay: this.finalPay
                            }
                        })
                    }
                }).catch((err) => { console.log('...', err) })

            }
        }
    }

</script>
<style scoped>
    .wrapper {
        margin-top: .2rem;
    }
    
    .item {
        display: flex;
        padding: 0 .2rem;
        height: .8rem;
        line-height: .8rem;
        background: #fff;
        justify-content: space-between;
    }
    
    .item + .item {
        border-top: 0.01rem solid #e5e6e7;
    }
    
    .item2 {
        padding: 0 .2rem;
        height: .8rem;
        line-height: .8rem;
        background: #fff;
    }
    
    .item2 + .item2 {
        border-top: 0.01rem solid #e5e6e7;
    }
    
    .item2-rg {
        position: relative;
        display: flex;
        justify-content: space-between;
        color: #fd7144
    }
    
    .card-reduce-money {
        position: absolute;
        right: .3rem;
    }
    
    .coupon-arrow {
        position: absolute;
        right: 0;
    }
    
    .icon-coupon {
        padding-right: 0.02rem;
    }
    
    .rg-text {
        padding-right: .1rem;
    }
    
    .md-text {
        text-align: left;
    }
    /*备注*/
    
    .note-input {
        border: none;
        width: 5.5rem;
        height: .8rem
    }
    
    .el-input__inner {
        border: none !important;
    }
    /**/
    
    .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        background: #fff;
    }
    
    .footer-lf {
        padding-left: .2rem;
    }
    
    .footer-rg {
        background: #0cce6b;
        color: #fff;
        text-align: center;
    }
    
    .hidden {
        display: none;
    }
</style>