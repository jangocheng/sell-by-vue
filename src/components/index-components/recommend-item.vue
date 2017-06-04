<template>
    <div class="good-item">
        <el-row>
            <el-col :span="5">
                <img class="good-img" :src="DOMAIN+recommendItem.Cover_path" alt="">
            </el-col>
            <el-col :span="19">
                <div class="good-info">
                    <p>{{recommendItem.Good_Name}}</p>
                    <p>
                        <el-row>
                            <el-col :span="9">
                                <el-rate class="star" v-model="recommendItem.Rank"></el-rate>
                            </el-col>
                            <el-col :span="15">月售{{recommendItem.Month_Sales}}单</el-col>
                        </el-row>
                    </p>
                    <p class="price">￥{{recommendItem.Good_Price}}</p>
                </div>
            </el-col>
        </el-row>
        <span class="icon-plus" @click="addToCart(recommendItem)"><i class="fa fa-plus-circle "></i></span>
    </div>
</template>
<script>
    import { DOMAIN } from 'store/storage'
    export default {
        data() {
            return {
                value1: 3,
                DOMAIN: DOMAIN
            }
        },
        props: {
            'recommendItem': {
                type: Object,
                default: {}
            }
        },
        methods: {
            addToCart(item) {
                let good = {}
                this.$set(good, 'coverPath', item.Cover_path)
                this.$set(good, 'cateId', item.CId)
                this.$set(good, 'goodId', item.id)
                this.$set(good, 'goodName', item.Good_Name)
                this.$set(good, 'goodPrice', item.Good_Price)
                this.$set(good, 'description', item.Description)
                this.$set(good, 'ifPlusActive', false)
                this.$set(good, 'ifReduceActive', false)
                this.$set(good, 'inventory', item.Inventory)
                this.$set(good, 'monthSales', item.Month_Sales)
                this.$set(good, 'sellerId', item.Seller_Id)
                let goodId = good.goodId
                this.$store.dispatch('check_db', goodId)
                if (this.$store.state.cart.curIndex != -1) {
                    this.$store.dispatch('add_db')

                } else {
                    this.$set(good, 'num', 1)
                    this.$store.dispatch('create_db',good).then(()=>{
                        window.location.reload()
                    })
                }
                console.log('good', good)
                this.$store.dispatch('update_cur_shop_status', goodId)
                this.$bus.$emit('number-change')//传去sell组件
               
                this.$bus.$emit('change-way', ({ goodId: goodId, way: 1 }))//传去cartList组件
                console.log('777', this.$store.state.cart.cartInfo)
                this.$router.push({
                    name: 'sell'
                })

            }
        }
    }

</script>
<style>
    .good-item {
        position: relative;
        height: 1.8rem;
        padding: 0.1rem 0;
        margin: 0 0.15rem;
        line-height: 0.5rem;
    }
    
    .good-item + .good-item {
        border-top: 0.01rem solid #ddd;
    }
    
    .good-img {
        height: 1.5rem;
    }
    
    .good-info {
        font-size: 0.25rem;
        padding-left: 0.15rem;
    }
    /*修改Element样式*/
    
    .el-rate__icon {
        font-size: 13px !important;
        margin-right: 2px !important;
    }
    
    .good-item .price {
        color: #ff5722;
    }
    
    .icon-plus {
        display: block;
        position: absolute;
        top: 0.5rem;
        right: 0.1rem;
        font-size: 0.35rem;
        color: #ff5722;
    }
</style>