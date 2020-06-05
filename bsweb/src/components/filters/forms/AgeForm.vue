<template>
  <div>
    <b-field :label="ageLabel">
      <b-slider
        v-model="ageRange"
        lazy
        :min="10"
        :max="90"
        :step="1"
        type="is-info" />
    </b-field>
    <!-- <b-field label="Tiers">
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
    </b-field> -->
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    props: ['fid'],
    data() {
      return {
        ageRange: [10, 90]
      }
    },
    computed: {
      ageLabel() {
        return `Faixa etária dos ciclistas \n (${this.ageRange[0]} a ${this.ageRange[1]} anos)`
      },
      filterData() {
        return {
          id: this.fid,
          params: {
            ageRange: this.ageRange
          }
        }
      }
    },
    watch: {
      filterData: function(value) {
        this.updateFilterParams(value);
      }
    },
    methods: {
      ...mapActions([
        'updateFilterParams'
      ]),
    }
  }
</script>