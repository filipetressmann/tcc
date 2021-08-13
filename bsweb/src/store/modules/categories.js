import axios from 'axios';

const api_url = process.env.VUE_APP_API_URL;

const state = {
  layers: [],
  filters: [],
};

const getters = {
  allLayers: state => state.layers,
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
        state.layers = response.data.filter(item => item.category_name.includes('layers'));
        state.filters = response.data.filter(item => !item.category_name.includes('layers'));
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
