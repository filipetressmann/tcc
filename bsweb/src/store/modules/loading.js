const state = {
  active: false,
};

const getters = {
  active: state => {
    return state.active;
  },
};

const actions = {
  setLoading: context => {
    context.commit('setLoading');
  },
  unsetLoading: context => {
    context.commit('unsetLoading');
  },
};

const mutations = {
  setLoading(state) {
    state.active = true;
  },
  unsetLoading(state) {
    state.active = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
