<template>
  <div>
    <div class="field">
      <b-checkbox v-model="periods" native-value="morning" type="is-info">
        {{ $t('morning') }}
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="periods" native-value="afternoon"  type="is-info">
        {{ $t('afternoon') }}
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="periods" native-value="evening"  type="is-info">
        {{ $t('evening') }}
      </b-checkbox>
    </div>
    <div class="field">
      <b-checkbox v-model="specific"  type="is-info">
        {{ $t('specificTime') }}
      </b-checkbox>
    </div>
    <div v-if="specific">
      <b-field :label="$t('from')">
        <b-timepicker v-model="minTime" :increment-minutes="60" icon="clock" />
      </b-field>
      <b-field :label="$t('to')">
        <b-timepicker v-model="maxTime" :default-minutes="0" icon="clock" />
      </b-field>
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
      filterData() {
        console.log('periods', this.periods);
        console.log('activeFilters');
        console.log(this.$store.state.filters.activeFilters);
        console.log('fid', this.fid);
        debugger;
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
