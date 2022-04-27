<template>
  <div>
    <FilterCategory
      v-for="category in allFilters"
      :key="category.id"
      :category="category"
      :mapkey="mapkey"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FilterCategory from './FilterCategory';

export default {
  components: {
    FilterCategory,
  },
  props: {
    mapkey: { type: String, required: true },
  },
  computed: {
    ...mapGetters(['allFilters']),
  },
};
</script>

<style scoped>
</style>
