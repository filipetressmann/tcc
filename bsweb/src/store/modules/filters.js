const state = {
  /* Store filters data but not plotting data */
  activeFilters: [],
  /* Plotting data is stored on data object */
  data: {}
};

const getters = {
  activeFilters: (state) => state.activeFilters
};

const mutations = {
  /* The purpose of the two following mutations is to update the filter list at the DOM */
  addActiveFilter: (state, filter) => {
    state.activeFilters.push(filter);
  },
  removeActiveFilter: (state, filter) => {
    state.activeFilters = state.activeFilters.filter((activeFilter) => filter.id !== activeFilter.id)
  },
  addFilter: (state, resource) => {
    state.data[resource.type][resource.id] = resource.data;
  },
  removeFilter: (state, resource) => {
    delete state.data[resource.type][resource.id];
  }
}

const actions = {
  addFilter: ({ commit }, filter) => {
    commit('addFilter', filter);
  },
  removeFilter: ({ commit }, filter) => {
    commit('removeFilter', filter);
  },
  filterData: (context, args) => {
    args.httpResource.post('http://127.0.0.1:5000/filter_data', args.filter)
    .then(response => {
      return response.json();
    })
    .then(response => {
      return JSON.parse(response);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
