<template>
  <div>
    <LayerSelectorV2
      v-for="layer in allLayers" :key="layer.id"
      :layer="layer"
    />
    <p v-for="layer in allLayers" :key="layer.id">
      {{ layer.id }}
    </p>
  </div>
</template>

<script>
  import LayerSelectorV2 from './LayerSelectorV2';
  import { mapGetters } from 'vuex';

  export default {
    components: {
      LayerSelectorV2
    },
    data() {
      return {
        filters: []
      };
    },
    computed: {
      ...mapGetters(['allLayers']),
      // activeLayers() {
      //   return this.$store.getters.activeLayers;
      // }
    },
    // watch: {
    //   activeLayers: function() {
    //     this.$emit('tab-changed', 2);
    //   }
    // },
  }
</script>

<style scoped>
</style>
