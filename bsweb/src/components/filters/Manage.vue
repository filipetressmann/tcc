<template>
  <div class="container" id="filter-container">
    <p class="title is-5">{{ $t('appName') }}</p>
    <b-tabs v-model="activeTab" size="is-small" multiline expanded position="is-centered">
      <b-tab-item>
        <template slot="header">
          <span class="custom-size">{{ $t('flows') }}</span>
        </template>
        <BaseLayer />
        <Tiers v-if="tierList.length > 0" />
        <hr>
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span>{{ $t('filters') }}<b-tag rounded>{{ activeFilters.length }}</b-tag></span>
        </template>
        <Filters v-on:tab-changed="changeTab" />
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span>{{ $t('layers') }}<b-tag rounded>{{ activeLayers.length }}</b-tag></span>
        </template>
        <Layers v-on:tab-changed="changeTab" />
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
  import { mapGetters } from 'vuex';
  import Filters from './Filters.vue';
  import Tiers from './Tiers.vue';
  import Layers from './Layers.vue';
  import BaseLayer from './BaseLayer.vue';
  import Charts from '../charts/Charts';

  export default {
    components: {
      Filters,
      Tiers,
      Layers,
      BaseLayer,
      Charts,
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

<style scoped>
  .title {
    text-align: center;
  }
  .custom-size {
    height: 24px;
    /* padding-top: 3px;
    padding-left: 12.4px;
padding-right: 12.4px; */
    padding: 3px 12.4px 0 12.4px;
  }
</style>