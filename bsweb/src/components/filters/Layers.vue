<template>
  <div>
    <LayerCategory
      v-for="category in allBikelineLayers"
      :key="category.id"
      :category="category"
      :mapkey="mapkey"
    />
    <LayerCategory
      v-for="category in allLayers"
      :key="category.id"
      :category="category"
      :mapkey="mapkey"
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
  props: {
    mapkey: { type: String, required: true },
  },
  computed: {
    ...mapGetters([
      'allLayers',
      'allBikelineLayers',
    ]),
  },
};
</script>

<style scoped>
</style>
