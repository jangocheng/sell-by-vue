<template>
  <div class="cart-list">
    <div class="mask" @click="hideCartBar"></div>
    <div class="cart-bar">
      <div class="title">
        <span>购物车</span>
        <span @click="emptyCart" style="font-size: .4rem;"><i class="fa fa-trash-o" ></i></span>
      </div>
      <div class="cart-content" :style="cartListHeightStyle">
        <div class="item" v-for="(item,index) in cartList">
          <el-row>
            <el-col :span="14" class="item-lf">
              <span>{{item.goodName}}</span>
              <span>￥{{item.goodPrice*item.num}}</span>
            </el-col>
            <el-col :span="10" class="item-rg" style="font-size: .35rem">
              <span class="fa fa-minus-circle" :class="{'isActive':item.ifReduceActive}" @click="changeNumber(item,-1)"></span>
              <span style="padding: 0 .1rem;">{{item.num}}</span>
              <span class="fa fa-plus-circle" :class="{'isActive':item.ifPlusActive}" @click="changeNumber(item,1)"></span>
            </el-col>
          </el-row>
        </div>
        <div class="hr"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      cartList() {
        return this.$store.getters.getCartList
      },
      //动态计算购物车列表高度
      cartListHeightStyle() {
        let LENGTH = Object.keys(this.cartList).length
        if (LENGTH <= 4) {
          return {
            height: 0.8 * LENGTH + 'rem'
          }
        } else {
          return {
            height: '3.2rem',
            'overflow-y': 'scroll'
          }
        }
      }
    },
    created() {
      this.onFoodItem()
    },
    methods: {
      //传去外卖首页
      hideCartBar() {
        this.$bus.$emit('hide-cartBar')
      },
      //清空购物车
      emptyCart() {
        this.$store.dispatch('clear_local')
        this.$bus.$emit('number-change')
        this.hideCartBar()
      },
      //改变商品数
      changeNumber(item, way) {
        let goodId = item.goodId - 0
        this.$store.dispatch('check_db', goodId)
        if (way > 0) {
          this.$store.dispatch('add_db')
          this.$bus.$emit('number-change')
          this.$store.dispatch('update_cur_shop_status', goodId)
          item.ifPlusActive = true
          item.ifReduceActive = false
        } else {
          this.$store.dispatch('reduce_db')
          this.$store.dispatch('update_cur_shop_status', goodId)
  
          this.$bus.$emit('number-change')
          item.ifReduceActive = true
          item.ifPlusActive = false
        }
      },
      //从foodItem传来的事件
      onFoodItem() {
        this.$bus.$on('change-way', ({goodId, way}) => {
          let cartList = JSON.parse(localStorage.getItem('vuex_cart'))
          for (let i in cartList) {
            cartList[i].ifReduceActive = false
            cartList[i].ifPlusActive = false
            if (way > 0) {
              cartList[goodId - 0].ifPlusActive = true
            } else if (way < 0) {
              cartList[goodId - 0].ifReduceActive = true
            }
          }
          this.cartList = cartList
        })
      }
    }
  }

</script>
<style scoped>
  .cart-list,
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 2rem;
  }
  
  .mask {
    background: rgba(0, 0, 0, .5);
    z-index: 500;
  }
  
  .cart-bar {
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 600;
  }
  
  .title {
    padding: 0 .2rem;
    display: flex;
    justify-content: space-between;
    height: .8rem;
    line-height: .8rem;
    background: #f4f4f4;
    border-left: 0.05rem solid #fbc02d;
  }
  
  .item {
    padding: 0 .2rem;
    height: .8rem;
    line-height: .8rem;
    background: #fff;
  }
  
  .item+.item {
    border-top: 0.01rem solid #e5e6e7;
  }
  
  .item-lf {
    display: flex;
    justify-content: space-between;
  }
  
  .item-rg {
    text-align: right;
    font-size: .3rem;
    color: #666;
  }
  
  .isActive {
    color: #ff5722;
  }
  
  .hr {
    width: 100%;
    height: .25rem;
    background: #fff;
  }
</style>