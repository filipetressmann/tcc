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
  fetchCategories: async ({ commit }) => { 
    try {
      const response = await axios.get(`${api_url}/fetchfilters`);
      commit('fetchCategories', response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
};

const mutations = {
  fetchCategories: (state, data) => {
    state.bikelineLayers = data.filter(item => 
      item.category_name.includes('layers_bikelanes')
    );
    const rest = data.filter(item => 
      !item.category_name.includes('layers_bikelanes')
    );
    state.layers = rest.filter(item => 
      item.category_name.includes('layers')
    );
    state.filters = rest.filter(item => 
      !item.category_name.includes('layers')
    );
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
