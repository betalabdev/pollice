import Vue from 'vue'
import App from './App.vue'
import Poll from './components/Poll'
import Vote from './components/Vote'
import Result from './components/Result'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/poll', component: Poll },
  { path: '/vote/:questionId', component: Vote },
  { path: '/result/:questionId', component: Result },
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')