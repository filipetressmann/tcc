<template>
  <div class="container" id="filter-container">
    <p id="title">Bike Science Web</p>
    <b-tabs position="is-centered" v-model="activeTab">
      <b-tab-item>
        <template slot="header">
          <span>Dados</span>
        </template>
        Tiers; Source; Import; Export;
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span>Filtros <b-tag rounded>{{ activeFilters.length }}</b-tag></span>
        </template>
        <filters />
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span>Mapas <b-tag rounded>1</b-tag></span>
        </template>
        Select maps to filter; Select maps that will be rendered;
      </b-tab-item>
    </b-tabs>
    
  </div>
</template>

<script>
  import { filterEvents } from '../../main.js';
  import { mapActions } from 'vuex';
  import Filter from './Filter';
  import FiltersVue from './Filters.vue';

  export default {
    components: {
      'app-filter': Filter,
      'filters': FiltersVue
    },
    data() {
      return {
        isOpen: -1,
        filters: [],
        activeTab: 0
      };
    },
    computed: {
      activeFilters() {
        return this.$store.getters.activeFilters;
      }
    }
  }
</script>
