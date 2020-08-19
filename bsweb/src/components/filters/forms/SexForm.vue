<template>
  <div>
    <div class="block">
      <b-checkbox v-for="(sex, index) in sexes" v-model="selectedSexes" :native-value="index+1" :key="index" type="is-info">
      {{ $t(sex) }}
    </b-checkbox>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
  export default {
    props: ['fid'],
    data() {
      return {
        sexes: [
          'male',
          'female',
        ],
        selectedSexes: []
      };
    },
    computed: {
      filterData() {
        return {
          id: this.fid,
          params: {
            sexes: this.selectedSexes
          }
        };
      }
    },
    methods: {
      ...mapActions([
        'updateFilterParams'
      ])
    },
    watch: {
      filterData: function(value) {
        this.updateFilterParams(value);
      }
    }
  }
</script>
