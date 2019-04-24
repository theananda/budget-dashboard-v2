<template>
	<div class="region-wrapper mdl-grid">
		<div class="mdl-cell mdl-cell--12-col toolbar">
			<router-link to="/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Back</router-link>
		</div>
		<div class="mdl-cell mdl-cell--3-col map-wrapper">
			<geo-json/>
		</div>
		<div class="mdl-cell mdl-cell--9-col viz-wrapper">
			<h5>Region Name</h5>
			<apex-bar-chart/>
		</div>
	</div>
</template>

<script>

import GeoJSON from './charts/GeoJSON.vue'
import BarStacked from './charts/BarStacked.vue'

export default {
    name: 'MapExplorer',
    components: {
        'geo-json' : GeoJSON,
        'apex-bar-chart': BarStacked
    }
}

</script>