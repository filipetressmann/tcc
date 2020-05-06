import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import 'leaflet/dist/leaflet.css';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import './assets/styles/index.css'

Vue.use(Buefy);
Vue.use(VueResource);

export const filterEvents = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
