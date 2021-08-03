import Vue from 'vue';
import Router from 'vue-router';
import BikeScienceWeb from '@/pages/BikeScienceWeb';
import About from '@/pages/About';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/about',
      name: 'Sobre',
      component: About
    },
    {
      path: '*',
      name: 'BikeScienceWeb',
      component: BikeScienceWeb
    }
  ],
  mode: 'history'
});

export default router;