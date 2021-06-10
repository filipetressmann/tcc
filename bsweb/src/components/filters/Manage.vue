<template>
  <div class="container" id="filter-container">
    <p class="title is-5">{{ $t('appName') }}</p>
    <b-tabs v-model="activeTab" size="is-small">
      <b-tab-item>
        <template slot="header">
          <span>{{ $t('flows') }}</span>
        </template>
        <baselayer></baselayer>
        <tiers v-if="tierList.length > 0"></tiers>
        <hr>
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span>{{ $t('filters') }}<b-tag rounded>{{ activeFilters.length }}</b-tag></span>
        </template>
        <filters v-on:tab-changed="changeTab" />
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span>{{ $t('layers') }}<b-tag rounded>{{ activeLayers.length }}</b-tag></span>
        </template>
        <layers v-on:tab-changed="changeTab" />
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span>{{ $t('maps') }}<b-tag rounded>1</b-tag></span>
        </template>
        Select maps to filter; Select maps that will be rendered;
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span>{{ $t('charts') }}<b-tag rounded>{{ chartList.length }}</b-tag></span>
        </template>
        <Charts />
      </b-tab-item>
    </b-tabs>
    
  </div>
</template>

<script>
  import { filterEvents } from '../../main.js';
  import { mapActions, mapGetters } from 'vuex';
  import FiltersVue from './Filters.vue';
  import Tiers from './Tiers.vue';
  import Layers from './Layers.vue';
  import BaseLayer from './BaseLayer.vue';
  import Charts from '../charts/Charts';

  export default {
    components: {
      'filters': FiltersVue,
      'tiers': Tiers,
      'layers': Layers,
      'baselayer': BaseLayer,
      Charts
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
      },
      ...mapGetters(['chartList'])
    }
  }
</script>

<style>
  .title {
    text-align: center;
  }
</style>