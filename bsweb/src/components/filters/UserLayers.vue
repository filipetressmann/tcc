<template>
  <div>
    <div
      v-for="(layer, index) in uploadedLayers"
      :key="index"
    >
      <UserLayerController
        :index="index"
        :layer-name="layer.name"
        mapkey="main"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserLayerController from './UserLayerController';

export default {
  components: {
    UserLayerController,
  },
  computed: {
    ...mapGetters('user_shapefiles', ['uploadedLayers']),
  },
};
</script>

<style scoped>
</style>
