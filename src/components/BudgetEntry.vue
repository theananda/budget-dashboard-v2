<template>
	<div class="mdl-grid main-page-wrapper">
		<div class="mdl-cell mdl-cell--12-col toolbar">
			<router-link 
				:to="{ name: 'sectors', params: { fin_year : this.$route.params.fin_year, budget_level : this.$route.params.budget_level }}" 
				class="mdl-button mdl-js-button">
				<i class="material-icons">arrow_back_ios</i> Back to All Sectors
			</router-link>
			<div class="right-menus mdl-layout--large-screen-only">
				<router-link to="/region/Union" class="mdl-button mdl-js-button">
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
		<div class="mdl-cell mdl-cell--12-col chart-wrapper" style="margin-left:unset;">
			<div class="mdl-grid mdl-grid--no-spacing">
				<div class="mdl-cell mdl-cell--3-col  mdl-cell--12-col-phone parent-ministry-wrapper mdl-layout--large-screen-only">
					<h3 class="center-title colored-title" v-html="pageTitle"></h3>
					<bubble-chart v-if="bubble_data" :name="sector" :value="sector_total" :cdata="bubble_data" :selector="slugify(sector)" :width="150" :height="150" :color="getParentSectorColor" className="center-chart svg-wrapper" clickRoute="budget_entry"></bubble-chart>
				</div>
				<div class="mdl-cell mdl-cell--9-col mdl-cell--3-offset-desktop mdl-cell--3-offset-tablet mdl-cell--12-col-phone">
					<div class="center-content mdl-layout--small-screen-only">
						<div class="mdl-textfield mdl-js-textfield">
							<v-select :options="entrySelector" v-model="current_budget_entry" placeholder="-- Select Budget Entry --"></v-select>
						</div>
					</div>
					<flow-type></flow-type>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import config from '@/config/index.js'
import Axios from 'axios'
import * as d3 from "d3"
import BubbleChart from './charts/bubbleChart.vue'
import FlowType from './partials/FlowType.vue'
import slugify from '@sindresorhus/slugify'
import DataDownload from '@/components/partials/DataDownload.vue'
import colors from '@/config/colors.js'

export default {
	name: 'Departments',
	components: {
	   'bubble-chart' : BubbleChart,
	   'flow-type' : FlowType,
	   'data-download-btn': DataDownload
	},
	data() {
		return {
			sector: this.$route.params.sector_name,
			api_params : {
				budget_level : this.$route.params.budget_level,
				flow : 'expenditure',
				fin_year : this.$route.params.fin_year,
				parent_ministry : this.$route.params.sector_name
			},
			current_fin_year: this.$route.params.fin_year,
			current_budget_level: this.$route.params.budget_level,
			chart_data: [],
			bubble_data: [],
			current_budget_entry: '',
			parent_sector : '',
			sector_total : 0
		}
	},
	watch: {
		current_budget_entry(val) {
			if (val != null && this.$route.params.sector_name != val) {
				this.$router.push({ 
					name: 'budget_entry', 
					params: { 
						fin_year: this.$route.params.fin_year,
						budget_level: this.$route.params.budget_level,
						sector_name: this.$route.params.sector_name,
						budget_entry: val
					} 
				});
			} else {
				this.$router.push({ 
					name: 'sector', 
					params: { 
						fin_year: this.$route.params.fin_year,
						budget_level: this.$route.params.budget_level,
						sector_name: this.$route.params.sector_name,
					} 
				});
			}
		}
	},
	beforeMount () {
		this.getData();
	},
	methods: {
		getData() {
			const api_url = config.api_url + "/budget";
			Axios.get(api_url, {
				params : this.api_params
			})
				.then(response => {

					if(response.data.data.length == 0) {

						this.$router.push({ name: 'home' });

					}

					this.parent_sector = response.data.data[0].sector;

					this.analyse(response.data.data);

			});
		},
		analyse(data) {

			this.sector_total = d3.sum(data, function(d){
				var f = d3.format(".2f");
				return f(d.value); 
			})

			this.bubble_data = d3.nest()
					.key(function(d){
						return d.budget_entry;
					})
					.rollup(function(v) { 
						return d3.sum(v, function(d) { 
							var f = d3.format(".2f");
							return f(d.value); 
						}); 
					})
					.entries(data);
			
		},
		slugify(val) {
			return slugify(val);
		}
	},
	computed: {
		pageTitle() {
			return "Expenditure from <br/>" + this.api_params.fin_year + " " + this.api_params.budget_level + " Government";
		},
		entrySelector() {
			return this.bubble_data.map(function(x){
				return x.key;
			});
		},
		getParentSectorColor() {
			return colors.sectors[this.parent_sector];
		}
	}
}


</script>
