const state = {
  activeFilters: []
};

const getters = {
  activeFilters: (state) => state.activeFilters
};

const mutations = {
  addFilter: (state, filter) => {
    state.activeFilters.push(filter);
  },
  removeFilter: (state, filter) => {
    state.activeFilters = state.activeFilters.filter((activeFilter) => filter.id !== activeFilter.id)
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
      context.commit('addPolyline', response)
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
