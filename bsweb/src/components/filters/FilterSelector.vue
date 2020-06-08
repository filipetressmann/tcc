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
        {{ category.category_name }}
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
        'removeFromMap'
      ]),
      selectResource(resource) {
        let category = this.category.category_name;
        if (category == 'Layers') {
          this.addActiveLayer(resource);
        } else {
          this.addActiveFilter(resource);
        }
        
      },
      deselectResource(resource) {
        let category = this.category.category_name;
        let catkey = "filters"
        if (category == 'Layers') {
          this.removeActiveLayer(resource);
          catkey = "layers"
        } else {
          this.removeActiveFilter(resource);
        }

        // Object to handle resource removal
        const mapResource = {
          mapkey: "main",
          category: catkey,
          type: resource.filter_type,
          key: resource.filter_key
        }
        // remove resource from map
        this.removeFromMap(mapResource);
      }
    }
}
</script>
