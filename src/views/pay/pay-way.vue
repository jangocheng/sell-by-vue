<template>
    <div class="pay-way">
        <headerBar :titleText="titleText" :isBack=" isBack"></headerBar>
        <div class="pay-time" v-show="ifTimeBarShow">
            <el-row>
                <el-col :span="3" class="icon-clock">
                    <span class="fa fa-clock-o "></span>
                </el-col>
                <el-col :span="21">
                    <span>支付剩余时间:{{leftTime}}</span>
                </el-col>
            </el-row>
        </div>
        <div class="content">
            <p>待付款</p>
            <p class="money">{{finalPay}}元</p>
            <div class="btn" :class="{'active':selectIdx==0}" @click="selectWay(0)">
                <el-row>
                    <el-col :span="8">
                        <img class="icon-card" src="/static/images/credit-card.png" alt="">
                    </el-col>
                    <el-col :span="10" style="text-align: left">
                        <span class="pay-way-text">饭卡支付</span>
                    </el-col>
                    <el-col :span="6" style="text-align: left">
                        <span class="number">{{discountMoney}}</span>
                    </el-col>
                </el-row>
            </div>
            <div class="btn" :class="{'active':selectIdx==1}" @click="selectWay(1)">
                <el-row>
                    <el-col :span="8">
                        <img class="icon-card" src="/static/images/wechat.png" alt="">
                    </el-col>
                    <el-col :span="10" style="text-align: left">
                        <span class="pay-way-text">微信支付</span>
                    </el-col>
                    <el-col :span="6" style="text-align: left">
                        <span class="number">{{finalPay}}</span>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
    import xhr from 'services/service'
    import { sellerId, userId } from 'store/storage'
    import tool from 'utils/tool'
    import { MessageBox } from 'mint-ui'
    import headerBar from 'components/common-components/header-bar'

    export default {
        data() {
            return {
                titleText: '支付方式',
                isBack: true,
                selectIdx: -1,
                sellerId: sellerId,
                userId: userId,
                isPayed: false,
                orderNo: '',
                finalPay: 0,
                ifTimeBarShow: true,
                leftTime: ''
            }
        },
        components: {
            headerBar,
        },
        computed: {
            discountMoney() {
                let discountRage = this.$localStorage.get('discountRage')
                return tool.mul(this.finalPay, discountRage).toFixed(2) - 0
            },
            foodCard_Coupon() {
                return tool.accAdd(this.finalPay, -this.discountMoney)
            }
        },
        created() {
            this.orderNo = this.$route.query.orderNo
            this.finalPay = this.$route.query.finalPay
            
        },
        mounted () {
            this.timer()
        },
        methods: {
            //进入此页面开始倒计时15分钟
            timer() {
               
                let sec = 60, min = 14, hour = 0;
                let that = this
                let idt = setInterval(function () {

                    sec--;

                    if (sec == 0) {
                        min--;
                        sec = 59;
                    }
                    if (min < 0 && hour > 0) {
                        hour--;
                        min = 59;
                    }
                    let leftTime = that.format(hour) + ":" + that.format(min) + ":" + that.format(sec)
                    that.leftTime = leftTime
                    if ((that.format(hour) == '00' && that.format(min) == '00' && that.format(sec) == '01') || that.isPayed) {
                        console.log('倒计时停止')
                        clearInterval(idt);
                        this.ifTimeBarShow = false
                        if (!that.isPayed) {
                            Message.confirm('提示', '规定时间内未付款，订单已取消').then((action) => {
                                //取消订单
                                let query = { order_No: that.orderNo }
                                xhr.CancelOrder({ query }).then((res) => {
                                    console.log('cancel ', res)
                                }).catch((err) => {
                                    console.log('cancel err', err)
                                })
                            })
                        }
                        return
                    }
                }, 1000);
            },
            format(str) {
                if (parseInt(str) < 10) {
                    return "0" + str;
                }
                return str;
            },
            selectWay(idx) {
                this.selectIdx = idx
                if (idx == 0) {
                    MessageBox.confirm('确定支付吗？').then((action) => {
                        this.cardPay()
                    })

                } else {
                    this.wechatPay()
                }
            },
            cardPay() {
                let query = {
                    order_No: this.orderNo,
                    openid: this.userId,
                    sellerId: this.sellerId,
                    PaymentAmount: this.discountMoney,
                    foodCard_Coupon: this.foodCard_Coupon
                }
                xhr.FoodCardPay({ query }).then((res) => {
                    console.log('success', res)
                     this.$store.dispatch('clear_local')//清空购物车
                    this.isPayed = true
                    this.$router.push({
                        name: 'paySuccess',
                        query: {
                            payMoney: this.discountMoney,
                            finalPay: this.finalPay,
                            timeStamp: tool.formatDate(new Date()),
                            orderNo: this.orderNo,
                            fromCardPay:true
                        }
                    })
                }).catch((err) => {
                    console.log('food err', err)
                })

            },
            //微信支付
            wechatPay() {
                MessageBox.confirm('微信支付……').then((action) => {
                    //调起支付
                    localStorage.removeItem('selectCouponInfo');
                })

            }
        }
    }

</script>
<style scoped>
    .pay-way {
        background: #f5f5f5;
    }
    
    .pay-time {
        height: .8rem;
        line-height: .8rem;
        background: #fefbe7;
        color: #e66114;
    }
    
    .icon-clock {
        text-align: center;
        font-size: .3rem;
    }
    
    .content {
        margin-top: 1rem;
        text-align: center;
        font-size: .3rem;
    }
    
    .money {
        height: 1rem;
        line-height: 1rem;
        font-size: .45rem;
    }
    
    .btn {
        margin: .3rem auto;
        width: 60%;
        height: 1rem;
        line-height: 1rem;
        border-radius: .5rem;
        background: #fff;
    }
    
    .icon-card {
        line-height: 1rem;
        width: .5rem;
        height: .3rem;
    }
    
    .pay-way-text {
        padding-right: 0.2rem;
        border-right: 0.03rem solid #ccc;
    }
    
    .number {
        color: #e66114;
    }
    
    .active {
        border: 1px solid #e66114;
    }
</style>