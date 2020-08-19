<template>
  <div>
    <multiselect v-model="activeFilters"
                :options="category.filters"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                placeholder=""
                label="filter_name"
                :select-label="''"
                track-by="filter_name"
                :searchable="false"
                :show-labels="false"
                @select="selectResource"
                @remove="deselectResource">
      <template slot="selection" slot-scope="{ values, search, isOpen }">
        {{ $t(category.category_name) }}
      </template>
      <template slot="option" slot-scope="props">
        <span>{{ $t(props.option.filter_name) }}</span>
      </template>
    </multiselect>
  </div>
</template>

<script>
  import { filterEvents } from '../../main.js';
  import { mapMutations } from 'vuex';
  import Multiselect from 'vue-multiselect';
  export default {
    props: ['category'],
    components: {
      Multiselect
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
