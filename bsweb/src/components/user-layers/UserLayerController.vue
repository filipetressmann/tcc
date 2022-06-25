<template>
  <div>
    <input v-model="isActive" type="checkbox" :value="isActive">
    <label class="filter-name">{{ layerName }}</label>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    layerName: { type: String, required: true },
    index: { type: Number, required: true },
    mapkey: { type: String, required: true },
  },
  computed: {
    ...mapGetters('user_shapefiles', ['uploadedLayers']),
    isActive: {
      get() {
        return this.uploadedLayers[this.index].isActive[this.mapkey];
      },
      set(value) {
        this.toggleCustomLayer({ index: this.index, mapkey: this.mapkey, value });
      },
    },
  },
  methods: {
    ...mapActions('user_shapefiles', ['toggleCustomLayer']),
  },
};
</script>

<style scoped>
  .filter-name {
    margin: 0 5px;
    font-size: 12px;
  }

  input {
    cursor: pointer;
  }
</style>