<template>
    <div class="index-header">
        <el-row>
            <el-col :span="5">
                <img :src="DOMAIN+seller.Ico_Path" alt="" />
            </el-col>
            <el-col :span="19" class="header-rg">
                <div class="info-bar">
                    <p>{{seller.Designation}}<span class="fa fa-angle-right icon-rg" @click="toSellerDetail"></span></p>
                    <p>送餐时间：<span style="padding-left:.1rem" v-for="time in timeList">{{time.startH}}:{{time.startM}}--{{time.endH}}:{{time.endM}}</span></p>
                    <p class="first-coupon-p">
                        <el-row>
                            <el-col :span="1">
                                <img v-if="firstCouponInfo.Coupon_Type==2" src="/static/images/free.png" alt="" />
                                <img v-else src="/static/images/decrease.png" alt="" />
                            </el-col>
                            <el-col :span="23" class="coupon-text first-coupon">
                                {{firstCouponInfo.Coupon_Name}}
                                <span class=" icon-rg"><span class="coupon-num">{{arrLength}}种优惠</span>
                                <i class="fa fa-angle-down" :class="{'rotate':leftCouponShow}" @click="toggle"></i>
                                </span>
                            </el-col>
                        </el-row>
                    </p>
                </div>
                <div v-if="leftCouponShow" v-for="item in  restCouponInfoArr">
                    <el-row>
                        <el-col :span="1">
                            <img v-if="item.Coupon_Type==2" src="/static/images/free.png" alt="" />
                            <img v-else src="/static/images/decrease.png" alt="" />
                        </el-col>
                        <el-col :span="23" class="coupon-text">
                            {{item.Coupon_Name}}
                        </el-col>
                    </el-row>

                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import xhr from 'services/service'
    import { sellerId, DOMAIN } from 'store/storage'
    export default {
        data() {
            return {
                leftCouponShow: false,
                DOMAIN: DOMAIN,
                sellerId: sellerId,
                seller: {},
                timeList: [],
                restCouponInfoArr: [],
                arrLength: 0,
                firstCouponInfo: {}
            }
        },
        created() {
            this.getSellerInfo()
            this.getStoreDeliveryDate()
            this.getIndexCoupon()
        },
        methods: {
            toSellerDetail() {
                this.$router.push({
                    name: 'sellerDetail'
                })
            },
            toggle() {
                this.leftCouponShow = !this.leftCouponShow
            },
            //获取商家信息 
            getSellerInfo() {
                let query = {
                    storeId: this.sellerId,
                }
                xhr.getSellerInfo({ query }).then(res => {
                    this.seller = res
                }).catch((err) => {
                    console.log('test fail', err)
                })
            },
            // 送餐时间
            getStoreDeliveryDate() {
                let query = {
                    storeId: this.sellerId,
                }
                xhr.getStoreDeliveryDate({ query }).then(res => {
                    this.timeList = res

                }).catch((err) => {
                    console.log('000 fail', err)
                })
            },
            //首页优惠信息
            getIndexCoupon() {
                let query = {
                    storeId: this.sellerId,
                }
                xhr.getIndexCoupon({ query }).then(res => {
                    let firstCouponInfo = res[0],
                        arrLength = res.length,
                        arr1 = res.reverse();
                    arr1.pop()
                    arr1.reverse()

                    this.arrLength = arrLength
                    this.firstCouponInfo = firstCouponInfo
                    this.restCouponInfoArr = arr1


                }).catch((err) => {
                    console.log('222 fail', err)
                })
            },
        }
    }

</script>
<style scoped>
    .index-header {
        background: #fd7144;
        padding: 0.2rem;
        color: #fff;
    }
    
    .header-rg {
        padding-left: 0.2rem;
    }
    
    .info-bar {
        display: flex;
        flex-direction: column;
    }
    
    .info-bar p {
        height: .5rem;
        line-height: .5rem;
        position: relative;
    }
    
    .icon-rg {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 0.4rem;
    }
    
    .rotate {
        transform: rotate(180deg)
    }
    
    .coupon-text {
        padding-left: 0.1rem;
        width: 5rem;
        height: .4rem;
        line-height: .4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .first-coupon-p{
        height: .5rem;
        line-height: .5rem;
      
    }
    .first-coupon {
        width: 3.8rem;
        height: .5rem;
        line-height: .5rem;
        
    }
    
    .coupon-num {
        padding-right: 0.05rem;
        font-size: .25rem;
    }
</style>