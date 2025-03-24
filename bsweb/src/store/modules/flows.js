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
  limits: {
    main: {},
    second: {},
  },
  odYear: {
    main: 2017,
    second: 2017,
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
  flowsLimits: state => state.limits,
  tripsPerTier: state => state.tripsPerTier,
  selectors: state => state.selectors,
  mirrorFlowsControl: state => state.mirrorControl,
  hideSecondMapFlowsControl: state => state.hideSecondMapControl,
  odYear: state => state.odYear,
};

const actions = {
  addFlows: ({ commit }, data) => commit('addFlows', data),
  addTripsPerTier: ({ commit }, data) => commit('addTripsPerTier', data),
  resetFlows: ({ commit }, mapkey) => commit('resetFlows', mapkey),
  toggleMirrorFlowsControl: ({ commit }) => commit('toggleMirrorFlowsControl'),
  toggleSelector: ({ commit }, data) => commit('toggleSelector', data),
  setHideSecondMapFlowsControl: ({ commit }, value) =>
    commit('setHideSecondMapFlowsControl', value),
  copySelectedFlowsTo: ({ commit }, mapkey) => commit('copySelectedFlowsTo', mapkey),
  setLimits: ({ commit }, data) => commit('setLimits', data),
  setOdYear: ({ commit }, data) => commit('setOdYear', data),
};

const mutations = {
  addFlows: (state, { tier, flows, mapkey }) => {
    state.flows[mapkey][tier] = flows;
  },
  addTripsPerTier: (state, { tier, count, mapkey }) => {
    state.tripsPerTier[mapkey][tier] = count;
  },
  resetFlows: (state, mapkey) => {
    state.flows[mapkey] = { 0: [], 1: [], 2: [], 3: [] };
    state.tripsPerTier[mapkey] = [0, 0, 0, 0];
  },
  toggleSelector: (state, { mapkey, tier }) => {
    const newValue = !state.selectors[mapkey][tier];
    if (state.mirrorControl) {
      state.selectors['main'][tier] = newValue;
      state.selectors['second'][tier] = newValue;
    } else {
      state.selectors[mapkey][tier] = newValue;
    }
  },
  toggleMirrorFlowsControl: state => {
    state.mirrorControl = !state.mirrorControl;
  },
  setHideSecondMapFlowsControl: (state, value) => {
    state.hideSecondMapControl = value;
  },
  copySelectedFlowsTo: (state, mapkey) => {
    const mapkeyFrom = mapkey === 'main' ? 'second' : 'main';
    // Use spread operator to copy the array
    state.selectors[mapkey] = [...state.selectors[mapkeyFrom]];
  },
  setLimits: (state, { limits, mapkey }) => {
    state.limits[mapkey] = limits;
  },
  setOdYear: (state, { year, mapkey }) => {
    state.odYear[mapkey] = year;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
