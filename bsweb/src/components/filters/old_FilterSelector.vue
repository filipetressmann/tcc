<template>
  <SelectFilter
    ref="selectFilter"
    :id="'select-' + category.category_name"
    :category="category"
    :title="category.category_name"
    :options="category.filters"
    :selectResource="selectResource"
    :deselectResource="deselectResource"
  />
</template>

<script>
  import { filterEvents } from '../../main.js';
  import { mapMutations } from 'vuex';
  import SelectFilter from '@/components/inputs/SelectFilter.vue';

  export default {
    props: ['category'],
    components: {
      SelectFilter
    },
    data() {
      return {
        selectedFilters: []
      }
    },
    computed: {
      activeFilters: {
        get() {
          return [...this.$store.getters.activeFilters, ...this.$store.getters.activeLayers];
        },
        set(value) {
          return value;
        }
      }
    },
    methods: {
      ...mapMutations([
        'addActiveFilter',
        'removeActiveFilter',
        'addActiveLayer',
        'removeActiveLayer',
        'resetMapResource',
        'removeFromMap'
      ]),
      selectResource(resource) {
        let category = this.category.category_name;
        if (category == "layers") {
          this.addActiveLayer(resource);
        } else {
          this.addActiveFilter(resource);
        }
      },
      deselectResource(resource) {
        let category = this.category.category_name;
        if (category != "layers") category = "flows";
        
        if (category == 'layers') {
          this.removeFromMap({ mapkey: "main", category, type: resource.filter_type, key: resource.filter_key});
          this.removeActiveLayer(resource);  
        } else {
          this.resetMapResource({ mapkey: "main", category, type: resource.filter_type });
          this.removeActiveFilter(resource);
        }
      }
    }
  }
</script>
