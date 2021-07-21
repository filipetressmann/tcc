<template>
  <div>
      <input type="checkbox" :value="filter.id" v-model="isActive" />
      <label class="filter-name">{{ $t(filter.filter_name) }}</label>
      <div v-if="isActive">
        <Resource
          :filter="filter"
        />
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Resource from './Resource.vue';

export default {
  components: {
    Resource
  },
  props: ['filter', 'type'],
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    ...mapGetters(['activeFilters', 'activeFiltersIds']),
  },
  methods: {
    ...mapActions([
      'addActiveFilter',
      'removeActiveFilter',
      'addActiveLayer',
      'removeActiveLayer',
      'resetData',
      'resetMapResource',
      'filterData',
    ]),
  },
  watch: {
    isActive: function(val) {
      console.log(this.filter.filter_name, val)
      if (this.type === 'filter') {
        if (val) {
          this.addActiveFilter(this.filter);
        } else {
          this.removeActiveFilter(this.filter);
          this.resetData();
          this.resetMapResource({ mapkey: "main", category: "flows", type: "polyline" });
          this.filterData();
        }
      } else if (this.type === 'layer') {
        if (val) {
          this.addActiveLayer(this.filter);
        } else {
          this.removeActiveLayer(this.filter);
        }
      }
    }
  }
}

</script>

<style scoped>
</style>