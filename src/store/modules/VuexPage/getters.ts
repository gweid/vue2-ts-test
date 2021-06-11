import { IStateInit } from './types'
import { IState } from '../../types'
import { GetterTree } from 'vuex'

// IStateInit 为当前 module 的 state 类型， IState 为根 state 类型
const getter: GetterTree<IStateInit, IState> = {
  getUserInfo(state: IStateInit) {
    return state.userInfo
  }
}

export default getter