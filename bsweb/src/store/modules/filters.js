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
  activeFiltersIds: state => state.main.activeFilters.map(f => f.id),
  filters: state => state.main.filters,
  flows: state => state.main.flows,
  tierList: state => state.main.tripsPerTier,
  chartList: state => state.main.charts,
  gridSize: state => state.main.filters.gridSize,
  gridOffset: state => state.main.filters.gridOffset,
  //
  activeFilters2: state => state.second.activeFilters,
  activeFiltersIds2: state => state.second.activeFilters.map(f => f.id),
  filters2: state => state.second.filters,
  flows2: state => state.second.flows,
  tierList2: state => state.second.tripsPerTier,
  chartList2: state => state.second.charts,
  gridSize2: state => state.second.filters.gridSize,
  gridOffset2: state => state.second.filters.gridOffset,
  //
  loading_filters: state => state.loading_filters,
  flowsNotFound: state => state.flows_not_found,
  gridEditMode: state => state.gridEditMode,
};

const mutations = {
  /* The purpose of the two following mutations is to update the filter list at the DOM */
  addActiveFilter: (state, filter) => {
    state.activeFilters.push(filter);
    // Vue.set(state, 'loading_filters', false);
  },
  setToken: (state, token) => {
    Vue.set(state.filters, 'ut', token);
  },
  removeActiveFilter: (state, filter) => {
    state.activeFilters = state.activeFilters.filter(activeFilter => filter.id !== activeFilter.id);
    Vue.delete(state.filters.params, filter.id);
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
  updateFilterParams: (state, { id, params, mapkey } ) => {
    Vue.set(state[mapkey].filters.params, id, params);
  },
  addTripsPerTier: (state, { tier, count, mapkey }) => {
    Vue.set(state[mapkey].tripsPerTier, tier, count);
  },
  updateOD: (state, value, mapkey) => {
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
  removeFilter: ({ commit }, filter) => {
    commit('removeActiveFilter', filter);
  },
  addActiveFilter: ({ commit }, filter) => {
    // commit('loading_filters', true);
    commit('addActiveFilter', filter);
  },
  removeActiveFilter: ({ commit, dispatch }, filter) => {
    commit('removeActiveFilter', filter);
    dispatch('resetMapResource', { mapkey: 'main', category: 'flows', type: 'polyline' });
    dispatch('filterData');
  },
  filterData: async({ commit, dispatch, getters }, mapkey) => {
    // debugger;
    commit('loading_filters', true);
    return await axios.post(`${api_url}/filter_data`, getters.filters)
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
  updateFilterParams: ({ commit, dispatch }, args) => {
    commit('updateFilterParams', args);
    dispatch('resetMapResource', { mapkey: 'main', category: 'flows', type: 'polyline' });
    dispatch('filterData');
  },
  updateOD: ({ commit }, value) => {
    commit('updateOD', value);
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
