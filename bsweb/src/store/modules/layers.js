import Vue from 'vue';
import * as style from '../helpers/style_layers';

const default_grid_size = 10;

const api_url = process.env.VUE_APP_API_URL;

const state = {
  activeLayers: [],
  data: {},
  zones: {},
  grid: {
    size: default_grid_size
  }
};

const getters = {
  activeLayers: (state) => state.activeLayers,
  gridSize: state => state.grid.size
}

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
    state.activeLayers = state.activeLayers.filter((activeLayer) => layer.id !== activeLayer.id);
  },
  loadZones: (state, layer) => {
    Vue.set(state.zones, "geometry", layer);
    Vue.set(state.zones, "style", style.zones);
  },
  loadGrid: (state, layer) => {
    Vue.set(state.grid, "geometry", layer);
    Vue.set(state.grid, "style", style.grid);
  },
  updateGridSize(state, gridSize) {
    Vue.set(state.grid, "size", gridSize);
  }
}

const actions = {
  addLayer: ({ commit }, resource) => {
    commit('addLayer', resource);
  },
  removeLayer: ({ commit }, layer) => {
    commit('removeLayer', layer);
  },
  fetchCPTM: (context, httpResource) => {
    httpResource.get(`${api_url}/load_railway_data`)
        .then(response => {
          return response.json();
        })
          .then(response => {
            const resource = {
              data: {
                geometry: JSON.parse(response)
              },
              key: "cptm"
            };
            context.commit('addLayer', resource);
          });
  },
  fetchSubway: (context, httpResource) => {
    httpResource.get(`${api_url}/load_metro_data`)
        .then(response => {
          return response.json();
        })
          .then(response => { 
            const resource = {
              data: {
                geometry: JSON.parse(response)
              },
              key: "subway"
            };
            context.commit('addLayer', resource);
          });
  },
  fetchBikelane: (context, httpResource) => {
    httpResource.get(`${api_url}/load_bikelane_data`)
        .then(response => {
          return response.json();
        })
        .then(response => {
          const resource = {
            data: {
              geometry: JSON.parse(response)
            },
            key: "bikelane"
          };
          context.commit('addLayer', resource);
        });
  },
  fetchZones: (context, httpResource) => {
    return httpResource.get(`${api_url}/load_zones`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        let zones = JSON.parse(response);
        context.commit('loadZones', zones);
      }) 
  },

  fetchGrid: async (context, { httpResource, gridSize }) => {
    let response = await httpResource.post(`${api_url}/grid_layer`, { gridSize });
    let grid = await response.json();
    context.commit('loadGrid', grid);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
