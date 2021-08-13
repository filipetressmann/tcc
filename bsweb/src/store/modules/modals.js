const state = {
  open: [],
};

const getters = {
  active: state => (state.open.length > 0 ? state.open[0] : null),
  allOpen: state => state.open,
};

const mutations = {
  open: (state, name) => state.open.unshift(name),
  close: (state, name) => (state.open = state.open.filter(e => e !== name)),
};

const actions = {
  open: ({ commit }, name) => commit('open', name),
  close: ({ commit }, name) => commit('close', name),
};


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};