import { fetchBikeSPData, fetchGeographicBikeSPData } from '../../service/bikeSPService';

const state = {
    data: [],
    filters: {
        data_type: 'TRIP_COUNT'
    },
    activeFilters: {
        data_type: 'TRIP_COUNT',
    },
    zoom_level: 4,
    map_center: { lat: -23.550164466, lng: -46.633664132 },
    max_distance: 2000000,
    visualization: 'CHART',
}

const getters = {
    getBikespLabels(state) {
        return state.data.map(obj => obj['label']);
    },
    getBikespValues(state) {
        return state.data.map(obj => obj['value']);
    },
    isMapViewOn(state) {
        return state.visualization === 'MAP'
    }
}

const mutations = {
    updateData(state, data) {
        state.data = data;
    },
    updateDataType(state, data) {
        state.filters.data_type = data;
    },
    updateAggregation(state, data) {
        state.filters.aggregation = data;
    },
    updateActiveFilters(state, data) {
        state.activeFilters = structuredClone(data)
    },
    updateFilters(state, data) {
        state.filters = {
            ...state.filters, 
            ...data
        }
    },
    changeView(state, view) {
        state.visualization = view;
    },
    updateZoomLevel(state, zoom_level) {
        state.zoom_level = Math.floor(zoom_level/2)+1;
    },
    updateMapCenter(state, newCenter) {
        state.map_center = newCenter;
    },
    updateMaxDistance(state, newDistance) {
        state.max_distance = newDistance
    } 
}

const actions = {
    async updateData({ commit, state }) {
        try {
            let data;
            if (state.visualization === 'MAP') {
                data = await fetchGeographicBikeSPData(state);
            } else {
                data = await fetchBikeSPData(state.filters);
            }
            commit('updateData', data);
            commit('updateActiveFilters', state.filters);
        } catch (error) {
            commit('updateData', []);
        }
    }
}

export default {
  namespaced: true, 
  getters,
  state,
  actions,
  mutations,
};