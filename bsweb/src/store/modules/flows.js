import Vue from 'vue';

const state = {
  flows: {
    main: {
      0: [],
      1: [],
      2: [],
      3: [],
    },
    second: {
      0: [],
      1: [],
      2: [],
      3: [],
    },
  },
  tripsPerTier: {
    main: [0, 0, 0, 0],
    second: [0, 0, 0, 0],
  },
  selectors: {
    main: [false, false, false, false],
    second: [false, false, false, false],
  },
  mirrorControl: false,
  hideSecondMapControl: false,
};

const getters = {
  flows: state => state.flows,
  tripsPerTier: state => state.tripsPerTier,
  selectors: state => state.selectors,
  mirrorFlowsControl: state => state.mirrorControl,
  hideSecondMapFlowsControl: state => state.hideSecondMapControl,
};

const actions = {
  addFlows: ({ commit }, data) => {
    commit('addFlows', data);
  },
  addTripsPerTier: ({ commit }, data) => {
    commit('addTripsPerTier', data);
  },
  resetFlows: ({ commit }, mapkey) => {
    commit('resetFlows', mapkey);
  },
  toggleMirrorFlowsControl: ({ commit }) => {
    commit('toggleMirrorFlowsControl');
  },
  toggleSelector: ({ commit }, data) => {
    commit('toggleSelector', data);
  },
  setHideSecondMapFlowsControl: ({ commit }, value) => {
    commit('setHideSecondMapFlowsControl', value);
  },
  copyFlowsTo: ({ commit }, mapkey) => {
    commit('copyFlowsTo', mapkey);
  },
};

const mutations = {
  addFlows: (state, { tier, flows, mapkey }) => {
    Vue.set(state.flows[mapkey], tier, flows);
  },
  addTripsPerTier: (state, { tier, count, mapkey }) => {
    Vue.set(state.tripsPerTier[mapkey], tier, count);
  },
  resetFlows: (state, mapkey) => {
    Vue.set(state.flows, mapkey, { 0: [], 1: [], 2: [], 3: [] });
    Vue.set(state.tripsPerTier, mapkey, [0, 0, 0, 0]);
  },
  toggleSelector: (state, { mapkey, tier }) => {
    const newValue = !state.selectors[mapkey][tier];
    if (state.mirrorControl) {
      Vue.set(state.selectors['main'], tier, newValue);
      Vue.set(state.selectors['second'], tier, newValue);
    } else {
      Vue.set(state.selectors[mapkey], tier, newValue);
    }
  },
  toggleMirrorFlowsControl: state => {
    Vue.set(state, 'mirrorControl', !state.mirrorControl);
  },
  setHideSecondMapFlowsControl: (state, value) => {
    Vue.set(state, 'hideSecondMapControl', value);
  },
  copyFlowsTo: (state, mapkey) => {
    const mapkeyFrom = mapkey === 'main' ? 'second' : 'main';
    Vue.set(state.selectors, mapkey, { ...state.selectors[mapkeyFrom] });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
