import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/Store'

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}



export default new VueRouter({
  routes: [
    // Frontend
    {
      path: '/',
      component: () => import('../layouts/Frontend')
    },
    // Backend
    {
      path: '/login',
      component: () =>import('../layouts/backend/Login'),
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/admin',
      component: () => import('../layouts/backend/Admin'),
      beforeEnter: ifAuthenticated,
      children: [
        {
          path: '',
          component: () => import('../pages/Home')
        },
        {
          path: 'messages',
          component: () => import('../pages/Messages')
        },
      ]
    }
  ],
  // mode: "history"
})