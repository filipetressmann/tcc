import Vue from 'vue';
import axios from 'axios';

const api_url = process.env.VUE_APP_API_URL;
const default_grid_size = 20;

const state = {
  activeFilters: [],
  flows: {
    0: [],
    1: [],
    2: [],
    3: []
  },
  tripsPerTier: [],
  heatmaps: {
  },
  charts: [],
  /* Stores active filters' parameters */
  filters: {
    ut: '',
    params: {},
    baseLayer: "grid",
    gridSize: default_grid_size,
    gridOffset: {
      west: -0.15,
      east: 0.23,
      north: 0.19,
      south: -0.46
    }
  },
  chartList: [
    '@/assets/tmp_charts/agechart.png',
    '@/assets/tmp_charts/triplengths.png'
  ],
  loading_filters: false,
  flows_not_found: false,
};

const getters = {
  activeFilters: state => state.activeFilters,
  activeFiltersIds: state => state.activeFilters.map(f => f.id),
  filters: state => state.filters,
  tierList: state => state.tripsPerTier,
  chartList: state => state.charts,
  gridSize: state => state.filters.gridSize,
  gridOffset: state => state.filters.gridOffset,
  loading_filters: state => state.loading_filters,
  flows: state => state.flows,
  flowsNotFound: state => state.flows_not_found,
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
    state.activeFilters = state.activeFilters.filter((activeFilter) => filter.id !== activeFilter.id);
    Vue.delete(state.filters.params, filter.id);
  },
  addFlows: (state, { tier, flows }) => {
    Vue.set(state.flows, tier, flows);
  },
  addAttractors: (state, { attractors }) => {
    Vue.set(state.heatmaps, 'attractors', attractors);
  },
  addEmitters: (state, { emitters }) => {
    Vue.set(state.heatmaps, 'emitters', emitters);
  },
  addCharts: (state, { charts }) => {
    Vue.set(state, 'charts', charts)
  },
  updateFilterParams: (state, {id, params} ) => {
    // debugger;
    Vue.set(state.filters.params, id, params);
  },
  addTripsPerTier: (state, { tier, count }) => {
    Vue.set(state.tripsPerTier, tier, count);
  },
  resetData: (state) => {
    // state.flows = {};
    // state.tripsPerTier = [0, 0, 0, 0];
  },
  updateOD: (state, value) => {
    Vue.set(state.filters, "baseLayer", value);
  },
  updateGridSize(state, gridSize) {
    Vue.set(state.filters, "gridSize", Number(gridSize));
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
  resetFlows(state) {
    Vue.set(state, 'flows', { 0: [], 1: [], 2: [], 3: [] });
    Vue.set(state, 'tripsPerTier', [0, 0, 0, 0]);
    // debugger;
  }
}

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
  removeActiveFilter: ({ commit }, filter) => {
    commit('removeActiveFilter', filter);
  },
  filterData: async({ commit, dispatch, getters }) => {
    // commit('loading_filters', true);
    return await axios.post(`${api_url}/filter_data`, getters.filters)
      .then(res => {
        return res.data;
      })
      .then(response => {
        let flows = response['flows']
        let heatmaps = response['heatmaps']
        let tiers = Object.keys(flows)
        // let charts = response['charts'] // filter_data -> retorna a lista de gráficos gerados no servidor
        // commit('addAttractors', { attractors: heatmaps['attractors']});
        // commit('addEmitters', { emitters: heatmaps['emitters']});
        // commit('addCharts', { charts }) // adiciona a lista de gráficos na store
        commit('resetData');
        if (tiers.length > 0) {
          // debugger;
          tiers.map(tier => {
            commit('addTripsPerTier', { tier, count: flows[tier].length });
            commit('addFlows', { tier, flows: flows[tier]})
          });
          commit('setFlowsNotFound', false);
          // debugger;
        } else {
          debugger;
          commit('setFlowsNotFound', true);
          dispatch('resetFlows');
        }
      })
      // .then(() => commit('loading_filters', false));
  },
  updateFilterParams: ({ commit }, args) => {
    // debugger;
    commit('updateFilterParams', args);
  },
  resetData: ({ commit }) => {
    commit('resetData');
  },
  updateOD: ({ commit }, value) => {
    commit('updateOD', value);
  },
  setToken: ({ commit }, value) => {
    commit('setToken', value);
  },
  updateGridOffset({ commit, getters }, { key, value }) {
    if (getters.gridOffset[key] !== value) {
      let newGridOffset = {...getters.gridOffset}
      newGridOffset[key] = value;
      commit('updateGridOffset', newGridOffset);
    }
  },
  resetFlows({ commit }) {
    commit('resetFlows');
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
