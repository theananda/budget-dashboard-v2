<template>
	<div class="mdl-cell mdl-cell--4-col ministry_wrapper">
		<svg :id='selector'
			:height='height'
			:width='width'
		>
		</svg>
		<div class="info">
			<h4>{{ name }}</h4>
			<p>{{ value }} millions kyats</p>
		</div>
	</div>
</template>

<script>

import * as d3 from "d3"
import chroma from 'chroma-js'
import slugify from '@sindresorhus/slugify'

export default {

	name: 'ByMinistry',
  	data () {
    	return {
    		chart_data : this.cdata
    	}
  	},
  	props: [
  		'name', 
  		'value', 
  		'cdata',
  		'width',
  		'height',
  		'selector'
  	],
  	mounted() {
  		if (this.chart_data) {
  			this.renderChart();	
  		}
  	},
  	methods: {
  		packChart() {
	  	    const packChart = d3.pack()
	  	                        .size([150, 150])
	  	                        .padding(10);

	  	    return packChart(this.packData).leaves();

  		},
  		renderChart() {

	  	    const leaf = d3.select(this.svgSelector)
	  	                    .selectAll("g")
	  	                    .data(this.packChart)
	  	                    .join("g")
	  	                    .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

	  	    const origin = this;

          const color = chroma.random();

	  	    leaf.append("circle")
	  	        .attr("r", d => d.r)
	  	        .attr("fill", color);

	  	    leaf.on("click", function(d){

	  	        origin.$router.push({ 
	  	            name: 'sector', 
	  	            params: { sector_name: slugify(d.data.key) } 
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
      	},
      	svgSelector() {
      		return '#' + this.selector;
      	}
  	}
}
</script>