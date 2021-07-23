import Vue from 'vue';
import axios from 'axios';

const api_url = process.env.VUE_APP_API_URL;
const default_grid_size = 20;

const state = {
  activeFilters: [],
  flows: {},
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
  loading_filters: false
};

const getters = {
  activeFilters: state => state.activeFilters,
  activeFiltersIds: state => state.activeFilters.map(f => f.id),
  filters: state => state.filters,
  tierList: state => state.tripsPerTier,
  chartList: state => state.charts,
  gridSize: state => state.filters.gridSize,
  gridOffset: state => state.filters.gridOffset,
  loading_filters: state => state.loading_filters
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
    Vue.set(state.filters.params, id, params);
  },
  addTripsPerTier: (state, { count }) => {
    state.tripsPerTier = [...state.tripsPerTier, count]
  },
  resetData: (state) => {
    state.flows = {};
    state.tripsPerTier = [];
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
  filterData: async({ commit, getters }) => {
    commit('loading_filters', true);
    return await axios.post(`${api_url}/filter_data`, getters.filters)
      .then(res => {
        return res.data;
      })
      .then(response => {
        let flows = response['flows']
        let heatmaps = response['heatmaps']
        let tiers = Object.keys(flows)
        let charts = response['charts'] // filter_data -> retorna a lista de gráficos gerados no servidor
        commit('addAttractors', { attractors: heatmaps['attractors']});
        commit('addEmitters', { emitters: heatmaps['emitters']});
        commit('addCharts', { charts }) // adiciona a lista de gráficos na store
        tiers.map(tier => {
          commit('addTripsPerTier', { count: flows[tier].length });
          commit('addFlows', { tier: tier, flows: flows[tier]})
        });
      })
      .then(() => commit('loading_filters', false));
  },
  updateFilterParams: ({ commit }, args) => {
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
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
