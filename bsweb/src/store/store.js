import { createStore } from 'vuex';
import categories from './modules/categories';
import filters from './modules/filters';
import flows from './modules/flows';
import layers from './modules/layers';
import loading from './modules/loading';
import map from './modules/map';
import modals from './modules/modals';
import user from './modules/user';
import user_shapefiles from './modules/user_shapefiles';
import bikesp from './modules/bikesp';

export const store = createStore({
  modules: {
    categories,
    filters,
    flows,
    layers,
    loading,
    map,
    modals,
    user,
    user_shapefiles,
    bikesp,
  },
});