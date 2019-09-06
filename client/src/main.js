import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import VueWebsocket from './services/socket'
import VueQrcode from '@chenfengyuan/vue-qrcode';

import Poll from './components/Poll'
import PollList from './components/PollList'
import Vote from './components/Vote'
import Result from './components/Result'
import Qr from './components/Qr'

import store from './store'

Vue.use(VueRouter)
Vue.use(VueWebsocket, {
  store,
})
Vue.component(VueQrcode.name, VueQrcode);

Vue.config.productionTip = false

const routes = [
  { path: '/', redirect: '/poll' },
  { path: '/new', name: 'poll-new', component: Poll },
  { path: '/poll', name: 'poll-list', component: PollList },
  { path: '/poll/:questionId', name: 'poll-detail', component: Poll },
  { path: '/vote/:questionId', name: 'vote', component: Vote },
  { path: '/result/:questionId', name: 'result', component: Result },
  { path: '/qr/:questionId', name: 'qr', component: Qr },
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