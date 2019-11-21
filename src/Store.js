import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)

Vue.config.productionTip = false

Vue.use(VueAxios, axios)


const state = {
  userGroup: null
}
const mutations = {
  ADD_USERGROUP (state, group) {
    state.userGroup = group
  }
}
const actions = {
  addUserGroup (store, group) {
    store.commit('ADD_USERGROUP', group)
  }
}


let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: {},
  actions: actions
})

global.store = store

export default store
