<template>
  <div>
    <b-field label="Tamanho">
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
    </b-field>
    <b-field label="Oeste">
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
      <div class="value">{{grid_west.toFixed(3)}}</div>
    </b-field>
    <b-field label="Leste">
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
      <div class="value">{{grid_east.toFixed(3)}}</div>
    </b-field>
    <b-field label="Norte">
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
      <div class="value">{{grid_north.toFixed(3)}}</div>
    </b-field>
    <b-field label="Sul">
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
      <div class="value">{{grid_south.toFixed(3)}}</div>
    </b-field>
    <button type="button" @click="getFlows">Calcular fluxos</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    getFlows() {
      this.filterData({ http: this.$http, filters: this.filterParams });
    },
    async loadBaseLayers() {
      await this.fetchZones(this.$http);
      await this.fetchGrid({ httpResource: this.$http, gridSize: this.gridSize, gridOffset: this.gridOffset});
      this.renderGrid = true;
    },
    reloadGrid() {
      this.setLoading();
      this.resetData();
      this.fetchGrid({gridSize: this.gridSize, gridOffset: this.gridOffset})
        .then(() => {
          this.unsetLoading();
        });
    },
    ...mapActions([
      'resetData',
      'filterData',
      'fetchZones',
      'fetchGrid',
      'setLoading',
      'unsetLoading'
    ])
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
    padding-left: 10px;
    display: flex;
    align-items: center;
  }
</style>