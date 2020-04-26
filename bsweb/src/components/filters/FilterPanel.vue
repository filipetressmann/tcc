<template>
  <div id="filterpanel">
    <p>Filtros</p>
    <hr>
    <filter-selector></filter-selector>
  </div>
</template>

<script>
  import FilterSelector from './FilterSelector';

  export default {
    components: {
      'filter-selector': FilterSelector
    }    
  }
</script>

<style scoped>
  #filterpanel {
    width: 20%;
    border-right: 1px solid #ccc;
  }
</style>
