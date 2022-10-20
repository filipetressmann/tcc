<template>
  <div id="tmp" class="wrapper">
    <b-slider
      v-model="bikelaneMaxYear"
      lazy
      type="is-info"
      :min="0"
      :max="bikelaneYears.length"
      :tooltip="true"
    >
      <b-slider-tick v-for="(year, index) in bikelaneYears" :key="year" :value="index">
        {{ year }}
      </b-slider-tick>
    </b-slider>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      value: 1,
    };
  },
  computed: {
    ...mapGetters(['bikelaneYears']),
    bikelaneMaxYear: {
      get() {
        return this.$store.state.layers.bikelaneMaxYear;
      },
      set(value) {
        this.setBikelaneMaxYear(value);
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
    ...mapActions(['setBikelaneMaxYear']),
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