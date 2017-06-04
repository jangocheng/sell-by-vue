<template>
    <div class="order-item">
        <router-link :to="{name:'orderDetail',query:{orderNo:orderItem.orderNo}}">
        <div class="title">
            <el-row>
                <el-col :span="16">订单号:{{orderItem.orderNo}}</el-col>
                <el-col :span="8" style="text-align: right">{{orderItem.describeText}}</el-col>
            </el-row>
        </div>
        <div class="content">
            <div v-for="foodItem in orderItem.goodDetailsDtos">
                <el-row>
                    <el-col :span="6">
                        <img class="good-img" :src="DOMAIN+foodItem.coverPath" alt="">
                    </el-col>
                    <el-col :span="18" class="good-info">
                        <p>{{foodItem.goodName}}</p>
                        <p>数量:{{foodItem.goodNum}}</p>
                        <p>价格：￥{{foodItem.goodPrice}}</p>
                    </el-col>
                </el-row>
            </div>
            <div class="pay">
                <p>实付：￥{{orderItem.actualMoney}}<span style="padding-left: 0.1rem">总计：￥{{orderItem.totalMoney}}</span></p>
            </div>
            <div class="ask">
                <div class="btn">催单</div>
            </div>
        </div>
        </router-link>
    </div>
</template>
<script>
import {DOMAIN} from  'store/storage'
    export default {
        props: {
            'orderItem': {
                type: Object,
                default: {}
            }
        },
        data(){
            return{
                DOMAIN:DOMAIN
            }
        }
    }

</script>
<style scoped>
    .order-item{border-bottom: .2rem solid #f5f5f5;} .title{padding: 0 .2rem; height: 0.8rem; line-height: .8rem; justify-content: space-between;} .content{background: #f5f5f5; margin: 0 0.2rem;} .good-img{padding: 0.1rem;} .good-info{display: flex; padding: 0.2rem 0; padding-left: 0.2rem; flex-direction: column;} .good-info p{flex: 1;} .pay{background: #fff; height: 0.8rem; line-height: .8rem; border-bottom: 0.01rem solid #ddd;} .ask{position: relative; background: #fff; height: 1rem; line-height: 1rem} .btn{position: absolute; top: .2rem; right: 0; background: #fd7144; width: 2rem; height: .5rem; line-height: .5rem; color: #fff; text-align: center; border-radius: .1rem;}
</style>