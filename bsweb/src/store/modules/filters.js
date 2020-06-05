import Vue from 'vue';

const state = {
  /* Store filters data but not plotting data */
  activeFilters: [],
  /* Plotting data is stored on data object */
  data: {},
  decorators: {},
  tierdata: [],
  /* Stores active filters' parameters */
  filters: {}
};

const getters = {
  activeFilters: (state) => state.activeFilters,
  params: (state) => state.filters,
  tierList: (state) => state.tierdata
};

const mutations = {
  /* The purpose of the two following mutations is to update the filter list at the DOM */
  addActiveFilter: (state, filter) => {
    state.activeFilters.push(filter);
  },
  removeActiveFilter: (state, filter) => {
    state.activeFilters = state.activeFilters.filter((activeFilter) => filter.id !== activeFilter.id)
  },
  addFilter: (state, { id, data }) => {
    Vue.set(state.data, id, data);
    let decorators = data.map(arrow => arrow[arrow.length - 1]);
    Vue.set(state.decorators, id, decorators);
  },
  updateFilterParams: (state, {id, params} ) => {
    Vue.set(state.filters, id, params);
  },
  addTierData: (state, { count }) => {
    state.tierdata = [...state.tierdata, count]
  },
  resetData: (state) => {
    state.data = {};
    state.decorators = {};
    state.tierdata = [];
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
      response.map((tier, index) => {
        commit('addFilter', {id: index, data: tier});
        commit('addTierData', { count: tier.length });
      });
    });
  },
  updateFilterParams: ({ commit }, args) => {
    commit('updateFilterParams', args);
  },
  resetData: ({ commit }) => {
    commit('resetData');
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
