import axios from 'axios';

const api_url = process.env.VUE_APP_API_URL;

const state = {
  layers: [],
  bikelineLayers: [],
  filters: [],
};

const getters = {
  allLayers: state => state.layers,
  allBikelineLayers: state => state.bikelineLayers,
  allFilters: state => state.filters,
};

const actions = {
  fetchCategories: ({ commit }) => {
    commit('fetchCategories');
  },
};

const mutations = {
  fetchCategories: async ({ commit, getters }) => {
    return await axios.get(`${api_url}/fetchfilters`)
      .then(response => {
        state.bikelineLayers = response.data.filter(item => item.category_name.includes('layers_bikelanes'));
        const rest = response.data.filter(item => !item.category_name.includes('layers_bikelanes'));
        state.layers = rest.filter(item => item.category_name.includes('layers'));
        state.filters = rest.filter(item => !item.category_name.includes('layers'));
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
