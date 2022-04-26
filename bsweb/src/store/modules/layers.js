import Vue from 'vue';
import axios from 'axios';
import * as style from '../helpers/style_layers';

const api_url = process.env.VUE_APP_API_URL;

const state = {
  activeLayers: [],
  data: {},
  zones: {},
  grid: {},
};

const getters = {
  activeLayers: state => state.activeLayers,
  activeLayersIds: state => state.activeLayers.map(l => l.id),
  grid: state => state.grid,
};

const mutations = {
  addLayer: (state, resource) => {
    Vue.set(state.data, resource.key, resource.data);
  },
  removeLayer: (state, resource) => {
    delete state.data[resource.key];
  },
  addActiveLayer: (state, layer) => {
    state.activeLayers.push(layer);
  },
  removeActiveLayer: (state, layer) => {
    state.activeLayers = state.activeLayers.filter(activeLayer => layer.id !== activeLayer.id);
  },
  loadZones: (state, layer) => {
    Vue.set(state.zones, 'geometry', layer);
    Vue.set(state.zones, 'style', style.zones);
  },
  loadGrid: (state, layer) => {
    Vue.set(state.grid, 'geometry', layer);
    Vue.set(state.grid, 'style', style.grid);
  },
};

const actions = {
  addLayer: ({ commit }, resource) => {
    commit('addLayer', resource);
  },
  removeLayer: ({ commit }, layer) => {
    commit('removeLayer', layer);
  },
  addActiveLayer: ({ commit }, layer) => {
    commit('addActiveLayer', layer);
  },
  removeActiveLayer: ({ commit }, layer) => {
    commit('removeActiveLayer', layer);
  },
  fetchCPTM_lines: async context => {
    return await axios.get(`${api_url}/load_railway_lines_data`)
      .then(response => {
        const resource = {
          data: {
            geometry: JSON.parse(response.data),
          },
          key: 'cptm_lines',
        };
        context.commit('addLayer', resource);
      });
  },
  fetchCPTM_stations: async context => {
    return await axios.get(`${api_url}/load_railway_stations_data`)
      .then(response => {
        const resource = {
          data: {
            geometry: JSON.parse(response.data),
          },
          key: 'cptm_stations',
        };
        context.commit('addLayer', resource);
      });
  },
  fetchSubway_lines: async context => {
    return await axios.get(`${api_url}/load_metro_lines_data`)
      .then(response => {
        const resource = {
          data: {
            geometry: JSON.parse(response.data),
          },
          key: 'subway_lines',
        };
        context.commit('addLayer', resource);
      });
  },
  fetchSubway_stations: async context => {
    return await axios.get(`${api_url}/load_metro_stations_data`)
      .then(response => {
        const resource = {
          data: {
            geometry: JSON.parse(response.data),
          },
          key: 'subway_stations',
        };
        context.commit('addLayer', resource);
      });
  },
  fetchBikelane: async context => {
    return await axios.get(`${api_url}/load_bikelane_data`)
      .then(response => {
        const bikelanes = JSON.parse(response.data);
        for (const type in bikelanes) {
          const resource = {
            data: {
              geometry: JSON.parse(bikelanes[type]),
            },
            key: type,
          };
          context.commit('addLayer', resource);
        }
      });
  },
  fetchAccidents: async context => {
    return await axios.get(`${api_url}/load_accidents`)
      .then(response => {
        const resource = {
          data: {
            geometry: JSON.parse(response.data),
          },
          key: 'sp_accidents',
        };
        context.commit('addLayer', resource);
      });
  },
  fetchZones: async context => {
    return await axios.get(`${api_url}/load_zones`)
      .then(response => {
        let zones = JSON.parse(response.data);
        context.commit('loadZones', zones);
        return zones;
      })
      .catch(err => {
        return err;
      });
  },
  fetchGrid: async ({ commit, dispatch, rootGetters }) => {
    dispatch('resetFlows', 'main', { root: true }); // @@@ alterar para o mapa correto
    const gridSize = rootGetters['gridSize'];
    const gridOffset = rootGetters['gridOffset'];
    return await axios.post(`${api_url}/grid_layer`, { gridSize, gridOffset })
      .then(res => {
        commit('loadGrid', res.data);
        return res.data;
      })
      .catch(err => {
        return err;
      });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
