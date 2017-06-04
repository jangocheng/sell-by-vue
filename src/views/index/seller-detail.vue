<template>
    <div>
        <headerBar :titleText="titleText" :isBack="isBack"></headerBar>
        <el-row class="header">
            <el-col :span="5">
                <img :src="DOMAIN+seller.Ico_Path" alt="">
            </el-col>
            <el-col :span="19" class="sub-text">
                <p>{{seller.Designation}}</p>
                <p>{{seller.Address}}</p>
                <p>{{seller.Tele_Phone}}</p>
            </el-col>
        </el-row>
        <notice></notice>
        <div class="seller-activity">
            <div class="title">商家活动</div>
            <div v-for="couponItem of couponList">
                <el-row class="item">
                    <el-col :span="1">
                        <img v-if="couponItem.Coupon_Type==2" src="/static/images/free.png" alt="" />
                            <img v-else src="/static/images/decrease.png" alt="" />
                    </el-col>
                    <el-col class="activity-text" :span="23"> {{couponItem.Coupon_Name}}</el-col>
                </el-row>
            </div>
        </div>
        <div class="seller-info">
            <div class="title">商家信息</div>
            <el-row class="item2">
                <el-col :span="5" >店<span style="padding-left: .5rem">名:</span></el-col>
                <el-col :span="19">{{seller.Designation}}</el-col>
            </el-row>
            <el-row class="item2">
                <el-col :span="5">送餐时间：</el-col>
                <el-col :span="19"><span style="padding-left:.1rem" v-for="time in timeList">{{time.startH}}:{{time.startM}}--{{time.endH}}:{{time.endM}}</span></el-col>
            </el-row>
            <el-row class="item2">
                <el-col :span="5">营业时间：</el-col>
                <el-col :span="19">{{seller.Business_Hours}}</el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import xhr from 'services/service'
    import { sellerId, DOMAIN } from 'store/storage'
    import headerBar from 'components/common-components/header-bar'
    import notice from 'components/common-components/notice'
    export default {
        data() {
            return {
                titleText: '商家详情',
                isBack: true,
                DOMAIN: DOMAIN,
                sellerId: sellerId,
                seller: {},
                timeList: [],
                couponList: []
            }
        },
        created() {
            this.getSellerInfo()
            this.getStoreDeliveryDate()
            this.getIndexCoupon()
        },
        methods: {
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
                    this.couponList = res
                }).catch((err) => {
                    console.log('222 fail', err)
                })
            },
        },
        components: {
            headerBar,
            notice
        }
    }

</script>
<style scoped>
    .header{padding: .2rem; height: 2rem; background: #fff; border-bottom: 0.01rem solid #ddd;} .sub-text{display: flex; padding-left: .2rem; flex-direction: column;} .sub-text p{height: .5rem; line-height: .5rem;} .seller-activity{margin-top: .2rem; background: #fff;} .title{padding-left: .2rem; height: .8rem; line-height: .8rem; border-bottom: 0.01rem solid #ddd;} .item{padding-left: .2rem; height: .8rem; line-height: .8rem;} .activity-text{padding-left: .2rem;} .seller-info{margin-top: .2rem; background: #fff;} .item2{padding-left: .2rem; height: .8rem; line-height: .8rem;} .item2 + .item2{border-top: 0.01rem solid #ddd;}
</style>