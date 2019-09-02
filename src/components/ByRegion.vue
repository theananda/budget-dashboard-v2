<template>
	<div class="region-wrapper mdl-grid main-page-wrapper">
		<div class="mdl-cell mdl-cell--12-col toolbar">
			<router-link to="/" class="mdl-button mdl-js-button">
				<i class="material-icons">arrow_back_ios</i> Back
			</router-link>
			<div class="right-menus">
				<router-link to="/2019/Union/sectors" class="mdl-button mdl-js-button">
					<i class="material-icons">scatter_plot</i> Explore by Sectors
				</router-link>
				<data-download-btn></data-download-btn>	
			</div>
		</div>
		<div class="mdl-cell mdl-cell--12-col viz-area">
			<div class="mdl-cell mdl-cell--3-col map-wrapper">
				<map-explorer/>
			</div>
			<div class="mdl-cell mdl-cell--9-col mdl-cell--3-offset viz-wrapper">
				<div class="mdl-grid">
					<div class="chart_wrapper mdl-cell mdl-cell--12-col">
						<div class="mdl-grid">
							<div class="mdl-cell mdl-cell--12-col">
								<h4>{{ this.charts.expenditure.title }}</h4>
							</div>
							<div class="mdl-cell mdl-cell--6-col single-viz">
								<apexchart :width="charts.expenditure.width" :height="charts.expenditure.height" :type="charts.expenditure.type" :options="charts.expenditure.options" :series="charts.expenditure.series"></apexchart>     
							</div>
							<div class="mdl-cell mdl-cell--6-col viz-description">
								<h5>Current Expenditure</h5>
								<p>General government expenditure for small expenses such as salary payments, pension funds, employee benefit calculations, treasury bonds and money raised to pay tickets on domestic and foreign debt interest paid on savings.</p>
								<h5>Capital Expenditure</h5>
								<p>Investments in assets that will last for more than a year, such as vehicles; repair and maintenance expense for buildings and roads, except military expenses.</p>
								<p class="info-text"><strong>Reference: <a href="https://asiafoundation.org/publication/public-financial-management-glossary-terms/" target="_blank">Public Finance Management Glossary and Terms, The Asia Foundation</a></strong></p>
								<p class="info-text">Note: We use standard shorthand for Financial Year. For example, by “2019”, we means “2018-19 FY”</p>
							</div>  
						</div>
					</div>

					<div class="chart_wrapper mdl-cell mdl-cell--12-col">
						<div class="mdl-grid">
							<div class="mdl-cell mdl-cell--12-col">
								<h4>{{ this.charts.income.title }}</h4>
							</div>
							<div class="mdl-cell mdl-cell--6-col single-viz">
								<apexchart :width="charts.income.width" :height="charts.income.height" :type="charts.income.type" :options="charts.income.options" :series="charts.income.series"></apexchart>      
							</div>
							<div class="mdl-cell mdl-cell--6-col viz-description">
								<h5>Financial Revenue</h5>
								<p>Includes revenues from taxes, fees and charges, earnings from state economic enterprises, sale of assets and local and international borrowings.</p>
								<h5>Capital Revenue</h5>
								<p>Revenues from sale of assets, receipts from private funds, and receipts from foreign aid.</p>
								<h5>Grants</h5>
								<p>A grant is a voluntary current or capital transfer between government units, or between a multinational organisation and a national government. In addition, a voluntary transfer to a private organisation or person is also called grant. Grant are treated as expenditure by the granting institution and revenue by the recipient insitution.</p>
								<h5>Own Source Revenue</h5>
								<p>The revenue that the local government raises directly by levying taxes, fees and charges from land, business activities and provision of services, excluding inter-governmental fiscal transfers.</p>
								<p class="info-text"><strong>Reference: <a href="https://asiafoundation.org/publication/public-financial-management-glossary-terms/" target="_blank">Public Finance Management Glossary and Terms, The Asia Foundation</a></strong></p>
								<p class="info-text">Note: We use standard shorthand for Financial Year. For example, by “2019”, we means “2018-19 FY”</p>
							</div>  
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>

import MapEx from './charts/Map.vue'
import VueApexCharts from 'vue-apexcharts'
import chartConfigs from '@/config/charts.js'
import Axios from 'axios'
import * as d3 from 'd3'
import config from '@/config/index.js'
import DataDownload from '@/components/partials/DataDownload.vue'

export default {
	name: 'MapExplorer',
	components: {
		'map-explorer' : MapEx,
		'apexchart' : VueApexCharts,
		'data-download-btn': DataDownload
	},
	data () {
		return {
			region : 'Union',
			charts : chartConfigs,
			raw_data : []
		}
	},
	watch: {
		'$route' (to, from) {
		  this.region = this.$route.params.pcode;
		  this.getData();
		}
	},
	beforeMount () {

		if (this.$route.params.pcode) {
			this.region = this.$route.params.pcode;
		}

		this.getData();
	},
	methods: {
		getData() {
			const api_url = config.api_url + "/budget?budget_level=" + this.region;
			Axios.get(api_url)
				.then(response => {

					var analyse_data = this.analyse(response.data.data);

					this.charts.income.series = this.prepareForChart(analyse_data['income']);

					this.charts.expenditure.series = this.prepareForChart(analyse_data['expenditure']);

			});
		},
		analyse(data) {

			return d3.nest()
					.key(function(d){
						return d.flow;
					})
					.key(function(d) { 
						return d.fin_year; 
					})
					.key(function(d) { 
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

			var raw_series = new Object;

			var series_arr = [];

			var categories = [];

			Object.keys(data).forEach(function(key) {

				categories.push(key);

				series_arr.push(data[key]);

			});

			categories = categories.sort();

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