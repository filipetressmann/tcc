<template>
  <div>
    <img v-for="chart in charts" :src="`http://127.0.0.1:5000/chart?ut=${ut}&chart=${chart}`" :key="chart" />
    
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
