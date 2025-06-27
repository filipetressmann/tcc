import axios from 'axios';

const api_url = process.env.VUE_APP_API_URL;

const state = {
    data: [],
    filters: {
        aggregation: 'HOUR',
        data_type: 'TRIP_COUNT'
    }
}

const mutations = {
    updateData(state, data) {
        state.data = data
        console.log(state.data)
    }
}

const actions = {
    async updateData({ commit }) {
         try {
            const response = await axios.post(`${api_url}/bikesp/trip_count`, {
                "aggregation": state.filters.aggregation,
                "data_type": state.filters.data_type,
            });

            if (response.data.data) {
                commit('updateData', response.data.data);
            } else {
                console.warn("API response did not contain 'data.data':", response.data);
                commit('updateData', []);
            }
        } catch (error) {
            console.error("Error fetching data in Vuex action (bikesp/updateData):", error);
            commit('updateData', []);
        }
    }
}

export default {
  namespaced: true, 
  state,
  actions,
  mutations,
};