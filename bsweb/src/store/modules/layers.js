import Vue from 'vue';
import * as style from '../helpers/style_layers';
const state = {
  activeLayers: [],
  data: {},
  zones: {}
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
  }
}

const actions = {
  addLayer: ({ commit }, resource) => {
    commit('addLayer', resource);
  },
  removeLayer: ({ commit }, layer) => {
    commit('removeLayer', layer);
  },
  fetchLayer: ( { commit }, args) => {
    httpResource = args.httpResource;
    url = args.url;
    id = args.id;
    httpResource.get(url);
  },
  fetchCPTM: (context, httpResource) => {
    httpResource.get('http://127.0.0.1:5000/load_railway_data')
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
    httpResource.get('http://127.0.0.1:5000/load_metro_data')
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
    httpResource.get('http://127.0.0.1:5000/load_bikelane_data')
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
    httpResource.get('http://127.0.0.1:5000/load_zones')
      .then(response => {
        return response.json();
      })
      .then(response => {
        let zones = JSON.parse(response);
        context.commit('loadZones', zones);
      }) 
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
