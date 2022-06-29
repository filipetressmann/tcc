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
      commit('saveGeoJson', {
        ...props,
        geometry: response.data,
        isActive: { main: true, second: true },
      });
    } else {
      console.error('ERRO no upload de shapefile!');
    }
  },
  loadSavedLayers: ({ commit }) => {
    const customLayers = JSON.parse(localStorage.getItem('geojson'));
    commit('loadSavedLayers', customLayers);
  },
  toggleCustomLayer: ({ commit }, data) => {
    commit('toggleCustomLayer', data);
  },
  removeCustomLayer: ({ commit }, index) => {
    commit('removeCustomLayer', index);
  },
  editCustomLayer: ({ commit }, { index, name, style }) => {
    commit('editCustomLayer', { index, name, style });
  },
};

const mutations = {
  saveGeoJson: async (state, geojson) => {
    const newLayers = [...state.layers, geojson];
    localStorage.setItem('geojson', JSON.stringify(newLayers));
    Vue.set(state, 'layers', newLayers);
  },
  loadSavedLayers: (state, customLayers) => {
    state.layers = customLayers || [];
  },
  toggleCustomLayer: (state, { index, mapkey, value }) => {
    Vue.set(state.layers[index].isActive, mapkey, value);
  },
  removeCustomLayer: (state, index) => {
    state.layers.splice(index, 1);
    localStorage.setItem('geojson', JSON.stringify(state.layers));
  },
  editCustomLayer: (state, { index, name, style }) => {
    state.layers[index].name = name;
    state.layers[index].style = style;
    localStorage.setItem('geojson', JSON.stringify(state.layers));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
