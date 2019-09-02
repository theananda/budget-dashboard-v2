<template>
	<div class="region-wrapper mdl-grid main-page-wrapper">
		<div class="mdl-cell mdl-cell--12-col toolbar">
			<router-link to="/" class="mdl-button mdl-js-button">
				<i class="material-icons">arrow_back_ios</i> Back
			</router-link>
			<div class="right-menus mdl-layout--large-screen-only">
				<router-link to="/regions" class="mdl-button mdl-js-button">
					<i class="material-icons">map</i> Explore by Region
				</router-link>
				<data-download-btn></data-download-btn>	
			</div>
			<div class="mobile-right-menus mdl-layout--small-screen-only">
				<button id="right-menu-block"
				        class="mdl-button mdl-js-button mdl-button--icon">
				  <i class="material-icons">more_vert</i>
				</button>

				<ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
				    for="right-menu-block">
				  <li class="mdl-menu__item">
				  	<router-link to="/regions" class="mdl-button mdl-js-button">
				  		<i class="material-icons">map</i> Explore by Region
				  	</router-link>
				  </li>
				  <li class="mdl-menu__item">
				  	<data-download-btn></data-download-btn>
				  </li>
				</ul>
			</div>
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
				<div class="mdl-cell mdl-cell--12-col">
					<h3 class="center-title colored-title">{{ pageTitle }} </h3>
					<p class="info-text center-content">** Please note functional classifications are unofficial, categorized for ease of access for users, based on reports prepared by the Ministry of Planning and Finance. </p>
				</div>
				<ministry v-for="sector in sector_data" :name="sector.name" :value="sector.value" :cdata="department_data[sector.name]" :selector="slugify(sector.name)" :key="sector.name"></ministry>
			</div>
		</div>    
	</div>
</template>

<script>

import config from '@/config/index.js'
import Axios from 'axios'
import * as d3 from "d3"
import Ministry from './partials/ByMinistry.vue'
import slugify from '@sindresorhus/slugify'
import DataDownload from '@/components/partials/DataDownload.vue'

export default {
	name: 'Sectors',
	components: {
	   'ministry' : Ministry,
	   'data-download-btn': DataDownload
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
				'Ayeyawady',
				'Bago',
				'Chin',
				'Kachin',
				'Kayah',
				'Kayin',
				'Magway',
				'Mandalay',
				'Mon',
				'Rakhine',
				'Sagaing',
				'Shan',
				'Tanintharyi',
				'Yangon'
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
			this.getFinYears();
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
		this.getFinYears();
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
		getFinYears() {
			Axios.get(config.api_url + "/budget/" + this.current_budget_level + "/years")
				.then(response => {
					this.fin_years = response.data.fin_years;
					if (!this.fin_years.includes(this.current_fin_year)) {
						this.current_fin_year = this.fin_years[0];
						this.$router.push({ 
							name: 'sectors', 
							params: { 
								budget_level: this.current_budget_level,
								fin_year: this.current_fin_year
							} 
						});
					}
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
						  })
						  .sort(function(a, b) {
							  	var nameA = a.name.toUpperCase(); 
							  	var nameB = b.name.toUpperCase(); 
							  	if (nameA < nameB) {
							    	return -1;
							  	}
							  	if (nameA > nameB) {
							    	return 1;
							  	}

							  	return 0;
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
	},
	computed: {
		pageTitle() {
			return this.$route.params.fin_year + " " + this.$route.params.budget_level + " Expenditure by Functional Classification"
		}
	}
}

</script>