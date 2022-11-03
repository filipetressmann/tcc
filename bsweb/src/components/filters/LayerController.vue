<template>
  <div>
    <input v-model="isActive" type="checkbox" :value="filter.id">
    <label class="filter-name">{{ $t(filter.filter_name) }}</label>
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';

export default {
  props: {
    filter: { type: Object, required: true },
    type: { type: String, required: true },
    mapkey: { type: String, required: true },
  },
  computed: {
    ...mapGetters(['activeLayers']),
    isActive: {
      get() {
        return this.activeLayers[this.filter.filter_key][this.mapkey];
      },
      set(value) {
        this.setActiveLayer({ layer_key: this.filter.filter_key, mapkey: this.mapkey, value });
      },
    },
  },
  methods: {
    ...mapActions([
      'setActiveLayer',
      'removeFromMap',
      'addToMap',
    ]),
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