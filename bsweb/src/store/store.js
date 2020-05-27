import Vue from 'vue';
import Vuex from 'vuex';
import filters from './modules/filters';
import map from './modules/map';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    filters,
    map
  }
});