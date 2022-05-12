import Vue from 'vue';
const state = {
  maps: {
    sharedControls: true,
    // sharedCenter: { lat: -23.550164466, lng: -46.633664132 },
    sharedZoom: 12,
    /* This object contains info about maps being plotted in the application. Each map object contains a 'properties' object
    and a 'show' object. Default map's has 'mapkey' = main */
    main: {
      properties: {
        zoom: 12,
        // center: [-23.550164466, -46.633664132],
        center: { lat: -23.550164466, lng: -46.633664132 },
        tile_layers: [
          {
            id: 1,
            name: 'Voyager',
            url: 'https://api.maptiler.com/maps/voyager/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
            visible: true,
          },
          {
            id: 2,
            name: 'Basic',
            url: 'https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
            visible: false,
          },
          {
            id: 3,
            name: 'Bright',
            url: 'https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
            visible: false,
          },
          {
            id: 4,
            name: 'Satellite Hybrid',
            url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=ajQurp8FqZX9pYwNKnIv',
            visible: false,
          },
          // {
          //   id: '4b',
          //   name: 'Satellite Hybrid 2x',
          //   url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}@2x.jpg?key=ajQurp8FqZX9pYwNKnIv',
          //   visible: false,
          // },
          {
            id: 5,
            name: 'Streets',
            url: 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
            visible: false,
          },
          // {
          //   id: 6,
          //   name: 'Outdoor',
          //   url: 'https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
          //   visible: false,
          // },
          // {
          //   id: 7,
          //   name: 'Toner',
          //   url: 'https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
          //   visible: false,
          // },
          {
            id: 8,
            name: 'Topo',
            url: 'https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
            visible: false,
          },
          // {
          //   id: 9,
          //   name: 'Topographique',
          //   url: 'https://api.maptiler.com/maps/topographique/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
          //   visible: false,
          // },
        ],
      },
      show: {
        /* this object stores keys to access data user wants to show */
        layers: {
          geojson: {},
          polyline: {},
          decorators: {},
        },
        flows: {
          polyline: {},
        },
        zones: false,
        grid: true,
        attractors: true,
        emitters: false,
      },
    },
    second: {
      properties: {
        zoom: 12,
        // center: [-23.550164466, -46.633664132],
        center: { lat: -23.550164466, lng: -46.633664132 },
        tile_layers: [
          {
            id: 1,
            name: 'Voyager',
            url: 'https://api.maptiler.com/maps/voyager/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
            visible: true,
          },
          {
            id: 2,
            name: 'Basic',
            url: 'https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
            visible: false,
          },
          {
            id: 3,
            name: 'Bright',
            url: 'https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
            visible: false,
          },
          {
            id: 4,
            name: 'Satellite Hybrid',
            url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=ajQurp8FqZX9pYwNKnIv',
            visible: false,
          },
          // {
          //   id: '4b',
          //   name: 'Satellite Hybrid 2x',
          //   url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}@2x.jpg?key=ajQurp8FqZX9pYwNKnIv',
          //   visible: false,
          // },
          {
            id: 5,
            name: 'Streets',
            url: 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
            visible: false,
          },
          // {
          //   id: 6,
          //   name: 'Outdoor',
          //   url: 'https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
          //   visible: false,
          // },
          // {
          //   id: 7,
          //   name: 'Toner',
          //   url: 'https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
          //   visible: false,
          // },
          {
            id: 8,
            name: 'Topo',
            url: 'https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
            visible: false,
          },
          // {
          //   id: 9,
          //   name: 'Topographique',
          //   url: 'https://api.maptiler.com/maps/topographique/{z}/{x}/{y}.png?key=ajQurp8FqZX9pYwNKnIv',
          //   visible: false,
          // },
        ],
      },
      show: {
        /* this object stores keys to access data user wants to show */
        layers: {
          geojson: {},
          polyline: {},
          decorators: {},
        },
        flows: {
          polyline: {},
        },
        zones: false,
        grid: true,
        attractors: true,
        emitters: false,
      },
    },
  },
  developer_mode: false,
  mapControl: 'main',
};

const getters = {
  developer_mode: state => state.developer_mode,
  sharedControls: state => state.maps.sharedControls,
  centerMain: state => state.maps.main.properties.center,
  centerSecond: state => state.maps.second.properties.center,
  zoomMain: state => state.maps.main.properties.zoom,
  zoomSecond: state => state.maps.second.properties.zoom,
  secondMapIsActive: state => state.secondMapIsActive,
};

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
    Vue.set(state.maps[mapkey].show, 'zones', false);
  },
  hideGrid: (state, mapkey) => {
    Vue.set(state.maps[mapkey].show, 'grid', false);
  },
  showZones: (state, mapkey) => {
    Vue.set(state.maps[mapkey].show, 'zones', true);
  },
  showGrid: (state, mapkey) => {
    Vue.set(state.maps[mapkey].show, 'grid', true);
  },
  changeHeatmapVisibility: (state, { which, visible, mapkey }) => {
    Vue.set(state.maps[mapkey].show, which, visible);
  },
  toggleDeveloperMode: state => {
    Vue.set(state, 'developer_mode', !state.developer_mode);
  },
  updateCenter: (state, { mapkey, center }) => {
    if (mapkey === 'main') {
      state.maps.second.properties.center = center;
    } else {
      state.maps.main.properties.center = center;
    }
  },
  updateZoom: (state, { mapkey, zoom }) => {
    if (mapkey === 'main') {
      state.maps.second.properties.zoom = zoom;
    } else {
      state.maps.main.properties.zoom = zoom;
    }
  },
  toggleSecondMap: state => {
    Vue.set(state, 'secondMapIsActive', !state.secondMapIsActive);
  },
  changeMapControl: (state, value) => {
    Vue.set(state, 'mapControl', value);
  },
};
const actions = {
  addToMap: (context, data) => {
    context.commit('addToMap', data);
  },
  removeFromMap: (context, data) => {
    context.commit('removeFromMap', data);
  },
  resetMapResource: (context, data) => {
    context.commit('resetMapResource', data);
  },
  toggleDeveloperMode: ({ commit }) => {
    commit('toggleDeveloperMode');
  },
  updateCenter: ({ commit }, { mapkey, center }) => {
    commit('updateCenter', { mapkey, center });
  },
  updateZoom: ({ commit }, { mapkey, zoom }) => {
    commit('updateZoom', { mapkey, zoom });
  },
  toggleSecondMap: ({ commit }) => {
    commit('toggleSecondMap');
  },
  changeMapControl: ({ commit }, value) => {
    commit('changeMapControl', value);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
