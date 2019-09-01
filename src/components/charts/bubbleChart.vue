<template>
	<div :id="wrapperID" class="center-chart svg-wrapper">
		<svg :id='selector'
			:height='height'
			:width='width'
		>
			<g
			      v-for="d in output"
			      :transform="`translate(${d.x + 1},${d.y + 1})`"
			    >
			      <circle
			        :r="d.r"
			        :fill="color"
			        v-on:click="circleClick(d)"
			        v-on:mouseover="circleMouseOver(d)"
			        v-on:mouseleave="circleMouseLeave(d)"
			      />
			</g>
		</svg>
		<div :id="tooltipID" class="tooltip"></div>
	</div>
</template>

<script>

import * as d3 from "d3"
import chroma from 'chroma-js'
import slugify from '@sindresorhus/slugify'

export default {

	name: 'BubbleChart',
	data() {
		return {
			tooltip : '',
			color : this.randomColor
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
		  
		}
	},
	methods: {
		packChart() {
			const packChart = d3.pack()
								.size([this.width, this.height])
								.padding(10);

			return packChart(this.packData).leaves();

		},
		removeChart() {
			d3.select(this.svgSelector)
			  .selectAll("g")
			  .remove();
		},
		d3Actions() {

		},
		circleClick(d) {
			this.$router.push({ 
				name: 'budget_entry', 
				params: { 
					fin_year: this.$route.params.fin_year,
					budget_level: this.$route.params.budget_level,
					sector_name: this.$route.params.sector_name,
					budget_entry: d.data.key
				} 
			});
		},
		circleMouseOver(d){
			d3.select('#' + this.tooltipID)
				.style("opacity", 1)
				.style("z-index", 999)
				.html(d.data.key + "<br>" + d.data.value + " millions kyats")
		},
		circleMouseLeave(d){
			d3.select('#' + this.tooltipID)
				.style("opacity", 0)
				.style("z-index", -999)
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
		randomColor() {
			return chroma.random(); 
		},
		svgSelector() {
			return '#' + this.selector;
		},
		wrapperID() {
		  return this.selector + "-wrapper";
		},
		tooltipID() {
			return this.selector + "-tooltip";
		}
	}
}
</script>