<template>
    <div>
        <headerBar :titleText="titleText" :isBack="isBack"></headerBar>
        <notice></notice>
        <div class="success-text">
            <el-row>
                <el-col :span="2">
                    <span class="fa fa-check-circle" style="color: green;font-size: .3rem"></span>
                </el-col>
                <el-col :span="22">
                    <span>支付成功</span>
                </el-col>
            </el-row>
        </div>
        <div class="content">
            <div class="title" v-if="fromCardPay">
                <p class="pay-text">饭卡支付：(元)</p>
                <p class="money">{{finalPay}}</p>
            </div>
            <div class="title" v-if="fromRecharge">
                <p class="pay-text">饭卡充值：(元)</p>
                <p class="money">{{payMoney}}</p>
            </div>
            <div class="item" v-if="fromCardPay">
                <span>商品金额</span>
                <span>￥{{payMoney}}</span>
            </div>
            <div class="item" v-if="fromRecharge">
                <span>实付金额</span>
                <span>￥{{finalPay}}</span>
            </div>
            <div class="item">
                <span>余<span style="padding-left: .4rem">额</span></span>
                <span>￥{{cardBalance}}</span>
            </div>
            <div class="item">
                <span>获得积分</span>
                <span>{{getScore}}</span>
            </div>
            <div class="item">
                <span>付款时间</span>
                <span>{{timeStamp}}</span>
            </div>

        </div>
        <!--<el-button class="btn" @click="toOrderDetail" v-if="fromCardPay">查看订单详情</el-button>-->
        <el-button class="btn" @click="toIndex">回到首页</el-button>
    </div>
</template>
<script>
    import xhr from 'services/service'

    import { sellerId, userId } from 'store/storage'
    import headerBar from 'components/common-components/header-bar'
    import notice from 'components/common-components/notice'
    export default {
        data() {
            return {
                titleText: '支付成功',
                isBack: true,
                 sellerId: sellerId,
                UserId: userId,
                payMoney: 0,
                getScore: 0,
                cardBalance:0,
                fromCardPay:false,
                fromRecharge:false
            }
        },
        components: {
            headerBar,
            notice
        },
        created() {
           
            this.payMoney = this.$route.query.payMoney
            this.finalPay = this.$route.query.finalPay
            this.timeStamp = this.$route.query.timeStamp
            this.getScore = parseInt(this.$route.query.finalPay)
            this.getMyFoodCard()
            if(this.$route.query.fromCardPay){
                this.fromCardPay=true
            }
            if(this.$route.query.fromRecharge){
                this.fromRecharge=true//来自线下
            }
        },
        methods: {
            //饭卡
            getMyFoodCard() {
                let query = {
                    UserId: this.UserId,
                    storeId: this.sellerId,
                }
                xhr.getMyFoodCard({ query }).then(res => {
                    this.cardBalance = res.Balance

                }).catch((err) => {
                    console.log('1111 fail', err)
                })
            },
            toIndex(){
                this.$router.push({
                    name:'index'
                })
            },
            toOrderDetail() {
                this.$router.push({
                    name: 'orderDetail',
                    query: {
                        fromPaySuccess: true
                    }
                })
            }
        }

    }

</script>
<style scoped>
    .success-text {
        padding: 0 .2rem;
        height: .8rem;
        line-height: .8rem;
    }
    
    .content {
        background: #fff;
    }
    
    .title {
        text-align: center;
        border-bottom: 0.01rem solid #e5e6e7;
    }
    
    .pay-text {
        line-height: .6rem;
        height: .6rem;
    }
    
    .money {
        height: .8rem;
        line-height: .6rem;
        font-size: .45rem;
    }
    
    .item {
        display: flex;
        justify-content: space-between;
        padding: 0 .2rem;
        height: .6rem;
        line-height: .6rem;
    }
    
    .btn {
        width: 96%;
        height: .7rem;
        margin: .4rem .1rem;
        background: #fd7144;
        border: none;
        color: #fff;
    }
</style>