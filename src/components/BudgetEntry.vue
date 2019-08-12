<template>
	<div class="mdl-grid">
		<div class="mdl-cell mdl-cell--12-col toolbar">
			<router-link to="/2019/sectors" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Back to Sectors</router-link>
		</div>
		<div class="mdl-cell mdl-cell--12-col region-chart-wrapper">
			<h4>{{ this.sector }}</h4>
		</div>
		<div v-for="k in chart_data">{{ k.key }} - {{ k.value }}</div>
	</div>
</template>

<script>

import config from '@/config/index.js'
import Axios from 'axios'
import * as d3 from "d3"

export default {
	name: 'Departments',
	data() {
		return {
			sector: this.$route.params.sector_name,
			api_params : {
				//budget_level : 'Union',
				//flow : 'expenditure',
				fin_year : this.$route.params.fin_year,
				parent_ministry : this.$route.params.sector_name
			},
			current_fin_year: this.$route.params.fin_year,
			chart_data: []
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

					console.log(response.data.data);

					var chart_data = this.analyse(response.data.data);

					var union_data = chart_data.Union

					console.log(chart_data);
			});
		},
		analyse(data) {

			return d3.nest()
					.key(function(d){
						return d.budget_level;
					})
					.key(function(d){
						return d.budget_entry;
					})
					/*.rollup(function(v) { 
						return d3.sum(v, function(d) { 
							var f = d3.format(".2f");
							return f(d.value); 
						}); 
					})*/
					.object(data);
			
		},
	},
	computed: {

	}
}


</script>
