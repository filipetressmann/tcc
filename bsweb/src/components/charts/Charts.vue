<template>
  <div>
    <!-- <Chart v-for="chart in chartList" :key="chart" :chart="chart" /> -->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Chart from './Chart';

  export default {
    components: {
      Chart
    },
    methods: {
      ...mapGetters(['chartList'])
    }
  }
</script>
