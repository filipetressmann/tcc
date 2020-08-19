<template>
  <div>
    <div class="block">
      <b-checkbox v-for="(month, index) in yearmonths" v-model="months" :native-value="index+1" :key="index" type="is-info">
      {{ $t(month) }}
    </b-checkbox>
    {{ months }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
  export default {
    props: ['fid'],
    data() {
      return {
        yearmonths: [
          'jan',
          'feb',
          'mar',
          'apr',
          'may',
          'jun',
          'jul',
          'aug',
          'sep',
          'oct',
          'nov',
          'dec'
        ],
        months: []
      };
    },
    computed: {
      filterData() {
        return {
          id: this.fid,
          params: {
            months: this.months
          }
        }
      },
    },
    methods: {
      ...mapActions(['updateFilterParams'])
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