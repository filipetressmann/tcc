<template>
  <div>
    <div v-for="(sex, index) in sexes" :key="index">
      <input  type="checkbox" :value="index+1" v-model="selectedSexes" />
      <label>{{ $t(sex) }}</label>
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
      setFilterParams() {
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
        'updateFilterParams',
        'resetData',
        'resetMapResource',
        'filterData',
      ])
    },
    watch: {
      setFilterParams: function(value) {
        this.updateFilterParams(value);
        this.resetData();
        this.resetMapResource({ mapkey: "main", category: "flows", type: "polyline" });
        this.filterData();
      }
    }
  }
</script>

<style scoped>
  label {
    margin: 0 5px;
  }

  input {
    cursor: pointer;
  }
</style>
