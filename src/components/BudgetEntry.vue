<template>
	<div class="mdl-grid main-page-wrapper">
		<div class="mdl-cell mdl-cell--12-col toolbar">
			<router-link 
				to="/2019/Union/sectors" 
				class="mdl-button mdl-js-button">
				<i class="material-icons">arrow_back_ios</i> Back to All Sectors
			</router-link>
		</div>
		<div class="mdl-cell mdl-cell--12-col chart-wrapper" style="margin-left:unset;">
			<div class="mdl-grid mdl-grid--no-spacing">
				<div class="mdl-cell mdl-cell--3-col parent-ministry-wrapper">
					<h5 class="center-title">{{ pageTitle }}</h5>
					<bubble-chart v-if="bubble_data" :name="sector" :value="0" :cdata="bubble_data" :selector="slugify(sector)" :width="200" :height="200"></bubble-chart>		
				</div>
				<div class="mdl-cell mdl-cell--9-col mdl-cell--3-offset">
					<flow-type></flow-type>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import config from '@/config/index.js'
import Axios from 'axios'
import * as d3 from "d3"
import BubbleChart from './charts/bubbleChart.vue'
import FlowType from './partials/FlowType.vue'
import slugify from '@sindresorhus/slugify'

export default {
	name: 'Departments',
	components: {
	   'bubble-chart' : BubbleChart,
	   'flow-type' : FlowType
	},
	data() {
		return {
			sector: this.$route.params.sector_name,
			api_params : {
				budget_level : this.$route.params.budget_level,
				flow : 'expenditure',
				fin_year : this.$route.params.fin_year,
				parent_ministry : this.$route.params.sector_name
			},
			current_fin_year: this.$route.params.fin_year,
			current_budget_level: this.$route.params.budget_level,
			chart_data: [],
			bubble_data: [],
		}
	},
	watch: {
		'$route' (to, from) {

		}
	},
	beforeMount () {
		this.getData();
	},
	methods: {
		getData() {
			const api_url = config.api_url + "/budget";
			Axios.get(api_url, {
				params : this.api_params
			})
				.then(response => {

					this.analyse(response.data.data);

			});
		},
		analyse(data) {

			this.bubble_data = d3.nest()
					.key(function(d){
						return d.budget_entry;
					})
					.rollup(function(v) { 
						return d3.sum(v, function(d) { 
							var f = d3.format(".2f");
							return f(d.value); 
						}); 
					})
					.entries(data);
			
		},
		slugify(val) {
			return slugify(val);
		}
	},
	computed: {
		pageTitle() {
			return this.api_params.fin_year + " " + this.api_params.budget_level + " Expenditure by Ministry";
		}
	}
}


</script>
