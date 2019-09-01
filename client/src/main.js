import Vue from 'vue'
import App from './App.vue'
import Poll from './components/Poll'
import Vote from './components/Vote'
import Result from './components/Result'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/:questionId', component: Result },
  { path: '/poll', component: Poll },
  { path: '/vote/:questionId', component: Vote },
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')