import { computed } from 'vue';

const state = {
  user: {
    token: '',
  },
};

const getters = {
  user_token: () => state.user.token,
};

const mutations = {
  set_user_token: (state, token) => {
    state.user.token = token;
  },
};

export default {
  state,
  getters,
  mutations,
};