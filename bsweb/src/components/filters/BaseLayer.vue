<template>
  <div>
    <span class="label">{{ $t('baseLayer') }}</span>
    <b-radio v-model="od" name="Grid" native-value="grid" type="is-info">
      {{ $t('grid') }}
    </b-radio>
    <b-radio v-model="od" name="Zonas OD" native-value="zones" type="is-info">
      {{ $t('zones') }}
    </b-radio>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
  export default {
    data() {
      return {
        od: "grid"
      };
    },
    computed: {
      filterParams() {
        return this.$store.getters.filters;
      }
    },
    methods: {
      ...mapActions([
        'resetData',
        'updateOD',
        'resetMapResource',
        'filterData'
      ]),
      ...mapMutations([
        'showZones',
        'hideZones',
        'showGrid',
        'hideGrid'
      ])
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