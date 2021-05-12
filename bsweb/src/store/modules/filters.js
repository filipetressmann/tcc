import Vue from 'vue';

const api_url = process.env.VUE_APP_API_URL;

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
    baseLayer: "grid"
  },
  chartList: [
    '@/assets/tmp_charts/agechart.png',
    '@/assets/tmp_charts/triplengths.png'
  ]
};

const getters = {
  activeFilters: (state) => state.activeFilters,
  filters: (state) => state.filters,
  tierList: (state) => state.tripsPerTier,
  chartList: (state) => state.charts
};

const mutations = {
  /* The purpose of the two following mutations is to update the filter list at the DOM */
  addActiveFilter: (state, filter) => {
    state.activeFilters.push(filter);
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
    debugger;
    Vue.set(state.filters, "baseLayer", value);
  }
}

const actions = {
  addFilter: ({ commit }, filter) => {
    commit('addFilter', filter);
  },
  removeFilter: ({ commit }, filter) => {
    commit('removeFilter', filter);
  },
  filterData: ({ commit }, { http, filters }) => {
    http.post(`${api_url}/filter_data`, filters)
    .then(response => {
      return response.json();
    })
    .then(response => {
      let flows = response['flows']
      let heatmaps = response['heatmaps']
      let tiers = Object.keys(flows)
      let charts = response['charts']
      commit('addAttractors', { attractors: heatmaps['attractors']});
      commit('addEmitters', { emitters: heatmaps['emitters']});
      commit('addCharts', { charts })
      tiers.map(tier => {
        commit('addTripsPerTier', { count: flows[tier].length });
        commit('addFlows', { tier: tier, flows: flows[tier]})
      });
    });
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
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
