<template>
<div id="app">
  <div id="main-content">
    <div class="columns is-mobile" id="columns-content">
      <div class="column left manage" v-show="true">
        <manage-panel id="filter-container" />
      </div>
      <div id="main-column" class="column is-full">
        <selectors />
        <app-map mapkey="main" />
      </div>
    </div>
  </div>
  <Loading :isActive="active" />
</div>
</template>

<script>
  import ManagePanelVue from './components/filters/Manage.vue';
  import SelectorsVue from './components/filters/Selectors.vue';
  import MapVue from './components/map/Map.vue';
  import { uuid } from 'vue-uuid';
  import { mapActions, mapGetters } from 'vuex';
  import Loading from './components/Loading';

  export default {
    components: {
      managePanel: ManagePanelVue,
      selectors: SelectorsVue,
      appMap: MapVue,
      Loading
    },
    methods: {
      ...mapActions([
        'setToken'
      ])
    },
    computed: {
      ...mapGetters('loading', ['active'])
    },
    mounted() {
      if (localStorage.ut === undefined) {
        localStorage.ut = this.$uuid.v4()
      }
      this.setToken(localStorage.ut);
    }
  }
</script>
