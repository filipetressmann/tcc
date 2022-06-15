import axios from 'axios';

const state = {
};

const getters = {};

const actions = {
  shapefileToGeoJson: ({ commit }, formData) => {
    const response = axios.post(`${api_url}/shapefile-to-geojson`, formData);
    response.then(r => console.log('response: ', response));
  },
};

const mutations = {
  // filterData: async ({ commit, dispatch, getters }, mapkey) => {
  // shapefileToGeoJson: async (state, formData) => {
  //   Vue.set(state.flows[mapkey], tier, flows);
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
