<template>
  <div>
    <div v-if="activeFilters.length > 0">
      <app-filter v-for="filter in activeFilters" :filter="filter" :key="filter.id" />
    </div>
      <span v-else>Nenhum filtro adicionado.</span>
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
