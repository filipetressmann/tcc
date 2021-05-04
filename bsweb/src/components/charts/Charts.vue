<template>
  <div>
    <img v-for="chart in charts" :src="`http://143.107.45.126:30105/api/chart?ut=${ut}&chart=${chart}`" :key="chart" />
    
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  

  export default {
    data() {
      return {
        ut: ''
      }
    },
    computed: mapState({
      charts: state => state.filters.charts
    }),
    mounted() {
      this.ut = localStorage.ut
    }
  }
</script>
