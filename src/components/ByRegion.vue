<template>
	<div class="region-wrapper mdl-grid">
		<div class="mdl-cell mdl-cell--12-col toolbar">
			<router-link to="/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Back</router-link>
		</div>
		<div class="mdl-cell mdl-cell--3-col map-wrapper">
			<map-explorer/>
		</div>
		<div class="mdl-cell mdl-cell--9-col viz-wrapper">
			<h5>{{ region }}</h5>
			<apex-bar-chart/>
		</div>
	</div>
</template>

<script>

import MapEx from './charts/Map.vue'
import BarStacked from './charts/BarStacked.vue'

export default {
    name: 'MapExplorer',
    components: {
        'map-explorer' : MapEx,
        'apex-bar-chart': BarStacked
    },
    data : function(){
    	return {
    		region: 'Union'
    	}
    }
}

</script>