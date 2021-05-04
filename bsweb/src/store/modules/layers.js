import Vue from 'vue';
import * as style from '../helpers/style_layers';
const state = {
  activeLayers: [],
  data: {},
  zones: {},
  grid: {}
};

const getters = {
  activeLayers: (state) => state.activeLayers,
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
    httpResource.get('http://143.107.45.126:30105/api/load_railway_data')
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
    httpResource.get('http://143.107.45.126:30105/api/load_metro_data')
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
    httpResource.get('http://143.107.45.126:30105/api/load_bikelane_data')
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
    return httpResource.get('http://143.107.45.126:30105/api/load_zones')
      .then(response => {
        return response.json();
      })
      .then(response => {
        let zones = JSON.parse(response);
        context.commit('loadZones', zones);
      }) 
  },

  fetchGrid: async (context, { httpResource, gridSize }) => {
    let response = await httpResource.post('http://143.107.45.126:30105/api/grid_layer', { gridSize });
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
