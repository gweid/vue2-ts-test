import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import modules from './modules'
import { IState } from './types'

Vue.use(Vuex)

const store: StoreOptions<IState> = {
  modules
}

export default new Vuex.Store<IState>(store)
