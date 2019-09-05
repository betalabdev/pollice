import Vue from 'vue'
import App from './App.vue'
import Poll from './components/Poll'
import PollList from './components/PollList'
import Vote from './components/Vote'
import Result from './components/Result'
import VueRouter from 'vue-router'
import VueWebsocket from './services/socket'

import store from './store'

Vue.use(VueRouter)
Vue.use(VueWebsocket, {
  store,
})

Vue.config.productionTip = false

const routes = [
  { path: '/', redirect: '/poll' },
  { path: '/new', name: 'poll-new', component: Poll },
  { path: '/poll', name: 'poll-list', component: PollList },
  { path: '/poll/:questionId', name: 'poll-detail', component: Poll },
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