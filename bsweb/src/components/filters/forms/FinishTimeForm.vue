<template>
  <div>
    <div>
      <input v-model="periods" type="checkbox" value="morning">
      <label>{{ $t('morning') }}</label>
    </div>
    <div>
      <input v-model="periods" type="checkbox" value="afternoon">
      <label>{{ $t('afternoon') }}</label>
    </div>
    <div>
      <input v-model="periods" type="checkbox" value="evening">
      <label>{{ $t('evening') }}</label>
    </div>
    <div>
      <input v-model="specific" type="checkbox">
      <label>{{ $t('specificTime') }}</label>
    </div>
    <div v-if="specific">
      <div class="flex">
        <span class="timepicker-label center">{{ $t('from') }}</span>
        <b-timepicker
          v-model="minTime"
          :increment-minutes="60"
          icon="clock"
          size="is-small"
          class="timepicker"
        />
      </div>
      <div class="flex">
        <span class="timepicker-label center">{{ $t('to') }}</span>
        <b-timepicker
          v-model="maxTime"
          :default-minutes="0"
          icon="clock"
          size="is-small"
          class="timepicker"
        />
      </div>
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
      periods: [],
      specific: false,
      minTime: new Date(2020, 1, 1, 4, 0, 0),
      maxTime: new Date(2020, 1, 1, 13, 0, 0),
    };
  },
  computed: {
    setFilterParams() {
      return {
        id: this.fid,
        params: {
          periods: this.periods,
          specific: this.specific,
          minHours: this.minTime.getHours(),
          maxHours: this.maxTime.getHours(),
        },
      };
    },
  },
  watch: {
    setFilterParams: function(value) {
      this.updateFilterParams(value);
      // this.resetData();
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

  .timepicker-label {
    min-width: 20px;
    margin-left: 10px;
  }

  .timepicker {
    width: 110px;
  }
</style>
