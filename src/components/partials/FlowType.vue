<template>
	<div class="mdl-grid">
		<div class="mdl-cell mdl-cell--12-col">
			<h4>{{ this.$route.params.sector_name }} <span v-if="this.$route.params.budget_entry"> - {{ this.$route.params.budget_entry }}</span></h4>
		</div>
		<div class="mdl-cell mdl-cell--12-col">
			<div class="mdl-grid">
				<div class="mdl-cell mdl-cell--12-col">
					<h4 class="center-title colored-title">{{ this.$route.params.fin_year }} {{ this.$route.params.budget_level }} Income & Expenditure</h4>
				</div>
				<div class="mdl-cell mdl-cell--6-col" v-if="charts.income_flowtype.display">
					<h5 class="center-title">{{ charts.income_flowtype.title }}</h5>
					<apexchart :type="charts.income_flowtype.chart_type" width=380 :options="charts.income_flowtype.chartOptions" :series="charts.income_flowtype.series" />
				</div>
				<div class="mdl-cell mdl-cell--6-col" v-if="charts.expenditure_flowtype.display">
					<h5 class="center-title">{{ charts.expenditure_flowtype.title }}</h5>
					<apexchart :type="charts.expenditure_flowtype.chart_type" width=380 :options="charts.expenditure_flowtype.chartOptions" :series="charts.expenditure_flowtype.series" />
				</div>
			</div>	
		</div>
		<div class="mdl-cell mdl-cell--12-col">
			<div class="mdl-grid">
				<div class="mdl-cell mdl-cell--12-col">
					<h4 class="center-title colored-title">Yearly Income & Expenditure</h4>
				</div>
				<div class="mdl-cell mdl-cell--6-col">
					<h5 class="center-title">{{ charts.income_by_year.title }}</h5>
					<apexchart :width="charts.income_by_year.width" :height="charts.income_by_year.height" :type="charts.income_by_year.type" :options="charts.income_by_year.options" :series="charts.income_by_year.series"></apexchart>  
				</div>
				<div class="mdl-cell mdl-cell--6-col">
					<h5 class="center-title">{{ charts.expenditure_by_year.title }}</h5>
					<apexchart :width="charts.expenditure_by_year.width" :height="charts.expenditure_by_year.height" :type="charts.expenditure_by_year.type" :options="charts.expenditure_by_year.options" :series="charts.expenditure_by_year.series"></apexchart>  
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import config from '@/config/index.js'
import Axios from 'axios'
import * as d3 from "d3"
import VueApexCharts from 'vue-apexcharts'
import chartsConfig from '@/config/flowtypecharts.js'	

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
			charts : chartsConfig
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

					console.log(this.analysed_data[this.current_fin_year]['income']);

					if (this.analysed_data[this.current_fin_year]['income'] == undefined) {

						this.charts.income_flowtype.display = false;

					} else {

						this.charts.income_flowtype.display = true;

						this.charts.income_flowtype.chartOptions = {
							labels : this.prepareForChart(this.analysed_data[this.current_fin_year]['income']).labels,
				        	dataLabels: {
								enabled: false
							},
				        	expandOnClick: true,
				        	legend: {
					            position: 'bottom'
					        }
						}

						this.charts.income_flowtype.series = this.prepareForChart(this.analysed_data[this.current_fin_year]['income']).series;

					}

					
					if (this.analysed_data[this.current_fin_year]['expenditure'] == undefined) {

						this.charts.expenditure_flowtype.display = false;

					} else {

						this.charts.expenditure_flowtype.display = true;

						this.charts.expenditure_flowtype.chartOptions = {
							labels : this.prepareForChart(this.analysed_data[this.current_fin_year]['expenditure']).labels,
				        	dataLabels: {
								enabled: false
							},
				        	expandOnClick: true,
				        	legend: {
					            position: 'bottom'
					        }
						}

						this.charts.expenditure_flowtype.series = this.prepareForChart(this.analysed_data[this.current_fin_year]['expenditure']).series;

					}

					var byYearData = this.analyseForStackedChart(response.data.data);

					this.charts.expenditure_by_year.series = this.prepareForStackedBarChart(byYearData['expenditure']);

					this.charts.income_by_year.series = this.prepareForStackedBarChart(byYearData['income']);

					
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
		analyseForStackedChart(data) {
			return d3.nest()
				.key(function(d){
					return d.flow;
				})
				.key(function(d){
					return d.fin_year;
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
		},
		prepareForStackedBarChart(data) {

			var raw_series = new Object;

			var series_arr = [];

			var categories = [];

			Object.keys(data).forEach(function(key) {

				categories.push(key);

				series_arr.push(data[key]);

			});

			var i;

			for (i = 0; i < series_arr.length; i++) {

				Object.keys(series_arr[i]).forEach(function(key){

				  if (!raw_series.hasOwnProperty(key)) {

					  raw_series[key] = {
						  name : key,
						  data : []
					  };

					  categories.forEach(function(val){
						raw_series[key]['data'].push({
							x : val,
							y : 0
						});
					  });

				  }

				  raw_series[key]['data'][i] = {
												  x : categories[i],
												  y : series_arr[i][key]
											};

				});

			}

			return Object.values(raw_series);
		}
	}
}
</script>