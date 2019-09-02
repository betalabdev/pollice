import Vue from 'vue'
import App from './App.vue'
import Poll from './components/Poll'
import Vote from './components/Vote'
import Result from './components/Result'
import VueRouter from 'vue-router'
import VueWebsocket from './services/socket'

import store from './store'

Vue.use(VueRouter)
Vue.use(VueWebsocket, {
  store,
  url: "ws://127.0.0.1:3000"
})

Vue.config.productionTip = false

const routes = [
  { path: '/', redirect: '/poll' },
  { path: '/poll', name: 'poll', component: Poll },
  { path: '/vote/:questionId', name: 'vote', component: Vote },
  { path: '/result/:questionId', name: 'result', component: Result },
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})