<template>
	<div>
		<svg
			:height='height'
			:width='width'
		>
			<g transform="translate(50,50)">
			  <circle
			    v-for="c in output"
			    :key="c.id"
			    :r="c.r"
			    :cx="c.x"
			    :cy="c.y"
			    :fill="c.fill"
			    :stroke="c.stroke"
			  >
			  </circle>
			</g>
		</svg>
	</div>
</template>

<script>

import Axios from 'axios'
import * as d3 from "d3"
import chroma from 'chroma-js'

export default {
	name: "BubbleChart",
	data() {
		return {
			data : [],
			width: 1000,
			height: 1000
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

			const output = packChart(this.packData).leaves();

			return output.map((d, i) => {
			  return {
			    id: i + 1,
			    r: d.r,
			    x: d.x,
			    y: d.y,
			    fill: chroma.random(),
			    stroke: "grey",
			    name: d.data.name,
			    value: d.data.value
			  };
			});
		},
    	getData() {
    		const api_url = "http://localhost:3000/budget?budget_level=Union";
    		Axios.get(api_url)
    		    .then(response => {

    		    	this.data = this.analyse(response.data.data);

    		});
    	},
    	analyse(data) {
    		return d3.nest()
				  .key(function(d) { 
				  	return d.budget_category; 
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
	},
	computed: {
		packData() {
			return d3.hierarchy({children: this.data})
						.sum(d => d.value);
		},
		output() {

		  return this.packChart();
		}
	}
}
	
</script>