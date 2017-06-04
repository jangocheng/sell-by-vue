<template>
    <div>
        <headerBar :titleText="titleText" :isBack="isBack" :isHome="isHome"></headerBar>
        <notice></notice>
        <div class="progress">
            <el-steps :space="100" :active="statueActive" :align-center="true" :center="true" finish-status="success">
                <el-step title="等待商家接单"></el-step>
                <el-step title="商家已接单"></el-step>
                <el-step title="配送中"></el-step>
                <el-step title="配送完成"></el-step>
            </el-steps>
        </div>

        <div>
            <div class="item">
                <span class="item-lf">收货地址</span>
                <span class="item-rg">先生</span>
            </div>
            <div class="item">
                <span class="item-lf">送达时间</span>
                <span class="item-rg">{{order.deliveryTime}}</span>
            </div>
            <div class="item">
                <span class="item-lf">备注</span>
                <span class="item-rg">{{order.descrption}}</span>
            </div>
            <div class="hr"></div>
            <div v-for="foodItem in order.goodDetailsDtos">
                <div class="item">
                    <span class="item-lf">{{foodItem.goodName}}</span>
                    <span class="item-rg">
                    <span>X{{foodItem.goodNum}}</span>
                    <span>￥{{foodItem.goodPrice}}</span>
                    </span>
                </div>
            </div>

            <div class="item-2">
                <span>运费</span>
                <span>￥{{order.freight}}</span>
            </div>
            <div class="item">
                <span class="item-lf">店铺活动</span>
                <span class="item-rg">
                    <span>{{order.activityTypeText}}</span>
                <span>-￥{{order.activity}}</span>
                </span>
            </div>
            <div class="item-2">
                <span>饭卡支付优惠</span>
                <span>￥{{order.foodCardCoupon}}</span>
            </div>
            <div class="item-2">
                <span>实付款</span>
                <span>￥{{order.actualMoney}}</span>
            </div>
            <div class="hr"></div>
            <div class="item-2">
                <span>订单编号</span>
                <span>{{order.orderNo}}</span>
            </div>
            <div class="item-2">
                <span>付款方式</span>
                <span v-if="order.payType==2">外卖饭卡支付</span>
                <span v-else>微信支付</span>
            </div>
            <div class="item-2">
                <span>付款时间</span>
                <span>{{order.payTime}}</span>
            </div>
            <div class="footer">
                订单有问题？<span class="contact-text">联系商家</span>
            </div>
        </div>
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
                titleText: '订单详情',
                isBack: true,
                isHome: false,
                sellerId: sellerId,
                UserId: userId,
                orderNo: '',
                order: {},
                statueActive: 2,
                orderStatus: 0
            }
        },
        created() {
            this.orderNo = this.$route.query.orderNo
            if (this.$route.query.fromPaySuccess) {
                this.isBack = false
                this.isHome = true
            }
        },
        mounted() {
            this.getOrderDetail()
        },
        methods: {
            //订单
            getOrderDetail() {
                let query = { storeId: this.sellerId, openid: this.UserId, orderNo: this.orderNo }
                xhr.getMyOrderList({ query }).then((res) => {
                    this.order = res[0]
                    this.orderStatus = res[0].orderStatus
                    this.renderProgress()
                }).catch((err) => { })
            },
            //根据订单状态渲染进度
            renderProgress() {
                let statue = this.orderStatus
                if (statue == 20) {
                    this.statueActive = 1
                } else if (statue == 70) {
                    this.statueActive = 2
                } else if (statue == 40) {
                    this.statueActive = 3
                } else if (statue == 60) {
                    this.statueActive = 4
                }
            }
        },
        components: {
            headerBar,
            notice,

        }
    }

</script>
<style scoped>
    .progress {
        margin: 0.2rem 0;
        padding: .2rem 0.1rem;
       
        height: 1.3rem;
        background: #fff;
    }
    
    .el-step__head {
        width: 0.22rem !important;
        height: 0.22rem !important;
    }
    
    .el-step__title {
        font-size: .1rem !important;
        line-height: .25rem !important;
    }
    
    .item,
    .item-2 {
        display: flex;
        padding: 0 .2rem;
        height: 1rem;
        line-height: 1rem;
        background: #fff;
        border-bottom: .01rem solid #ddd;
    }
    
    .item-lf {
        flex: 1;
    }
    
    .item-rg {
        flex: 3;
        display: flex;
        justify-content: space-between;
    }
    
    .hr {
        background: #f5f5f5;
        height: .2rem;
    }
    
    .item-2 {
        justify-content: space-between;
    }
    
    .footer {
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
    }
    
    .contact-text {
        text-decoration: underline;
    }
</style>