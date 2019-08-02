<template>
	<div class="mdl-grid">
		<div class="mdl-cell mdl-cell--12-col toolbar">
			<router-link to="/sectors" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Back to Sectors</router-link>
		</div>
		<div class="mdl-cell mdl-cell--12-col region-chart-wrapper">
			{{ this.sector }}
		</div>
	</div>
</template>

<script>
	export default {
	    name: 'Departments',
	    data() {
	    	return {
	    		sector: ''
	    	}
	    },
	    beforeMount () {
	    	this.sector = this.$route.params.sector_name;
	    }
	}	
</script>
