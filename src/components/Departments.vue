<template>
	<div class="mdl-cell mdl-cell--6-col">
		<h2 id="dept_name">{{ name }}</h2>
		<h4 id="dept_value" v-if="value">{{ value }} millions kyats</h4>
		<svg id="department"
			:height='height'
			:width='width'
		>
		</svg>
		<p>{{ department_name }}</p>
		<p v-if="department_value">{{ department_value }} millions kyats</p>
	</div>
</template>

<script>

import BubbleChart from './charts/bubbleChart.vue'
import config from '@/config/index.js'
import Axios from 'axios'
import * as d3 from "d3"
import chroma from 'chroma-js'
import slugify from '@sindresorhus/slugify'

export default {
    name: 'Departments',
    data() {
    	return {
    		sector : '',
    		width: 300,
    		height: 300,
    		chart_data : [],
    		department_name: '',
    		department_value: ''
    	}
    },
    props : [
    	'name',
    	'value'
    ],
    watch: {
        '$route' (to, from) {
          this.sector = this.$route.params.sector_name;
          this.getData();
        }
    },
    methods: {
    	getData() {
    		const api_url = config.api_url + "/budget?budget_level=Union&flow=expenditure&fin_year=2019&sector=" + this.name;
    		Axios.get(api_url)
    		    .then(response => {

    		    	this.chart_data = this.analyse(response.data.data);

    		    	d3.select('#department').selectAll('*').remove();
    		    	
    		    	this.renderChart();

    		});
    	},
    	analyse(data) {
    		return d3.nest()
				  .key(function(d) { 
				  	return d.parent_ministry;
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
			
    	},
    	packChart() {
    		const packChart = d3.pack()
    							.size([200, 200])
    							.padding(10);

    		return packChart(this.packData).leaves();

    	},
    	renderChart() {

	    	const leaf = d3.select("#department")
							.selectAll("g")
							.data(this.packChart)
							.join("g")
				      		.attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

			const origin = this;

			leaf.append("circle")
				.attr("r", d => d.r)
				.attr("fill", d => chroma.random());

			leaf.on("click", function(d){

				origin.department_name = d.data.name;

				origin.department_value = d.data.value;

				/*origin.$router.push({ 
		            name: 'ministries', 
		            params: { ministry_name: slugify(d.data.name) } 
		        });*/
			});
    	}	
    },
    computed: {
    	packData() {
    		return d3.hierarchy({children: this.chart_data})
    					.sum(d => d.value);
    	},
    	output() {

    	  return this.packChart();
    	}
    }
}

</script>