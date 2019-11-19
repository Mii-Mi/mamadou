import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router/index'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  vuetify,
  render: h => h(App),
  router
}).$mount('#app')

