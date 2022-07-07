<template>
  <div>
    <TwoMapsManager />
    <div id="main-content">
      <div id="columns-content" class="columns is-mobile">
        <div v-show="true" class="column left manage">
          <Manage id="filter-container" />
        </div>
        <div id="main-column" class="column is-full is-flex">
          <div id="main-map" :class="['main-map column', { 'is-half': secondMapIsActive }]">
            <Map mapkey="main" />
          </div>
          <div
            v-if="secondMapIsActive"
            id="second-map"
            class="second-map column is-half"
            style="border-left: 2px solid #167CF0;"
          >
            <Map mapkey="second" />
          </div>
        </div>
      </div>
    </div>
    <AboutModal />
    <EditCustomLayerModal v-if="activeModal === 'editCustomLayer'" />
    <Loading :is-active="active || loading_filters" />
    <o-modal :active.sync="isImageModalActive">
      <p style="text-align: center">
        <img src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4">
      </p>
    </o-modal>
  </div>
</template>

<script>
import Manage from '../components/Manage.vue';
import Map from '../components/map/Map.vue';
import { uuid } from 'vue-uuid';
import { mapActions, mapGetters } from 'vuex';
import Loading from '../components/Loading';
import AboutModal from '../components/modals/about';
import EditCustomLayerModal from '../components/modals/editCustomLayer';
import TwoMapsManager from '../components/twomapsmanager/TwoMapsManager.vue';

export default {
  components: {
    Manage,
    Map,
    Loading,
    AboutModal,
    EditCustomLayerModal,
    TwoMapsManager,
  },
  data() {
    return {
      isImageModalActive: false, // Temp para possível modal
      open: false,
    };
  },
  computed: {
    ...mapGetters('loading', ['active']),
    ...mapGetters('modals', ['activeModal']),
    ...mapGetters(['loading_filters', 'secondMapIsActive', 'mapControl']),
  },
  created() {
    if (localStorage.ut === undefined) {
      localStorage.ut = this.$uuid.v4();
    }
    // this.setToken(localStorage.ut);
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
    ...mapActions('user_shapefiles', ['loadSavedLayers']),
  },
};
</script>

<style scoped>
.main-map.is-half {
  padding-top: 0;
  padding-left: 0;
  padding-bottom: 0;
  padding-right: 10px;
}
.second-map {
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 10px;
}
</style>