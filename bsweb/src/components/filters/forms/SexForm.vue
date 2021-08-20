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
    filter: { type: Object, required: true },
  },
  data() {
    return {
      sexes: [
        'male',
        'female',
      ],
      selectedSexes: [],
    };
  },
  computed: {
    paramsCount() {
      return this.selectedSexes.length;
    },
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
    paramsCount: function(count, prevCount) {
      if (count === 0) {
        this.removeActiveFilter(this.filter);
      } else {
        if (prevCount === 0) {
          this.addActiveFilter(this.filter);
        }
        this.updateFilterParams(this.setFilterParams);
      }
    },
  },
  methods: {
    ...mapActions([
      'addActiveFilter',
      'removeActiveFilter',
      'updateFilterParams',
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
