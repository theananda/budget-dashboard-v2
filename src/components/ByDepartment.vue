<template>
	<div class="region-wrapper mdl-grid">
		<div class="mdl-cell mdl-cell--12-col toolbar">
			<router-link to="/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Back</router-link>
		</div>
		<div class="mdl-cell mdl-cell--4-col">
			<bubble-chart data="bubble_data" />
		</div>
	</div>
</template>

<script>

import BubbleChart from './charts/bubbleChart.vue'

export default {
    name: 'Sectors',
    components: {
       'bubble-chart' : BubbleChart
    },
    data() {
    	return {
    		bubble_data : [
				{name: 'Adminstration', value: 500},
				{name: 'Government', value: 3000},
				{name: 'Other Income and Expenditure', value: 100},
				{name: 'Other Income and Expenditure', value: 1000}
			]
    	}
    }
}

</script>