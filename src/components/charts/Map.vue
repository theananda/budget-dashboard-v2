<template>
  <div>
  	<div class="mdl-layout--large-screen-only">
  		<h3 class="colored-title">{{ region }}</h3>
  		<l-map
  		  ref="interMap"
  		  :zoom="zoom"
  		  :center="center"
  		  :options="mapOptions"
  		  style="height: 600px"
  		  @update:center="centerUpdate"
  		  @update:zoom="zoomUpdate"
  		>
  		  <l-tile-layer
  			:url="url"
  			:attribution="attribution"
  		  />
  		  <l-geo-json
  			ref="stMapLayer"
  			:geojson="stMap.geojson"
  			:options="stMap.options"
  		  >
  		  </l-geo-json>
  		</l-map>	
  	</div>
	<div class="mdl-layout--small-screen-only center-content">
		<div class="mdl-textfield mdl-js-textfield">
			<v-select :options="budget_levels" v-model="region"></v-select>
		</div>
	</div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LGeoJson } from 'vue2-leaflet'
import geoData from '../../../static/data/states_and_region.json'
import chroma from 'chroma-js'

export default {
  name: 'InteractiveMap',
  components: {
	LMap,
	LTileLayer,
	LMarker,
	LGeoJson
  },
  data () {
	return {
	  region: this.$route.params.pcode,
	  zoom: 5,
	  center: L.latLng(20.081847,96.5488883),
	  url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
	  currentZoom: 11.5,
	  currentCenter: L.latLng(47.413220, -1.219482),
	  mapOptions: {
		zoomSnap: 0.5
	  },
	  stMap: {
		geojson: geoData,
		options: {
		  style : function (geoJsonFeature) {
			  return {
				fillColor: chroma.random(),
				color: chroma('white'),
				weight: 2,
				opacity: 1,
				fillOpacity: 0.7
			  }
		  },
		  onEachFeature: this.onEachFeature
		}
	  },
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
	};
  },
  watch: {
  	region (val) {
	  this.$router.push({ 
		name: 'state_region', 
		params: { pcode: val } 
	  })
  	}
  },
  methods: {
	onEachFeature(feature, layer) {
	  let origin = this;
	  layer.on({
		click: function(e) {
		  origin.$refs.stMapLayer.mapObject.setStyle({
			fillOpacity: 0.1
		  });
		  this.setStyle({
			fillOpacity: 1
		  });
		  origin.$refs.interMap.mapObject.fitBounds(this._latlngs);
		  origin.region = this.feature.properties.ST;
		  origin.$router.push({ 
			name: 'state_region', 
			params: { pcode: this.feature.properties.ST } 
		  })
		}
	  });
	},
	zoomUpdate (zoom) {
	  this.currentZoom = zoom;
	},
	centerUpdate (center) {
	  this.currentCenter = center;
	},
  }
};
</script>