<template>
  <div id="map">
    <l-map
      :ref="mapkey"
      :zoom="zoom"
      :center="center"
      :inertia-deceleration="10000"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
    >
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
      zoom: 12, // @@@ default
      center: { lat: -23.550164466, lng: -46.633664132 },
    };
  },
  computed: {
    ...mapGetters([
      'developer_mode',
      'sharedControls',
      'centerMain',
      'centerSecond',
      'zoomMain',
      'zoomSecond',
    ]),
    ...mapState({
      grid(state) {
        return state.layers[this.mapkey].grid;
      },
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
      // flows: state => state.filters[this.mapkey].flows,
      flows(state) {
        return state.filters[this.mapkey].flows;
      },
      // flows: state => {
      //   debugger;
      //   if (state.filters[this.mapkey] == undefined) {
      //     debugger;
      //     console.log('UNDEFINED');
      //   }
      //   return state.filters[this.mapkey].flows;
      // },
      // flows: state => state.filters[this.mapkey].flows,
      layers: state => state.layers.data,
      zones: state => state.layers.zones,
      // attractors: state => state.filters.heatmaps.attractors,
      // emitters: state => state.filters.heatmaps.emitters,
      // showAttractors(state) {
      //   return state.map.maps[this.mapkey].show.attractors;
      // },
      // showEmitters(state) {
      //   return state.map.maps[this.mapkey].show.emitters;
      // },
      showZones(state) {
        return state.map.maps[this.mapkey].show.zones;
      },
      showGrid(state) {
        return state.map.maps[this.mapkey].show.grid;
      },
    }),
    secondMapIsActive: {
      get() {
        return this.$store.state.map.secondMapIsActive;
      },
    },
  },
  watch: {
    centerMain: function(value) {
      if (this.mapkey === 'main' && 
          this.centerMain.lat !== this.centerSecond.lat && 
          this.centerMain.lng !== this.centerSecond.lng)
        this.center = value;
    },
    centerSecond: function(value) {
      if (this.mapkey === 'second' &&
          this.centerMain.lat !== this.centerSecond.lat &&
          this.centerMain.lng !== this.centerSecond.lng)
        this.center = value;
    },
    zoomMain: function(value) {
      if (this.mapkey === 'main') this.zoom = value;
    },
    zoomSecond: function(value) {
      if (this.mapkey === 'second') this.zoom = value;
    },
    secondMapIsActive: function(value) {
      if (this.mapkey === 'main') {
        this.$refs['main'].mapObject.invalidateSize();
      }
    },
  },
  mounted() {
    if (this.keymap === 'second') {
      this.updateCenter({ mapkey: 'second', center: centerMain });
    }
    this.loadBaseLayers();
  },
  methods: {
    ...mapActions('loading', ['setLoading', 'unsetLoading']),
    ...mapActions([
      'fetchZones',
      'fetchGrid',
      'filterData',
      'updateCenter',
      'updateZoom',
    ]),
    async loadBaseLayers() {
      this.setLoading();
      await this.fetchGrid(this.mapkey).then(() => { // Ideia -> fazer um fetchGrid independente do mapkey e um outro que chama e dá load
        this.renderGrid = true;
        this.filterData(this.mapkey);
        this.unsetLoading();
      });
      this.fetchZones(this.$http).then(() => {
        this.renderZones = true;
      });
    },
    zoomUpdated(zoom) {
      this.updateZoom({ mapkey: this.mapkey, zoom });
    },
    centerUpdated(center) {
      this.updateCenter({ mapkey: this.mapkey, center });
    },
    boundsUpdated(bounds) {
      // this.bounds = bounds;
      // console.log('bounds :>> ', bounds);
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
