<template>
  <div>
    <l-map
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
        :geojson="geojson"
      >
      </l-geo-json>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LGeoJson } from 'vue2-leaflet';
import geoData from '../../../static/data/states_and_region.json'

export default {
  name: 'Interactive Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson
  },
  data () {
    return {
      zoom: 5,
      center: L.latLng(20.081847,96.5488883),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 11.5,
      currentCenter: L.latLng(47.413220, -1.219482),
      mapOptions: {
        zoomSnap: 0.5
      },
      geojson: geoData
    };
  },
  methods: {
    zoomUpdate (zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate (center) {
      this.currentCenter = center;
    },
  }
};
</script>