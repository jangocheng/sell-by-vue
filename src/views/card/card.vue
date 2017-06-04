<template>
    <div>
        <headerBar :titleText='titleText' :isBack='isBack'></headerBar>
        <notice></notice>
        <div class="hr"></div>
        <card></card>
        <div class="content">
            <div class="title">我的会员</div>
            <div class="progress">
                <el-steps :space="100" :active="level" :align-center="true" :center="true">
                    <el-step title="大众会员" description="0积分">
                        <i class="step-1" slot="icon"></i>
                    </el-step>
                    <el-step title="黄金会员" description="500积分">
                        <i class="step-2" slot="icon"></i>
                    </el-step>
                    <el-step title="铂金会员" description="2000积分">
                        <i class="step-3" slot="icon"></i>
                    </el-step>
                    <el-step title="钻石会员" description="5000积分">
                        <i class="step-4" slot="icon"></i>
                    </el-step>
                </el-steps>
            </div>
        </div>
        <div class="content">
            <div class="title">饭卡操作记录</div>
            <div class="log-list" v-for="item in logList">
                <el-row class="log-item">
                    <el-col :span="2">
                        <span class="fa fa-circle"></span>
                    </el-col>
                    <el-col :span="19" class="item-mid">
                        <p> {{item.Consume_Type}}-订单编号{{item.Order_No}}</p>
                        <p style="line-height: .2rem">{{item.Create_Time}}</p>
                    </el-col>
                    <el-col :span="3">
                        <span v-if="item.Consume_Type=='饭卡充值'">+{{item.Consume_Money}}</span>
                        <span v-else>{{item.Consume_Money}}</span>
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
    import headerBar from 'components/common-components/header-bar'
    import notice from 'components/common-components/notice'
    import card from 'components/my-card-components/card.vue'
    export default {
        data() {
            return {
                titleText: '我的饭卡',
                isBack: true,
                sellerId: sellerId,
                userId: userId,
                logList: [],
                level: -1
            }
        },
        components: {
            headerBar,
            notice,
            card
        },
        created() {
            this.getFoodCardLog()
            this.getMyFoodCard()
        },
        methods: {
            //消费记录
            getFoodCardLog() {
                let query = { storeId: this.sellerId, User_Id: this.userId }
                xhr.getFoodCardLog({ query }).then((res) => {

                    let logArr = res,
                        type1 = '外卖微信支付',
                        type2 = '外卖饭卡支付',
                        type3 = '充值';
                    logArr.map((item) => {
                        if (item.Consume_Type == type1 || item.Consume_Type == type2) {
                            item.Consume_Money = item.Consume_Money * -1
                        } else {
                            item.Consume_Money = tool.accAdd(item.Give_Money, item.Consume_Money)
                        }
                    })
                    this.logList = logArr
                }).catch((err) => { })
            },
            //饭卡
            getMyFoodCard() {
                let query = {
                    UserId: this.userId,
                    storeId: this.sellerId,
                }
                xhr.getMyFoodCard({ query }).then(res => {
                    this.level = res.Level
                }).catch((err) => {
                    console.log('1111 fail', err)
                })
            },
        }
    }

</script>
<style scoped>
    .hr {
        background: #f5f5f5;
        width: 100%;
        height: .2rem;
    }
    
    .content {
        margin-top: .2rem;
        background: #fff;
    }
    
    .title {
        height: 1rem;
        line-height: 1rem;
        padding: 0 .2rem;
        border-bottom: 0.01rem solid #e5e6e7;
    }
    
    .progress {
        padding-top: .2rem;
        background: #fff;
    }
    
    .log-item {
        padding: 0 .2rem;
        color: #fd7144;
        line-height: .8rem;
    }
    
    .item-mid {
        color: #333;
        height: 1.3rem;
        line-height: .8rem;
    }
    /**/
    
    .step-1,
    .step-2,
    .step-3,
    .step-4 {
        position: relative;
        top: -0.1rem;
        left: -0.1rem;
        display: inline-block;
        width: 0.73rem;
        height: 0.73rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    
    .step-1 {
        background-image: url('/static/images/vip-normal.png')
    }
    
    .step-2 {
        background-image: url('/static/images/vip-gold.png')
    }
    
    .step-3 {
        background-image: url('/static/images/vip-pt.png')
    }
    
    .step-4 {
        background-image: url('/static/images/vip-diamond.png')
    }
    
    .el-step__head.is-text {
        border-style: hidden;
        background-color: transparent !important;
    }
    
    .el-step__head.is-text.is-finish .step-2 {
        background-image: url('/static/images/vip-gold.png');
    }
    
    .el-step__head.is-text.is-finish .step-3 {
        background-image: url('/static/images/vip-pt.png')
    }
    
    .el-step__head.is-text.is-finish .step-4 {
        background-image: url('/static/images/vip-diamond.png');
    }
</style>