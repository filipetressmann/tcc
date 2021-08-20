<template>
  <div>
    <div>
      <input v-model="reasons" type="checkbox" value="1">
      <label>{{ $t('smallDistance') }}</label>
    </div>
    <div>
      <input v-model="reasons" type="checkbox" value="2">
      <label>{{ $t('expensiveTransport') }}</label>
    </div>
    <div>
      <input v-model="reasons" type="checkbox" value="3">
      <label>{{ $t('publicTransportStationDistance') }}</label>
    </div>
    <div>
      <input v-model="reasons" type="checkbox" value="4">
      <label>{{ $t('publicTransportSlow') }}</label>
    </div>
    <div>
      <input v-model="reasons" type="checkbox" value="5">
      <label>{{ $t('publicTransportDistance') }}</label>
    </div>
    <div>
      <input v-model="reasons" type="checkbox" value="6">
      <label>{{ $t('crowdedPublicTransport') }}</label>
    </div>
    <div>
      <input v-model="reasons" type="checkbox" value="7">
      <label>{{ $t('fitness') }}</label>
    </div>
    <div>
      <input v-model="reasons" type="checkbox" value="8">
      <label>{{ $t('others') }}</label>
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
      reasons: [],
    };
  },
  computed: {
    paramsCount() {
      return this.reasons.length;
    },
    setFilterParams() {
      return {
        id: this.fid,
        params: {
          reasons: this.reasons,
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
