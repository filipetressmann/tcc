import axios from 'axios';

const api_url = process.env.VUE_APP_API_URL;

const state = {
    data: [],
    filters: {
        aggregation: 'HOUR',
        data_type: 'TRIP_COUNT'
    },
    activeFilters: {
        aggregation: 'HOUR',
        data_type: 'TRIP_COUNT'
    },
}

const getters = {
    getBikespLabels(state) {
        return state.data.map(obj => obj[state.activeFilters.aggregation]);
    },
    getBikespValues(state) {
        return state.data.map(obj => obj['value']);
    }
}

const mutations = {
    updateData(state, data) {
        state.data = data;
        console.log(state.data);
    },
    updateDataType(state, data) {
        state.filters.data_type = data;
    },
    updateAggregation(state, data) {
        state.filters.aggregation = data;
    },
    updateActiveFilters(state, data) {
        state.activeFilters = structuredClone(data)
    }
}

const actions = {
    async updateData({ commit, state }) {
         try {
            const response = await axios.post(`${api_url}/bikesp/get_data`, {
                "aggregation": state.filters.aggregation,
                "data_type": state.filters.data_type,
            });

            if (response.data.data) {
                commit('updateData', response.data.data);
                commit('updateActiveFilters', state.filters);
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
  getters,
  state,
  actions,
  mutations,
};