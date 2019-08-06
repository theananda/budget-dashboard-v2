<template>
	<div class="mdl-cell mdl-cell--4-col ministry_wrapper" :id="wrapperID">
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
    watch: {
        '$route' (to, from) {
          this.removeChart();
          this.renderChart(); 
        }
    },
  	mounted() {
  		if (this.cdata) {

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
      removeChart() {
        d3.select(this.svgSelector)
          .selectAll("g")
          .remove();
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

          var tooltip = d3.select('#'+ this.wrapperID)
                      .append("div")
                      .style("position", "absolute")
                      .style("opacity", 0)
                      .attr("class", "tooltip")
                      .style("background-color", "black")
                      .style("border-radius", "5px")
                      .style("padding", "10px")
                      .style("color", "white");


          var showTooltip = function(d) {
              tooltip
                .transition()
                .duration(200)
              tooltip
                .style("opacity", 1)
                .html(d.data.key + "<br>" + d.data.value + " million kyats")
                .style("left", (d3.mouse(this)[0]+20) + "px")
                .style("top", (d3.mouse(this)[1]+20) + "px")
            }
            var moveTooltip = function(d) {
              tooltip
                .style("left", (d3.mouse(this)[0]+20) + "px")
                .style("top", (d3.mouse(this)[1]+20) + "px")
            }
            var hideTooltip = function(d) {
              tooltip
                .transition()
                .duration(200)
                .style("opacity", 0)
            }


          leaf.on("mouseover", showTooltip )
              .on("mousemove", moveTooltip )
              .on("mouseleave", hideTooltip );


  		}   
  	},
  	computed: {
      	packData() {
          	return d3.hierarchy({children: this.cdata})
                      .sum(d => d.value);
      	},
      	output() {
        	return this.packChart();
      	},
      	svgSelector() {
      		return '#' + this.selector;
      	},
        wrapperID() {
          return this.selector + "-wrapper";
        }
  	}
}
</script>