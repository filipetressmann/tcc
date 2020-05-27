<template>
  <div>
    <p v-if="ageFilter">
      {{ ageFilter.length }}
    </p>
    <b-field :label="ageLabel">
      <b-slider
        v-model="ageRange"
        :min="10"
        :max="90"
        :step="1"
        type="is-info" />
    </b-field>
    <b-field label="Tiers">
      <b-select placeholder="Selecione" v-model="ntiers">
        <option v-for="index in 10"
                :value="index"
                :key="index">
          {{ index }}
        </option>
      </b-select>
    </b-field>
    <b-button type="is-info" @click="submitParams" expanded>Filtrar</b-button>
    <div class="block" v-if="ageFilter">
      {{ ageFilter.length }}
      <b-field label="Mostrar tier:"></b-field>
      <b-checkbox v-for="(tier, index) in ageFilter"
                  v-model="shownTiers"
                  :native-value="index"
                  :key="index"
                  @input="updateView">
        {{ index + 1 }} ({{ tier.length }} fluxos) <br> 
      </b-checkbox>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    props: ['fid'],
    data() {
      return {
        ageRange: [10, 90],
        ntiers: 4,
        shownTiers: []
      }
    },
    computed: {
      ageLabel() {
        return `Idade dos ciclistas (${this.ageRange[0]} a ${this.ageRange[1]} anos) `
      },
      ...mapGetters([
        'ageFilter'
      ]),
      visibleMapGeoJson: function() {
        return this.$store.getters.visibleMapGeoJson
      },
      visibleMapPolyline: function() {
        return this.$store.getters.visibleMapPolyline
      },
      mapGeoJson: function() {
        return this.$store.getters.mapGeoJson
      },
      mapPolylines: function() {
        return this.$store.getters.mapPolylines
      },
      mapPolylineDecorators: function() {
        return this.$store.getters.mapPolylineDecorators
      },
      properties: function() {
        return this.$store.getters.properties
      }
    },
    methods: {
      ...mapActions([
        'filterData',
        'showOnMap'
      ]),
      submitParams() {
        let args = {
          fid: this.fid,
          minAge: this.ageRange[0],
          maxAge: this.ageRange[1],
          ntiers: this.ntiers
        }
        this.filterData({
        httpResource: this.$http, 
        filter: args
        });
      },
      updateView() {
        this.showOnMap({
          type: 'polyline',
          key: 'age',
          tiers: this.shownTiers
        });
      }
    }
  }
</script>