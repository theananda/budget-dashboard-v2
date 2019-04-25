import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Region from './components/ByRegion.vue'
import Department from './components/ByDepartment.vue'
import 'leaflet/dist/leaflet.css'
import './assets/css/style.css'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/regions', component: Region },
  { path: '/departments', component: Department }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
