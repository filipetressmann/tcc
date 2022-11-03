import axios from 'axios';
import Vue from 'vue';
import * as options from '../helpers/option_helpers';
import * as style from '../helpers/style_layers';

const api_url = process.env.VUE_APP_API_URL;

const state = {
  main: {
    grid: {},
  },
  second: {
    grid: {},
  },
  activeLayers: {
    cptm_lines: { main: false, second: false },
    cptm_stations: { main: false, second: false },
    sp_accidents: { main: false, second: false },
    subway_lines: { main: false, second: false },
    subway_stations: { main: false, second: false },
    sp_bikelane_ciclovia: { main: false, second: false },
    sp_bikelane_ciclofaixa: { main: false, second: false },
    sp_bikelane_ciclorrota: { main: false, second: false },
  },
  data: [],
  bikelanes: [],
  zones: {},
  mirrorControl: false,
  hideSecondMapControl: false,
  bikelaneYears: [],
  bikelaneRange: [0, 1],
};

const getters = {
  layers: state => state.data,
  bikelaneLayers: state => state.bikelanes,
  activeLayers: state => state.activeLayers,
  activeLayersCount: state => {
    let count = 0;
    for (let key in state.activeLayers) {
      count += state.activeLayers[key].main;
      count += state.activeLayers[key].second;
    }
    return count;
  },
  mirrorLayerControl: state => state.mirrorControl,
  hideSecondMapLayerControl: state => state.hideSecondMapControl,
  bikelaneYears: state => state.bikelaneYears,
  bikelaneRange: state => state.bikelaneRange,
};

const actions = {
  addLayer: ({ commit }, resource) => {
    commit('addLayer', resource);
  },
  addBikelaneLayer: ({ commit }, data) => {
    commit('addLayer', data);
  },
  setActiveLayer: ({ commit, getters }, data) => {
    commit('setActiveLayer', { ...data, bothMaps: getters.mirrorLayerControl });
  },
  fetchCPTM_lines: async context => {
    return await axios.get(`${api_url}/load_railway_lines_data`)
      .then(response => {
        const resource = {
          geometry: JSON.parse(response.data),
          style: style.railway,
          options: options.railway_line,
          key: 'cptm_lines',
        };
        context.commit('addLayer', resource);
      });
  },
  fetchCPTM_stations: async context => {
    return await axios.get(`${api_url}/load_railway_stations_data`)
      .then(response => {
        const resource = {
          geometry: JSON.parse(response.data),
          style: style.railway,
          options: options.railway_station,
          key: 'cptm_stations',
        };
        context.commit('addLayer', resource);
      });
  },
  fetchSubway_lines: async context => {
    return await axios.get(`${api_url}/load_metro_lines_data`)
      .then(response => {
        const resource = {
          geometry: JSON.parse(response.data),
          style: style.subway,
          options: options.subway_line,
          key: 'subway_lines',
        };
        context.commit('addLayer', resource);
      });
  },
  fetchSubway_stations: async context => {
    return await axios.get(`${api_url}/load_metro_stations_data`)
      .then(response => {
        const resource = {
          key: 'subway_stations',
          geometry: JSON.parse(response.data),
          style: style.subway,
          options: options.subway_station,
        };
        context.commit('addLayer', resource);
      });
  },
  fetchBikelane: async context => {
    return await axios.get(`${api_url}/load_bikelane_data`)
      .then(response => {
        const { years, ...bikelanes } = response.data;
        context.commit('setBikelaneYears', years);
        context.commit('setBikelaneRange', [Math.min(...years), Math.max(...years)]);

        for (const bikelane in bikelanes) {
          const resource = {
            key: bikelane,
            style: style.bikelane,
            options: options.bikeLane,
            data: [],
          };
          for (let year in bikelanes[bikelane]) {
            const yearData = {
              geometry: JSON.parse(bikelanes[bikelane][year]),
              year,
            };
            resource.data.push(yearData);
          }
          context.commit('addBikelaneLayer', resource);
        }
      });
  },
  fetchAccidents: async context => {
    return await axios.get(`${api_url}/load_accidents`)
      .then(response => {
        const resource = {
          geometry: JSON.parse(response.data),
          style: style.accidents,
          options: options.accidents,
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
  setHideSecondMapLayerControl: ({ commit }, value) => {
    commit('setHideSecondMapLayerControl', value);
  },
  copySelectedLayersTo: ({ commit }, mapkey) => {
    commit('copySelectedLayersTo', mapkey);
  },
  setBikelaneRange: ({ commit }, value) => {
    commit('setBikelaneRange', value);
  },
};

const mutations = {
  addLayer: (state, resource) => {
    state.data.push(resource);
  },
  addBikelaneLayer: (state, resource) => {
    state.bikelanes.push(resource);
  },
  setActiveLayer: (state, { layer_key, mapkey, bothMaps, value }) => {
    if (bothMaps) {
      state.activeLayers[layer_key].main = value;
      state.activeLayers[layer_key].second = value;
    } else {
      state.activeLayers[layer_key][mapkey] = value;
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
    Vue.set(state, 'mirrorControl', !state.mirrorControl);
  },
  setHideSecondMapLayerControl: (state, value) => {
    Vue.set(state, 'hideSecondMapControl', value);
  },
  copySelectedLayersTo: (state, mapkey) => {
    const mapkeyFrom = mapkey === 'main' ? 'second' : 'main';
    Vue.set(state[mapkey], 'activeLayersKeys', [...state[mapkeyFrom].activeLayersKeys]);
  },
  setBikelaneYears: (state, arr) => {
    Vue.set(state, 'bikelaneYears', arr);
  },
  setBikelaneRange: (state, value) => {
    Vue.set(state, 'bikelaneRange', value);
  },
  setDefaultBikelaneLayers: (state, value) => {
    Vue.set(state.main, 'bikelaneLayers', value);
    Vue.set(state.second, 'bikelaneLayers', value);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
