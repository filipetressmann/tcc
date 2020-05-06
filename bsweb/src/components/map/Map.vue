<template>
  <div id="map">
    <l-map :zoom="map.zoom" :center="map.center">
      <l-tile-layer :url="url"></l-tile-layer>
        <l-geo-json 
        v-if="map.layers.railways.show"
        :geojson="map.layers.railways.geodata"
        :optionsStyle="styleRailway"
        :options="map.layers.railways.options">
        </l-geo-json>
        <l-geo-json
        v-if="map.layers.subway.show"
        :geojson="map.layers.subway.geodata"
        :optionsStyle="styleMetro"
        :options="map.layers.railways.options"
        >
        </l-geo-json>
    </l-map>
  </div>
</template>

<script>
  import L from 'leaflet';
  import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet';
  import { filterEvents } from '../../main.js';
  import * as style_helpers from './helpers/style_layers.js';
  import * as map_options from './helpers/option_helpers.js';

  export default {
    components: {
      LMap,
      LTileLayer,
      LGeoJson
    },
    data() {
      return{
        map: {
          zoom: 12,
          center: [-23.550164466, -46.633664132],
          layers: {
            railways: {
              show: false,
              geodata: null,
              options: map_options.rail_options
            },
            subway: {
              show: false,
              geodata: null,
              options: map_options.rail_options
            }
          }
        },
        url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
      };
    },
    methods: {
      fetchRailwayLayer() {
        // load CPTM
        this.$http.get('http://127.0.0.1:5000/load_railway_data')
        .then(response => {
          return response.json();
        })
          .then(response => {
            this.map.layers.railways.geodata = JSON.parse(response);
          });
      },
      fetchSubwayLayer() {
        // load Metro
        this.$http.get('http://127.0.0.1:5000/load_metro_data')
        .then(response => {
          return response.json();
        })
          .then(response => {
            this.map.layers.subway.geodata = JSON.parse(response);
          });
      },
      styleMetro(data) {
        return style_helpers.styleMetro(data);
      },
      styleRailway(data) {
        return style_helpers.styleRailway(data);
      }
    },
    created() {
      this.fetchRailwayLayer();
      this.fetchSubwayLayer();
      let instance = this;
      filterEvents.$on('filterSelected', (id) => {
        if (id == 14) {
          instance.map.layers.railways.show = !instance.map.layers.railways.show;
        }
        if (id == 15) {
          instance.map.layers.subway.show = !instance.map.layers.subway.show
        }
      });
    }
  }
</script>

<style scoped>
  #map {
    width: 100%;
    height: 80vh;
  }
</style>