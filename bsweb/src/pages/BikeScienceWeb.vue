<template>
<div>
  <div id="main-content">
    <div class="columns is-mobile" id="columns-content">
      <div class="column left manage" v-show="true">
        <Manage id="filter-container" />
      </div>
      <div id="main-column" class="column is-full">
        <!-- <selectors /> -->
        <app-map mapkey="main" />
      </div>
    </div>
  </div>
  <Loading :isActive="active || loading_filters" />
</div>
</template>

<script>
  import Manage from '../components/filters/Manage.vue';
  import MapVue from '../components/map/Map.vue';
  import { uuid } from 'vue-uuid';
  import { mapActions, mapGetters } from 'vuex';
  import Loading from '../components/Loading';
  // import SelectorsVue from './components/filters/Selectors.vue';

  export default {
    components: {
      Manage,
      // selectors: SelectorsVue,
      appMap: MapVue,
      Loading
    },
    methods: {
      ...mapActions([
        'setToken',
        'fetchCategories',
        'fetchCPTM_lines',
        'fetchSubway_lines',
        'fetchCPTM_stations',
        'fetchSubway_stations',
        'fetchBikelane',
        'fetchAccidents',
      ])
    },
    computed: {
      ...mapGetters('loading', ['active']),
      ...mapGetters(['loading_filters'])
    },
    created() {
      if (localStorage.ut === undefined) {
        localStorage.ut = this.$uuid.v4()
      }
      this.setToken(localStorage.ut);
      this.fetchCategories();
      this.fetchCPTM_lines();
      this.fetchSubway_lines();
      this.fetchCPTM_stations();
      this.fetchSubway_stations();
      this.fetchBikelane();
      this.fetchAccidents();
    }
  }
</script>
