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
      <GridForm />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import GridForm from '@/components/filters/forms/GridForm';

  export default {
    components: {
      GridForm
    },
    data() {
      return {
        od: "grid",
      };
    },
    computed: {
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
      ]),
      ...mapMutations([
        'showZones',
        'hideZones',
        'showGrid',
        'hideGrid'
      ]),
      ...mapActions('loading', ['setLoading', 'unsetLoading']),
      ...mapActions([
        'fetchZones',
        'fetchGrid',
      ]),
      async loadBaseLayers() {
        this.setLoading();
        await this.fetchZones(this.$http);
        this.renderZones = true;
        await this.fetchGrid()
        this.renderGrid = true;
        await this.filterData()
          .then(() => this.unsetLoading()); 
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
        this.loadBaseLayers();
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