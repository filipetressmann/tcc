<template>
  <div>
    <img v-for="chart in charts" :key="chart" :src="`${api_url}/chart?ut=${ut}&chart=${chart}`">
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      ut: '',
      api_url: process.env.VUE_APP_API_URL,
    };
  },
  computed: mapState({
    charts: state => state.filters.charts,
  }),
  created() {
    this.ut = localStorage.ut;
  },
};
</script>
