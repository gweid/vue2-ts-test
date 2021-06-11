import { ActionTree } from 'vuex'
import { IStateInit } from './types'
import { IState } from '../../types'
import { SET_USERINFO } from './constant'

// IStateInit 为当前 module 的 state 类型， IState 为根 state 类型
const actions: ActionTree<IStateInit, IState> = {
  [SET_USERINFO]({ commit }, payload) {
    commit(SET_USERINFO, payload)
  }
}

export default actions