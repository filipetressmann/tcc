<template>
  <div id="filter-container">
    <div
      class="app-name-container bg-interscity"
    >
      <img :src="logoInterSCity" class="dark-bg" style="height: 35px;">
      <span class="title is-5 font1" style="color: #fff;">
        {{ $t('appName') }}
      </span>
    </div>
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
      <div class="about-button bg-interscity font1" @click="open('about')">
        {{ $t('footer.about') }}
      </div>
      <div>
        <!-- <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSd1Fjuc4g1T141XFIzVHor1tSpG2MBQbA2PPI3GSuIybeq3MQ/viewform">{{ $t('footer.survey') }}</a> -->
        <div class="dev-mode">
          <input
            v-model="developer_mode"
            type="checkbox"
          >
          <label for="dev-mode">{{ $t('footer.devMode') }}</label>
        </div>
        <Language />
      </div>
    </div>
  </div>
</template>

<script>
import logoInterSCity from '@/assets/logos/interscity.svg';
import { mapActions, mapGetters } from 'vuex';
import Language from './Language.vue';
import FiltersTab from './tabs/FiltersTab.vue';
import FlowsTab from './tabs/FlowsTab.vue';
import LayersTab from './tabs/LayersTab.vue';
import MapsTab from './tabs/MapsTab.vue';
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
      logoInterSCity,
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
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap');
  .app-name-container {
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    justify-content: center;
    margin-bottom: 10px;
    padding: 10px 0;
    flex-wrap: wrap;
    height: 13%;
  }
  .title {
    text-align: center;
    margin-left: 20px;
    margin-right: 20px;
    width: 160px;
    font-weight: 400;
    margin-top: 11px;
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
    /* min-height: 72%; */
    height: 74%;
  }
  .manage-footer > div {
    padding: 0 10px;
    display: flex;
    justify-content: center;
    font-size: 12px;
  }
  .about-button {
    cursor: pointer;
    color: #fff;
    margin: 5px 0;
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
    align-items: center;
    margin: 0 20px;
  }

  .dev-mode > * {
    padding: 4px;
  }

  #filter-container {
  border-right: 1px solid #bbb;
  overflow: hidden;
  height: 100%;
  }

</style>