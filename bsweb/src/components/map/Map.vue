<template>
  <div id="map">
    <l-map :zoom="properties.zoom" :center="properties.center" @update:zoom="updateZoom">
      <l-tile-layer :url="properties.tile_layer_url"></l-tile-layer>
        <l-geo-json
        v-for="data in visibleMapGeoJson"
        :geojson="mapGeoJson[data].geodata"
        :optionsStyle="mapGeoJson[data].style"
        :options="mapGeoJson[data].options"
        :key="data"
        >
        </l-geo-json>
          <l-feature-group v-for="{layerName, tiers} in visibleMapPolyline" :key="layerName">
            <l-polyline
            v-for="tier in tiers"
            :lat-lngs="mapPolylines[layerName][tier]"
            :color="'blue'"
            :key="tier">
          </l-polyline>
          <polyline-decorator
            v-for="tier in tiers"
            :paths="mapPolylineDecorators[layerName][tier]"
            :key="`${layerName}${tier}decorator`"
            :patterns="[
                  {offset: '100%', repeat: 0, symbol: symbol.arrowHead({pixelSize: 10, polygon: false, pathOptions: {stroke: true}})}
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

  export default {
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
        map: {
          zoom: 11,
          center: [-23.550164466, -46.633664132]
        },
        url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
        symbol: L.Symbol
      };
    },
    methods: {
      updateZoom(zoom) {
        this.map.zoom = zoom;
      }
    },
    computed: {
      visibleMapGeoJson: function() {
        return this.$store.getters.visibleMapGeoJson
      },
      visibleMapPolyline: function() {
        return this.$store.getters.visibleMapPolyline
      },
      mapGeoJson: function() {
        return this.$store.getters.mapGeoJson
      },
      mapPolylines: function() {
        return this.$store.getters.mapPolylines
      },
      mapPolylineDecorators: function() {
        return this.$store.getters.mapPolylineDecorators
      },
      properties: function() {
        return this.$store.getters.properties
      }
    }
  }
</script>

<style scoped>
  #map {
    width: 85%;
    height: 80vh;
  }
</style>