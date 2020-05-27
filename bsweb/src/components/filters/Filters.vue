<template>
  <div class="container" id="filter-container">
    <p id="title">Filtros</p>
    <app-filter v-for="filter in activeFilters" :filter="filter" :key="filter.id" />
  </div>
</template>

<script>
  import { filterEvents } from '../../main.js';
  import { mapActions } from 'vuex';
  import Filter from './Filter';

  export default {
    components: {
      'app-filter': Filter
    },
    data() {
      return {
        isOpen: -1
      };
    },
    methods: {
      ...mapActions([
        'removeFilter',
        'removeFromMap'
      ])
    },
    computed: {
      activeFilters() {
        return this.$store.getters.activeFilters;
      }
    }
  }
</script>

<style scoped>
  #title {
    text-align: center;
    margin-bottom: 10%
  }

  .filter-item {
    padding: 5%;
    border: 1px solid #666;
    cursor: pointer;
    margin-bottom: 1%;
  }

  .filter-item:hover {
    background-color: #ccc;
  }

  .filter-link {
    font-size: 8pt;
  }
</style>
