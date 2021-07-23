<template>
  <div>
    <LayerSelectorV2
      v-for="category in allLayers" :key="category.id"
      :category="category"
    />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  // import Resource from './Resource';
  import LayerSelectorV2 from './LayerSelectorV2';

  export default {
    components: {
      LayerSelectorV2
    },
    data() {
      return {
        filters: [],
        api_url: process.env.VUE_APP_API_URL,
        categories: [],
      };
    },
    methods: {
      ...mapActions([
        // 'removeFilter',
        'resetMapResource',
        'filterData',
        'resetData',
      ]),
      // ...mapMutations(['addActiveLayer']),
      applyFilters() {
        this.resetData();
        this.resetMapResource({ mapkey: "main", category: "flows", type: "polyline" });
        this.filterData();
        // this.$emit('tab-changed', 0);
      },
      // showZones() {
      //   this.addActiveLayer({ layer: "zones"});
      // },
    },
    computed: {
      ...mapGetters(['allFilters', 'allLayers', 'activeFilters', 'activeLayers']),
      activeFilters() {
        return this.$store.getters.activeFilters;
      }
    },
    watch: {
      activeFilters: function() {
        console.log('activeFilters', this.$store.getters.activeFilters);
        // this.$emit('tab-changed', 1);
      }
    },
    created() {
      // this.applyFilters();
    }
  }
</script>

<style scoped>
  #title {
    text-align: center;
    margin-bottom: 10%
  }

  .filter-item {
    padding: 5%;
    border: 1px solid #666;
    cursor: pointer;
    margin-bottom: 1%;
  }

  .filter-item:hover {
    background-color: #ccc;
  }

  .filter-link {
    font-size: 8pt;
  }
</style>
