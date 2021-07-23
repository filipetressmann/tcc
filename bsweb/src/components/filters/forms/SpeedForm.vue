<template>
  <div>
    <b-field>
      {{ speedRange[0]}} km/h {{ $t('to') }} {{ speedRange[1] }} km/h
    </b-field>
    <b-slider
      v-model="speedRange"
      lazy
      :min="0"
      :max="25"
      :step="0.5"
      :custom-formatter="value => `${value} km/h`"
      type="is-info" />
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    props: ['fid'],
    data() {
      return {
        speedRange: [0, 25]
      }
    },
    computed: {
      ageLabel() {
        return `${$t('ageField')} ${this.speedRange[0]} - ${this.speedRange[1]}`
      },
      setFilterParams() {
        return {
          id: this.fid,
          params: {
            speedRange: this.speedRange
          }
        }
      }
    },
    methods: {
      ...mapActions([
        'updateFilterParams',
        'resetMapResource',
        'filterData',
      ])
    },
    watch: {
      setFilterParams: function(value) {
        this.updateFilterParams(value);
        this.resetMapResource({ mapkey: "main", category: "flows", type: "polyline" });
        this.filterData();
      }
    }
  }
</script>