<template>
  <div id="selectors" class="columns">
    <filter-selector v-for="category in categories"
                    :category="category"
                    :key="category.category_name"
                    class="selector">
    </filter-selector>
    <app-language id="lang-selector"></app-language>
  </div>
</template>

<script>
  import FilterSelectorVue from './FilterSelector.vue'
  import Language from '../Language.vue'
  
  export default {
    data: function() {
      return {
        categories: []
      }
    },
    components: {
      filterSelector: FilterSelectorVue,
      appLanguage: Language
    },
    methods: {
      // fetch filter categories and filter names itself from server
      fetchCategories() {
          this.$http.get('http://127.0.0.1:5000/fetchfilters')
            .then(response => {
                return response.json();
              })
              .then(categories => {
                this.categories = categories;
              });
      }
    },
    created() {
      this.fetchCategories();
    }
  }
</script>

<style scoped>
  #selectors {
    padding-top: 2%;
    padding-bottom: 1%;
    width: 80%;
    margin: 0;
    overflow: visible !important;
  }

  .selector {
    padding-right: 0;
  }

  #lang-selector {
    margin-left: 2%;
    margin-bottom: 0;
    padding: 0;
  }
</style>
