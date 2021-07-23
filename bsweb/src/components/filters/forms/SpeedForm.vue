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
      filterData() {
        return {
          id: this.fid,
          params: {
            speedRange: this.speedRange
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