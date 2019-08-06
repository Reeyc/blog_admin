import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //将vuex状态保存到local本地
    token: localStorage.getItem("Authorization") ? localStorage.getItem("Authorization") : ""
  },
  mutations: {
    setToken(state, val) {
      state.token = val
      localStorage.setItem("Authorization", val)
    }
  }
})
