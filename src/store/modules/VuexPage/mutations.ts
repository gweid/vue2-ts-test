import { MutationTree } from 'vuex'
import { IStateInit } from './types'
import { SET_USERINFO } from './constant'

const mutations: MutationTree<IStateInit> = {
  [SET_USERINFO](state, payload) {
    state.userInfo = payload
  }
}

export default mutations