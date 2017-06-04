<template>
    <div>
        <headerBar :titleText="titleText" :isBack=" isBack"></headerBar>
        <notice></notice>
        <div class="title">
            <el-row>
                <el-col :span="3">
                    <img :src="avatar" alt="">
                </el-col>
                <el-col :span="19" class="title-rg">余额：{{cardInfo.Balance}}</el-col>
            </el-row>
        </div>
        <div class="content">

            <div class="item" @click="select(index)" :class="{'active':selectIdx==index}" v-for="(item,index) in rechargeList">
                <p>{{item.Total_Money}}元 </p>
                <p>赠送{{item.Give_Money}}元</p>
            </div>
        </div>
        <div class="actual_money">实际到账:{{rechargeTotal}}</div>
        <div style="background: #fff">

            <el-button @click="rechare">充值</el-button>
        </div>

    </div>
</template>
<script>
    import xhr from 'services/service'
    import { sellerId, DOMAIN, userId } from 'store/storage'
    import tool from 'utils/tool'
    import headerBar from 'components/common-components/header-bar'
    import notice from 'components/common-components/notice'

    export default {
        data() {
            return {
                titleText: '充值',
                isBack: true,
                selectIdx: 0,
                userId: userId,
                sellerId: sellerId,
                cardInfo: {},
                rechargeList: [],
                baseMoney: 0,
                giveMoney: 0,
                rechargeTotal: 0,
                avatar:''
            }
        },
        created() {
            this.getRechargeGiftList()
            this.getMyFoodCard()
            this.getUserFullInfo()
        },
        methods: {
            //获取用户全部信息
            getUserFullInfo() {
                let query = {
                    openid: this.userId
                }
                xhr.getUserFullInfo({ query }).then((res) => {
                    this.avatar = res.ico_path
                }).catch((err) => {
                    console.log('info err', err)
                })
            },
            select(idx) {
                this.selectIdx = idx
                this.baseMoney = this.rechargeList[idx].Total_Money
                this.giveMoney = this.rechargeList[idx].Give_Money
                this.rechargeTotal = tool.accAdd(this.rechargeList[idx].Total_Money, this.rechargeList[idx].Give_Money)
            },
            //饭卡
            getMyFoodCard() {
                let query = {
                    UserId: this.userId,
                    storeId: this.sellerId,
                }
                xhr.getMyFoodCard({ query }).then(res => {
                    this.cardInfo = res
                }).catch((err) => {
                    console.log('1111 fail', err)
                })
            },
            //获取优惠列表
            getRechargeGiftList() {
                let query = { storeId: this.sellerId }
                xhr.getRechargeGiftList({ query }).then((res) => {
                    this.rechargeList = res
                    this.baseMoney = res[0].Total_Money
                    this.giveMoney = res[0].Give_Money
                    this.rechargeTotal = tool.accAdd(res[0].Total_Money, res[0].Give_Money)
                }).catch((err) => { })
            },
            rechare() {
                //，因为要设计支付，所以假设充值成功
                console.log('支付成功')
                this.$router.go(-1)
            }
        },
        components: {
            headerBar,
            notice

        }
    }

</script>
<style scoped>
    .title {
        margin-top: .2rem;
        background: #fff;
        padding: .2rem;
        height: 1.3rem;
        border-bottom: 0.01rem solid #e3e3e3;
    }
    
    .title-rg {
        padding-left: .2rem;
        line-height: 0.9rem;
    }
    
    .content {
        padding: .1rem;
        padding-top: 0;
        background: #fff;
        color: #333;
        font-size: 0.25rem;
    }
    
    .item {
        display: inline-block;
        width: calc(33.3333333333333333% - 0.07rem);
        border: 0.03rem solid #e3e3e3;
        box-sizing: border-box;
        margin-top: .1rem;
        margin-left: .05rem;
        padding-top: 0.1rem;
        line-height: .4rem;
        height: 1rem;
        border-radius: 0.1rem;
        text-align: center;
    }
    
    .active {
        border: 0.04rem solid #ff5722;
        color: #ff5722;
    }
    
    .actual_money {
        height: .6rem;
        line-height: .6rem;
        padding-left: .2rem;
        background: #fff;
        color: #ff5722;
    }
    
    .el-button {
        background: #ff5722;
        color: #fff;
        margin: .2rem .3rem;
        width: 90%;
    }
</style>