import Vue from 'vue';

const state = {
  /* Store filters data but not plotting data */
  activeFilters: [],
  /* Plotting data is stored on data object */
  data: {},
  decorators: {},
  tiers: {}
};

const getters = {
  activeFilters: (state) => state.activeFilters,
  ageTierCount(state, ntiers) {
    var tierCount = []
    for(let i = 0; i < ntiers; i++) {
      count = state.data[`age${i}`].length
      tierCount.push(count);
    }
    return tierCount;
  }
};

const mutations = {
  /* The purpose of the two following mutations is to update the filter list at the DOM */
  addActiveFilter: (state, filter) => {
    state.activeFilters.push(filter);
  },
  removeActiveFilter: (state, filter) => {
    state.activeFilters = state.activeFilters.filter((activeFilter) => filter.id !== activeFilter.id)
  },
  addFilter: (state, { type, id, data }) => {
    Vue.set(state.data, id, data);
    let decorators = data.map(arrow => arrow[arrow.length - 1]);
    Vue.set(state.decorators, id, decorators);
  },
  removeFilter: (state, resource) => {
    delete state.data[resource.id];
  },
  removeAllStartingWith: (state, key) => {
    for (const filterKey in state.data) {
      if(filterKey.startsWith(key)) {
        delete state.data[filterKey];
        delete state.decorators[filterKey];
      }
    }
  },
  addTierData: (state, { name, data }) => {
    Vue.set(state.tiers, name, data);
  }
}

const actions = {
  addFilter: ({ commit }, filter) => {
    commit('addFilter', filter);
  },
  removeFilter: ({ commit }, filter) => {
    commit('removeFilter', filter);
  },
  removeAllStartingWith: ({ commit }, key) => {
    commit('removeAllStartingWith', key);
  },
  filterData: (context, args) => {
    args.httpResource.post('http://127.0.0.1:5000/filter_data', args.filter)
    .then(response => {
      return response.json();
    })
    .then(response => {
      var tiers = [];
      response.data.map((tier, index) => {
        var resource = {
          id: `${response.name}${index}`,
          data: tier
        }
        tiers.push(tier.length);
        context.commit('addFilter', resource);
        context.commit('addTierData', {name: response.name, data: tiers});
      });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
