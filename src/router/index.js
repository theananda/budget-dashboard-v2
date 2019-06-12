import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Region from '@/components/ByRegion.vue'
import Department from '@/components/ByDepartment.vue'

Vue.use(Router)

export default new Router({
  routes: [
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
})
