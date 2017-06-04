<template>
    <div>
        <headerBar :titleText="titleText" :isBack=" isBack"></headerBar>
        <notice></notice>
        <div class="content">
            <el-form>
                <el-row class="input-container">
                    <el-col :span="6" class="input-lf">消费总金额：</el-col>
                    <el-col :span="18">
                        <input class="money-input" type="number" v-model="moneyValue" placeholder="输入金额" />
                    </el-col>
                </el-row>
                <p class="rg">余额：￥{{cardBalance}}
                    <router-link :to="{name:'rechare'}" tag="span"><span class="pay-text">去充值</span></router-link>
                </p>
                <el-button :disabled='canNotPay' @click="cardPay">{{actualPay}}</el-button>
            </el-form>
        </div>
    </div>
</template>
<script>
    // 
    import xhr from 'services/service'
    import tool from 'utils/tool'
    import { sellerId, userId } from 'store/storage'
    // 
    import { MessageBox } from 'mint-ui'
    import headerBar from 'components/common-components/header-bar'
    import notice from 'components/common-components/notice'
    export default {
        data() {
            return {
                titleText: '饭卡使用',
                isBack: true,
                canNotPay: true,
                moneyValue: '',
                cardInfo: {},
                sellerId: sellerId,
                UserId: userId,
                cardBalance: 0,
                val: 0,
                expense: 0,
               
            }
        },
        watch: {

        },
        computed: {
            actualPay() {
                if (this.moneyValue > this.cardBalance) {
                    this.canNotPay = true
                    return '余额不足'
                } else if (this.moneyValue.length == 0) {
                    this.canNotPay = true
                    return '付款'

                } else {
                    this.canNotPay = false
                    let discount = this.$localStorage.get('discountRage')//缓存中拿到折扣率
                    this.expense = tool.mul(this.moneyValue, discount).toFixed(2)//折扣后支付金额
                    return this.expense + '元'
                }

            }
        },
        created() {
            this.getMyFoodCard()
           
        },
        methods: {
            //饭卡
            getMyFoodCard() {
                let query = {
                    UserId: this.UserId,
                    storeId: this.sellerId,
                }
                xhr.getMyFoodCard({ query }).then(res => {
                    this.cardInfo = res
                    this.cardBalance = res.Balance

                }).catch((err) => {
                    console.log('1111 fail', err)
                })
            },

            //饭卡支付
            cardPay() {
                MessageBox.confirm('确定支付' + this.actualPay + '元吗？').then(action => {
                    console.log('正在发起支付')
                    let query = {
                        order_No: "DD" + Date.parse(new Date()),
                        openid: this.UserId,
                        PaymentAmount: this.actualPay - 0,//实际支付
                        foodCard_Coupon: tool.accAdd(this.moneyValue - 0, 0 - this.expense)//优惠的金额
                    }
                    xhr.storeCardPay({ query }).then((res) => {
                        this.$router.push({
                            name: 'paySuccess',
                            query: {
                                payMoney: this.moneyValue,
                                timeStamp: tool.formatDate(new Date()),
                                finalPay: this.actualPay,
                                fromRecharge: true
                            }
                        })
                    }).catch((err) => {
                        console.log('food err', err)
                    })
                })
            }

        },
        components: {
            headerBar,
            notice
        }
    }

</script>
<style scoped>
    .content {
        margin-top: .2rem;
        padding: .2rem;
        background: #fff;
    }
    
    .input-container {
        height: .86rem;
        line-height: .86rem;
        border: 0.02rem solid #ddd;
        border-radius: 0.1rem;
    }
    
    .input-lf {
        text-align: center;
    }
    
    .el-input__inner {
        border-left: none !important;
    }
    
    .pay-text {
        text-decoration: underline;
        color: #fd7144;
    }
    
    .rg {
        height: .6rem;
        line-height: .6rem;
        text-align: right;
    }
    
    .money-input {
        width: 5.2rem;
        height: .8rem;
        line-height: .8rem;
        border: none;
    }
    
    .el-button {
        width: 100%;
        border: 1px solid #fff;
        background: #fd7144;
        color: #fff;
    }
</style>