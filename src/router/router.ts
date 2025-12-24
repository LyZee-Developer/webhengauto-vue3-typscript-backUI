// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw  } from 'vue-router';
import NotFound from '../views/NotFound/NotFound.vue';
import Login from '../views/Login/Login.vue';
import HomePage from '../views/Home.vue';
import { menu_data } from '../utils/system_data';
import DesktopOrMobile from '../views/DesktopOrMobile.vue';
// Define your routes with explicit type RouteRecordRaw
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  ...menu_data.map(val=>({
    path: `/${val.code}`,
    name: '',
    component: DesktopOrMobile,
  })),
   ...menu_data.flatMap((menu) =>
    menu.subMenu.map((sub) => ({
      path: `/${menu.code}/${sub.code}`,
      name: `menu-${menu.code}-${sub.code}`,
      component: DesktopOrMobile,
    }))
  ),
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
