<template>
  <div>
    <FilterCategory
      v-for="category in allFilters" :key="category.id"
      :category="category"
    />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import FilterCategory from './FilterCategory';

  export default {
    components: {
      FilterCategory
    },
    computed: {
      ...mapGetters(['allFilters']),
    }
  }
</script>

<style scoped>
</style>
