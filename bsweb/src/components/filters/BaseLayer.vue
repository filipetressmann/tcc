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
      <input type="text" v-model="gridSize">
      <button type="button" @click="setGridSize">Redefinir gridSize</button>
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
        await this.fetchGrid({ httpResource: this.$http, gridSize: this.gridSize});
        this.renderGrid = true;
      },
      setGridSize() {
        this.loadBaseLayers();
      }
    },
    watch: {
      od: function(value) {
        console.log(this.$store);
        console.log(this.$store.filters);
        this.updateOD(value);
        console.log(this.$store.filters);
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