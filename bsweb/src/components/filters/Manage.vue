<template>
  <div class="container" id="filter-container">
    <p class="title is-5">{{ $t('appName') }}</p>
    <b-tabs v-model="activeTab" size="is-small" multiline expanded position="is-centered" class="custom-tabs">
      <b-tab-item>
        <template slot="header">
          <span class="custom-size">{{ $t('flows') }}</span>
        </template>
        <BaseLayer />
        <Tiers v-show="!gridEditMode"/>
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
      <b-tab-item v-if="false">
        <template slot="header">
          <span>{{ $t('maps') }}<b-tag rounded>1</b-tag></span>
        </template>
        Select maps to filter; Select maps that will be rendered;
      </b-tab-item>
      <b-tab-item v-if="false">
        <template slot="header">
          <span>{{ $t('charts') }}<b-tag rounded>{{ chartList.length }}</b-tag></span>
        </template>
        <Charts />
      </b-tab-item>
    </b-tabs>
    <div class="manage-footer">
      <router-link :to="'/about'" target='_blank'>{{ $t('footer.about') }}</router-link>
      <button type="button" @click="openAboutModal">new {{ $t('footer.about') }}</button>
      <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSd1Fjuc4g1T141XFIzVHor1tSpG2MBQbA2PPI3GSuIybeq3MQ/viewform">{{ $t('footer.survey') }}</a>
      <Language />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import BaseLayer from './BaseLayer.vue';
  import Tiers from './Tiers.vue';
  import Filters from './Filters.vue';
  import Layers from './Layers.vue';
  import Charts from '../charts/Charts';
  import Language from '../Language.vue';

  export default {
    components: {
      Filters,
      Tiers,
      Layers,
      BaseLayer,
      Charts,
      Language
    },
    data() {
      return {
        isOpen: -1,
        activeTab: 0,
      };
    },
    methods: {
      changeTab(tab) {
        this.activeTab = tab;
      },
      hideTiers() {
        this.gridEditMode = true;
      },
      showTiers() {
        this.gridEditMode = false;
      }
    },
    computed: {
      ...mapGetters([
        'tierList',
        'activeFilters',
        'activeLayers',
        'chartList',
        'gridEditMode',
      ])
    }
  }
</script>

<style scoped>
  .title {
    text-align: center;
  }
  .custom-size {
    height: 24px;
    padding: 3px 12.4px 0 12.4px;
  }
  .custom-tabs{
    min-height: 85%;
  }
  .manage-footer {
    padding: 0 10px;
    display: flex;
    justify-content: space-around;
    font-size: 12px;
  }
</style>