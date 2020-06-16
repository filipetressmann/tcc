<template>
  <div>
    <div v-if="activeFilters.length > 0">
      <div>
        <b-button type="is-info"
                  icon-pack="fas"
                  icon-right="fa-filter"
                  expanded
                  @click="applyFilters">
          {{ $t('filterBtn') }}
        </b-button>
        <hr>
      </div>
      <app-filter v-for="filter in activeFilters" :filter="filter" :key="filter.id" />
    </div>
      <span v-else>{{ $t('noFilters') }}</span>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';
  import Resource from './Resource';

  export default {
    components: {
      'app-filter': Resource
    },
    data() {
      return {
        filters: []
      };
    },
    methods: {
      ...mapActions([
        'removeFilter',
        'resetMapResource',
        'filterData',
        'resetData'
      ]),
      ...mapMutations([
        'addActiveLayer'
      ]),
      applyFilters() {
        this.resetData();
        this.resetMapResource({
          mapkey: "main",
          category: "filters",
          type: "polyline"
        });
        this.filterData({ http: this.$http, filters: this.$store.getters.filters });
        this.$emit('tab-changed', 0);
      },
      showZones() {
        this.addActiveLayer({ layer: "zones"});
      }
    },
    computed: {
      activeFilters() {
        return this.$store.getters.activeFilters;
      }
    },
    watch: {
      activeFilters: function(value) {
        this.$emit('tab-changed', 1);
      }
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
