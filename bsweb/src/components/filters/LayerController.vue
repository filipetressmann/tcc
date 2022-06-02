<template>
  <div>
    <input v-model="isActive" type="checkbox" :value="filter.id">
    <label class="filter-name">{{ $t(filter.filter_name) }}</label>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    filter: { type: Object, required: true },
    type: { type: String, required: true },
    mapkey: { type: String, required: true },
  },
  computed: {
    isActive: {
      get() {
        return this.$store.state.layers[this.mapkey].activeLayersKeys.includes(this.filter.filter_key);
      },
      set(value) {
        if (value) {
          this.addActiveLayer({ layer_key: this.filter.filter_key, mapkey: this.mapkey });
        } else {
          this.removeActiveLayer({ layer_key: this.filter.filter_key, mapkey: this.mapkey });
        }
      },
    },
  },
  methods: {
    ...mapActions([
      'addActiveLayer',
      'removeActiveLayer',
      'resetMapResource',
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