import * as types from './mutations_types'
export default {
    [types.CLEAR_LOCAL](state) {
        // console.log('清空')
        for (let i in state.cartList) {
            state.cartList[i].num = 0
        }
        state.cartList = {}
        state.cartInfo.total_price = 0
        state.cartInfo.total_nums=0
        localStorage.removeItem('vuex_cart');
    },
    [types.UPDATE_LOCAL](state) {
        // console.log('更新本地')
        localStorage.setItem('vuex_cart', JSON.stringify(state.cartList));
    },
    [types.UPDATE_CUR_SHOP_STATUS](state, index = -1) {
        // console.log('更新当前商品', index)
        state.curIndex = index
    },
    [types.DELETE_DB](state) {
        if (state.curIndex >= 0) {
            //如果购物车中有商品Id对应的索引,删去该元素
            state.cartList[state.curIndex].num = 0
            delete state.cartList[state.curIndex]
        }
    },
    [types.CREATE_DB](state, foodItem) {
       
        //state.cartList的索引的值为对应的商品对象
        state.cartList[foodItem.goodId] = foodItem
        //  console.log('create mutation 有效')
    },
    [types.ADD_DB](state) {
        //商品++

        state.cartList[state.curIndex].num = parseInt(state.cartList[state.curIndex].num)
        state.cartList[state.curIndex].num++
    },
    [types.REDUCE_DB](state) {
        state.cartList[state.curIndex].num = parseInt(state.cartList[state.curIndex].num)
        state.cartList[state.curIndex].num--
        // console.log(state.cartList[state.curIndex], '22')
        if (state.cartList[state.curIndex].num <= 0) {
            // console.log(state.cartList[state.curIndex].num, state.curIndex, '<=0')
            delete state.cartList[state.curIndex]
        }
    },
    [types.CHECK_DB](state, id) {
        state.curIndex = -1
        let list = state.cartList
        if (Object.keys(list).length > 0) {
            for (let i in list) {
                if (list[i].goodId == id) {
                    state.curIndex = i
                    break
                }
            }
        }
       
    }
}