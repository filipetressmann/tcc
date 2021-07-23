<template>
  <div>
    <input type="checkbox" :value="filter.id" v-model="isActive" />
    <label class="filter-name">{{ $t(filter.filter_name) }}</label>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import * as style from './../../store/helpers/style_layers';
import * as options from './../../store/helpers/option_helpers';

export default {
  components: {
  },
  props: ['filter', 'type'],
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    ...mapGetters(['activeFilters', 'activeFiltersIds', 'activeLayersIds']),
  },
  methods: {
    ...mapActions([
      'addActiveLayer',
      'removeActiveLayer',
      'resetData',
      'resetMapResource',
      'filterData',
      'removeFromMap',
      'addToMap'
    ]),
    isResourceActive(resource) {
      if (this.type === "filter") {
        return this.activeFiltersIds.includes(resource.id);
      } else if (this.type === "layer") {
        return this.activeLayersIds.includes(resource.id);
      }
    },
    handleLayer() {
      const resource = this.filter;
      if (resource.id == 14) {
        this.showCptmLines();
      } else if (resource.id == 21) {
        this.showCptmStations();
      } else if (resource.id == 15) {
        this.showSubwayLines();
      } else if (resource.id == 22) {
        this.showSubwayStations();
        } else if ([16, 18, 19].includes(resource.id)) {
        this.showBikelane(resource.filter_key);
      } else if (resource.id == 20) {
        this.showAccidents();
      }
    },
    showCptmLines() {
      this.resourceInfo = {
        category: "layers",
        type: "geojson",
        mapkey: "main",
        key: "cptm_lines",
        options: {
          style: style.railway,
          options: options.railway
        }
      }
      this.addToMap(this.resourceInfo);
    },
    showCptmStations() {
      this.resourceInfo = {
        category: "layers",
        type: "geojson",
        mapkey: "main",
        key: "cptm_stations",
        options: {
          style: style.railway,
          options: options.railway
        }
      }
      this.addToMap(this.resourceInfo);
    },
    showSubwayLines() {
      this.resourceInfo = {
        category: "layers",
        type: "geojson",
        mapkey: "main",
        key: "subway_lines",
        options: {
          style: style.subway,
          options: options.subway
        }
      }
      this.addToMap(this.resourceInfo);
    },
    showSubwayStations() {
      this.resourceInfo = {
        category: "layers",
        type: "geojson",
        mapkey: "main",
        key: "subway_stations",
        options: {
          style: style.subway,
          options: options.subway
        }
      }
      this.addToMap(this.resourceInfo);
    },
    showBikelane(key) {
      this.resourceInfo = {
        category: "layers",
        type: "geojson",
        mapkey: "main",
        key,
        options: {
          style: style.bikelane,
          options: options.bikeLane
        }
      }
      this.addToMap(this.resourceInfo);
    },
    showAccidents() {
      this.resourceInfo = {
        category: "layers",
        type: "geojson",
        mapkey: "main",
        key: "sp_accidents",
        options: {
          style: style.accidents,
          options: options.accidents
        }
      }
      this.addToMap(this.resourceInfo);
    },
  },
  watch: {
    isActive: function(val) {
      debugger;
      if (val) {
        this.addActiveLayer(this.filter);
        this.handleLayer();
      } else {
        this.removeFromMap({ mapkey: "main", category: "layers", type: this.filter.filter_type, key: this.filter.filter_key});
        this.removeActiveLayer(this.filter);
      }
    }
  }
}
</script>

<style scoped>
  .filter-name {
    margin: 0 5px;
    font-weight: bold;
    font-size: 14px;
  }

  input {
    cursor: pointer;
  }
</style>