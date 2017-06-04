import tool from 'utils/tool'
export default {
  getInfo(state) {
    state.cartInfo.total_nums = 0
    state.cartInfo.total_price = 0
    let list = state.cartList; //集合
    // console.log('list',list)
    for (let i in list) {
      let price = list[i].goodPrice,
          num = list[i].num; 
          // console.log('000',i,num)
      state.cartInfo.total_nums += num
      state.cartInfo.total_price = tool.accAdd(state.cartInfo.total_price, tool.mul(price, num))
    }
    return state.cartInfo
  },
  getCartList(state) {
    return state.cartList
  }
}
