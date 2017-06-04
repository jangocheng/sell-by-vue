import * as types from './mutations_types'

export default {
    clear_local: ({commit}) => {
        commit(types.CLEAR_LOCAL)
    },
    update_local: ({commit}) => {
        commit(types.UPDATE_LOCAL)
    },
    update_cur_shop_status: ({commit},goodId) => {
        commit(types.UPDATE_CUR_SHOP_STATUS,goodId)
    },
    delete_db: ({commit}) => {
        commit(types.DELETE_DB)
        commit(types.UPDATE_LOCAL)
    },
    create_db: ({commit},obj) => {
        commit(types.CREATE_DB,obj)
        commit(types.UPDATE_LOCAL)
       
    },
    add_db: ({commit}) => {
        commit(types.ADD_DB)
        commit(types.UPDATE_LOCAL)
    },
    reduce_db: ({commit}) => {
        commit(types.REDUCE_DB)
        commit(types.UPDATE_LOCAL)
    },
    check_db: ({commit}, goodId) => {
        commit(types.CHECK_DB, goodId)
    }
}