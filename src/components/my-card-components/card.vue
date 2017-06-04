<template>
    <div class="card-container" >
        <div class="card"  :style="{'background': 'linear-gradient('+bgTopColor+','+  bgBottomColor+')'}">
            <p>余额：￥{{ cardInfo.Balance }}</p>
            <div class="card-footer">
                <el-row>
                    <el-col :span="12">{{ cardInfo.Vip_Name }}</el-col>
                    <el-col :span="12">积分：{{ cardInfo.Integral }}</el-col>
                </el-row>
            </div>
            <div class="corner" :style="styleObj2"><span>{{ cardInfo.Interest }}折</span></div>
        </div>
        <div class="btn-container">
            <el-row>
                <el-col :span="12">
                    <router-link :to="{name:'rechare'}" tag="div">
                        <div class="btn">充值</div>
                    </router-link>

                </el-col>
                <el-col :span="12">
                    <router-link :to="{name:'useCard'}" tag="div">
                        <div class="btn">支付</div>
                    </router-link>

                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import xhr from 'services/service'
    import tool from 'utils/tool'
    import { sellerId, userId } from 'store/storage'
    export default {
        data() {
            return {
                sellerId: sellerId,
                UserId: userId,
                cardInfo: {},
                bgTopColor: '',
                bgBottomColor: '',
                cornerColor: ''
            }
        },
        computed: {
           
            styleObj2() {
                return {
                    'background': this.cornerColor
                }
            }
        },
        mounted() {
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
                    // console.log(res)
                    this.cardInfo = res
                    this.level = res.Level
                    this.discountRage = tool.div(res.Interest, 10)//折扣率 0.95，0.8之类
                    this.$localStorage.set('discountRage', this.discountRage)//放入缓存，其他地方计算折扣金额需要
                    this.renderCardColor()
                }).catch((err) => {
                    console.log('1111 fail', err)
                })
            },
            //渲染卡片颜色
            renderCardColor() {
                let level = this.level
                if (level == 1) {
                    this.bgTopColor = '#f5dc92'
                    this.bgBottomColor = "#e4c470"
                    this.cornerColor = '#f5e1a7'
                } else if (level == 2) {
                    this.bgTopColor = '#ffd359'
                    this.bgBottomColor = "#f9ba35"
                    this.cornerColor = '#feda7d'
                } else if (level == 3) {
                    this.bgTopColor = '#c9c2d7'
                    this.bgBottomColor = "#9c90b5"
                    this.cornerColor = '#cec7da'
                } else if (level == 4) {
                    this.bgTopColor = '#7b7b7b'
                    this.bgBottomColor = "#444"
                    this.cornerColor = '#939292'

                }
            },
        }
    }

</script>
<style scoped>
    .card-container {
        padding: 0.4rem 0.6rem;
        background: #fff;
        text-align: center;
        color: #fff;
    }
    
    .card {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        font-size: 0.45rem;
        border-radius: 0.2rem;
    }
    
    .card-footer {
        position: absolute;
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        bottom: 0;
        font-size: 0.3rem;
        justify-content: space-between;
    }
    
    .corner {
        position: absolute;
        top: -0.96rem;
        right: -0.96rem;
        width: 2rem;
        height: 2rem;
        transform: rotate(45deg);
        line-height: 2.8rem;
    }
    
    .corner span {
        display: block;
        position: absolute;
        top: 0.18rem;
        right: 0.55rem;
        transform: rotate(-45deg);
        font-size: 0.3rem;
    }
    
    .btn-container {
        padding: 0.2rem 0;
    }
    
    .btn {
        width: 90%;
        margin: 0 auto;
        height: 0.8rem;
        line-height: 0.8rem;
        border-radius: 0.1rem;
        background: #ff5722;
    }
</style>