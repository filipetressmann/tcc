import Vue from 'vue';
import axios from 'axios';
import * as style from '../helpers/style_layers';
import * as options from '../helpers/option_helpers';

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
  mirrorLayerControl: false,
  hideSecondMapLayerControl: false,
};

const getters = {
  layers: state => state.data,
  activeLayersCount: state => state.main.activeLayersKeys.length + state.second.activeLayersKeys.length,
  mirrorLayerControl: state => state.mirrorLayerControl,
  hideSecondMapLayerControl: state => state.hideSecondMapLayerControl,
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
      if (!state['main'].activeLayersKeys.includes(layer_key))
        state['main'].activeLayersKeys.push(layer_key);
      if (!state['second'].activeLayersKeys.includes(layer_key))
        state['second'].activeLayersKeys.push(layer_key);
    } else {
      state[mapkey].activeLayersKeys.push(layer_key);
    }
  },
  removeActiveLayer: (state, { layer_key, mapkey, bothMaps }) => {
    if (bothMaps) {
      const indexMain = state[mapkey].activeLayersKeys.indexOf(layer_key);
      const indexSecond = state[mapkey].activeLayersKeys.indexOf(layer_key);
      if (indexMain >= 0)
        state['main'].activeLayersKeys.splice(indexMain, 1);
      if (indexSecond >= 0)
        state['second'].activeLayersKeys.splice(indexSecond, 1);
    } else {
      const index = state[mapkey].activeLayersKeys.indexOf(layer_key);
      if (index >= 0) {
        state[mapkey].activeLayersKeys.splice(index, 1);
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
  toggleMirrorLayerControl: state => {
    Vue.set(state, 'mirrorLayerControl', !state.mirrorLayerControl);
  },
  sethideSecondMapLayerControl: (state, value) => {
    Vue.set(state, 'hideSecondMapLayerControl', value);
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
            style: style.railway,
            options: options.railway_line,
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
            style: style.railway,
            options: options.railway_station,
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
            style: style.subway,
            options: options.subway_line,
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
            style: style.subway,
            options: options.subway_station,
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
              style: style.bikelane,
              options: options.bikeLane,
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
            style: style.accidents,
            options: options.accidents,
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
    return await axios.post(`${api_url}/grid_layer`, { gridSize, gridOffset })
      .then(res => {
        commit('loadGrid', { layer: res.data, mapkey });
        return res.data;
      })
      .catch(err => {
        return err;
      });
  },
  toggleMirrorLayerControl: ({ commit }) => {
    commit('toggleMirrorLayerControl');
  },
  sethideSecondMapLayerControl: ({ commit }, value) => {
    commit('sethideSecondMapLayerControl', value);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
