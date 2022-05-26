import Vue from 'vue';
import axios from 'axios';
import * as style from '../helpers/style_layers';

const api_url = process.env.VUE_APP_API_URL;

const state = {
  main: {
    activeLayersKeys: [],
    grid: {},
  },
  second: {
    activeLayersKeys: [],
    grid: {},
  },
  data: {},
  zones: {},
};

const getters = {
  layers: state => state.data,
  activeLayers: state => state.main.activeLayersKeys,
  activeLayers2: state => state.second.activeLayersKeys,
  // activeLayersKeys: state => state.activeLayers.map(l => l.id),
};

const mutations = {
  addLayer: (state, resource) => {
    Vue.set(state.data, resource.key, resource.data);
  },
  removeLayer: (state, resource) => {
    delete state.data[resource.key];
  },
  addActiveLayer: (state, { layer_key, mapkey, bothMaps }) => {
    if (bothMaps) {
      // state.data[layer_key]['main'] = true;
      // state.data[layer_key]['second'] = true;
    } else {
      state.main.activeLayersKeys.push(layer_key);
      // state.data[layer_key][mapkey] = true;
    }
  },
  removeActiveLayer: (state, { layer_key, mapkey, bothMaps }) => {
    if (bothMaps) {
    } else {
      const index = state.main.activeLayersKeys.indexOf(layer_key);
      if (index >= 0) {
        state.main.activeLayersKeys.splice(index, 1);
      }
    }
  },
  loadZones: (state, layer) => {
    Vue.set(state.zones, 'geometry', layer);
    Vue.set(state.zones, 'style', style.zones);
  },
  loadGrid: (state, { layer, mapkey }) => {
    Vue.set(state[mapkey].grid, 'geometry', layer);
    Vue.set(state[mapkey].grid, 'style', style.grid);
  },
};

const actions = {
  addLayer: ({ commit }, resource) => {
    commit('addLayer', resource);
  },
  removeLayer: ({ commit }, data) => {
    commit('removeLayer', data);
  },
  addActiveLayer: ({ commit, getters }, data) => {
    commit('addActiveLayer', { ...data, bothMaps: getters.mirrorLayerControl });
  },
  removeActiveLayer: ({ commit, getters }, data) => {
    commit('removeActiveLayer', { ...data, bothMaps: getters.mirrorLayerControl });
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
  fetchGrid: async ({ commit, dispatch, rootGetters, rootState }, mapkey) => {
    // dispatch('resetFlows', mapkey, { root: true });
    const gridSize = rootState.filters[mapkey].filters.gridSize;
    const gridOffset = rootState.filters[mapkey].filters.gridOffset;
    // const gridSize = rootGetters['gridSize'];
    // const gridOffset = rootGetters['gridOffset'];
    return await axios.post(`${api_url}/grid_layer`, { gridSize, gridOffset })
      .then(res => {
        commit('loadGrid', { layer: res.data, mapkey });
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
