<template>
  <div id="app">
    <filter-panel></filter-panel>
    <selectors id="selectors"></selectors>
  </div>
</template>

<script>
  import FilterPanelVue from './components/filters/Filters.vue';
  import SelectorsVue from './components/filters/Selectors.vue';

  export default {
    components: {
      filterPanel: FilterPanelVue,
      selectors: SelectorsVue
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    height: 100%;
    overflow: hidden
  }
</style>