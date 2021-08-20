<template>
  <div>
    <div id="main-content">
      <div id="columns-content" class="columns is-mobile">
        <div v-show="true" class="column left manage">
          <Manage id="filter-container" />
        </div>
        <div id="main-column" class="column is-full">
          <app-map mapkey="main" />
        </div>
      </div>
    </div>
    <AboutModal />
    <Loading :is-active="active || loading_filters" />
  </div>
</template>

<script>
import Manage from '../components/filters/Manage.vue';
import MapVue from '../components/map/Map.vue';
import { uuid } from 'vue-uuid';
import { mapActions, mapGetters } from 'vuex';
import Loading from '../components/Loading';
import AboutModal from '../components/modals/about';

export default {
  components: {
    Manage,
    appMap: MapVue,
    Loading,
    AboutModal,
  },
  computed: {
    ...mapGetters('loading', ['active']),
    ...mapGetters(['loading_filters']),
  },
  created() {
    if (localStorage.ut === undefined) {
      localStorage.ut = this.$uuid.v4();
    }
    this.setToken(localStorage.ut);
    this.fetchCategories();
    this.fetchCPTM_lines();
    this.fetchSubway_lines();
    this.fetchCPTM_stations();
    this.fetchSubway_stations();
    this.fetchBikelane();
    this.fetchAccidents();
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
    ]),
  },
};
</script>
