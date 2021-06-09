<template>
  <div>
    <div class="slider-container">
      <span class="label">Tamanho</span>
      <b-slider
        v-model="gridSize"
        type="is-success"
        size="is-small"
        :min="10"
        :max="100"
        :step="10"
        :tooltip="true"
        lazy
      />
      <div class="value">{{gridSize}}</div>
    </div>
    <div class="slider-container">
      <span class="label">Oeste</span>
      <b-slider
        v-model="grid_west"
        type="is-info"
        size="is-small"
        :min="-0.5"
        :max="0.5"
        :step="0.001"
        :tooltip="true"
        lazy
      />
      <div class="value">{{grid_west}}</div>
    </div>
    <div class="slider-container">
      <span class="label">Leste</span>
      <b-slider
        v-model="grid_east"
        type="is-info"
        size="is-small"
        :min="-0.5"
        :max="0.5"
        :step="0.001"
        :tooltip="true"
        lazy
      />
      <div class="value">{{grid_east}}</div>
    </div>
    <div class="slider-container">
      <span class="label">Norte</span>
      <b-slider
        v-model="grid_north"
        type="is-info"
        size="is-small"
        :min="-0.5"
        :max="0.5"
        :step="0.001"
        :tooltip="true"
        lazy
      />
      <div class="value">{{grid_north}}</div>
    </div>
    <div class="slider-container">
      <span class="label">Sul</span>
      <b-slider
        v-model="grid_south"
        type="is-info"
        size="is-small"
        :min="-0.5"
        :max="0.5"
        :step="0.001"
        :tooltip="true"
        lazy
      />
      <div class="value">{{grid_south}}</div>
    </div>
    <button type="button" @click="getFlows">Calcular fluxos</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    getFlows() {
      this.setLoading();
      this.resetData();
      this.resetMapResource({ mapkey: "main", category: "flows", type: "polyline" });
      this.filterData()
        .then(() => {
          this.unsetLoading();
        });
    },
    reloadGrid() {
      this.setLoading();
      this.resetData();
      this.fetchGrid()
        .then(() => {
          this.unsetLoading();
        });
    },
    ...mapActions([
      'resetData',
      'filterData',
      'fetchZones',
      'fetchGrid',
      'resetMapResource'
    ]),
    ...mapActions('loading', ['setLoading', 'unsetLoading']),
  },
  computed: {
    gridSize: {
      get() {
        return this.$store.state.filters.filters.gridSize;
      },
      set(value) {
        this.$store.commit('updateGridSize', value);
        this.reloadGrid();
      }
    },
    gridOffset: {
      get() {
        return this.$store.state.filters.filters.gridOffset;
      }
    },
    grid_west: {
      get() {
        return this.$store.state.filters.filters.gridOffset.west;
      },
      set(value) {
        this.$store.commit('updateGridOffset', {key: 'west', value: Number(value)});
        this.reloadGrid();
      }
    },
    grid_east: {
      get() {
        return this.$store.state.filters.filters.gridOffset.east;
      },
      set(value) {
        this.$store.commit('updateGridOffset', {key: 'east', value: Number(value)});
        this.reloadGrid();
      }
    },
    grid_north: {
      get() {
        return this.$store.state.filters.filters.gridOffset.north;
      },
      set(value) {
        this.$store.commit('updateGridOffset', {key: 'north', value: Number(value)});
        this.reloadGrid();
      }
    },
    grid_south: {
      get() {
        return this.$store.state.filters.filters.gridOffset.south;
      },
      set(value) {
        this.$store.commit('updateGridOffset', {key: 'south', value: Number(value)});
        this.reloadGrid();
      }
    },
    ...mapGetters({
      filterParams: 'filters'
    })
  }
}
</script>

<style scoped>
  .value {
    min-width: 46px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    justify-content: right;
  }
  .slider-container {
    display: flex;
    align-items: center;
  }

  .label {
    min-width: 72px;
    font-weight: bold;
  }
</style>