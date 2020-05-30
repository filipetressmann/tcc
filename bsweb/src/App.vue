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
        <app-map mapkey="main"></app-map>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import FilterPanelVue from './components/filters/Filters.vue';
  import SelectorsVue from './components/filters/Selectors.vue';
  import MapVue from './components/map/Map.vue';

  export default {
    components: {
      filterPanel: FilterPanelVue,
      selectors: SelectorsVue,
      appMap: MapVue
    }
  }
</script>
