<template>
<div id="app">
  <div id="header"></div>
  <div id="main-content">
    <div class="columns" id="columns-content">
      <div class="column is-3 left">
        <filter-panel id="filter-container"></filter-panel>
      </div>
      <div id="main-column" class="column is-10">
        <selectors></selectors>
        <app-map></app-map>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import FilterPanelVue from './components/filters/Filters.vue';
  import SelectorsVue from './components/filters/Selectors.vue';
  import MapVue from './components/map/Map.vue';
  import { mapActions } from 'vuex';

  export default {
    components: {
      filterPanel: FilterPanelVue,
      selectors: SelectorsVue,
      appMap: MapVue
    },
    methods: {
      ...mapActions([
        'fetchCPTM',
        'fetchSubway',
        'fetchBikelane',
      ])
    },
    created() {
      this.fetchCPTM(this.$http);
      this.fetchSubway(this.$http);
      this.fetchBikelane(this.$http);
    }
  }
</script>
<style>
  #header {
    width: 100%;
    height: 2vh;
    background-color: black;
    display: block;
  }

  html{
    width: 100%;
    height: 100%;
    
  }

  body{
    width: 100%;
    height: 100%;
    margin: 0;
  }

  #app {
    width: 100%;
    height: 100%;
  }
  
  .container {
    height: 90vh;
  }

  #main-column {
    padding: 0;
    height: 100%;
  }

  #main-content {
    width: 100%;
    height: 100%;
  }

  #columns-content {
    height: 100%;
  }

  #filter-container {
    padding-top: 9%;
    border-right: 1px solid #bbb;
    overflow: scroll;
    height: 100%;
  }
</style>
