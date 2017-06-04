<template>
    <div>
        <headerBar :titleText="titleText" :isBack="isBack"></headerBar>
        <notice></notice>
        <div v-for="(item,index) in couponArr">
            <div class="card" :class="{'active':selectIdx==index}" @click="selectCard(item,index)">
                <el-row>
                    <el-col :span="5" class="card-lf">
                        <span class="lf-text">优惠券</span>
                        <span class="top-corner"></span>
                        <span class="bottom-corner"></span>
                    </el-col>
                    <el-col :span="19" class="card-rg">
                        <p class="rg-top">{{item.Coupon_Name}}</p>
                        <div class="rg-bottom">
                            <el-row>
                                <el-col :span="5">
                                    <span class="money">￥{{item.Coupon_Money}}</span>
                                </el-col>
                                <el-col :span="19" class="rg-text">
                                    <span><i class="fa fa-circle icon-circle"></i>{{item.Coupon_Name}}</span>
                                    <span><i class="fa fa-circle icon-circle"></i>到{{item.Validity}}</span>
                                </el-col>
                            </el-row>
                        </div>
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
    import notice from 'components/common-components/notice'
    export default {
        data() {
            return {
                titleText: '我的优惠券',
                isBack: true,
                sellerId: sellerId,
                userId: userId,
                couponArr: [],
                hasNoCard: false,
                selectIdx: -1,
                totalPrice: 0,
                fromConfirmOrder: false
            }
        },
        components: {
            headerBar,
            notice
        },
        created() {
            if (this.$route.query.fromConfirmOrder) {
                this.fromConfirmOrder = true
            }
            if (this.$route.query.totalPrice) {
                this.totalPrice = this.$route.query.totalPrice
            }
        },
        mounted() {
            this.getMyCoupons()
        },
        methods: {
            getMyCoupons() {
                let query = {
                    storeId: this.sellerId,
                    User_Id: this.userId
                }
                xhr.getMyCoupons({ query }).then((res) => {
                    console.log(res)
                    if (res.length > 0) {
                        res.map((item) => {
                            item.Validity = tool.formatYMD(new Date(item.Validity))
                        })
                        this.hasNoCard = false
                        this.couponArr = res
                    } else {
                        this.hasNoCard = true
                    }

                }).catch((err) => {
                    console.log(err)
                })
            },
            //选择优惠券
            selectCard(item, index) {
                if (this.fromConfirmOrder = true) {
                    this.selectIdx = index
                    if ( this.totalPrice - 0 < item.Meet_Money) {
                        MessageBox('提示', '您的订单金额达不到使用条件')
                    } else {
                        MessageBox.confirm('提示', '确定选择' + item.Coupon_Name + '吗？').then((action) => {
                            sessionStorage.setItem('selectCouponInfo', JSON.stringify(item));
                            this.$router.go(-1)
                        })
                    }

                } else {
                    return
                }
            }
        }
    }

</script>
<style scoped>
    .card {
        margin: 0.3rem auto;
        width: 80%;
        height: 2.3rem;
        background: #fff;
        border-radius: .08rem;
    }
    
    .active {
        background: #f8ddd5
    }
    
    .card-lf {
        position: relative;
        height: 2.3rem;
        line-height: 2.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .35rem;
        border-right: 2px dashed #e5e6e7;
        color: #ff5722;
    }
    
    .lf-text {
        writing-mode: vertical-lr;
        text-align: center;
    }
    
    .top-corner,
    .bottom-corner {
        position: absolute;
        right: -.14rem;
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 100%;
        background: #f5f5f5;
    }
    
    .top-corner {
        top: -.13rem;
    }
    
    .bottom-corner {
        bottom: -.13rem;
    }
    
    .card-rg {
        display: flex;
        flex-direction: column;
        padding: .4rem .3rem;
        height: 2.3rem;
    }
    
    .rg-top {
        line-height: .6rem;
        font-size: .35rem;
    }
    
    .rg-bottom {
        line-height: 1.1rem;
    }
    
    .money {
        align-items: center;
        color: #ff5722;
        font-size: .3rem;
    }
    
    .rg-text {
        display: flex;
        flex-direction: column;
        line-height: .5rem;
    }
    
    .icon-circle {
        padding-right: .08rem;
        font-size: .08rem;
        color: #ff5722;
    }
</style>