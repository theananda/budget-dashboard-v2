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

import * as d3 from "d3";

export default {
	name: "BubbleChart",
	data() {
		return {
			data : [
				{name: 'Adminstration', value: 500},
				{name: 'Government', value: 3000},
				{name: 'Other Income and Expenditure', value: 100},
				{name: 'Other Income and Expenditure', value: 1000}
			],
			width: 300,
			height: 300
		}
	},
	methods: {
		packChart() {
			const packChart = d3.pack()
								.size([200, 200])
								.padding(10);

			console.log(this.packData);
			const output = packChart(this.packData).leaves();

			return output.map((d, i) => {
			  return {
			    id: i + 1,
			    r: d.r,
			    x: d.x,
			    y: d.y,
			    fill: 'yellow',
			    stroke: "grey"
			  };
			});
		}	
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