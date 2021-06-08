import Vue from 'vue';

const state = {
  user: {
    token: ''
  }
};

const getters = {
  user_token: state => state.user.token,
};

const mutations = {
  set_user_token: (state, token) => {
    debugger;
    Vue.set(state.user.token, token);
  }
};

export default {
  state,
  getters,
  mutations
};
