<template>
	<div class="region-wrapper mdl-grid">
		<div class="mdl-cell mdl-cell--12-col toolbar">
			<router-link to="/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Back</router-link>
		</div>
		<div class="mdl-cell mdl-cell--12-col viz-area">
			<div class="mdl-cell mdl-cell--3-col map-wrapper">
				<map-explorer/>
			</div>
			<div class="mdl-cell mdl-cell--9-col mdl-cell--3-offset	viz-wrapper">
				<div class="mdl-grid">
					<div class="chart_wrapper mdl-cell mdl-cell--12-col">
						<div class="mdl-grid">
							<div class="mdl-cell mdl-cell--12-col">
								<h3>{{ this.charts.expenditure.title }}</h3>
							</div>
							<div class="mdl-cell mdl-cell--6-col single-viz">
								<apexchart :width="charts.expenditure.width" :height="charts.expenditure.height" :type="charts.expenditure.type" :options="charts.expenditure.options" :series="charts.expenditure.series"></apexchart>		
							</div>
							<div class="mdl-cell mdl-cell--6-col viz-description" v-html="this.charts.expenditure.viz_desc">
								{{ this.charts.expenditure.viz_desc }}
							</div>	
						</div>
					</div>

					<div class="chart_wrapper mdl-cell mdl-cell--12-col">
						<div class="mdl-grid">
							<div class="mdl-cell mdl-cell--12-col">
								<h3>{{ this.charts.income.title }}</h3>
							</div>
							<div class="mdl-cell mdl-cell--6-col single-viz">
								<apexchart :width="charts.income.width" :height="charts.income.height" :type="charts.income.type" :options="charts.income.options" :series="charts.income.series"></apexchart>		
							</div>
							<div class="mdl-cell mdl-cell--6-col viz-description" v-html="this.charts.income.viz_desc">
								{{ this.charts.income.viz_desc }}
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
import chartConfigs from './charts/chartsConfig.js'
import Axios from 'axios'
import * as d3 from "d3"
import _ from "lodash"

export default {
    name: 'MapExplorer',
    components: {
        'map-explorer' : MapEx,
        'apexchart' : VueApexCharts
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
    		const api_url = "http://localhost:3000/budget?budget_level=" + this.region;
    		Axios.get(api_url)
    		    .then(response => {

    		    	var analyse_data = this.analyse(response.data.data);

    		    	var income_chart_data = this.prepareForChart(analyse_data['income']);

    		    	console.log(income_chart_data.categories);

    		    	this.charts.income.options.xaxis.categories = income_chart_data.categories;

    		    	this.charts.income.series = income_chart_data.series;

    		    	var expenditure_chart_data = this.prepareForChart(analyse_data['expenditure']);

    		    	console.log(expenditure_chart_data.categories);

    		    	this.charts.expenditure.options.xaxis.categories = expenditure_chart_data.categories;

    		    	this.charts.expenditure.series = expenditure_chart_data.series;

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
				  			return d.value; 
				  		}); 
				  	})
				  .object(data);
			
    	},
    	prepareForChart(data) {

    		var result = {
    			categories : [],
    			series : []
    		};

    		var raw_series = new Object;

    		var series_arr = [];

    		Object.keys(data).forEach(function(key) {

    		  result.categories.push(key);

    		  series_arr.push(data[key]);

    		});

    		var i;
    		for (i = 0; i < series_arr.length; i++) {

    			Object.keys(series_arr[i]).forEach(function(key){

    		  	if (raw_series.hasOwnProperty(key)) {

    		  		raw_series[key]['data'][i] = series_arr[i][key];

    		  	} else {

    		  		raw_series[key] = {
	    		  		name : key,
	    		  		data : [0,0,0,0,0,0,0,0,0]
    		  		};

    		  		raw_series[key]['data'][i] = series_arr[i][key];
    		  		
    		  	}

    		  });

    		}

    		result.series = Object.values(raw_series);

    		return result;

    	}
    }
}

</script>