<template>
  <div>
    <div v-if="activeLayers.length > 0">
      <app-layer v-for="layer in activeLayers" :filter="layer" :key="layer.id" />
    </div>
      <span v-else>Nenhum layer adicionado.</span>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import Resource from './Resource';

  export default {
    components: {
      'app-layer': Resource
    },
    data() {
      return {
        filters: []
      };
    },
    computed: {
      activeLayers() {
        return this.$store.getters.activeLayers;
      }
    },
    watch: {
      activeLayers: function(value) {
        this.$emit('tab-changed', 2);
      }
    }
  }
</script>

<style scoped>
  #title {
    text-align: center;
    margin-bottom: 10%
  }

  .filter-item {
    padding: 5%;
    border: 1px solid #666;
    cursor: pointer;
    margin-bottom: 1%;
  }

  .filter-item:hover {
    background-color: #ccc;
  }

  .filter-link {
    font-size: 8pt;
  }
</style>
