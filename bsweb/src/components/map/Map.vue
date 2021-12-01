<template>
  <div id="map">
    <l-map :ref="mapkey" :zoom="properties.zoom" :center="properties.center">
      <l-control-layers position="topright" />
      <l-tile-layer
        v-for="tile in properties.tile_layers"
        :key="`tile-${tile.id}`"
        :name="tile.name"
        :url="tile.url"
        :visible="tile.visible"
        layer-type="base"
      />
      <span v-if="renderZones">
        <l-geo-json
          :geojson="zones.geometry"
          :options-style="zones.style"
          :visible="showZones"
          :options="zonesOptions()"
        />
      </span>
      <span v-if="renderGrid">
        <l-geo-json
          :geojson="grid.geometry"
          :options-style="grid.style"
          :visible="showGrid"
          :options="gridOptions()"
        />
      </span>
      <l-geo-json
        v-for="key in Object.keys(layersGeojson)"
        :key="`layers-${key}`"
        :geojson="layers[key].geometry"
        :options-style="layersGeojson[key].style"
        :options="layersGeojson[key].options"
      />
      <l-feature-group v-for="tier in Object.keys(arrowTiers)" :key="tier">
        <l-polyline
          v-for="(arrow, index) in flows[tier]"
          :key="`${tier}-${index}`"
          :lat-lngs="arrow['coords']"
          :color="'blue'"
          :weight="0.4 * arrow['weight']"
        >
          <l-tooltip :options="{ sticky: true }">
            {{ arrow["total_trips"] }} {{ $t("trips") }}
            <br>
            <span v-if="developer_mode">
              {{ arrow["origin"] }} -> {{ arrow["destination"] }}
              <br>
              ids: {{ arrow["trips_ids"] }}
            </span>
          </l-tooltip>
        </l-polyline>
        <polyline-decorator
          v-for="(arrow, index) in flows[tier]"
          :key="`${tier}-${index}-decorator`"
          :paths="arrow['coords'][arrow['coords'].length - 1]"
          :patterns="[
            {
              offset: '100%',
              repeat: 0,
              symbol: symbol.arrowHead({
                pixelSize: 10,
                polygon: false,
                pathOptions: {
                  stroke: true,
                  color: 'blue',
                  weight: 0.4 * arrow['weight'],
                },
              }),
            },
          ]"
        />
      </l-feature-group>
    </l-map>
  </div>
</template>

<script>
import L from 'leaflet';
import {
  LMap,
  LTileLayer,
  LGeoJson,
  LPolyline,
  LFeatureGroup,
  LTooltip,
  LControlLayers,
} from 'vue2-leaflet';
import Vue2LeafletPolylineDecorator from 'vue2-leaflet-polylinedecorator';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LPolyline,
    LTooltip,
    'polyline-decorator': Vue2LeafletPolylineDecorator,
    LFeatureGroup,
    LControlLayers,
  },
  props: {
    mapkey: { type: String, required: true },
  },
  data() {
    return {
      symbol: L.Symbol,
      renderZones: false,
      renderGrid: false,
    };
  },
  computed: {
    ...mapGetters([
      'grid',
      'developer_mode',
    ]),
    ...mapState({
      properties(state) {
        return state.map.maps[this.mapkey].properties;
      },
      layersGeojson(state) {
        return state.map.maps[this.mapkey].show.layers['geojson'];
      },
      layersPolylines(state) {
        return state.map.maps[this.mapkey].show.layers['polyline'];
      },
      layersDecorators(state) {
        return state.map.maps[this.mapkey].show.layers['decorators'];
      },
      arrowTiers(state) {
        return state.map.maps[this.mapkey].show.flows['polyline'];
      },
      flows: state => state.filters.flows,
      layers: state => state.layers.data,
      zones: state => state.layers.zones,
      attractors: state => state.filters.heatmaps.attractors,
      emitters: state => state.filters.heatmaps.emitters,
      showAttractors(state) {
        return state.map.maps[this.mapkey].show.attractors;
      },
      showEmitters(state) {
        return state.map.maps[this.mapkey].show.emitters;
      },
      showZones(state) {
        return state.map.maps[this.mapkey].show.zones;
      },
      showGrid(state) {
        return state.map.maps[this.mapkey].show.grid;
      },
    }),
  },
  mounted() {
    this.loadBaseLayers();
  },
  methods: {
    ...mapActions('loading', ['setLoading', 'unsetLoading']),
    ...mapActions([
      'fetchZones',
      'fetchGrid',
      'filterData',
    ]),
    async loadBaseLayers() {
      this.setLoading();
      await this.fetchGrid().then(() => {
        this.renderGrid = true;
        this.filterData();
        this.unsetLoading();
      });
      this.fetchZones(this.$http).then(() => {
        this.renderZones = true;
      });
    },
    gridOptions() {
      // return {
      //   onEachFeature: function (feature, layer) {
      //     const i = feature.properties.i;
      //     const j = feature.properties.j;
      //     layer.bindTooltip(`(${i}, ${j})`, { permanent: false, sticky: true });
      //   },
      // };
    },
    zonesOptions() {
      return {
        onEachFeature: function (feature, layer) {
          let tooltipMsg = '';
          tooltipMsg += `NumeroZona: ${feature.properties.NumeroZona}<br>`;
          tooltipMsg += `NomeZona: ${feature.properties.NomeZona}<br>`;
          tooltipMsg += `NomeMunici: ${feature.properties.NomeMunici}<br>`;
          // tooltipMsg += `NumDistrit: ${NumDistrit}`;
          // layer.bindPopup(tooltipMsg);
          layer.bindTooltip(tooltipMsg, { permanent: false, sticky: true });
        },
      };
    },
  },
};
</script>

<style scoped>
#map {
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
}
</style>
