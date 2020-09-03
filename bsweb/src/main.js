import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import 'leaflet/dist/leaflet.css'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import './assets/styles/index.css'
import VueI18n from 'vue-i18n'
import { messages } from './plugins/i18n'
import { store } from './store/store.js'
import LoadScript from 'vue-plugin-load-script';
import UUID from "vue-uuid";

Vue.use(UUID);
Vue.use(LoadScript);
Vue.use(VueI18n);
Vue.use(Buefy);
Vue.use(VueResource);


export const filterEvents = new Vue();
export const i18n = new VueI18n({ locale: "pt-br", fallbackLocale: "en", messages });

new Vue({
  i18n,
  el: '#app',
  store,
  render: h => h(App)
})
