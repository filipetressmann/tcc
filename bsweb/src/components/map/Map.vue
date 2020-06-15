<template>
  <div id="map">
    <l-map :zoom="properties.zoom" :center="properties.center">
      <l-tile-layer :url="properties.tile_layer_url"></l-tile-layer>
        <!-- Create zones layer once, then just change display property to avoid reloading component again -->
        <span v-if="renderZones">
          <l-geo-json 
          :geojson="zones.geometry"
          :optionsStyle="zones.style"
          :visible="showZones" />
        </span>
        <span v-if="renderGrid">
          <l-geo-json
          :geojson="grid.geometry"
          :optionsStyle="grid.style"
          :visible="showGrid" />
        </span>
        <l-geo-json
        v-for="key in Object.keys(layersGeojson)"
        :geojson="layers[key].geometry"
        :optionsStyle="layersGeojson[key].style"
        :options="layersGeojson[key].options"
        :key="key" />
        <l-geo-json
        v-for="key in Object.keys(filtersGeojson)"
        :geojson="filters[key].geometry"
        :optionsStyle="filtersGeojson[key].style"
        :options="filtersGeojson[key].options"
        :key="key" />
        <l-feature-group v-for="tier in Object.keys(filtersPolylines)" :key="tier">
          <l-polyline
          v-for="(flow, index) in filters[tier]"
          :lat-lngs="flow"
          :color="'#ff7e6b'"
          :weight="weights[tier][index]"
          :key="index">
        </l-polyline>
        <polyline-decorator
          v-for="(arrow, index) in decorators[tier]"
          :paths="arrow"
          :key="`${tier}${index}decorator`"
          :patterns="[
                {offset: '100%', repeat: 0, symbol: symbol.arrowHead({pixelSize: 10, polygon: false, pathOptions: {stroke: true, color: '#ff7e6b', weight: weights[tier][index]}})}
            ]"
        >
        </polyline-decorator>
      </l-feature-group>
    </l-map>
  </div>
</template>

<script>
  import L from 'leaflet';
  import { LMap, LTileLayer, LGeoJson, LPolyline, LFeatureGroup } from 'vue2-leaflet';
  import Vue2LeafletPolylineDecorator from 'vue2-leaflet-polylinedecorator';
  import { mapState, mapActions } from 'vuex';

  export default {
    props: ['mapkey'],
    components: {
      LMap,
      LTileLayer,
      LGeoJson,
      LPolyline,
      'polyline-decorator': Vue2LeafletPolylineDecorator,
      LFeatureGroup
    },
    data() {
      return{
        symbol: L.Symbol,
        renderZones: false,
        renderGrid: false
      };
    },
    methods: {
      ...mapActions([
        'fetchCPTM',
        'fetchSubway',
        'fetchBikelane',
        'fetchZones',
        'fetchGrid'
      ]),
      async loadBaseLayers() {
        await this.fetchZones(this.$http);
        this.renderZones = true;
        await this.fetchGrid({ httpResource: this.$http, gridSize: 20 });
        this.renderGrid = true;
      }
    },
    computed: mapState({
        properties(state) {
          return state.map.maps[this.mapkey].properties
        },
        layersGeojson(state) {
          return state.map.maps[this.mapkey].show.layers["geojson"];
        },
        layersPolylines(state) {
          return state.map.maps[this.mapkey].show.layers["polyline"]
        },
        layersDecorators(state) {
          return state.map.maps[this.mapkey].show.layers["decorators"]
        },
        filtersGeojson(state) {
          return state.map.maps[this.mapkey].show.filters["geojson"]
        },
        filtersPolylines(state) {
          return state.map.maps[this.mapkey].show.filters["polyline"]
        },
        filtersDecorators(state) {
          return state.map.maps[this.mapkey].show.filters["decorators"]
        },
        filters: state => state.filters.data,
        layers: state => state.layers.data,
        decorators: state => state.filters.decorators,
        weights: state => state.filters.weights,
        zones: state => state.layers.zones,
        grid: state => state.layers.grid,
        showZones(state) {
          return state.map.maps[this.mapkey].show.zones
        },
        showGrid(state) {
          return state.map.maps[this.mapkey].show.grid
        }
      }),
      async created() {
        this.fetchCPTM(this.$http);
        this.fetchSubway(this.$http);
        this.fetchBikelane(this.$http);
        this.loadBaseLayers();
      }
  }
</script>

<style scoped>
  #map {
    width: 85%;
    height: 80vh;
  }
  
  .zones-layer {
    z-index: 0;
  }
</style>