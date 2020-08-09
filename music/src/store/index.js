import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
  /*
  // state:用于保存全局共享数据
  state: {
    isFullScreen: false
  },
  // mutations:用于保存修改全局共享数据的方法
  mutations: {
    changeFullScreen (state, flag) { // flag 传递的值
      state.isFullScreen = flag
    }
  },
  // actions:用于保存触发mutations中保存到方法
  actions: {
    setFullScreen ({ commit }, flag) {
      // 通过commit来触发changeFullScreen方法
      commit('changeFullScreen', flag)
    }
  },
  // getters:获取全局共享的数据
  getters: {
    isFullScreen (state) {
      return state.isFullScreen
    }
  },
  modules: {
  }
  */
})
