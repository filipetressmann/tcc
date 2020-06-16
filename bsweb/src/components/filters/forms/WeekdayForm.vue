<template>
  <div>
    <div class="block">
      <b-checkbox v-for="(day, index) in weekdays" v-model="days" :native-value="index" :key="index" type="is-info">
      {{ $t(day) }}
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
        weekdays: [
          'mon',
          'tue',
          'wed',
          'thu',
          'fri',
          'sat',
          'sun'
        ],
        days: []
      };
    },
    computed: {
      filterData() {
        return {
          id: this.fid,
          params: {
            days: this.days
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

<style scoped>

</style>