<template>
  <div>
    <div>
      <input type="checkbox" value="morning" v-model="periods" />
      <label>{{ $t('morning') }}</label>
    </div>
    <div>
      <input type="checkbox" value="afternoon" v-model="periods" />
      <label>{{ $t('afternoon') }}</label>
    </div>
    <div>
      <input type="checkbox" value="evening" v-model="periods" />
      <label>{{ $t('evening') }}</label>
    </div>
    <div>
      <input type="checkbox" v-model="specific" />
      <label>{{ $t('specificTime') }}</label>
    </div>
    <div v-if="specific">
      <div class="flex">
        <span class="timepicker-label center">{{ $t('from') }}</span>
        <b-timepicker v-model="minTime" :increment-minutes="60" icon="clock" size=is-small class="timepicker" />
      </div>
      <div class="flex">
        <span class="timepicker-label center">{{ $t('to') }}</span>
        <b-timepicker v-model="maxTime" :default-minutes="0" icon="clock" size=is-small class="timepicker" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  
  export default {
    props: ["fid"],
    data() {
      return {
        periods: [],
        specific: false,
        minTime: new Date(2020, 1, 1, 4, 0, 0),
        maxTime: new Date(2020, 1, 1, 13, 0, 0)
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
            maxHours: this.maxTime.getHours()
          }
        }
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

  .timepicker-label {
    min-width: 20px;
    margin-left: 10px;
  }

  .timepicker {
    width: 110px;
  }
</style>
