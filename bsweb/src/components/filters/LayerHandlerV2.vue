<template>
  <div>
      <input type="checkbox" :value="filter.id" v-model="isActive" />
      <label class="filter-name">{{ $t(filter.filter_name) }}</label>
      <div v-if="isActive">
        <Resource
          :filter="filter"
          :type="type"
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
    ...mapGetters(['activeFilters', 'activeFiltersIds', 'activeLayersIds']),
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
      'removeFromMap'
    ]),
    isResourceActive(resource) {
      if (this.type === "filter") {
        return this.activeFiltersIds.includes(resource.id);
      } else if (this.type === "layer") {
        return this.activeLayersIds.includes(resource.id);
      }
    },
  },
  watch: {
    isActive: function(val) {
      console.log(this.filter.filter_name, val)
      debugger;
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
          this.removeFromMap({ mapkey: "main", category: "layers", type: this.filter.filter_type, key: this.filter.filter_key});
          this.removeActiveLayer(this.filter);

          // this.removeFromMap({ mapkey: "main", category, type: resource.filter_type, key: resource.filter_key});
          // this.removeActiveLayer(resource);  
          
          debugger;
        }
      }
    }
  },
  // mounted() {
  //   debugger;
  //   if (this.isResourceActive(this.filter)) {
  //     this.isActive = true;
  //   }
  // }
}

</script>

<style scoped>
  .filter-name {
    margin: 0 5px;
    font-weight: bold;
    font-size: 14px;
  }

  input {
    cursor: pointer;
  }
</style>