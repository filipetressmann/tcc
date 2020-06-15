import Vue from 'vue';

const state = {
  /* Store filters data but not plotting data */
  activeFilters: [],
  /* Plotting data is stored on data object */
  data: {},
  decorators: {},
  weights: {},
  tierdata: [],
  /* Stores active filters' parameters */
  filters: {
    params: {},
    baseLayer: "grid"
  }
};

const getters = {
  activeFilters: (state) => state.activeFilters,
  filters: (state) => state.filters,
  tierList: (state) => state.tierdata
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
  addFilter: (state, { id, data }) => {
    Vue.set(state.data, id, data);
    let decorators = data.map(arrow => arrow[arrow.length - 1]);
    Vue.set(state.decorators, id, decorators);
  },
  addWeight: (state, {id, data }) => {
    Vue.set(state.weights, id, data);
  },
  updateFilterParams: (state, {id, params} ) => {
    Vue.set(state.filters.params, id, params);
  },
  addTierData: (state, { count }) => {
    state.tierdata = [...state.tierdata, count]
  },
  resetData: (state) => {
    state.data = {};
    state.decorators = {};
    state.tierdata = [];
    state.weights = {};
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
      response.tiers.map((tier, index) => {
        commit('addFilter', {id: index, data: tier});
        commit('addTierData', { count: tier.length });
      });
      response.weights.map((tier_weights, index) => {
        commit('addWeight', {id: index, data: tier_weights});
      })
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
