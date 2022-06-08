import Vue from 'vue';
import Vuex from 'vuex';
import filters from './modules/filters';
import flows from './modules/flows';
import layers from './modules/layers';
import map from './modules/map';
import user from './modules/user';
import loading from './modules/loading';
import categories from './modules/categories';
import modals from './modules/modals';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    filters,
    flows,
    layers,
    map,
    user,
    loading,
    categories,
    modals,
  },
});