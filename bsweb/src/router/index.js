import Vue from 'vue';
import Router from 'vue-router';
import BikeScienceWeb from '@/pages/BikeScienceWeb';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      name: 'BikeScienceWeb',
      component: BikeScienceWeb,
    },
  ],
  mode: 'history',
});

export default router;