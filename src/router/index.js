import Vue from 'vue';
import Router from 'vue-router';

// Import komponen yang akan digunakan
import Home from '../pages/home';
import Detail from '../pages/detail';
import Type from '../pages/type';



// Beri tahu Vue untuk menggunakan Vue Router
Vue.use(Router);

// Buat instance router
const router = new Router({
  mode: 'history', // mode "history" untuk menghilangkan tanda #
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail,
    },
    {
      path: '/type/:type',
      name: 'Type',
      component: Type,
    },
  ],
});

export default router;
