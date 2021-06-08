<template>
  <div id="map">
    <l-map :zoom="properties.zoom" :center="properties.center" :ref="mapkey">
      <l-tile-layer :url="properties.tile_layer_url"></l-tile-layer>
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
        <l-feature-group v-for="tier in Object.keys(arrowTiers)" :key="tier">
          <l-polyline
            v-for="(arrow, index) in flows[tier]"
            :key="`${tier}-${index}`"
            :lat-lngs="arrow['coords']"
            :color="'blue'"
            :weight="arrow['weight']">
            <l-tooltip>{{ arrow['total_trips']}} {{ $t('trips') }}</l-tooltip>
          </l-polyline>
          <polyline-decorator
            v-for="(arrow, index) in flows[tier]"
            :paths="arrow['coords'][arrow['coords'].length - 1]"
            :key="`${tier}-${index}-decorator`"
            :patterns="[
                  {offset: '100%', repeat: 0, symbol: symbol.arrowHead({pixelSize: 10, polygon: false, pathOptions: {stroke: true, color: 'blue', weight: arrow['weight']}})}
              ]"
          >
          </polyline-decorator>
        </l-feature-group>
    </l-map>
  </div>
</template>

<script>
  import L from 'leaflet';
  import { LMap, LTileLayer, LGeoJson, LPolyline, LFeatureGroup, LTooltip } from 'vue2-leaflet';
  import Vue2LeafletPolylineDecorator from 'vue2-leaflet-polylinedecorator';
  import { mapState, mapActions, mapGetters } from 'vuex';

  export default {
    props: ['mapkey'],
    components: {
      LMap,
      LTileLayer,
      LGeoJson,
      LPolyline,
      LTooltip,
      'polyline-decorator': Vue2LeafletPolylineDecorator,
      LFeatureGroup
    },
    data() {
      return{
        symbol: L.Symbol,
        renderZones: false,
        renderGrid: false,
      };
    },
    methods: {
      ...mapActions([
        'fetchCPTM',
        'fetchSubway',
        'fetchBikelane',
        'fetchZones',
        'fetchGrid',
      ]),
      ...mapActions('loading', ['setLoading', 'unsetLoading']),
      async loadBaseLayers() {
        this.setLoading();
        await this.fetchZones(this.$http);
        this.renderZones = true;
        await this.fetchGrid()
          .then(() => {
            this.renderGrid = true;
            this.unsetLoading();
          });
      }
    },
    computed: {
      ...mapState({
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
        arrowTiers(state) {
          return state.map.maps[this.mapkey].show.flows["polyline"]
        },
        flows: state => state.filters.flows,
        layers: state => state.layers.data,
        zones: state => state.layers.zones,
        grid: state => state.layers.grid,
        attractors: state => state.filters.heatmaps.attractors,
        emitters: state => state.filters.heatmaps.emitters,
        showAttractors(state) {
          return state.map.maps[this.mapkey].show.attractors;
        },
        showEmitters(state) {
          return state.map.maps[this.mapkey].show.emitters;
        },
        showZones(state) {
          return state.map.maps[this.mapkey].show.zones
        },
        showGrid(state) {
          return state.map.maps[this.mapkey].show.grid
        }
      })
    },
    async created() {
      this.fetchCPTM(this.$http);
      this.fetchSubway(this.$http);
      this.fetchBikelane(this.$http);
      this.loadBaseLayers();
    }
  }
</script>
