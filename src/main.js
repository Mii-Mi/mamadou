import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index'
import store from './store/Store'
import axios from '../http-common'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

Vue.prototype.$flash = new Vue()

new Vue({
  vuetify,
  render: h => h(App),
  store,
  router
}).$mount('#app')

