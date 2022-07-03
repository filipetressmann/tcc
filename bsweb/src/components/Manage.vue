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
        <FlowsTab />
        <hr>
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span>{{ $t('filters') }}<b-tag rounded>{{ activeFilters.length }}</b-tag></span>
        </template>
        <FiltersTab />
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span>{{ $t('layers') }}<b-tag rounded>{{ activeLayersCount }}</b-tag></span>
        </template>
        <LayersTab />
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span class="custom-size2">{{ $t('maps') }}</span>
        </template>
        <MapsTab />
      </b-tab-item>
      <b-tab-item>
        <template slot="header">
          <span class="custom-size2">Upload</span>
        </template>
        <UploadsTab />
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
      <label for="dev-mode">{{ $t('footer.devMode') }}</label>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Language from './Language.vue';
import MapsTab from './tabs/MapsTab.vue';
import FiltersTab from './tabs/FiltersTab.vue';
import LayersTab from './tabs/LayersTab.vue';
import FlowsTab from './tabs/FlowsTab.vue';
import UploadsTab from './tabs/UploadsTab.vue';

export default {
  components: {
    Language,
    MapsTab,
    FiltersTab,
    LayersTab,
    FlowsTab,
    UploadsTab,
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
      'activeLayersCount',
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
  .custom-size2 {
    height: 24px;
    padding-top: 3px;
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
    display: flex;
    align-items: center;;
  }

  .dev-mode > * {
    padding: 10px;
  }
</style>