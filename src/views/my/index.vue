<template>
    <div class="my">
        <headerBar :titleText="titleText" :isBack="isBack"></headerBar>
        <myHeader></myHeader>
        <notice></notice>
        <div v-for="(item,index) in arr">
            <div class="item" @click="toPage(index)">
                <el-row>
                    <el-col :span="1">
                        <img :src="item.ico" alt="">
                    </el-col>
                    <el-col :span="22" class="item-center">{{item.text}}</el-col>
                    <el-col :span="1">
                        <span class="fa fa-angle-right"></span>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
    import headerBar from 'components/common-components/header-bar'
    import myHeader from 'components/my-components/my-index-header'
    import notice from 'components/common-components/notice'
    
    export default {
        data() {
            return {
                titleText: '我的',
                isBack: false,
                arr: [
                    {
                        ico: '/static/images/takeout-icon.png',
                        text: '外卖订单'
                    },
                    {
                        ico: '/static/images/my-card-icon.png',
                        text: '我的饭卡'
                    },
                    {
                        ico: '/static/images/coupon-icon.png',
                        text: '我的优惠券'
                    },
                    {
                        ico: '/static/images/feedback-icon.png',
                        text: '意见反馈'
                    }
                ]
            }
        },
        methods: {
            toPage(idx) {
                if (idx == 0) {
                    this.$router.push({
                        name: 'orderList'
                    })
                } else if (idx == 1) {
                    this.$router.push({
                        name: 'card'
                    })
                } else if (idx == 2) {
                    this.$router.push({
                        name: 'couponList'
                    })
                } else if (idx == 3) {
                    this.$router.push({
                        name: 'feedback'
                    })
                }
            }
        },
        components: {
            headerBar,
           
            myHeader,
            notice
        }
    }

</script>
<style scoped>
    
    .item {
        margin-top: 0.2rem;
        padding: 0 0.15rem;
        height: 0.8rem;
        line-height: 0.8rem;
        background: #fff;
    }
    
    .item-center {
        padding-left: 0.2rem;
    }
</style>