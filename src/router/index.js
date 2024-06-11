// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginOrRegister/LoginView.vue';
const routes = [
  {
    path: '/', // 指向主页HomeView.vue
    name: 'Home',
    component: HomeView
  },
  {
    path: '/home',
    redirect: to => '/', // 重定向 /home 到根路径
  },
  // ...其他路由
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;