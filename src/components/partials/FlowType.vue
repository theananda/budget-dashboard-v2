<template>
	<div class="mdl-grid">
		<div class="mdl-cell mdl-cell--12-col">
			<h4>{{ this.$route.params.budget_entry }}</h4>
		</div>
		<div class="mdl-cell mdl-cell--6-col">
			<h5 class="center-title">{{ charts.income_flowtype.title }}</h5>
			<apexchart :type="charts.income_flowtype.chart_type" width=380 :options="charts.income_flowtype.chartOptions" :series="charts.income_flowtype.series" />
		</div>
		<div class="mdl-cell mdl-cell--6-col">
			<h5 class="center-title">{{ charts.expenditure_flowtype.title }}</h5>
			<apexchart :type="charts.expenditure_flowtype.chart_type" width=380 :options="charts.expenditure_flowtype.chartOptions" :series="charts.expenditure_flowtype.series" />
		</div>
	</div>
</template>

<script>

import config from '@/config/index.js'
import Axios from 'axios'
import * as d3 from "d3"
import VueApexCharts from 'vue-apexcharts'	

export default {
	name: 'FlowType',
	components: {
		'apexchart' : VueApexCharts,
	},
	beforeMount () {
		this.getData();
	},
	watch: {
		'$route' (to, from) {
			this.api_params.budget_entry = this.$route.params.budget_entry
			this.getData();
		}
	},
	data() {
		return {
			current_fin_year : this.$route.params.fin_year,
			api_params : {
				budget_level : this.$route.params.budget_level,
				parent_ministry : this.$route.params.sector_name,
				budget_entry : this.$route.params.budget_entry
			},
			analysed_data : {},
			charts : {
				income_flowtype : {
					title : 'Income by Flow Type',
					chart_type : 'donut',
			        series: [],
			        chartOptions: {
			        	labels: [],
			        	dataLabels: {
							enabled: false
						},
			        	expandOnClick: true,
			        	legend: {
				            position: 'bottom'
				        }
			    	}
				},
				expenditure_flowtype : {
					title : 'Expenditure by Flow Type',
					chart_type : 'donut',
			        series: [],
			        chartOptions: {
			        	labels: [],
			        	dataLabels: {
							enabled: false
						},
						legend: {
				            position: 'bottom'
				        },
			        	expandOnClick: true
			    	}
			    }
			}
		}
	},
	methods: {
		getData() {
			const api_url = config.api_url + "/budget";
			Axios.get(api_url, {
				params : this.api_params
			})
				.then(response => {

					this.analysed_data = this.analyse(response.data.data);	

					console.log(this.analysed_data);

					if (this.analysed_data[this.current_fin_year]['income'] != undefined) {

						this.charts.income_flowtype.chartOptions = {
							labels : this.prepareForChart(this.analysed_data[this.current_fin_year]['income']).labels
						}

						this.charts.income_flowtype.series = this.prepareForChart(this.analysed_data[this.current_fin_year]['income']).series;
					}

					
					if (this.analysed_data[this.current_fin_year]['expenditure'] != undefined) {

						this.charts.expenditure_flowtype.chartOptions = {
							labels : this.prepareForChart(this.analysed_data[this.current_fin_year]['expenditure']).labels
						}

						this.charts.expenditure_flowtype.series = this.prepareForChart(this.analysed_data[this.current_fin_year]['expenditure']).series;

					}
					
			});
		},
		analyse(data) {

			return d3.nest()
					.key(function(d){
						return d.fin_year;
					})
					.key(function(d){
						return d.flow;
					})
					.key(function(d){
						return d.flow_type;
					})
					.rollup(function(v) { 
						return d3.sum(v, function(d) { 
							var f = d3.format(".2f");
							return f(d.value); 
						}); 
					})
					.object(data);
			
		},
		prepareForChart(data) {
			var result = {
				series : [],
				labels : []
			};

			Object.keys(data).forEach(function(key) {

				result.series.push(data[key]);
				result.labels.push(key);

			});

			return result;
		}
	}
}
</script>