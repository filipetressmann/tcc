<template>
  <div>
    <LayerCategory
      v-for="category in allLayers"
      :key="category.id"
      :category="category"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LayerCategory from './LayerCategory';

export default {
  components: {
    LayerCategory,
  },
  computed: {
    ...mapGetters(['allLayers']),
  },
};
</script>

<style scoped>
</style>
