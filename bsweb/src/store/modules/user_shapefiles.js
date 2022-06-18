import axios from 'axios';
import Vue from 'vue';

const api_url = process.env.VUE_APP_API_URL;

const state = {
  layers: [],
};

const getters = {
  uploadedLayers: state => state.layers,
};

const actions = {
  shapefileToGeoJson: async ({ commit }, { formData, props }) => {
    const response = await axios.post(`${api_url}/shapefile_to_geojson`, formData);
    if (response.status === 200) {
      debugger;
      commit('saveGeoJson', { ...props, ...response.data });
    } else {
      console.log('ERRO no upload de shapefile!');
    }
  },
  loadSavedLayers: ({ commit }) => {
    const customLayers = JSON.parse(localStorage.getItem('geojson'));
    debugger;
    commit('loadSavedLayers', customLayers);
  },
};

const mutations = {
  saveGeoJson: async (state, geojson) => {
    debugger;
    const newLayers = [...state.layers, geojson];
    localStorage.setItem('geojson', JSON.stringify(newLayers));
    Vue.set(state, 'layers', newLayers);
  },
  loadSavedLayers: (state, customLayers) => {
    debugger;
    // Vue.set(state, 'layers', customLayers);
    state.layers = customLayers || [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
