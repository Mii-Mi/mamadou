import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index'
import store from './Store'

new Vue({
  vuetify,
  render: h => h(App),
  store,
  router
}).$mount('#app')

