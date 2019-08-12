<template>
	<div class="region-wrapper mdl-grid">
		<div class="mdl-cell mdl-cell--12-col toolbar">
			<router-link to="/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Back</router-link>
		</div>
		<div class="mdl-cell mdl-cell--12-col region-chart-wrapper">
			<div class="mdl-grid">
				<div class="mdl-cell mdl-cell--12-col center-content">
					<div class="mdl-textfield mdl-js-textfield">
						<v-select :options="budget_levels" v-model="current_budget_level"></v-select>
					</div>
				</div>
				<div class="mdl-cell mdl-cell--12-col year-selector">
					<router-link v-for="year in fin_years" :to="{ name: 'sectors', params: { fin_year: year }}" class="fin-year-selector">
						<span class="mdl-chip" :class="[year == current_fin_year ? 'mdl-color--teal mdl-color-text--white' : '']">
							<span class="mdl-chip__text">{{ year }}</span>
						</span>    
					</router-link>
				</div>
				<ministry v-for="sector in sector_data" :name="sector.name" :value="sector.value" :cdata="department_data[sector.name]" :selector="slugify(sector.name)" :key="sector.name"></ministry>
			</div>
		</div>    

	</div>
</template>

<script>

import BubbleChart from './charts/bubbleChart.vue'
import config from '@/config/index.js'
import Axios from 'axios'
import * as d3 from "d3"
import Ministry from './partials/ByMinistry.vue'
import slugify from '@sindresorhus/slugify'

export default {
	name: 'Sectors',
	components: {
	   'bubble-chart' : BubbleChart,
	   'ministry' : Ministry
	},
	data() {
		return {
			chart_data : [],
			width: 1000,
			height: 1000,
			department_name: '',
			department_value: '',
			api_params : {
				budget_level : this.$route.params.budget_level,
				flow : 'expenditure',
				fin_year : this.$route.params.fin_year
			},
			current_fin_year : this.$route.params.fin_year,
			current_budget_level : this.$route.params.budget_level,
			budget_levels : [
				'Union',
				'Kachin',
				'Kayah',
				'Kayin',
				'Chin'
			],
			fin_years : [
				2019,
				'2018 Interim',
				2018,
				2017,
				2016,
				2015,
				2014,
				2013,
				2012
			],
			sector_data : [],
			department_data : []
		}
	},
	watch: {
		'$route' (to, from) {
		  this.setApiParams();
		  this.getData();
		},
		current_budget_level (val) {
			console.log(val);
			this.$router.push({ 
				name: 'sectors', 
				params: { 
					budget_level: val,
					fin_year: this.current_fin_year
				} 
			});
		}
	},
	beforeMount() {
		this.getData();
	},
	methods: {
		getData() {
			const api_url = config.api_url + "/budget";
			Axios.get(api_url, {
				params : this.api_params
			})
				.then(response => {

					this.analyse(response.data.data);

			});
		},
		setApiParams() {
			this.api_params.fin_year = this.$route.params.fin_year;
			this.api_params.budget_level = this.$route.params.budget_level;
			this.current_fin_year = this.$route.params.fin_year;
			this.current_budget_level = this.$route.params.budget_level;
		},
		analyse(data) {

			this.sector_data = d3.nest()
						  .key(function(d) { 
							return d.sector;
						  })
						  .rollup(function(v) { 
							return d3.sum(v, function(d) { 
								var f = d3.format(".2f");
								return f(d.value); 
							}); 
						  })
						  .entries(data)
						  .map(function(group) { 
							if (group.key != "") {
								var f = d3.format(".2f");
								return {
									name : group.key,
									value : f(group.value)
								};
							}
						  })
						  .filter(function(el){
							return el != null;
						  });

			var dept_data = d3.nest()
						  .key(function(d) { 
							return d.sector;
						  })
						  .key(function(d){
							return d.parent_ministry;
						  })
						  .rollup(function(v) { 
							return d3.sum(v, function(d) { 
								var f = d3.format(".2f");
								return f(d.value); 
							}); 
						  })
						  .entries(data);

			var i;
			var ddata = []
			for (i = 0; i < dept_data.length; i++) {
				ddata[dept_data[i]['key']] = dept_data[i]['values'];
			}

			this.department_data = ddata;

			
		},
		slugify(val) {
			return slugify(val);
		}
	}
}

</script>