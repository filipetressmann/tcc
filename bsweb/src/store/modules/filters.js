import Vue from 'vue';

const state = {
  activeFilters: [],
  flows: {},
  tripsPerTier: [],
  heatmaps: {
  },
  /* Stores active filters' parameters */
  filters: {
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
  chartList: (state) => state.chartList
};

const mutations = {
  /* The purpose of the two following mutations is to update the filter list at the DOM */
  addActiveFilter: (state, filter) => {
    state.activeFilters.push(filter);
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
    http.post('http://127.0.0.1:5000/filter_data', filters)
    .then(response => {
      return response.json();
    })
    .then(response => {
      let flows = response['flows']
      let heatmaps = response['heatmaps']
      let tiers = Object.keys(flows)
      commit('addAttractors', { attractors: heatmaps['attractors']});
      commit('addEmitters', { emitters: heatmaps['emitters']});
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
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
