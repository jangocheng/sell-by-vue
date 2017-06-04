import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import createPersistedState from 'vuex-persistedstate'
import cart from './cart/index'
export default new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        cart
    }
})