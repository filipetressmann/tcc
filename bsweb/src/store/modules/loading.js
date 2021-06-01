import Vue from 'vue';

const state = {
  loading: false
};

const getters = {
  loading: state => {
    return state.loading;
  }
};

const actions = {
  setLoading: (context) => {
    context.commit('setLoading');
  },
  unsetLoading: (context) => {
    context.commit('unsetLoading');
  },
};

const mutations = {
  setLoading(state) {
    state.loading = true;
  },
  unsetLoading(state) {
    state.loading = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
