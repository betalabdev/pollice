import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import VueWebsocket from './services/socket'

import Poll from './components/Poll'
import Login from './components/Login'
import Logout from './components/Logout'
import PollList from './components/PollList'
import Vote from './components/Vote'
import Result from './components/Result'
import GSignInButton from 'vue-google-signin-button'
import Qr from './components/Qr'
import Axios from 'axios'

import store from './store'

const token = localStorage.getItem('token')

Vue.prototype.$http = Axios;

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.use(VueRouter)
Vue.use(VueWebsocket, {
  store,
})
Vue.use(GSignInButton)

Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    redirect: '/poll'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/new',
    name: 'poll-new',
    component: Poll
  },
  {
    path: '/poll',
    name: 'poll-list',
    component: PollList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/poll/:questionId',
    name: 'poll-detail',
    component: Poll
  },
  {
    path: '/vote/:questionId',
    name: 'vote',
    component: Vote
  },
  {
    path: '/result/:questionId',
    name: 'result',
    component: Result,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/qr/:questionId',
    name: 'qr',
    component: Qr
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isLoggedIn']) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})