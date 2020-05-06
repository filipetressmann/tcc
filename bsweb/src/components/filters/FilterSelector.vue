<template>
  <div>
    <multiselect v-model="selectedFilters" 
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
                @remove="selectFilter">
      <template slot="selection" slot-scope="{ values, search, isOpen }">
        {{ category.category_name }}
      </template>
    </multiselect>
  </div>
</template>

<script>
  import { filterEvents } from '../../main.js';
  import Multiselect from 'vue-multiselect';

  export default {
    props: ['category'],
    components: {
      Multiselect
    },
    data() {
      return {
        selectedFilters: []
      };
    },
    methods: {
      selectFilter(selectedOption) {
        filterEvents.$emit('filterSelected', selectedOption.id);
      }
    }
}
</script>