<template>
  <div id="selectors" class="columns">
    <filter-selector v-for="category in allLayers"
      :category="category"
      :key="category.category_name"
      class="selector"
    />
    <filter-selector v-for="category in allFilters"
      :category="category"
      :key="category.category_name"
      class="selector"
    />
    <app-language id="lang-selector" />
  </div>
</template>

<script>
  import FilterSelectorVue from './FilterSelector.vue'
  import Language from '../Language.vue'
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        categories: [],
        api_url: process.env.VUE_APP_API_URL
      }
    },
    components: {
      filterSelector: FilterSelectorVue,
      appLanguage: Language
    },
    computed: {
      ...mapGetters(['allLayers', 'allFilters']),
    }
  }
</script>
