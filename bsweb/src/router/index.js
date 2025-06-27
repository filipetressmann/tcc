import { createRouter, createWebHistory } from 'vue-router';

import BikeScienceWeb from '@/pages/BikeScienceWeb';
import BikeSP from '@/pages/BikeSP.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: BikeScienceWeb
  },
  {
    path: '/bikesp',
    name: 'bikesp',
    component: BikeSP
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;