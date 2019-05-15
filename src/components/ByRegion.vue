<template>
	<div class="region-wrapper mdl-grid">
		<div class="mdl-cell mdl-cell--12-col toolbar">
			<router-link to="/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Back</router-link>
		</div>
		<div class="mdl-cell mdl-cell--12-col viz-area">
			<div class="mdl-cell mdl-cell--3-col map-wrapper">
				<map-explorer/>
			</div>
			<div class="mdl-cell mdl-cell--9-col mdl-cell--3-offset	viz-wrapper">
				<div class="mdl-grid">
					<div class="mdl-cell mdl-cell--12-col">
						<h3>{{ this.charts.expenditure.title }}</h3>
					</div>
					<div class="mdl-cell mdl-cell--6-col single-viz">
						<apexchart :width="charts.expenditure.width" :type="charts.expenditure.type" :options="charts.expenditure.options" :series="charts.expenditure.series"></apexchart>		
					</div>
					<div class="mdl-cell mdl-cell--6-col viz-description">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid excepturi minima sed? Nostrum tenetur libero eligendi. Autem harum culpa, eveniet laborum voluptatibus, amet porro officia, corporis soluta ab, dolor dolores.
							
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid excepturi minima sed? Nostrum tenetur libero eligendi. Autem harum culpa, eveniet laborum voluptatibus, amet porro officia, corporis soluta ab, dolor dolores.
						</p>
					</div>

					<div class="mdl-cell mdl-cell--12-col">
						<h3>{{ this.charts.unionTotal.title }}</h3>
					</div>
					<div class="mdl-cell mdl-cell--6-col viz-description">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid excepturi minima sed? Nostrum tenetur libero eligendi. Autem harum culpa, eveniet laborum voluptatibus, amet porro officia, corporis soluta ab, dolor dolores.
							
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid excepturi minima sed? Nostrum tenetur libero eligendi. Autem harum culpa, eveniet laborum voluptatibus, amet porro officia, corporis soluta ab, dolor dolores.
						</p>
					</div>
					<div class="mdl-cell mdl-cell--6-col single-viz">
						<apexchart :width="charts.unionTotal.width" :type="charts.unionTotal.type" :options="charts.unionTotal.options" :series="charts.unionTotal.series"></apexchart>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import MapEx from './charts/Map.vue'
import VueApexCharts from 'vue-apexcharts'
import chartConfigs from './charts/chartsConfig.js'

export default {
    name: 'MapExplorer',
    components: {
        'map-explorer' : MapEx,
        'apexchart' : VueApexCharts
    },
    data : function(){
    	return {
    		charts : chartConfigs
    	}
    },
    mounted () {
    	this.charts.expenditure.series = [
    		{
	          name: 'Capital Expenditure',
	          data: [44, 55, 41, 67, 22, 43]
	        }, {
	          name: 'Current Expenditure',
	          data: [13, 23, 20, 8, 13, 27]
	        }, {
	          name: 'Investment in Orgainations',
	          data: [11, 17, 15, 15, 21, 14]
	        }, {
	          name: 'Repayment of Loans',
	          data: [21, 7, 25, 13, 22, 8]
	        }
    	]
    	this.charts.unionTotal.series =  [44, 55, 13, 43, 22]
    }
}

</script>