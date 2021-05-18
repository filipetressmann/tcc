<template>
  <div>
    <p>Tamanho: {{gridSize}}</p>
    <p>West offset: {{grid_west}}</p>
    <p>East offset: {{grid_east}}</p>
    <p>North offset: {{grid_north}}</p>
    <p>South offset: {{grid_south}}</p>
    <p>West: {{grid_west - 23.5489}}</p>
    <p>East: {{grid_east - 23.5489}}</p>
    <p>North: {{grid_north - 46.6388}}</p>
    <p>South: {{grid_south - 46.6388}}</p>
    <input type="text" name="gridSize" v-model="gridSize">
    <input type="text" name="west" v-model="grid_west">
    <input type="text" name="east" v-model="grid_east">
    <input type="text" name="north" v-model="grid_north">
    <input type="text" name="south" v-model="grid_south">
    <button type="button" @click="sendGridForm">Redefinir grid</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    sendGridForm() {
      this.loadBaseLayers();
      this.resetData();
      this.filterData({ http: this.$http, filters: this.filterParams });
    },
    async loadBaseLayers() {
      debugger;
      console.log('gridSize', this.gridSize);
      console.log('grid', this.grid);
      debugger;
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
        this.$store.commit('updateGrid', {key: 'west', value: Number(value)});
      }
    },
    grid_east: {
      get() {
        return this.$store.state.filters.filters.gridOffset.east;
      },
      set(value) {
        this.$store.commit('updateGrid', {key: 'east', value: Number(value)});
      }
    },
    grid_north: {
      get() {
        return this.$store.state.filters.filters.gridOffset.north;
      },
      set(value) {
        this.$store.commit('updateGrid', {key: 'north', value: Number(value)});
      }
    },
    grid_south: {
      get() {
        return this.$store.state.filters.filters.gridOffset.south;
      },
      set(value) {
        this.$store.commit('updateGrid', {key: 'south', value: Number(value)});
      }
    }
  }
}
</script>
