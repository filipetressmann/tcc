import Vue from 'vue';
import axios from 'axios';

const api_url = process.env.VUE_APP_API_URL;
const default_grid_size = 20;

const state = {
  main: {
    activeFilters: [],
    flows: {
      0: [],
      1: [],
      2: [],
      3: [],
    },
    tripsPerTier: [0, 0, 0, 0],
    /* Stores active filters' parameters */
    filters: {
      ut: '',
      params: {},
      baseLayer: 'grid',
      gridSize: default_grid_size,
      gridOffset: {
        west: -0.15,
        east: 0.23,
        north: 0.19,
        south: -0.46,
      },
    },
  },
  second: {
    activeFilters: [],
    flows: {
      0: [],
      1: [],
      2: [],
      3: [],
    },
    tripsPerTier: [0, 0, 0, 0],
    /* Stores active filters' parameters */
    filters: {
      ut: '',
      params: {},
      baseLayer: 'grid',
      gridSize: default_grid_size,
      gridOffset: {
        west: -0.15,
        east: 0.23,
        north: 0.19,
        south: -0.46,
      },
    },
  },
  chartList: [
    '@/assets/tmp_charts/agechart.png',
    '@/assets/tmp_charts/triplengths.png',
  ],
  loading_filters: false,
  flows_not_found: false,
  gridEditMode: false,
  doubleControl: true,
};

const getters = {
  activeFilters: state => state.main.activeFilters,
  // activeFiltersIds: state => state.main.activeFilters.map(f => f.id),
  filters: state => state.main.filters,
  // flows: state => state.main.flows,
  // tierList: state => state.main.tripsPerTier,
  // chartList: state => state.main.charts,
  gridSize: state => state.main.filters.gridSize,
  gridOffset: state => state.main.filters.gridOffset,
  //
  activeFilters2: state => state.second.activeFilters,
  // activeFiltersIds2: state => state.second.activeFilters.map(f => f.id),
  filters2: state => state.second.filters,
  // flows2: state => state.second.flows,
  // tierList2: state => state.second.tripsPerTier,
  // chartList2: state => state.second.charts,
  // gridSize2: state => state.second.filters.gridSize,
  // gridOffset2: state => state.second.filters.gridOffset,
  //
  loading_filters: state => state.loading_filters,
  flowsNotFound: state => state.flows_not_found,
  gridEditMode: state => state.gridEditMode,
};

const mutations = {
  addActiveFilter: (state, { filter, mapkey }) => {
    state[mapkey].activeFilters.push(filter);
    // Vue.set(state, 'loading_filters', false);
  },
  setToken: (state, token) => {
    Vue.set(state.filters, 'ut', token);
  },
  removeActiveFilter: (state, { filter, mapkey }) => {
    state[mapkey].activeFilters = state[mapkey].activeFilters.filter(activeFilter => filter.id !== activeFilter.id);
    Vue.delete(state[mapkey].filters.params, filter.id);
  },
  addFlows: (state, { tier, flows, mapkey }) => {
    Vue.set(state[mapkey].flows, tier, flows);
  },
  addAttractors: (state, { attractors }) => {
    Vue.set(state.heatmaps, 'attractors', attractors);
  },
  addEmitters: (state, { emitters }) => {
    Vue.set(state.heatmaps, 'emitters', emitters);
  },
  addCharts: (state, { charts }) => {
    Vue.set(state, 'charts', charts);
  },
  updateFilterParams: (state, { filter: { id, params }, mapkey } ) => {
    Vue.set(state[mapkey].filters.params, id, params);
  },
  addTripsPerTier: (state, { tier, count, mapkey }) => {
    Vue.set(state[mapkey].tripsPerTier, tier, count);
  },
  updateOD: (state, { value, mapkey }) => {
    Vue.set(state[mapkey].filters, 'baseLayer', value);
  },
  updateGridSize(state, gridSize) {
    Vue.set(state.filters, 'gridSize', gridSize);
  },
  updateGridOffset(state, value) {
    Vue.set(state.filters, 'gridOffset', value);
  },
  loading_filters(state, value) {
    Vue.set(state, 'loading_filters', value);
  },
  setFlowsNotFound(state, value) {
    Vue.set(state, 'flows_not_found', value);
  },
  resetFlows(state, mapkey) {
    Vue.set(state[mapkey], 'flows', { 0: [], 1: [], 2: [], 3: [] });
    Vue.set(state[mapkey], 'tripsPerTier', [0, 0, 0, 0]);
  },
  setGridEditMode(state, value) {
    Vue.set(state, 'gridEditMode', value);
  },
};

const actions = {
  addFilter: ({ commit }, filter) => {
    commit('addFilter', filter);
  },
  removeFilter: ({ commit }, data) => {
    commit('removeActiveFilter', data);
  },
  addActiveFilter: ({ commit }, data) => {
    // commit('loading_filters', true);
    commit('addActiveFilter', data);
  },
  removeActiveFilter: ({ commit, dispatch }, data) => {
    const { mapkey } = data;
    commit('removeActiveFilter', data);
    dispatch('resetMapResource', { mapkey, category: 'flows', type: 'polyline' }); // @@@
    dispatch('filterData', mapkey);
  },
  filterData: async({ commit, dispatch, getters }, mapkey) => {
    commit('loading_filters', true);
    let filters;
    if (mapkey == 'main')
      filters = getters.filters;
    else filters = getters.filters2;

    return await axios.post(`${api_url}/filter_data`, filters)
      .then(res => {
        return res.data;
      })
      .then(response => {
        let flows = response['flows'];
        let tiers = Object.keys(flows);
        if (tiers.length > 0) {
          tiers.map(tier => {
            commit('addTripsPerTier', { tier, count: flows[tier].length, mapkey });
            commit('addFlows', { tier, flows: flows[tier], mapkey });
          });
          commit('setFlowsNotFound', false);
        } else {
          commit('setFlowsNotFound', true);
          dispatch('resetFlows', mapkey);
        }
      })
      .then(() => commit('loading_filters', false));
  },
  updateFilterParams: ({ commit, dispatch }, { filter, mapkey }) => {
    commit('updateFilterParams', { filter, mapkey });
    dispatch('resetMapResource', { mapkey, category: 'flows', type: 'polyline' });
    dispatch('filterData', mapkey);
  },
  updateOD: ({ commit }, data) => {
    commit('updateOD', data);
  },
  updateGridSize({ commit }, gridSize) {
    commit('updateGridSize', Number(gridSize));
  },
  setToken: ({ commit }, value) => {
    commit('setToken', value);
  },
  updateGridOffset({ commit, getters }, { key, value }) {
    if (getters.gridOffset[key] !== value) {
      let newGridOffset = { ...getters.gridOffset };
      newGridOffset[key] = value;
      commit('updateGridOffset', newGridOffset);
    }
  },
  resetFlows({ commit }, mapkey) {
    commit('resetFlows', mapkey);
  },
  setGridEditModeOn({ commit }) {
    commit('setGridEditMode', true);
  },
  setGridEditModeOff({ commit }, value) {
    commit('setGridEditMode', false);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
