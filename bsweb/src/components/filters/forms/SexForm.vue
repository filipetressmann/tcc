<template>
  <div>
    <div v-for="(sex, index) in sexes" :key="index">
      <input v-model="selectedSexes" type="checkbox" :value="index+1">
      <label>{{ $t(sex) }}</label>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    fid: { type: Number, required: true },
  },
  data() {
    return {
      sexes: [
        'male',
        'female'
      ],
      selectedSexes: [],
    };
  },
  computed: {
    setFilterParams() {
      return {
        id: this.fid,
        params: {
          sexes: this.selectedSexes,
        },
      };
    },
  },
  watch: {
    setFilterParams: function(value) {
      this.updateFilterParams(value);
      this.resetData();
      this.resetMapResource({ mapkey: 'main', category: 'flows', type: 'polyline' });
      this.filterData();
    },
  },
  methods: {
    ...mapActions([
      'updateFilterParams',
      'resetData',
      'resetMapResource',
      'filterData'
    ]),
  },
};
</script>

<style scoped>
  label {
    margin: 0 5px;
  }

  input {
    cursor: pointer;
  }
</style>
