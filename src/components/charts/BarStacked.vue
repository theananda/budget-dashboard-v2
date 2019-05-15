<template>
	<div>
	  <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
	</div>
</template>

<script>

import VueApexCharts from 'vue-apexcharts';

export default {
    name: 'BarStacked',
    components: {
        'apexchart' : VueApexCharts
    },
    props: [
    	'options',
    	'series'
    ]
}

</script>