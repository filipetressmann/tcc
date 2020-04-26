<template>
  <div id="app">
    <filter-panel></filter-panel>
  </div>
</template>

<script>
  import FilterPanel from './components/filters/FilterPanel';
  export default {
    components: {
      'filter-panel': FilterPanel
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