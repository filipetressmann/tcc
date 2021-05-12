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
      <p>Grid selecionado!</p>
      <p>Tamanho: {{gridSize}}</p>
      <!-- <input type="text" v-model="gridSize"> -->
      <input type="text" :value="gridSize" @input="updateGridSize">
      <button type="button" @click="setGridSize">Redefinir gridSize</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
  export default {
    data() {
      return {
        od: "grid",
      };
    },
    computed: mapState({
      filterParams: state => state.getters.filters,
      gridSize: state => state.layers.grid.size
    }),
    // computed: {
    //   filterParams() {
    //     return this.$store.getters.filters;
    //   },
    // },
    methods: {
      ...mapActions([
        'resetData',
        'updateOD',
        'resetMapResource',
        'filterData',
        'fetchGrid'
      ]),
      ...mapMutations([
        'showZones',
        'hideZones',
        'showGrid',
        'hideGrid'
      ]),
       async loadBaseLayers() {
        await this.fetchGrid({ httpResource: this.$http, gridSize: this.$store.state.layers.grid.size });
        this.renderGrid = true;
      },
      updateGridSize(e) {
        console.log('gridSize', this.gridSize);
        // console.log('filters');
        // console.log(this.$store.state.filters);
        // console.log('layers');
        // console.log(this.$store.state.layers);
        console.log('layers.grid.size');
        console.log(this.$store.state.layers.grid.size);
        // console.log('map');
        // console.log(this.$store.state.map);
        console.log('dispatch');
        console.log(this.$store.dispatch);
        // this.$store.commit('testePena', this);
        console.log('layers.grid.size');
        console.log(this.$store.state.layers.grid.size);
        this.$store.commit('updateGridSize', e.target.value);
      },
      setGridSize() {
        this.loadBaseLayers();
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