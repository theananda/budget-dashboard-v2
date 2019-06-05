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
  { 
  	name: 'home',
  	path: '/', 
  	component: Home 
  },
  {
  	name: 'union', 
  	path: '/regions', 
  	component: Region 
  },
  {
  	name: 'state_region', 
  	path: '/region/:pcode', 
  	component: Region, 
  	props: true
  },
  { 
  	name: 'departments',
  	path: '/departments', 
  	component: Department 
  },
  {
    name: 'department',
    path: '/department/:slug',
    component: Department
  }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
