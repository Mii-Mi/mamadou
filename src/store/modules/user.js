import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user'
import apiCall from '../../../http-common'
import Vue from 'vue'
import { AUTH_LOGOUT } from '../actions/auth'

const state = { status: '', profile: localStorage.getItem('profile') || {} }

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile,
}

const actions = {
  [USER_REQUEST]: ({commit,dispatch}) => {
    commit(USER_REQUEST)
    apiCall({url: '/admin/profile'})
      .then(resp => {
        commit(USER_SUCCESS, resp)
        const profile = {...resp.data}
        localStorage.setItem('profile', JSON.stringify(profile)) // store the profile in localstorage
      })
      .catch(err => {
        commit(USER_ERROR, err)
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT)
      })
  },
}

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'profile', resp)
  },
  [USER_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}