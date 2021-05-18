import Vue from 'vue';
const state = {
  maps: {
    /* This object contains info about maps being plotted in the application. Each map object contains a 'properties' object
    and a 'show' object. Default map's has 'mapkey' = main */
    main: {
      properties: {
        zoom: 12,
        center: [-23.550164466, -46.633664132],
        // tile_layer_url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
        tile_layer_url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
      },
      show: {
        /* this object stores keys to access data user wants to show */
        layers: {
          geojson: {},
          polyline: {},
          decorators: {}
        },
        flows: {
          polyline: {}
        },
        zones: false,
        grid: true,
        attractors: true,
        emitters: false,
      }
    }
  }
}

const getters = {
}

const mutations = {
  addToMap: (state, { mapkey, category, type, key, options }) => {
    Vue.set(state.maps[mapkey].show[category][type], key, options);
  },
  removeFromMap: (state, { mapkey, category, type, key }) => {
    Vue.delete(state.maps[mapkey].show[category][type], key);
  },
  resetMapResource: (state, { mapkey, category, type }) => {
    Vue.set(state.maps[mapkey].show[category], type, {});
  },
  hideZones: (state, mapkey) => {
    Vue.set(state.maps[mapkey].show, "zones", false);
  },
  hideGrid: (state, mapkey) => {
    Vue.set(state.maps[mapkey].show, "grid", false);
  },
  showZones: (state, mapkey) => {
    Vue.set(state.maps[mapkey].show, "zones", true);
  },
  showGrid: (state, mapkey) => {
    Vue.set(state.maps[mapkey].show, "grid", true);
  },
  changeHeatmapVisibility: (state, {which, visible, mapkey}) => {
    Vue.set(state.maps[mapkey].show, which, visible);
  }
}
const actions = {
  addToMap: (context, data) => {
    context.commit('addToMap', data);
  },
  removeFromMap: (context, data) => {
    context.commit('removeFromMap', data);
  },
  resetMapResource: (context, data) => {
    context.commit('resetMapResource', data);
  }
}

export default {
  state,
  getters,
  mutations,
  actions
};
