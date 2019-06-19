<template>
	<div class="department-wrapper mdl-grid">
		<div class="mdl-cell mdl-cell--6-col">
			<svg
				:height='height'
				:width='width'
			>
			</svg>
		</div>
		<div class="mdl-cell mdl-cell--6-col">
			<h2 id="dept_name">{{ department_name }}</h2>
			<h4 id="dept_value">{{ department_value }}</h4>
		</div>
	</div>
</template>

<script>

import Axios from 'axios'
import * as d3 from "d3"
import chroma from 'chroma-js'
import slugify from '@sindresorhus/slugify'

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
	beforeMount() {

		this.getData();

	},
	methods: {
		packChart() {
			const packChart = d3.pack()
								.size([500, 500])
								.padding(10);

			return packChart(this.packData).leaves();

		},
    	getData() {
    		const api_url = "http://localhost:3000/budget?budget_level=Union&flow=expenditure";
    		Axios.get(api_url)
    		    .then(response => {

    		    	this.chart_data = this.analyse(response.data.data);

    		    	this.renderChart();

					/*leaf.append("text")
						.text(d => d.data.name);*/

    		});
    	},
    	analyse(data) {
    		return d3.nest()
				  .key(function(d) { 
				  	return d.budget_entry;
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

	    	const leaf = d3.select("svg")
							.selectAll("g")
							.data(this.packChart)
							.join("g")
				      		.attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

			const origin = this;

			leaf.append("circle")
				.attr("r", d => d.r)
				.attr("fill", d => chroma.random());

			leaf.on("click", function(d){

				d3.select('#dept_name')
					.text(d.data.name);

				d3.select("#dept_value")
					.text(d.data.value + ' millions Kyats');

				origin.$router.push({ 
		            name: 'department', 
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