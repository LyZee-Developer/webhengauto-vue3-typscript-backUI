import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
// import NotFound from '../views/NotFound/NotFound.vue';
import Login from '../views/Login/Login.vue';
import HomePage from '../views/Home.vue';
import DesktopOrMobile from '../views/DesktopOrMobile.vue';
// import { menu_data } from '../utils/system_data';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: `/setting`,
    name: `menu-setting`,
    component: DesktopOrMobile,
  },
  {
    path: `/setting/owner`,
    name: `menu-owner`,
    component: DesktopOrMobile,
  },
  // ...menu_data.map(val => ({
  //   path: `/${val.code}`,
  //   name: `menu-${val.code}`,
  //   component: DesktopOrMobile,
  // })),
  // ...menu_data.flatMap(menu =>
  //   menu.subMenu.map(sub => ({
  //     path: `/${menu.code}/${sub.code}`,
  //     name: `menu-${menu.code}-${sub.code}`,
  //     component: DesktopOrMobile,
  //   }))
  // ),
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: NotFound,
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
