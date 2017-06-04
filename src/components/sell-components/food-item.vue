<template>
  <div class="food-item">
    <el-row>
      <el-col :span="6">
        <img :src="DOMAIN+foodItem.coverPath" alt="">
      </el-col>
      <el-col :span="11" class="item-md">
        <p>{{foodItem.goodName}}</p>
        <p>{{foodItem.description}}</p>
        <p>{{foodItem.goodPrice}}/月销{{foodItem.monthSales}}份</p>
      </el-col>
      <el-col :span="7" class="item-rg">
        <span class="fa fa-minus-circle icon" :class="{'isActive':foodItem.ifReduceActive}" @click="changeNumber(foodItem,-1)" v-show="foodItem.num>0"></span>
        <input class="good-num" type="number" v-model="foodItem.num" disabled v-show="foodItem.num>0" />
        <span class="fa fa-plus-circle icon" :class="{'isActive':foodItem.ifPlusActive}" @click="changeNumber(foodItem,1)"></span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {
    DOMAIN
  } from 'store/storage'
  export default {
    props: {
      'foodItem': {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        DOMAIN: DOMAIN
      }
    },

    methods: {
      changeNumber(foodItem, way) {

        if (way > 0) {
          let goodId = foodItem.goodId - 0
          // console.log('.', goodId)
          //检测是否存在购物车中,如果存在设置state.curIndex为当前菜品在购物车中的索引
          this.$store.dispatch('check_db', goodId)
          //如果存在,先自增当前菜品中的num，再设置购物车的数量
          //如果不存在，直接往购物车中增加一个新的菜品obj
          if (this.$store.state.cart.curIndex != -1) {
            this.$store.dispatch('add_db')
          } else {
            this.$set(foodItem, 'num', 1)
            this.$nextTick(() => {
              this.$store.dispatch('create_db', foodItem).then(() => {
                // console.log('加进去')
                this.$router.go(0)
              })
            })

          }
          this.$store.dispatch('update_cur_shop_status', goodId)
          this.$bus.$emit('number-change')//传去sell组件
          this.$bus.$emit('change-way', ({ goodId: goodId, way: 1 }))//传去cartList组件
          // console.log('777', this.$store.state.cart.cartInfo)
          foodItem.ifPlusActive = true
          foodItem.ifReduceActive = false
        } else {
          let goodId = foodItem.goodId - 0
          this.$store.dispatch('check_db', goodId)
          foodItem.num = parseInt(foodItem.num)
          //购物车中某道菜数目--
          this.$store.dispatch('reduce_db')
          this.$store.dispatch('update_cur_shop_status', goodId)
          this.$bus.$emit('number-change')//传去sell组件
          
          this.$bus.$emit('change-way', ({ goodId: goodId, way: -1 }))//传去cartList组件
          foodItem.ifReduceActive = true
          foodItem.ifPlusActive = false
        }
      }
    }
  }

</script>
<style scoped>
  .food-item {
    margin-left: 0.2rem;
    padding: .2rem;
    padding-left: 0;
    height: 1.9rem;
    background: #fff;
  }
  
  .food-item+.food-item {
    border-top: 0.01rem solid #e5e6e7;
  }
  
  .item-md {
    padding-left: .2rem;
    line-height: .4rem;
  }
  
  .item-rg {
    position: relative;
    text-align: right;
    line-height: 1.2rem;
    font-size: .35rem;
    color: #ccc;
  }
  
  .good-num {
    width: .4rem;
    border: none;
    background: inherit;
    color: #666;
  }
  
  .icon {
    padding: .07rem;
  }
  
  .isActive {
    color: #ff5722;
  }
</style>