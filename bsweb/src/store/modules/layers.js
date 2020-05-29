import * as style from './../helpers/style_layers';
import * as options from './../helpers/option_helpers.js';
import Vue from 'vue'
const state = {
  data: {}
};

const mutations = {
  addLayer: (state, resource) => {
    Vue.set(state.data, resource.key, resource.data);
  },
  removeLayer: (state, resource) => {
    delete state.data[resource.key]
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
    httpResource.get(url)
  },
  fetchCPTM: (context, httpResource) => {
    httpResource.get('http://127.0.0.1:5000/load_railway_data')
        .then(response => {
          return response.json();
        })
          .then(response => {
            const resource = {
              data: {
                geometry: JSON.parse(response),
                options: options.rail_options,
                style: style.styleRailway
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
                geometry: JSON.parse(response),
                options: options.rail_options,
                style: style.styleMetro
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
  }
};

export default {
  state,
  mutations,
  actions
};
