import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Region from '@/components/ByRegion.vue'
import Sector from '@/components/BySector.vue'
import BudgetEntry from '@/components/BudgetEntry.vue'

Vue.use(Router)

export default new Router({
  routes: [
	{ 
	  name: 'home',
	  path: '/', 
	  component: Home 
	},
	{
	  name: 'state_region', 
	  path: '/region/:pcode', 
	  component: Region, 
	  props: true
	},
	{ 
	  name: 'sectors',
	  path: '/:fin_year/:budget_level/sectors', 
	  component: Sector 
	},
	{
	  name: 'sector',
	  path: '/:fin_year/:budget_level/sector/:sector_name',
	  component: BudgetEntry
	},
	{
	  name: 'budget_entry',
	  path: '/:fin_year/:budget_level/sector/:sector_name/:budget_entry',
	  component: BudgetEntry
	}
  ]
})
