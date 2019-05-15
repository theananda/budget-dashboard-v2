<template>
	<div class="region-wrapper mdl-grid">
		<div class="mdl-cell mdl-cell--12-col toolbar">
			<router-link to="/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Back</router-link>
		</div>
		<div class="mdl-cell mdl-cell--4-col">
			<bubble-chart />
			<h3 style="text-align:center;">Adminstrative</h3>
		</div>
		<div class="mdl-cell mdl-cell--4-col">
			<bubble-chart/>
			<h3 style="text-align:center;">Functional</h3>
		</div>
		<div class="mdl-cell mdl-cell--4-col">
			<bubble-chart/>
			<h3 style="text-align:center;">Economic</h3>
		</div>
	</div>
</template>

<script>

import BubbleChart from './charts/bubbleChart.vue'

export default {
    name: 'Sectors',
    components: {
       'bubble-chart' : BubbleChart
    }
}

</script>