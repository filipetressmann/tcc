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
                @select="selectFilter"
                @remove="deselectFilter">
      <template slot="selection" slot-scope="{ values, search, isOpen }">
        {{ category.category_name }}
      </template>
    </multiselect>
  </div>
</template>

<script>
  import { filterEvents } from '../../main.js';
  import { mapActions } from 'vuex';
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
            return this.$store.getters.activeFilters;
          },
          set(value) {
            return value;
          }
        
      }
    },
    methods: {
      ...mapActions([
        'addFilter',
        'removeFilter',
        'showOnMap',
        'removeFromMap'
      ]),
      selectFilter(filter) {
        this.showOnMap({
          type: filter.filter_type,
          key: filter.filter_key
        });
        this.addFilter(filter);
      },
      deselectFilter(filter) {
        this.removeFromMap(filter);
        this.removeFilter(filter);
      }
    }
}
</script>
