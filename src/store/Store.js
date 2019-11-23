import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import user from './modules/user'
import auth from './modules/auth'

Vue.use(Vuex)

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    auth,
  },
  strict: debug,
})
