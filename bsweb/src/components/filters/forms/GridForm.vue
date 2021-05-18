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
        :tooltip="false"
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
        :tooltip="false"
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
      />
      <div class="value">{{grid_south.toFixed(3)}}</div>
    </b-field>
    <button type="button" @click="sendGridForm">Redefinir grid</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    sendGridForm() {
      this.loadBaseLayers();
      this.resetData();
      this.filterData({ http: this.$http, filters: this.filterParams });
    },
    async loadBaseLayers() {
      await this.fetchZones(this.$http);
      await this.fetchGrid({ httpResource: this.$http, gridSize: this.gridSize, gridOffset: this.gridOffset});
      this.renderGrid = true;
    },
    ...mapActions([
      'resetData',
      'filterData',
      'fetchZones',
      'fetchGrid',
    ])
  },
  computed: {
    gridSize: {
      get() {
        return this.$store.state.filters.filters.gridSize;
      },
      set(value) {
        this.$store.commit('updateGridSize', value);
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
      }
    },
    grid_east: {
      get() {
        return this.$store.state.filters.filters.gridOffset.east;
      },
      set(value) {
        this.$store.commit('updateGridOffset', {key: 'east', value: Number(value)});
      }
    },
    grid_north: {
      get() {
        return this.$store.state.filters.filters.gridOffset.north;
      },
      set(value) {
        this.$store.commit('updateGridOffset', {key: 'north', value: Number(value)});
      }
    },
    grid_south: {
      get() {
        return this.$store.state.filters.filters.gridOffset.south;
      },
      set(value) {
        this.$store.commit('updateGridOffset', {key: 'south', value: Number(value)});
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