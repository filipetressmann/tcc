<template>
  <div class="container" id="filter-container">
    <p class="title is-5">Bike Science Web</p>
    <b-tabs position="is-centered" v-model="activeTab" size="is-small">
      <b-tab-item>
        <template slot="header">
          <span>Dados</span>
        </template>
        <tiers v-if="tierList.length > 0"></tiers>
        
        Source; Import; Export;
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span>Filtros <b-tag rounded>{{ activeFilters.length }}</b-tag></span>
        </template>
        <filters v-on:tab-changed="changeTab" />
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span>Layers <b-tag rounded>{{ activeLayers.length }}</b-tag></span>
        </template>
        <layers v-on:tab-changed="changeTab" />
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
  import Tiers from './Tiers.vue';
  import Layers from './Layers.vue';

  export default {
    components: {
      'app-filter': Filter,
      'filters': FiltersVue,
      'tiers': Tiers,
      'layers': Layers
    },
    data() {
      return {
        isOpen: -1,
        activeTab: 0
      };
    },
    methods: {
      changeTab(tab) {
        this.activeTab = tab;
      }
    },
    computed: {
      activeFilters() {
        return this.$store.getters.activeFilters;
      },
      activeLayers() {
        return this.$store.getters.activeLayers;
      },
      tierList() {
        return this.$store.getters.tierList;
      }
    }
  }
</script>

<style>
  .title {
    text-align: center;
  }
</style>