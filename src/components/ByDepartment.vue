<template>
	<div>
	  <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
	</div>
</template>

<script>

import VueApexCharts from 'vue-apexcharts';
import axios from "axios";

export default {
    name: 'ApexChart',
    components: {
        'apexchart' : VueApexCharts
    },
    data: function() {
        return {
			options: {
				chart: {
				  	id: 'vuechart-example',
				  	stacked: true,
					toolbar: {
					  show: true
					},
					zoom: {
					  enabled: true
					}
				},
				xaxis: {
				  type: 'datetime',
		            categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
		              '01/05/2011 GMT', '01/06/2011 GMT'
		            ],
				}
			},
			series: [{
	          name: 'PRODUCT A',
	          data: [44, 55, 41, 67, 22, 43]
	        }, {
	          name: 'PRODUCT B',
	          data: [13, 23, 20, 8, 13, 27]
	        }, {
	          name: 'PRODUCT C',
	          data: [11, 17, 15, 15, 21, 14]
	        }, {
	          name: 'PRODUCT D',
	          data: [21, 7, 25, 13, 22, 8]
	        }]
		}
	}
}

</script>