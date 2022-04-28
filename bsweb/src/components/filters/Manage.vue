<template>
  <div id="filter-container" class="container">
    <p class="title is-5">
      {{ $t('appName') }}
    </p>
    <b-tabs
      v-model="activeTab"
      size="is-small"
      multiline
      expanded
      position="is-centered"
      class="custom-tabs"
    >
      <b-tab-item>
        <template slot="header">
          <span class="custom-size">{{ $t('flows') }}</span>
        </template>
        <BaseLayer mapkey="main" />
        <BaseLayer mapkey="second" />
        <Tiers v-show="!gridEditMode" mapkey="main" />
        <Tiers v-show="!gridEditMode" mapkey="second" />
        <hr>
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span>{{ $t('filters') }}<b-tag rounded>{{ activeFilters.length }}</b-tag></span>
        </template>
        <Filters mapkey="main" @tab-changed="changeTab" />
        <hr>
        <Filters mapkey="second" @tab-changed="changeTab" />
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span>{{ $t('layers') }}<b-tag rounded>{{ activeLayers.length }}</b-tag></span>
        </template>
        <Layers mapkey="main" @tab-changed="changeTab" />
        <hr>
        <Layers mapkey="second" @tab-changed="changeTab" />
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
      <div class="about-button" @click="open('about')">
        {{ $t('footer.about') }}
      </div>
      <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSd1Fjuc4g1T141XFIzVHor1tSpG2MBQbA2PPI3GSuIybeq3MQ/viewform">{{ $t('footer.survey') }}</a>
      <Language />
    </div>
    <div class="dev-mode manage-footer">
      <input
        v-model="developer_mode"
        type="checkbox"
      >
      <label for="dev-mode">Modo desenvolvedor</label>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
    Language,
  },
  data() {
    return {
      // isOpen: -1,
      activeTab: 0,
    };
  },
  computed: {
    ...mapGetters([
      'activeFilters',
      'activeLayers',
      'chartList',
      'gridEditMode',
      'developer_mode',
    ]),
    developer_mode: {
      get() {
        return this.$store.state.map.developer_mode;
      },
      set() {
        this.toggleDeveloperMode();
      },
    },
  },
  methods: {
    ...mapActions('modals', ['open']),
    ...mapActions(['toggleDeveloperMode']),
    changeTab(tab) {
      this.activeTab = tab;
    },
    hideTiers() {
      this.gridEditMode = true;
    },
    showTiers() {
      this.gridEditMode = false;
    },
  },
};
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
  .about-button {
    cursor: pointer;
    color: #7957d5;
  }
  .about-button:hover {
    cursor: pointer;
    color: #167df0;
  }
  .manage-footer > a:hover {
    color: #167df0;
  }

  .dev-mode {
    font-size: 12px;
    justify-content: center;
  }

  .dev-mode > * {
    padding: 10px;
  }
</style>