<template>
	<div class="department-wrapper mdl-grid">
		<div class="mdl-cell mdl-cell--6-col">
			<svg id="sector"
				:height='height'
				:width='width'
			>
			</svg>
		</div>
		<departments :name='department_name' :value='department_value' />
	</div>
</template>

<script>

import Axios from 'axios'
import * as d3 from "d3"
import config from '@/config/index.js'
import chroma from 'chroma-js'
import slugify from '@sindresorhus/slugify'
import Departments from '@/components/Departments.vue'

export default {
	name: "BubbleChart",
	data() {
		return {
			chart_data : [],
			width: 1000,
			height: 1000,
			department_name: '',
			department_value: ''
		}
	},
	props: [
		'cdata',
		'clickroute'
	],
	beforeMount() {
		this.getData();
	},
	components: {
	   'departments' : Departments
	},
	methods: {
		packChart() {
			const packChart = d3.pack()
								.size([500, 500])
								.padding(10);

			return packChart(this.packData).leaves();

		},
    	getData() {
    		const api_url = config.api_url + "/budget?budget_level=Union&flow=expenditure";
    		Axios.get(api_url)
    		    .then(response => {

    		    	this.chart_data = this.analyse(response.data.data);

    		    	this.renderChart();

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
			
    	},
    	renderChart() {

	    	const leaf = d3.select("#sector")
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

				origin.$router.push({ 
		            name: 'sector', 
		            params: { slug: slugify(d.data.name) } 
		        });
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