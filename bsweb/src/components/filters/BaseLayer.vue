<template>
  <div>
    <span class="label">Camada de visualização:</span>
    <b-radio v-model="od" name="Grid" native-value="grid" type="is-info">
      Grid
    </b-radio>
    <b-radio v-model="od" name="Zonas OD" native-value="zones" type="is-info">
      Zonas OD
    </b-radio>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        od: "zones"
      };
    },
    methods: {
      ...mapActions([
        'resetData',
        'updateOD',
        'resetMapResource',
        'filterData',
        'toggleZones'
      ])
    },
    watch: {
      od: function(value) {
        this.updateOD(value);
        this.resetData();
        this.resetMapResource({
          mapkey: "main",
          category: "filters",
          type: "polyline"
        });
        this.filterData({ http: this.$http, filters: this.$store.getters.filters });
        if (value == "zones") {
          this.toggleZones("main");
        }
      }
    }
  }
</script>

<style scoped>

</style>