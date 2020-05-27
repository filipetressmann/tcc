import * as style from './../helpers/style_layers';
import * as options from './../helpers/option_helpers.js';
import Vue from 'vue'

const state = {
  mapGeoJson: {},
  mapPolylines: {},
  mapPolylineDecorators: {},
  visibleOnMap: {
    geojson: [],
    polyline: [],
    todo: []
  },
  mapProperties: {
    zoom: 12,
    center: [-23.550164466, -46.633664132],
    tile_layer_url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
  }
}

const getters = {
  mapGeoJson: (state) => state.mapGeoJson,
  visibleMapGeoJson: (state) => state.visibleOnMap.geojson,
  mapPolylines: (state) => state.mapPolylines,
  mapPolylineDecorators: (state) => state.mapPolylineDecorators,
  visibleMapPolyline: (state) => state.visibleOnMap.polyline,
  properties: (state) => state.mapProperties,
  ageFilter: (state) => state.mapPolylines['age']
}

const mutations = {
  addGeoJson: (state, geojson) => {
    Vue.set(state.mapGeoJson, geojson.name, geojson.data);
  },
  addPolyline: (state, polyline) => {
    let flows = []
    polyline.data.map((tier, index) => Vue.set(flows, `${index}`, tier))
    Vue.set(state.mapPolylines, polyline.name, flows);
    let arrows = []
    polyline.data.map((tier, index) => Vue.set(arrows, `${index}`, tier.map(coords => coords[coords.length - 1])));
    Vue.set(state.mapPolylineDecorators, polyline.name, arrows);
  },
  showOnMap: (state, data) => {
    let layerInfo = {
      layerName: data.key,
      tiers: data.tiers,
      visible: data.visible
    }
    // workaround to avoid duplicate occurences on visibleOnMap array
    state.visibleOnMap[data.type] = state.visibleOnMap[data.type].filter(addedLayer => layerInfo.layerName != addedLayer.layerName);
    state.visibleOnMap[data.type].push(layerInfo);
  },
  removeFromMap: (state, filter) => {
    let filter_group = state.visibleOnMap[filter.filter_type]
    filter_group = filter_group.filter((element) => element != filter.filter_key)
    state.visibleOnMap[filter.filter_type] = filter_group
  }
}
const actions = {
  fetchCPTM: (context, httpResource) => {
    httpResource.get('http://127.0.0.1:5000/load_railway_data')
        .then(response => {
          return response.json();
        })
          .then(response => {
            context.commit('addGeoJson', {
              name: 'cptm',
              data: {
                      geodata: JSON.parse(response),
                      style: style.styleRailway,
                      options: options.rail_options
                    }
            });
          });
  },
  fetchSubway: (context, httpResource) => {
    httpResource.get('http://127.0.0.1:5000/load_metro_data')
        .then(response => {
          return response.json();
        })
          .then(response => {
            context.commit('addGeoJson', {
              name: 'subway',
              data: {
                geodata: JSON.parse(response),
                style: style.styleMetro,
                options: options.rail_options
              }
            })
          });
  },
  fetchBikelane: (context, httpResource) => {
    httpResource.get('http://127.0.0.1:5000/load_bikelane_data')
        .then(response => {
          return response.json();
        })
        .then(response => {
          context.commit('addGeoJson', {
            name: 'bikelane',
            data: {
              geodata: JSON.parse(response),
              style: style.styleBikelane
            }
          })
        });
  },
  showOnMap: (context, data) => {
    context.commit('showOnMap', data);
  },
  removeFromMap: (context, data) => {
    context.commit('removeFromMap', data);
  } 
}

export default {
  state,
  getters,
  mutations,
  actions
};
