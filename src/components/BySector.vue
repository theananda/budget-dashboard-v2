<template>
	<div class="region-wrapper mdl-grid">
		<div class="mdl-cell mdl-cell--12-col toolbar">
			<router-link to="/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Back</router-link>
		</div>
		<div class="mdl-cell mdl-cell--12-col region-chart-wrapper">
			<h2>2019 Expenditure</h2>
			<bubble-chart :cdata="chart_data" />
		</div>
	</div>
</template>

<script>

import BubbleChart from './charts/bubbleChart.vue'
import config from '@/config/index.js'
import Axios from 'axios'
import * as d3 from "d3"


export default {
    name: 'Sectors',
    components: {
       'bubble-chart' : BubbleChart
    },
    data() {
    	return {
    		chart_data : [],
    		width: 1000,
    		height: 1000,
    		department_name: '',
    		department_value: ''
    	}
    },
    beforeMount() {
    	this.getData();
    },
    methods: {
    	getData() {
    		const api_url = config.api_url + "/budget?budget_level=Union&flow=expenditure&fin_year=2019";
    		Axios.get(api_url)
    		    .then(response => {

    		    	this.chart_data = this.analyse(response.data.data);

    		});
    	},
    	analyse(data) {
    		return d3.nest()
				  .key(function(d) { 
				  	return d.sector;
				  })
				  .rollup(function(v) { 
				  	return d3.sum(v, function(d) { 
				  		return d.value;
				  	}); 
				  })
				  .entries(data)
				  .map(function(group) { 
				  	return {
				  		name : group.key,
				  		value : group.value
				  	};
				  });
			
    	}
    }
}

</script>