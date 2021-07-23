import Vue from 'vue';
import Vuex from 'vuex';
import filters from './modules/filters';
import layers from './modules/layers'
import map from './modules/map';
import user from './modules/user';
import loading from './modules/loading';
import categories from './modules/categories';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    filters,
    layers,
    map,
    user,
    loading,
    categories
  }
});