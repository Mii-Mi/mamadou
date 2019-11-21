import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
    // Frontend
    {
      path: '/',
      component: () => import('../layouts/Frontend')
    },
    // Backend
    {
      path: '/admin',
      component: () =>import('../layouts/backend/Login')
    }
  ],
  mode: "history"
})