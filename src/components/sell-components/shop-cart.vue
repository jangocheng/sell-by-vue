<template>
    <div>
        <el-row>
            <el-col :span="16">
                <div class="bar">
                    <el-row>
                        <el-col :span="6">
                            <div class="cart" :class="{'cartActive':cartTotalNum>0}" @click="toggleCartBar">
                                <span class="fa fa-shopping-cart"></span>
                                <span class="icon-num" v-if="cartTotalNum>0">{{cartTotalNum}}</span>
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <p>￥{{cartTotalPrice}}</p>
                            <p>{{subText}}</p>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="btn" @click="toConfirmOrder">{{payText}}</div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import tool from 'utils/tool'
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
               
            }
        },
        computed: {

            // vuex中的商品总数
            cartTotalNum() {
               
                return this.$store.getters.getInfo.total_nums
            },
            //vuex的商品总钱数
            cartTotalPrice() {
               
                return this.$store.getters.getInfo.total_price
            },
            payText() {
                if (this.$store.getters.getInfo.total_nums== 0) {
                    return '购物车空空如也'
                } else {
                    return '去结算'
                }
            },
            subText() {
                if (this.$store.getters.getInfo.total_nums== 0) {
                    return '快点愉快的买买买吧'
                } else {
                    return '还需配送费5元'
                }
            }
        },

        created(){
           
        },
        methods: {
          
            toConfirmOrder() {
                if (this.cartTotalNum == 0) {
                    return
                } else {
                    this.$router.push({
                        name: 'confirmOrder'
                    })
                }
            },
            //传去外卖首页
            toggleCartBar() {
                this.$bus.$emit('toggle-cartBar')
            }
        }
    }

</script>
<style scoped>
    .bar {
        position: relative;
        background: #666;
        height: 1rem;
        color: #fff;
        line-height: .45rem;
    }
    
    .cart {
        position: relative;
        left: .2rem;
        top: -.3rem;
        width: .9rem;
        height: .9rem;
        line-height: .75rem;
        border-radius: 100%;
        border: 0.05rem solid #767676;
        background: #666;
        color: #767676;
        text-align: center;
        font-size: 0.6rem;
    }
    
    .cartActive {
        background: #ff5722;
        color: #fff;
    }
    
    .icon-num {
        position: absolute;
        right: -.05rem;
        top: -.05rem;
        display: block;
        width: .3rem;
        height: .3rem;
        line-height: .3rem;
        border-radius: 100%;
        background: #ff5722;
        color: #fff;
        font-size: .22rem;
    }
    
    .btn {
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        color: #fff;
        background: #0cce6b;
    }
</style>