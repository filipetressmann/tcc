<template>
  <div>
    <div>
      <span class="label">{{ $t('baseLayer') }}</span>
      <b-radio v-model="od" name="Grid" native-value="grid" type="is-info">
        {{ $t('grid') }}
      </b-radio>
      <b-radio v-model="od" name="Zonas OD" native-value="zones" type="is-info">
        {{ $t('zones') }}
      </b-radio>
    </div>
    <div v-if="od == 'grid'">
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
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
  export default {
    data() {
      return {
        od: "grid",
      };
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
      grid_west: {
        get() {
          return this.$store.state.filters.filters.grid.west;
        },
        set(value) {
          this.$store.commit('updateGrid', {key: 'west', value: Number(value)});
        }
      },
      grid_east: {
        get() {
          return this.$store.state.filters.filters.grid.east;
        },
        set(value) {
          this.$store.commit('updateGrid', {key: 'east', value: Number(value)});
        }
      },
      grid_north: {
        get() {
          return this.$store.state.filters.filters.grid.north;
        },
        set(value) {
          this.$store.commit('updateGrid', {key: 'north', value: Number(value)});
        }
      },
      grid_south: {
        get() {
          return this.$store.state.filters.filters.grid.south;
        },
        set(value) {
          this.$store.commit('updateGrid', {key: 'south', value: Number(value)});
        }
      },
      ...mapGetters({
        filterParams: 'filters'
      })
    },
    methods: {
      ...mapActions([
        'resetData',
        'updateOD',
        'resetMapResource',
        'filterData',
        'fetchGrid',
        'fetchZones'
      ]),
      ...mapMutations([
        'showZones',
        'hideZones',
        'showGrid',
        'hideGrid'
      ]),
      async loadBaseLayers() {
        await this.fetchZones(this.$http);
        await this.fetchGrid({ httpResource: this.$http, gridSize: this.gridSize, grid: { west: this.grid_west, east: this.grid_east, north: this.grid_north, south: this.grid_south}});
        this.renderGrid = true;
      },
      sendGridForm() {
        this.loadBaseLayers();
        this.resetData();
        this.filterData({ http: this.$http, filters: this.filterParams });
      }
    },
    watch: {
      od: function(value) {
        this.updateOD(value);
        this.resetData();
        this.resetMapResource({
          mapkey: "main",
          category: "flows",
          type: "polyline"
        });
        if (Object.keys(this.filterParams.params).length !== 0)
          this.filterData({ http: this.$http, filters: this.filterParams });
        if (value == "zones") {
          this.showZones("main");
          this.hideGrid("main");
        } else if (value == "grid") {
          this.showGrid("main");
          this.hideZones("main");
        }
      }
    }
  }
</script>

<style scoped>

</style>