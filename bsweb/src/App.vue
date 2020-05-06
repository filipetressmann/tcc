<template>
<div>
  <div id="header"></div>
  <div class="container columns">
    <div class="column is-2 left">
      <filter-panel></filter-panel>
    </div>
    <div class="column is-10 middle">
      <selectors></selectors>
      <app-map></app-map>
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

<style>
  #header {
    width: 100%;
    height: 2vh;
    background-color: black;
    display: block;
  }
  .container {
    height: 90vh;
  }

  .left {
  }

  .middle {
    padding: 0;
  }
</style>
