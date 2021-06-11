import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { IStateInit } from './types'

const stateInit: IStateInit = {
  userInfo: {
    name: '张三',
    age: 18,
    sex: 1,
    token: 'xxxxxxaaaaaabbbbbbccccc',
    hobby: []
  }
}

export default {
  namespaced: true,
  state: stateInit,
  getters,
  mutations,
  actions
}