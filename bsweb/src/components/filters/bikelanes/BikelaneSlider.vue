<template>
  <div id="tmp" class="wrapper">
    <b-slider
      v-model="bikelaneRange"
      type="is-info"
      :min="Math.min(...bikelaneYears)"
      :max="Math.max(...bikelaneYears)"
      :tooltip="true"
    >
      <b-slider-tick :value="Math.min(...bikelaneYears)">
        {{ Math.min(...bikelaneYears) }}
      </b-slider-tick>
      <b-slider-tick :value="Math.max(...bikelaneYears)">
        {{ Math.max(...bikelaneYears) }}
      </b-slider-tick>
    </b-slider>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    mapkey: { type: String, required: true },
  },
  data() {
    return {
      value: 1,
    };
  },
  computed: {
    ...mapGetters(['bikelaneYears']),
    bikelaneRange: {
      get() {
        return this.$store.state.layers[this.mapkey].bikelaneRange;
      },
      set(range) {
        this.setBikelaneRange({ range, mapkey: this.mapkey });
      },
    },
    gridSize: {
      get() {
        return this.$store.state.filters[this.mapkey].filters.gridSize;
      },
      set(gridSize) {
        this.updateGridSize({ gridSize, mapkey: this.mapkey });
        this.reloadGrid();
      },
    },
  },
  methods: {
    ...mapActions(['setBikelaneRange']),
  },
};
</script>

<style scoped>
.wrapper {
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 30px;
}
</style>