<template>
  <div>
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
    <b-field label="Mostrar tier:" v-if="ageTiers">
      <div class="block">
        <b-checkbox v-for="(count, index) in ageTiers"
                    :native-value="index"
                    :key="index"
                    @input="updateMap"
                    v-model="shownTiers">
          {{ index + 1 }} ({{ count }} fluxos)<br />
        </b-checkbox>
      </div>
    </b-field>
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
        tiers: [],
        shownTiers: []
      }
    },
    computed: {
      ageLabel() {
        return `Idade dos ciclistas (${this.ageRange[0]} a ${this.ageRange[1]} anos) `
      },
      ageTiers() {
        return this.$store.state.filters.tiers.age;
      }
    },
    methods: {
      ...mapActions([
        'filterData',
        'addToMap',
        'removeFromMap',
        'removeAllStartingWith'
      ]),
      clearPreviousData() {
        this.removeAllStartingWith("age");
      },
      submitParams() {
        this.clearPreviousData();
        let instance = this;
        let args = {
          fid: this.fid,
          minAge: this.ageRange[0],
          maxAge: this.ageRange[1],
          ntiers: this.ntiers
        };
        this.filterData({
        httpResource: this.$http, 
        filter: args
        });
      },
      updateMap() {
        for (let i = 0; i < this.ntiers; i++) {
          this.removeFromMap({ mapkey: "main", category: "filters", type: "polyline", key: `age${i}`});
        }
        this.shownTiers.map(tier => {
          const data = {
          mapkey: "main",
          category: "filters",
          type: "polyline",
          key: `age${tier}`
        };
        this.addToMap(data);
        });
      }
    }
  }
</script>