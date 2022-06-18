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
  shapefileToGeoJson: ({ commit }, formData) => {
    const response = axios.post(`${api_url}/shapefile_to_geojson`, formData);
    response.then(r => {
      if (r.status === 200) {
        commit('saveGeoJson', r.data);
      }
    });
  },
  loadSavedLayers: ({ commit }) => {
    const customLayers = JSON.parse(localStorage.getItem('geoJson'));
    debugger;
    commit('loadSavedLayers', customLayers);
  },
};

const mutations = {
  saveGeoJson: async (state, geojson) => {
    const newLayers = [...state.layers, geojson];
    localStorage.setItem('geoJson', JSON.stringify(newLayers));
    Vue.set(state, 'layers', newLayers);
  },
  loadSavedLayers: (state, customLayers) => {
    debugger;
    // Vue.set(state, 'layers', customLayers);
    state.layers = customLayers;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
