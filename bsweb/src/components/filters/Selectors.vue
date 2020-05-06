<template>
  <div class="columns selectors">
    <filter-selector v-for="category in categories"
                    :category="category"
                    :key="category.name"
                    class="selector">
    </filter-selector>
  </div>
</template>

<script>
  import FilterSelectorVue from './FilterSelector.vue'
  
  export default {
    data: function() {
      return {
        categories: []
      }
    },
    components: {
      filterSelector: FilterSelectorVue
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
  .selectors {
    padding-top: 2%;
    padding-bottom: 1%;
    margin: 0;
    overflow: visible !important;
  }

  .selector {
    padding-right: 0;
  }
</style>
