import axios from 'axios';
import Vue from 'vue';
import selectors from '../helpers/default_selectors';

const api_url = process.env.VUE_APP_API_URL;
const default_grid_size = 20;

const state = {
  selectors,
  main: {
    activeFilters: [],
    filters: {
      ut: '',
      params: {},
      baseLayer: 'grid',
      gridSize: default_grid_size,
      gridOffset: {
        west: -0.15,
        east: 0.23,
        north: 0.19,
        south: -0.46,
      },
    },
    gridEditMode: false,
  },
  second: {
    activeFilters: [],
    filters: {
      ut: '',
      params: {},
      baseLayer: 'grid',
      gridSize: default_grid_size,
      gridOffset: {
        west: -0.15,
        east: 0.23,
        north: 0.19,
        south: -0.46,
      },
    },
    gridEditMode: false,
  },
  chartList: [
    '@/assets/tmp_charts/agechart.png',
    '@/assets/tmp_charts/triplengths.png',
  ],
  loading_filters: false,
  flows_not_found: false,
  mirrorControl: false,
  hideSecondMapControl: false,
};

const getters = {
  activeFilters: state => state.main.activeFilters,
  filters: state => state.main.filters,
  gridSize: state => state.main.filters.gridSize,
  gridOffset: state => state.main.filters.gridOffset,

  activeFilters2: state => state.second.activeFilters,
  filters2: state => state.second.filters,
  gridSize2: state => state.second.filters.gridSize,
  gridOffset2: state => state.second.filters.gridOffset,

  loading_filters: state => state.loading_filters,
  flowsNotFound: state => state.flows_not_found,
  gridEditMode: state => state.gridEditMode,
  activeFiltersCount: state => state.main.activeFilters.length + state.second.activeFilters.length,
  mirrorFilterControl: state => state.mirrorControl,
  hideSecondMapFilterControl: state => state.hideSecondMapControl,
  selectors: state => state.selectors,
};

const mutations = {
  addActiveFilter: (state, { filter, mapkey, bothMaps }) => {
    if (bothMaps) {
      state['main'].activeFilters.push(filter);
      state['second'].activeFilters.push(filter);
    } else {
      state[mapkey].activeFilters.push(filter);
    }
    // Vue.set(state, 'loading_filters', false);
  },
  setToken: (state, token) => {
    Vue.set(state.filters, 'ut', token);
  },
  removeActiveFilter: (state, { filter, mapkey }) => {
    state[mapkey].activeFilters = state[mapkey].activeFilters.filter(activeFilter => filter.id !== activeFilter.id);
    Vue.delete(state[mapkey].filters.params, filter.id);
  },
  addAttractors: (state, { attractors }) => {
    Vue.set(state.heatmaps, 'attractors', attractors);
  },
  addEmitters: (state, { emitters }) => {
    Vue.set(state.heatmaps, 'emitters', emitters);
  },
  addCharts: (state, { charts }) => {
    Vue.set(state, 'charts', charts);
  },
  updateFilterParams: (state, { filter: { id, params }, mapkey, bothMaps }) => {
    if (bothMaps) {
      Vue.set(state['main'].filters.params, id, params);
      Vue.set(state['second'].filters.params, id, params);

      const mapkey2 = mapkey === 'main' ? 'second' : 'main';
      state.selectors[mapkey2][id] = state.selectors[mapkey][id];
    } else {
      Vue.set(state[mapkey].filters.params, id, params);
    }
  },
  updateOD: (state, { value, mapkey }) => {
    Vue.set(state[mapkey].filters, 'baseLayer', value);
  },
  updateGridSize(state, { gridSize, mapkey }) {
    Vue.set(state[mapkey].filters, 'gridSize', gridSize);
  },
  updateGridOffset(state, { gridOffset, mapkey }) {
    Vue.set(state[mapkey].filters, 'gridOffset', gridOffset);
  },
  loading_filters(state, value) {
    Vue.set(state, 'loading_filters', value);
  },
  setFlowsNotFound(state, value) {
    Vue.set(state, 'flows_not_found', value);
  },
  setGridEditMode(state, { value, mapkey }) {
    Vue.set(state[mapkey], 'gridEditMode', value);
  },
  toggleMirrorFilterControl: state => {
    Vue.set(state, 'mirrorControl', !state.mirrorControl);
  },
  sethideSecondMapFilterControl: (state, value) => {
    Vue.set(state, 'hideSecondMapControl', value);
  },
};

const actions = {
  addFilter: ({ commit, getters }, filter) => {
    commit('addFilter', filter);
  },
  removeFilter: ({ commit }, data) => {
    commit('removeActiveFilter', data);
  },
  addActiveFilter: ({ commit, getters }, data) => {
    // commit('loading_filters', true);
    commit('addActiveFilter', { ...data, bothMaps: getters.mirrorFilterControl });
  },
  removeActiveFilter: ({ commit, dispatch, getters }, data) => {
    const { mapkey } = data;
    const bothMaps = getters.mirrorFilterControl;
    commit('removeActiveFilter', { ...data, bothMaps });
    dispatch('resetMapResource', { mapkey, category: 'flows', type: 'polyline' });
    dispatch('filterData', mapkey);
  },
  filterData: async ({ commit, dispatch, getters }, mapkey) => {
    commit('loading_filters', true);
    let filters;
    if (mapkey == 'main')
      filters = getters.filters;
    else filters = getters.filters2;

    return await axios.post(`${api_url}/filter_data`, filters)
      .then(res => {
        return res.data;
      })
      .then(response => {
        let flows = response['flows'];
        let tiers = Object.keys(flows);
        if (tiers.length > 0) {
          tiers.map(tier => {
            dispatch('flows/addTripsPerTier', { tier, count: flows[tier].length, mapkey }, { root: true });
            dispatch('flows/addFlows', { tier, flows: flows[tier], mapkey }, { root: true });
          });
          commit('setFlowsNotFound', false);
        } else {
          commit('setFlowsNotFound', true);
          dispatch('flows/resetFlows', mapkey, { root: true });
        }
      })
      .then(() => commit('loading_filters', false));
  },
  updateFilterParams: ({ commit, dispatch, getters }, { filter, mapkey }) => {
    const bothMaps = getters.mirrorFilterControl;
    commit('updateFilterParams', { filter, mapkey, bothMaps });
    if (bothMaps) {
      dispatch('resetMapResource', { mapkey: 'main', category: 'flows', type: 'polyline' });
      dispatch('resetMapResource', { mapkey: 'second', category: 'flows', type: 'polyline' });
      dispatch('filterData', 'main');
      dispatch('filterData', 'second');
    } else {
      dispatch('resetMapResource', { mapkey, category: 'flows', type: 'polyline' });
      dispatch('filterData', mapkey);
    }
  },
  updateOD: ({ commit }, data) => {
    commit('updateOD', data);
  },
  updateGridSize({ commit }, { gridSize, mapkey }) {
    commit('updateGridSize', { gridSize: Number(gridSize), mapkey });
  },
  setToken: ({ commit }, value) => {
    commit('setToken', value);
  },
  updateGridOffset({ commit, getters }, { key, value, mapkey }) {
    let gridOffset;
    if (mapkey == 'main')
      gridOffset = getters.gridOffset;
    else gridOffset = getters.gridOffset2;

    if (gridOffset[key] !== value) {
      let newGridOffset = { ...gridOffset };
      newGridOffset[key] = value;
      commit('updateGridOffset', { gridOffset: newGridOffset, mapkey });
    }
  },
  setGridEditModeOn({ commit }, mapkey) {
    commit('resetFlows', mapkey);
    commit('setGridEditMode', { value: true, mapkey });
  },
  setGridEditModeOff({ commit }, mapkey) {
    commit('setGridEditMode', { value: false, mapkey });
  },
  toggleMirrorFilterControl: ({ commit }) => {
    commit('toggleMirrorFilterControl');
  },
  sethideSecondMapFilterControl: ({ commit }, value) => {
    commit('sethideSecondMapFilterControl', value);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
