/* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS } from '../actions/auth'
import { USER_REQUEST } from '../actions/user'
import { AUTH_LOGOUT } from '../actions/auth'
import axios from '../../../http-common'

const state = { 
  token: localStorage.getItem('user-token') || '',
  status: ''
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => { // The Promise used for router redirect in login
      commit(AUTH_REQUEST)
      axios({url: '/admin/login', data: user, method: 'POST'})
        .then(resp => {
          localStorage.setItem('msg', JSON.parse(JSON.stringify(resp.data.msg)))
          const token = resp.data.token
          localStorage.setItem('user-token', token) // store the token in localstorage
          axios.defaults.headers.common['Authorization'] = token
          commit(AUTH_SUCCESS, token)
          // you have your token, now log in your user :)
          dispatch(USER_REQUEST)
          resolve(resp)
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.setItem('msg', JSON.parse(JSON.stringify(err.response.data.msg)))
          localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
          reject(err)
        })
      })
    },
    [AUTH_LOGOUT]: ({dispatch}) => {
      return new Promise((resolve) => {
        dispatch(AUTH_LOGOUT)
        localStorage.removeItem('user-token') // clear your user's token from localstorage
        resolve()
      })
    },
    [AUTH_LOGOUT]: ({commit}) => {
      return new Promise((resolve) => {
        commit(AUTH_LOGOUT)
        localStorage.removeItem('user-token') // clear your user's token from localstorage
        resolve()
      })
    }
  }

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = 'success'
    state.token = token
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
    state.token = ''
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}